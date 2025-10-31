import React, { useEffect, useRef } from "react";
import { Particle } from "../utils/Particle";

// Spatial grid for O(n) neighbor finding
class SpatialGrid {
  grid: Particle[][][];
  gridSize: number;
  gridWidth: number;
  gridHeight: number;
  totalCells: number;

  constructor(gridSize: number, canvasWidth: number, canvasHeight: number) {
    this.gridSize = gridSize;
    this.gridWidth = Math.ceil(canvasWidth / gridSize);
    this.gridHeight = Math.ceil(canvasHeight / gridSize);
    this.totalCells = this.gridWidth * this.gridHeight;
    this.grid = Array.from({ length: this.gridWidth }, () =>
      Array.from({ length: this.gridHeight }, () => [])
    );
  }

  clear() {
    // Otimização: em vez de percorrer toda a grid, podemos usar uma abordagem mais eficiente
    // Mantém as referências aos arrays para reduzir alocações de GC
    for (let x = 0; x < this.gridWidth; x++) {
      const row = this.grid[x];
      for (let y = 0; y < this.gridHeight; y++) {
        row[y].length = 0; // Reset array sem realocar
      }
    }
  }

  add(particle: Particle) {
    // Otimização: reduz verificações Math.max/Math.min usando operações bitwise
    const x = (particle.gridX | 0) & 0x7fff; // Converte para int e limita
    const y = (particle.gridY | 0) & 0x7fff;

    // Verificação de bounds mais eficiente
    if (x >= 0 && x < this.gridWidth && y >= 0 && y < this.gridHeight) {
      this.grid[x][y].push(particle);
    }
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
  cache: Map<number, number> = new Map();
  maxSize = 10000;

  // Função hash mais eficiente para coordenadas
  private hash(x1: number, y1: number, x2: number, y2: number): number {
    // Arredonda para reduzir colisões e usa uma função hash simples
    const rx1 = Math.round(x1) & 0xffff; // Máscara para 16 bits
    const ry1 = Math.round(y1) & 0xffff;
    const rx2 = Math.round(x2) & 0xffff;
    const ry2 = Math.round(y2) & 0xffff;

    // Combina as coordenadas em um único número de 64 bits (simulado com 32 bits)
    // Usa uma função hash simples para distribuir melhor
    return (
      ((rx1 * 73856093) ^
        (ry1 * 19349663) ^
        (rx2 * 83492791) ^
        (ry2 * 126271)) >>>
      0
    );
  }

  get(x1: number, y1: number, x2: number, y2: number): number {
    const key = this.hash(x1, y1, x2, y2);
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

// Opacity cache for mouse distance calculations
class OpacityCache {
  cache: Map<string, number> = new Map();
  maxSize = 2000; // Menor que distance cache pois opacidades mudam menos frequentemente
  mouseX = 0;
  mouseY = 0;
  mouseRadius = 800;
  invMouseRadius = 1 / 800; // Pré-computado

  updateMouse(mouseX: number, mouseY: number, mouseRadius: number) {
    // Só limpa cache se mouse mudou significativamente
    if (
      Math.abs(this.mouseX - mouseX) > 10 ||
      Math.abs(this.mouseY - mouseY) > 10 ||
      this.mouseRadius !== mouseRadius
    ) {
      this.cache.clear();
      this.mouseX = mouseX;
      this.mouseY = mouseY;
      this.mouseRadius = mouseRadius;
      this.invMouseRadius = 1 / mouseRadius;
    }
  }

  get(x: number, y: number): number {
    const key = `${Math.round(x)},${Math.round(y)}`;
    let opacity = this.cache.get(key);
    if (opacity === undefined) {
      const dx = x - this.mouseX;
      const dy = y - this.mouseY;
      const distance = Math.sqrt(dx * dx + dy * dy);
      const normalizedDistance = distance * this.invMouseRadius;
      opacity = Math.max(0.05, Math.pow(1 - normalizedDistance, 2));
      if (this.cache.size < this.maxSize) {
        this.cache.set(key, opacity);
      }
    }
    return opacity;
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
    canvas.style.backgroundColor = "transparent";
    canvas.style.pointerEvents = "none";

    // Responsive configuration computed from viewport and device capabilities
    // sensible defaults so TS knows variables are initialized
    let particleCount: number = 500;
    let gridSize: number = 50;
    let mouseRadius: number = 800;
    let maxLineLength: number = 95;
    let maxLineLengthSquared: number = maxLineLength * maxLineLength;
    let propagationRadius: number = 40;
    let propagationRadiusSquared: number =
      propagationRadius * propagationRadius;
    let maxLayers: number = 6;

    // Pre-computed constants for opacity calculations (kept static)
    const propagationOpacityBands = 6; // 6 faixas de opacidade (0-5)
    const interOpacityBands = 8; // 8 faixas de opacidade (0-7)
    const invPropagationBands = 1 / (propagationOpacityBands - 1);
    const invInterBands = 1 / (interOpacityBands - 1);

    // Declare spatial grid early (will be assigned in resize)
    let spatialGrid!: SpatialGrid;

    const resize = () => {
      // Use visualViewport when available for accurate mobile viewport height
      const win = window as unknown as { visualViewport?: VisualViewport };
      const vv = win.visualViewport;
      const cssWidth =
        vv && vv.width ? Math.round(vv.width) : window.innerWidth;
      const cssHeight =
        vv && vv.height ? Math.round(vv.height) : window.innerHeight;

      const dpr = Math.max(1, window.devicePixelRatio || 1);

      // Set CSS size (what layout uses)
      canvas.style.width = cssWidth + "px";
      canvas.style.height = cssHeight + "px";

      // Set backing store size for high-DPI crispness
      canvas.width = Math.round(cssWidth * dpr);
      canvas.height = Math.round(cssHeight * dpr);

      // Ensure drawing operations use CSS pixel coordinates by applying transform
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      // Recompute responsive config and rebuild spatial grid/particles if needed
      const cfg = computeConfig(cssWidth, cssHeight);
      if (cfg) {
        spatialGrid = new SpatialGrid(gridSize, cssWidth, cssHeight);
      }
    };

    resize();
    window.addEventListener("resize", resize);

    // Initialize systems (will be assigned later after config computation)
    // spatialGrid is created in resize()/computeConfig to match CSS size
    const distanceCache = new DistanceCache();
    const connectionBatch = new ConnectionBatch();
    const opacityCache = new OpacityCache();

    const mouse = { x: -1000, y: -1000 };
    let globalOpacity = 0;
    let targetOpacity = 0;
    const opacitySpeed = 0.01; // Velocidade suave de fade
    let effectiveRadius = 0;
    let targetRadius = 0;
    const radiusSpeed = 0.005; // Velocidade de shrink/implode mais lenta

    const checkMouseInHero = (x: number, y: number) => {
      if (x === -1000 || y === -1000) return false;
      const elementUnderMouse = document.elementFromPoint(x, y);
      return elementUnderMouse?.closest(".hero") !== null;
    };

    // Compute per-viewport configuration for responsiveness
    function computeConfig(w: number, h: number) {
      const dpr =
        typeof window !== "undefined" ? window.devicePixelRatio || 1 : 1;
      const area = w * h;

      // Base particle number scaled by viewport area and devicePixelRatio
      const base = Math.max(
        60,
        Math.min(800, Math.round((area / 6000) * (dpr / 1)))
      );

      if (w <= 420) {
        particleCount = Math.max(60, Math.round(base * 0.25));
        gridSize = 36;
        maxLineLength = 60;
        propagationRadius = 28;
        maxLayers = 4;
      } else if (w <= 900) {
        particleCount = Math.max(120, Math.round(base * 0.6));
        gridSize = 44;
        maxLineLength = 80;
        propagationRadius = 34;
        maxLayers = 5;
      } else {
        particleCount = Math.max(300, Math.round(base));
        gridSize = 50;
        maxLineLength = 95;
        propagationRadius = 40;
        maxLayers = 6;
      }

      // Mouse radius proportional to the smaller viewport dimension
      mouseRadius = Math.max(200, Math.round(Math.min(w, h) * 0.55));

      // Derived squared values
      maxLineLengthSquared = maxLineLength * maxLineLength;
      propagationRadiusSquared = propagationRadius * propagationRadius;

      return {
        particleCount,
        gridSize,
        mouseRadius,
        maxLineLength,
        propagationRadius,
        maxLayers,
      };
    }

    const handleMouseMove = (e: MouseEvent) => {
      const isInHero = checkMouseInHero(e.clientX, e.clientY);
      if (isInHero) {
        mouse.x = e.clientX;
        mouse.y = e.clientY;
        opacityCache.updateMouse(mouse.x, mouse.y, mouseRadius);
        targetOpacity = 1;
        targetRadius = mouseRadius;
      } else {
        // Não setar mouse.x = -1000 imediatamente, deixar o raio controlar
        targetOpacity = 0;
        targetRadius = 0;
      }
    };

    const handleMouseLeave = () => {
      targetOpacity = 0;
      targetRadius = 0;
    };

    const handleScroll = () => {
      if (!checkMouseInHero(mouse.x, mouse.y)) {
        targetOpacity = 0;
        targetRadius = 0;
      }
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("mouseleave", handleMouseLeave, { passive: true });
    window.addEventListener("scroll", handleScroll, { passive: true });

    // Pause/resume when tab visibility changes to save resources
    const handleVisibility = (): void => {
      if (document.hidden) {
        targetOpacity = 0;
        targetRadius = 0;
      }
    };
    document.addEventListener("visibilitychange", handleVisibility, {
      passive: true,
    });

    // compute initial config and create particle set accordingly
    computeConfig(canvas.width, canvas.height);
    const particles: Particle[] = [];
    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle(canvas.width, canvas.height));
    }

    // Recreate spatial grid with configured gridSize
    spatialGrid = new SpatialGrid(gridSize, canvas.width, canvas.height);

    let animationFrameId: number;
    let frameCount = 0;

    // Performance-adaptive animation loop
    let lastFrameTime = performance.now();

    const animate = () => {
      frameCount++;

      const now = performance.now();
      const dt = now - lastFrameTime;
      lastFrameTime = now;

      // If we're running slow (dt > 40ms) and particleCount is large, gradually reduce particleCount
      if (dt > 40 && particles.length > 200) {
        const reduceBy = Math.min(20, Math.round(particles.length * 0.02));
        particles.splice(0, reduceBy);
      }

      // Update global opacity and effective radius for smooth transitions
      globalOpacity += (targetOpacity - globalOpacity) * opacitySpeed;
      effectiveRadius += (targetRadius - effectiveRadius) * radiusSpeed;

      // Stop animation when radius reaches zero
      if (effectiveRadius <= 1) {
        mouse.x = -1000;
        mouse.y = -1000;
      }

      // Clear canvas
      ctx.fillStyle = "#000000";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Update spatial grid and draw particles
      spatialGrid.clear();
      for (let i = 0; i < particles.length; i++) {
        particles[i].update(gridSize);
        particles[i].draw(ctx);
        spatialGrid.add(particles[i]);
      }

      // Clear distance cache every 120 frames to prevent memory bloat
      if (frameCount % 120 === 0) {
        distanceCache.clear();
      }

      // Find particles near mouse using spatial grid
      const mouseGridX = Math.floor(mouse.x / gridSize);
      const mouseGridY = Math.floor(mouse.y / gridSize);
      const nearbyParticles =
        mouse.x !== -1000
          ? spatialGrid.getNeighbors(mouseGridX, mouseGridY, mouseRadius)
          : [];

      // Filter particles within effective radius
      const effectiveRadiusSquared = effectiveRadius * effectiveRadius;
      const connectedParticles: Particle[] = [];
      for (const p of nearbyParticles) {
        const distSquared = distanceCache.get(mouse.x, mouse.y, p.x, p.y);
        if (distSquared < effectiveRadiusSquared) {
          p.layer = 0; // Partículas conectadas diretamente ao mouse = camada 0
          connectedParticles.push(p);
        }
      }

      if (connectedParticles.length > 0) {
        ctx.save();
        ctx.globalCompositeOperation = "lighter";
        ctx.globalAlpha = globalOpacity;

        const processedSet = new Set<Particle>(connectedParticles);

        // Função para calcular opacidade baseada na proximidade do mouse (usando cache)
        const getOpacityFromMouseDistance = (x: number, y: number): number => {
          return opacityCache.get(x, y);
        };

        // Batch mouse connections with distance-based opacity
        for (const p of connectedParticles) {
          const distSquared = distanceCache.get(mouse.x, mouse.y, p.x, p.y);
          if (distSquared > maxLineLengthSquared) continue;

          const mouseOpacity = getOpacityFromMouseDistance(p.x, p.y);

          connectionBatch.setStyle(
            0,
            `rgba(255, 30, 30, ${mouseOpacity * 0.4})`,
            2.5,
            14,
            `rgba(255, 50, 50, ${mouseOpacity * 0.6})`
          );
          connectionBatch.setStyle(
            1,
            `rgba(255, 95, 95, ${mouseOpacity * 0.8})`,
            1.0
          );
          connectionBatch.setStyle(
            2,
            `rgba(255, 255, 255, ${mouseOpacity * 0.3})`,
            0.4
          );

          connectionBatch.addLine(mouse.x, mouse.y, p.x, p.y, 0);
          connectionBatch.addLine(mouse.x, mouse.y, p.x, p.y, 1);
          connectionBatch.addLine(mouse.x, mouse.y, p.x, p.y, 2);
        }

        // Multi-layer propagation with optimized neighbor finding and opacity banding
        let currentLayer = [...connectedParticles];
        let styleOffset = 3;

        // Agrupar conexões de propagação por faixas de opacidade para otimizar performance
        const propagationLinesByOpacity: Array<
          Array<{ cp: Particle; p: Particle; layer: number }>
        > = Array.from({ length: propagationOpacityBands }, () => []);

        for (let layer = 0; layer < maxLayers; layer++) {
          const nextLayer: Particle[] = [];

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
                // Opacidade baseada na proximidade do mouse para AMBAS as partículas
                const cpOpacity = getOpacityFromMouseDistance(cp.x, cp.y);
                const pOpacity = getOpacityFromMouseDistance(p.x, p.y);
                const connectionOpacity = Math.min(cpOpacity, pOpacity); // Usa a menor opacidade

                // Mapear opacidade para banda (0-5)
                const band = Math.min(
                  propagationOpacityBands - 1,
                  Math.floor(connectionOpacity * propagationOpacityBands)
                );
                propagationLinesByOpacity[band].push({ cp, p, layer });

                p.layer = layer + 1; // Define a camada da partícula
                processedSet.add(p);
                nextLayer.push(p);
              }
            }
          }

          currentLayer = nextLayer;
          if (currentLayer.length === 0) break; // Early exit if no more propagation
        }

        // Desenhar conexões de propagação agrupadas por banda de opacidade
        for (let band = 0; band < propagationOpacityBands; band++) {
          const lines = propagationLinesByOpacity[band];
          if (lines.length === 0) continue;

          // Calcular opacidade base da banda
          const bandOpacity = band * invPropagationBands;

          // Configurar estilos para esta banda
          connectionBatch.setStyle(
            styleOffset,
            `rgba(255, 30, 30, ${bandOpacity * 0.4})`,
            3.5,
            8,
            `rgba(255, 50, 50, ${bandOpacity})`
          );
          connectionBatch.setStyle(
            styleOffset + 1,
            `rgba(255, 95, 95, ${bandOpacity * 0.9})`,
            1.5
          );
          connectionBatch.setStyle(
            styleOffset + 2,
            `rgba(255, 255, 255, ${bandOpacity * 0.25})`,
            0.6
          );

          // Adicionar todas as linhas desta banda
          for (const line of lines) {
            connectionBatch.addLine(
              line.cp.x,
              line.cp.y,
              line.p.x,
              line.p.y,
              styleOffset
            );
            connectionBatch.addLine(
              line.cp.x,
              line.cp.y,
              line.p.x,
              line.p.y,
              styleOffset + 1
            );
            connectionBatch.addLine(
              line.cp.x,
              line.cp.y,
              line.p.x,
              line.p.y,
              styleOffset + 2
            );
          }

          styleOffset += 3; // Próxima banda
        }

        // Batch inter-connections between processed particles
        const processedArray = Array.from(processedSet);
        const processedIndexMap = new Map<Particle, number>();
        processedArray.forEach((p, index) => processedIndexMap.set(p, index));

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
            // Avoid duplicate connections by comparing indices - O(1) lookup now
            const p2Index = processedIndexMap.get(p2)!;
            if (p2Index <= i) continue;

            const distSquared = distanceCache.get(p1.x, p1.y, p2.x, p2.y);
            if (distSquared < maxLineLengthSquared) {
              interLines.push({ p1, p2 });
            }
          }
        }

        // Batch inter-connection drawing with optimized distance-based opacity
        if (interLines.length > 0) {
          // Agrupar por faixas de opacidade para otimizar performance
          const linesByOpacity: Array<Array<{ p1: Particle; p2: Particle }>> =
            Array.from({ length: interOpacityBands }, () => []);

          for (const line of interLines) {
            const p1Opacity = getOpacityFromMouseDistance(line.p1.x, line.p1.y);
            const p2Opacity = getOpacityFromMouseDistance(line.p2.x, line.p2.y);
            const interOpacity = Math.min(p1Opacity, p2Opacity) * 0.7;
            // Mapear opacidade para banda (0-7)
            const band = Math.min(
              interOpacityBands - 1,
              Math.floor(interOpacity * interOpacityBands)
            );
            linesByOpacity[band].push(line);
          }

          // Desenhar cada banda com sua opacidade específica
          for (let band = 0; band < interOpacityBands; band++) {
            const lines = linesByOpacity[band];
            if (lines.length === 0) continue;

            // Calcular opacidade base da banda
            const bandOpacity = band * invInterBands * 0.7;

            connectionBatch.setStyle(
              styleOffset,
              `rgba(255, 30, 30, ${bandOpacity * 0.5})`,
              4.5,
              10,
              `rgba(255, 30, 30, ${bandOpacity})`
            );
            connectionBatch.setStyle(
              styleOffset + 1,
              `rgba(255, 95, 95, ${Math.min(1, bandOpacity * 1.1)})`,
              2.0
            );
            connectionBatch.setStyle(
              styleOffset + 2,
              `rgba(255, 255, 255, ${bandOpacity * 0.35})`,
              0.8
            );

            for (const line of lines) {
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

            styleOffset += 3; // Próxima banda
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
      window.removeEventListener("scroll", handleScroll);
      document.removeEventListener("visibilitychange", handleVisibility);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div
      className="canvas"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        zIndex: -1,
        pointerEvents: "none",
      }}
    >
      <canvas ref={canvasRef} className="connecting-dots" />
    </div>
  );
};

export default AnimatedBackground;
