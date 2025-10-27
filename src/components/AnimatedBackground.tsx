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
  }

  update() {
    this.x += this.vx;
    this.y += this.vy;
    if (this.x < 0) this.x = this.canvasWidth;
    else if (this.x > this.canvasWidth) this.x = 0;
    if (this.y < 0) this.y = this.canvasHeight;
    else if (this.y > this.canvasHeight) this.y = 0;
    this.flickerTimer++;
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.fillStyle = this.fillStyle;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fill();
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

    const mouse = { x: -1000, y: -1000, radius: 300, radiusSquared: 90000 };

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

    const particleCount = 500;
    const particles: Particle[] = [];
    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle(canvas.width, canvas.height));
    }

    let animationFrameId: number;

    const animate = () => {
      ctx.fillStyle = "#000000";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Configurable parameters
      const maxLineLengthSquared = 75 ** 2; // 75px max line length
      const propagationRadiusSquared = 10 ** 2; // 10px propagation radius
      const maxLayers = 6; // Number of propagation layers

      for (let i = 0; i < particleCount; i++) {
        particles[i].update();
        particles[i].draw(ctx);
      }

      // Always check for connections, regardless of hero section
      const connectedParticles: Particle[] = [];

      for (let i = 0; i < particleCount; i++) {
        const p = particles[i];
        const dx = mouse.x - p.x;
        const dy = mouse.y - p.y;
        const distSquared = dx * dx + dy * dy;
        if (distSquared < mouse.radiusSquared) {
          connectedParticles.push(p);
        }
      }

      const processedParticles: Particle[] = [...connectedParticles];

      if (connectedParticles.length > 0) {
        ctx.save();
        ctx.globalCompositeOperation = "lighter";

        // Use Set for O(1) processed particles lookup
        const processedSet = new Set<Particle>(connectedParticles);

        // Draw connections from mouse to all particles within radius
        for (let i = 0; i < connectedParticles.length; i++) {
          const p = connectedParticles[i];
          const dx = mouse.x - p.x;
          const dy = mouse.y - p.y;
          const distSquared = dx * dx + dy * dy;
          if (distSquared > maxLineLengthSquared) continue; // Max line length

          const opacity = 0.6;

          ctx.shadowColor = `rgba(255, 50, 50, ${opacity})`;
          ctx.shadowBlur = 14;
          ctx.strokeStyle = `rgba(255, 30, 30, ${opacity * 0.55})`;
          ctx.lineWidth = 2.5;
          ctx.beginPath();
          ctx.moveTo(mouse.x, mouse.y);
          ctx.lineTo(p.x, p.y);
          ctx.stroke();

          ctx.shadowBlur = 0;
          ctx.strokeStyle = `rgba(255, 95, 95, ${Math.min(1, opacity * 1.1)})`;
          ctx.lineWidth = 1.0;
          ctx.beginPath();
          ctx.moveTo(mouse.x, mouse.y);
          ctx.lineTo(p.x, p.y);
          ctx.stroke();

          ctx.strokeStyle = `rgba(255, 255, 255, ${opacity * 0.35})`;
          ctx.lineWidth = 0.4;
          ctx.beginPath();
          ctx.moveTo(mouse.x, mouse.y);
          ctx.lineTo(p.x, p.y);
          ctx.stroke();
        }

        // Multi-layer propagation connections
        const processedParticles: Particle[] = [...connectedParticles];
        let currentLayer = [...connectedParticles];

        for (let layer = 0; layer < maxLayers; layer++) {
          const nextLayer: Particle[] = [];
          const layerOpacity = 0.4; // Constant opacity for all layers

          for (const cp of currentLayer) {
            for (let j = 0; j < particleCount; j++) {
              const p = particles[j];
              if (processedSet.has(p)) continue;

              const dx = cp.x - p.x;
              const dy = cp.y - p.y;
              const distSquared = dx * dx + dy * dy;

              if (distSquared < propagationRadiusSquared) {
                const opacity = layerOpacity;

                ctx.shadowColor = `rgba(255, 50, 50, ${opacity})`;
                ctx.shadowBlur = 8;
                ctx.strokeStyle = `rgba(255, 30, 30, ${opacity * 0.4})`;
                ctx.lineWidth = 3.5;
                ctx.beginPath();
                ctx.moveTo(cp.x, cp.y);
                ctx.lineTo(p.x, p.y);
                ctx.stroke();

                ctx.shadowBlur = 0;
                ctx.strokeStyle = `rgba(255, 95, 95, ${opacity * 0.9})`;
                ctx.lineWidth = 1.5;
                ctx.beginPath();
                ctx.moveTo(cp.x, cp.y);
                ctx.lineTo(p.x, p.y);
                ctx.stroke();

                ctx.strokeStyle = `rgba(255, 255, 255, ${opacity * 0.25})`;
                ctx.lineWidth = 0.6;
                ctx.beginPath();
                ctx.moveTo(cp.x, cp.y);
                ctx.lineTo(p.x, p.y);
                ctx.stroke();

                processedSet.add(p);
                nextLayer.push(p);
              }
            }
          }
          currentLayer = nextLayer;
        }

        // Batch inter-connections between all processed particles
        const processedArray = Array.from(processedSet);
        const interLines: Array<{ p1: Particle; p2: Particle }> = [];

        for (let i = 0; i < processedArray.length; i++) {
          const p1 = processedArray[i];
          for (let j = i + 1; j < processedArray.length; j++) {
            const p2 = processedArray[j];
            const dx = p1.x - p2.x;
            const dy = p1.y - p2.y;
            if (dx * dx + dy * dy < maxLineLengthSquared) {
              interLines.push({ p1, p2 });
            }
          }
        }

        // Draw batched inter-connections
        if (interLines.length > 0) {
          const opacity = 0.5;

          // First pass: shadow
          ctx.shadowBlur = 10;
          ctx.strokeStyle = `rgba(255, 30, 30, ${opacity * 0.5})`;
          ctx.lineWidth = 4.5;
          ctx.beginPath();
          for (const line of interLines) {
            ctx.moveTo(line.p1.x, line.p1.y);
            ctx.lineTo(line.p2.x, line.p2.y);
          }
          ctx.stroke();

          // Second pass: main
          ctx.shadowBlur = 0;
          ctx.strokeStyle = `rgba(255, 95, 95, ${Math.min(1, opacity * 1.1)})`;
          ctx.lineWidth = 2.0;
          ctx.beginPath();
          for (const line of interLines) {
            ctx.moveTo(line.p1.x, line.p1.y);
            ctx.lineTo(line.p2.x, line.p2.y);
          }
          ctx.stroke();

          // Third pass: highlight
          ctx.strokeStyle = `rgba(255, 255, 255, ${opacity * 0.35})`;
          ctx.lineWidth = 0.8;
          ctx.beginPath();
          for (const line of interLines) {
            ctx.moveTo(line.p1.x, line.p1.y);
            ctx.lineTo(line.p2.x, line.p2.y);
          }
          ctx.stroke();
        }

        ctx.restore();
      }

      // Draw inter-connections between particles near the mouse
      if (mouse.x !== -1000) {
        ctx.save();
        ctx.globalCompositeOperation = "lighter";

        for (let i = 0; i < particleCount; i++) {
          const p1 = particles[i];
          const dx1 = mouse.x - p1.x;
          const dy1 = mouse.y - p1.y;
          if (dx1 * dx1 + dy1 * dy1 > 90000) continue; // 300px from mouse

          for (let j = i + 1; j < particleCount; j++) {
            const p2 = particles[j];
            const dx2 = mouse.x - p2.x;
            const dy2 = mouse.y - p2.y;
            if (dx2 * dx2 + dy2 * dy2 > 90000) continue; // 300px from mouse

            const dx = p1.x - p2.x;
            const dy = p1.y - p2.y;
            const distSquared = dx * dx + dy * dy;
            if (distSquared < maxLineLengthSquared) {
              // Skip if both particles are already in the processed network
              if (
                connectedParticles.length > 0 &&
                processedParticles.includes(p1) &&
                processedParticles.includes(p2)
              )
                continue;

              const opacity = 0.5;

              ctx.shadowBlur = 10;
              ctx.strokeStyle = `rgba(255, 30, 30, ${opacity * 0.5})`;
              ctx.lineWidth = 2.5;
              ctx.beginPath();
              ctx.moveTo(p1.x, p1.y);
              ctx.lineTo(p2.x, p2.y);
              ctx.stroke();

              ctx.shadowBlur = 0;
              ctx.strokeStyle = `rgba(255, 95, 95, ${Math.min(
                1,
                opacity * 1.1
              )})`;
              ctx.lineWidth = 1.0;
              ctx.beginPath();
              ctx.moveTo(p1.x, p1.y);
              ctx.lineTo(p2.x, p2.y);
              ctx.stroke();

              ctx.strokeStyle = `rgba(255, 255, 255, ${opacity * 0.35})`;
              ctx.lineWidth = 0.4;
              ctx.beginPath();
              ctx.moveTo(p1.x, p1.y);
              ctx.lineTo(p2.x, p2.y);
              ctx.stroke();
            }
          }
        }

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
