import React, { useEffect, useRef } from "react";

class Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  opacity: number;
  canvasWidth: number;
  canvasHeight: number;
  flickerState: boolean;
  flickerTimer: number;
  flickerDuration: number;
  fillStyle: string;
  gridX: number;
  gridY: number;

  constructor(canvasWidth: number, canvasHeight: number) {
    this.canvasWidth = canvasWidth;
    this.canvasHeight = canvasHeight;
    this.x = Math.random() * canvasWidth;
    this.y = Math.random() * canvasHeight;
    this.vx = (Math.random() - 0.5) * 0.5;
    this.vy = (Math.random() - 0.5) * 0.5;
    this.radius = Math.random() * 2 + 1;
    this.opacity = Math.random() * 0.5 + 0.3;
    this.flickerState = Math.random() > 0.5;
    this.flickerTimer = 0;
    this.flickerDuration = Math.random() * 120 + 60;
    this.fillStyle = `rgba(100, 255, 218, ${this.opacity})`;
    this.gridX = 0;
    this.gridY = 0;
  }

  update(gridSize: number) {
    this.x += this.vx;
    this.y += this.vy;
    if (this.x < 0) this.x = this.canvasWidth;
    else if (this.x > this.canvasWidth) this.x = 0;
    if (this.y < 0) this.y = this.canvasHeight;
    else if (this.y > this.canvasHeight) this.y = 0;
    this.flickerTimer++;

    // Update grid position for spatial partitioning
    this.gridX = Math.floor(this.x / gridSize);
    this.gridY = Math.floor(this.y / gridSize);
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.fillStyle = this.fillStyle;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fill();
  }
}

// Spatial grid for O(n) neighbor finding
class SpatialGrid {
  grid: Particle[][][];
  gridSize: number;
  gridWidth: number;
  gridHeight: number;

  constructor(gridSize: number, canvasWidth: number, canvasHeight: number) {
    this.gridSize = gridSize;
    this.gridWidth = Math.ceil(canvasWidth / gridSize);
    this.gridHeight = Math.ceil(canvasHeight / gridSize);
    this.grid = Array.from({ length: this.gridWidth }, () =>
      Array.from({ length: this.gridHeight }, () => [])
    );
  }

  clear() {
    for (let x = 0; x < this.gridWidth; x++) {
      for (let y = 0; y < this.gridHeight; y++) {
        this.grid[x][y].length = 0;
      }
    }
  }

  add(particle: Particle) {
    const x = Math.max(0, Math.min(this.gridWidth - 1, particle.gridX));
    const y = Math.max(0, Math.min(this.gridHeight - 1, particle.gridY));
    this.grid[x][y].push(particle);
  }

  getNeighbors(x: number, y: number, radius: number): Particle[] {
    const neighbors: Particle[] = [];
    const gridRadius = Math.ceil(radius / this.gridSize);

    for (let dx = -gridRadius; dx <= gridRadius; dx++) {
      for (let dy = -gridRadius; dy <= gridRadius; dy++) {
        const nx = x + dx;
        const ny = y + dy;
        if (nx >= 0 && nx < this.gridWidth && ny >= 0 && ny < this.gridHeight) {
          neighbors.push(...this.grid[nx][ny]);
        }
      }
    }

    return neighbors;
  }
}

// Connection batching system
class ConnectionBatch {
  paths: Path2D[] = [];
  styles: Array<{
    strokeStyle: string;
    lineWidth: number;
    shadowBlur: number;
    shadowColor: string;
  }> = [];

  addLine(x1: number, y1: number, x2: number, y2: number, styleIndex: number) {
    if (!this.paths[styleIndex]) {
      this.paths[styleIndex] = new Path2D();
    }
    this.paths[styleIndex].moveTo(x1, y1);
    this.paths[styleIndex].lineTo(x2, y2);
  }

  setStyle(
    index: number,
    strokeStyle: string,
    lineWidth: number,
    shadowBlur: number = 0,
    shadowColor: string = ""
  ) {
    this.styles[index] = { strokeStyle, lineWidth, shadowBlur, shadowColor };
  }

  draw(ctx: CanvasRenderingContext2D) {
    for (let i = 0; i < this.paths.length; i++) {
      if (this.paths[i]) {
        const style = this.styles[i];
        if (style.shadowBlur > 0) {
          ctx.shadowBlur = style.shadowBlur;
          ctx.shadowColor = style.shadowColor;
        }
        ctx.strokeStyle = style.strokeStyle;
        ctx.lineWidth = style.lineWidth;
        ctx.stroke(this.paths[i]);
        if (style.shadowBlur > 0) {
          ctx.shadowBlur = 0;
        }
      }
    }
    this.clear();
  }

  clear() {
    this.paths.length = 0;
    this.styles.length = 0;
  }
}

// Distance cache for performance
class DistanceCache {
  cache: Map<string, number> = new Map();
  maxSize = 10000;

  get(x1: number, y1: number, x2: number, y2: number): number {
    const key = `${Math.round(x1)},${Math.round(y1)},${Math.round(
      x2
    )},${Math.round(y2)}`;
    let dist = this.cache.get(key);
    if (dist === undefined) {
      const dx = x1 - x2;
      const dy = y1 - y2;
      dist = dx * dx + dy * dy;
      if (this.cache.size < this.maxSize) {
        this.cache.set(key, dist);
      }
    }
    return dist;
  }

  clear() {
    this.cache.clear();
  }
}

const AnimatedBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: false });
    if (!ctx) return;
    canvas.style.backgroundColor = "#000";
    canvas.style.pointerEvents = "none";

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    // Optimized configuration
    const particleCount = 500;
    const gridSize = 50; // Spatial partitioning grid size
    const mouseRadius = 300;
    const mouseRadiusSquared = mouseRadius * mouseRadius;
    const maxLineLength = 95;
    const maxLineLengthSquared = maxLineLength * maxLineLength;
    const propagationRadius = 40; // Valor mais realista para propagação visível
    const propagationRadiusSquared = propagationRadius * propagationRadius;
    const maxLayers = 6;

    // Initialize systems
    const spatialGrid = new SpatialGrid(gridSize, canvas.width, canvas.height);
    const distanceCache = new DistanceCache();
    const connectionBatch = new ConnectionBatch();

    const mouse = { x: -1000, y: -1000 };

    const handleMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };

    const handleMouseLeave = () => {
      mouse.x = -1000;
      mouse.y = -1000;
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("mouseleave", handleMouseLeave, { passive: true });

    const particles: Particle[] = [];
    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle(canvas.width, canvas.height));
    }

    let animationFrameId: number;
    let frameCount = 0;

    const animate = () => {
      frameCount++;

      // Clear canvas
      ctx.fillStyle = "#000000";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Update spatial grid
      spatialGrid.clear();
      for (let i = 0; i < particleCount; i++) {
        particles[i].update(gridSize);
        particles[i].draw(ctx);
        spatialGrid.add(particles[i]);
      }

      // Clear distance cache every 60 frames to prevent memory bloat
      if (frameCount % 60 === 0) {
        distanceCache.clear();
      }

      // Find particles near mouse using spatial grid
      const mouseGridX = Math.floor(mouse.x / gridSize);
      const mouseGridY = Math.floor(mouse.y / gridSize);
      const nearbyParticles =
        mouse.x !== -1000
          ? spatialGrid.getNeighbors(mouseGridX, mouseGridY, mouseRadius)
          : [];

      // Filter particles within mouse radius
      const connectedParticles: Particle[] = [];
      for (const p of nearbyParticles) {
        const distSquared = distanceCache.get(mouse.x, mouse.y, p.x, p.y);
        if (distSquared < mouseRadiusSquared) {
          connectedParticles.push(p);
        }
      }

      if (connectedParticles.length > 0) {
        ctx.save();
        ctx.globalCompositeOperation = "lighter";

        const processedSet = new Set<Particle>(connectedParticles);

        // Batch mouse connections
        connectionBatch.setStyle(
          0,
          "rgba(255, 30, 30, 0.33)",
          2.5,
          14,
          "rgba(255, 50, 50, 0.6)"
        );
        connectionBatch.setStyle(1, "rgba(255, 95, 95, 0.66)", 1.0);
        connectionBatch.setStyle(2, "rgba(255, 255, 255, 0.21)", 0.4);

        for (const p of connectedParticles) {
          const distSquared = distanceCache.get(mouse.x, mouse.y, p.x, p.y);
          if (distSquared > maxLineLengthSquared) continue;

          connectionBatch.addLine(mouse.x, mouse.y, p.x, p.y, 0);
          connectionBatch.addLine(mouse.x, mouse.y, p.x, p.y, 1);
          connectionBatch.addLine(mouse.x, mouse.y, p.x, p.y, 2);
        }

        // Multi-layer propagation with optimized neighbor finding
        let currentLayer = [...connectedParticles];
        let styleOffset = 3;

        for (let layer = 0; layer < maxLayers; layer++) {
          const nextLayer: Particle[] = [];
          const layerOpacity = 0.4;

          connectionBatch.setStyle(
            styleOffset,
            `rgba(255, 30, 30, ${layerOpacity * 0.4})`,
            3.5,
            8,
            `rgba(255, 50, 50, ${layerOpacity})`
          );
          connectionBatch.setStyle(
            styleOffset + 1,
            `rgba(255, 95, 95, ${layerOpacity * 0.9})`,
            1.5
          );
          connectionBatch.setStyle(
            styleOffset + 2,
            `rgba(255, 255, 255, ${layerOpacity * 0.25})`,
            0.6
          );

          for (const cp of currentLayer) {
            const cpGridX = Math.floor(cp.x / gridSize);
            const cpGridY = Math.floor(cp.y / gridSize);
            const neighbors = spatialGrid.getNeighbors(
              cpGridX,
              cpGridY,
              propagationRadius
            );

            for (const p of neighbors) {
              if (processedSet.has(p)) continue;

              const distSquared = distanceCache.get(cp.x, cp.y, p.x, p.y);
              if (distSquared < propagationRadiusSquared) {
                connectionBatch.addLine(cp.x, cp.y, p.x, p.y, styleOffset);
                connectionBatch.addLine(cp.x, cp.y, p.x, p.y, styleOffset + 1);
                connectionBatch.addLine(cp.x, cp.y, p.x, p.y, styleOffset + 2);

                processedSet.add(p);
                nextLayer.push(p);
              }
            }
          }

          currentLayer = nextLayer;
          styleOffset += 3;
          if (currentLayer.length === 0) break; // Early exit if no more propagation
        }

        // Batch inter-connections between processed particles
        const processedArray = Array.from(processedSet);
        const interLines: Array<{ p1: Particle; p2: Particle }> = [];

        // Use spatial grid to find inter-connections efficiently
        for (let i = 0; i < processedArray.length; i++) {
          const p1 = processedArray[i];
          const p1GridX = Math.floor(p1.x / gridSize);
          const p1GridY = Math.floor(p1.y / gridSize);
          const neighbors = spatialGrid.getNeighbors(
            p1GridX,
            p1GridY,
            maxLineLength
          );

          for (const p2 of neighbors) {
            if (p2 === p1 || !processedSet.has(p2)) continue;
            // Avoid duplicate connections by comparing indices
            const p2Index = processedArray.indexOf(p2);
            if (p2Index <= i) continue;

            const distSquared = distanceCache.get(p1.x, p1.y, p2.x, p2.y);
            if (distSquared < maxLineLengthSquared) {
              interLines.push({ p1, p2 });
            }
          }
        }

        // Batch inter-connection drawing
        if (interLines.length > 0) {
          const opacity = 0.5;
          connectionBatch.setStyle(
            styleOffset,
            `rgba(255, 30, 30, ${opacity * 0.5})`,
            4.5,
            10,
            "rgba(255, 30, 30, 0.5)"
          );
          connectionBatch.setStyle(
            styleOffset + 1,
            `rgba(255, 95, 95, ${Math.min(1, opacity * 1.1)})`,
            2.0
          );
          connectionBatch.setStyle(
            styleOffset + 2,
            `rgba(255, 255, 255, ${opacity * 0.35})`,
            0.8
          );

          for (const line of interLines) {
            connectionBatch.addLine(
              line.p1.x,
              line.p1.y,
              line.p2.x,
              line.p2.y,
              styleOffset
            );
            connectionBatch.addLine(
              line.p1.x,
              line.p1.y,
              line.p2.x,
              line.p2.y,
              styleOffset + 1
            );
            connectionBatch.addLine(
              line.p1.x,
              line.p1.y,
              line.p2.x,
              line.p2.y,
              styleOffset + 2
            );
          }
        }

        // Draw all batched connections in single operations
        connectionBatch.draw(ctx);
        ctx.restore();
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseleave", handleMouseLeave);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return <canvas ref={canvasRef} className="animated-background" />;
};

export default AnimatedBackground;
