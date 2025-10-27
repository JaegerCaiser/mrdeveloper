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

    const mouse = { x: -1000, y: -1000, radius: 200, radiusSquared: 40000 };

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

    const particleCount = 150;
    const particles: Particle[] = [];
    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle(canvas.width, canvas.height));
    }

    let animationFrameId: number;
    let heroRect: DOMRect | null = null;
    let heroRectUpdateCounter = 0;

    const animate = () => {
      ctx.fillStyle = "#000000";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      for (let i = 0; i < particleCount; i++) {
        particles[i].update();
        particles[i].draw(ctx);
      }

      if (heroRectUpdateCounter++ % 60 === 0) {
        const heroEl = document.getElementById("hero");
        heroRect = heroEl?.getBoundingClientRect() || null;
      }

      const isMouseInHero =
        !!heroRect &&
        mouse.x >= heroRect.left &&
        mouse.x <= heroRect.right &&
        mouse.y >= heroRect.top &&
        mouse.y <= heroRect.bottom;

      if (isMouseInHero) {
        const connectedParticles: Particle[] = [];
        const propagationRadius = 250;
        const propagationRadiusSquared = 62500;

        for (let i = 0; i < particleCount; i++) {
          const p = particles[i];
          const dx = mouse.x - p.x;
          const dy = mouse.y - p.y;
          const distSquared = dx * dx + dy * dy;
          if (distSquared < mouse.radiusSquared) {
            connectedParticles.push(p);
          }
        }

        if (connectedParticles.length > 0) {
          const processedSet = new Set<Particle>();
          ctx.save();
          ctx.globalCompositeOperation = "lighter";

          for (let i = 0; i < connectedParticles.length; i++) {
            const p = connectedParticles[i];
            if (processedSet.has(p) || !p.flickerState) continue;

            const flickerGroup: Particle[] = [p];
            processedSet.add(p);

            for (
              let j = i + 1;
              j < connectedParticles.length && flickerGroup.length < 5;
              j++
            ) {
              const other = connectedParticles[j];
              if (processedSet.has(other)) continue;
              const dx = p.x - other.x;
              const dy = p.y - other.y;
              if (dx * dx + dy * dy < 14400) {
                flickerGroup.push(other);
                processedSet.add(other);
              }
            }

            for (let k = 0; k < flickerGroup.length; k++) {
              const gp = flickerGroup[k];
              if (!gp.flickerState) continue;

              const dx = mouse.x - gp.x;
              const dy = mouse.y - gp.y;
              const distance = Math.sqrt(dx * dx + dy * dy);
              const fadeProgress = Math.min(1, gp.flickerTimer * 0.1);
              const opacity =
                (1 - distance / mouse.radius) * 0.6 * fadeProgress;

              ctx.shadowColor = `rgba(255, 50, 50, ${opacity})`;
              ctx.shadowBlur = 14;
              ctx.strokeStyle = `rgba(255, 30, 30, ${opacity * 0.55})`;
              ctx.lineWidth = 3.5;
              ctx.beginPath();
              ctx.moveTo(mouse.x, mouse.y);
              ctx.lineTo(gp.x, gp.y);
              ctx.stroke();

              ctx.shadowBlur = 0;
              ctx.strokeStyle = `rgba(255, 95, 95, ${Math.min(
                1,
                opacity * 1.1
              )})`;
              ctx.lineWidth = 1.5;
              ctx.beginPath();
              ctx.moveTo(mouse.x, mouse.y);
              ctx.lineTo(gp.x, gp.y);
              ctx.stroke();

              ctx.strokeStyle = `rgba(255, 255, 255, ${opacity * 0.35})`;
              ctx.lineWidth = 0.6;
              ctx.beginPath();
              ctx.moveTo(mouse.x, mouse.y);
              ctx.lineTo(gp.x, gp.y);
              ctx.stroke();
            }
          }

          for (let i = 0; i < connectedParticles.length; i++) {
            const cp = connectedParticles[i];
            for (let j = 0; j < particleCount; j++) {
              const p = particles[j];
              if (!p.flickerState) continue;
              let isConnected = false;
              for (let k = 0; k < connectedParticles.length; k++) {
                if (connectedParticles[k] === p) {
                  isConnected = true;
                  break;
                }
              }
              if (isConnected) continue;

              const dx = cp.x - p.x;
              const dy = cp.y - p.y;
              const distSquared = dx * dx + dy * dy;

              if (distSquared < propagationRadiusSquared) {
                const distance = Math.sqrt(distSquared);
                const fadeProgress = Math.min(1, p.flickerTimer * 0.1);
                const opacity =
                  (1 - distance / propagationRadius) * 0.4 * fadeProgress;

                ctx.shadowColor = `rgba(255, 50, 50, ${opacity})`;
                ctx.shadowBlur = 8;
                ctx.strokeStyle = `rgba(255, 30, 30, ${opacity * 0.4})`;
                ctx.lineWidth = 2.25;
                ctx.beginPath();
                ctx.moveTo(cp.x, cp.y);
                ctx.lineTo(p.x, p.y);
                ctx.stroke();

                ctx.shadowBlur = 0;
                ctx.strokeStyle = `rgba(255, 95, 95, ${opacity * 0.9})`;
                ctx.lineWidth = 0.9;
                ctx.beginPath();
                ctx.moveTo(cp.x, cp.y);
                ctx.lineTo(p.x, p.y);
                ctx.stroke();

                ctx.strokeStyle = `rgba(255, 255, 255, ${opacity * 0.25})`;
                ctx.lineWidth = 0.5;
                ctx.beginPath();
                ctx.moveTo(cp.x, cp.y);
                ctx.lineTo(p.x, p.y);
                ctx.stroke();
              }
            }
          }

          ctx.restore();
        }
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
