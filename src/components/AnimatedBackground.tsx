import React, { useEffect, useRef, useState } from "react";
import { Particle } from "../utils/Particle";

// --- Otimizações de Performance ---
// As classes abaixo são otimizações de baixo nível para garantir que a animação
// rode de forma fluida, mesmo com centenas de partículas e interações.

/**
 * @class SpatialGrid
 * @description Uma estrutura de dados para encontrar partículas vizinhas de forma eficiente.
 * Em vez de verificar a distância contra todas as outras partículas (complexidade O(n²)),
 * o espaço é dividido em uma grade. Para encontrar vizinhos, só precisamos verificar
 * as células da grade ao redor da partícula, resultando em uma complexidade próxima a O(n).
 */
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
    for (let x = 0; x < this.gridWidth; x++) {
      const row = this.grid[x];
      for (let y = 0; y < this.gridHeight; y++) {
        row[y].length = 0;
      }
    }
  }

  add(particle: Particle) {
    const x = (particle.gridX | 0) & 0x7fff;
    const y = (particle.gridY | 0) & 0x7fff;

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

/**
 * @class ConnectionBatch
 * @description Agrupa operações de desenho do canvas. Em vez de chamar `ctx.stroke()` para
 * cada linha, agrupamos todas as linhas com o mesmo estilo em um `Path2D` e as
 * desenhamos de uma só vez. Isso reduz drasticamente o número de chamadas à API do canvas.
 */
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

/**
 * @class DistanceCache
 * @description Memoriza os cálculos de distância (ao quadrado) entre partículas.
 * Como as posições das partículas mudam a cada frame, o cache é limpo periodicamente
 * para evitar o uso de dados obsoletos.
 */
class DistanceCache {
  cache: Map<number, number> = new Map();
  maxSize = 10000;

  private hash(x1: number, y1: number, x2: number, y2: number): number {
    const rx1 = Math.round(x1) & 0xffff;
    const ry1 = Math.round(y1) & 0xffff;
    const rx2 = Math.round(x2) & 0xffff;
    const ry2 = Math.round(y2) & 0xffff;

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

/**
 * @class OpacityCache
 * @description Otimização crucial para o cálculo de opacidade. Em vez de usar `Math.sqrt`
 * (uma operação cara) a cada frame para cada partícula, calculamos a opacidade
 * com base na distância ao quadrado, usando uma aproximação linear.
 */
class OpacityCache {
  cache: Map<string, number> = new Map();
  maxSize = 2000;
  mouseX = 0;
  mouseY = 0;
  mouseRadius = 800;
  mouseRadiusSq = 800 * 800; // Pre-computado raio ao quadrado

  updateMouse(mouseX: number, mouseY: number, mouseRadius: number) {
    if (
      Math.abs(this.mouseX - mouseX) > 10 ||
      Math.abs(this.mouseY - mouseY) > 10 ||
      this.mouseRadius !== mouseRadius
    ) {
      this.cache.clear();
      this.mouseX = mouseX;
      this.mouseY = mouseY;
      this.mouseRadius = mouseRadius;
      this.mouseRadiusSq = mouseRadius * mouseRadius; // Atualiza raio ao quadrado
    }
  }

  // Esta versão usa uma queda linear com base na distância ao quadrado para evitar Math.sqrt
  get(x: number, y: number): number {
    const key = `${Math.round(x)},${Math.round(y)}`;
    let opacity = this.cache.get(key);
    if (opacity === undefined) {
      const dx = x - this.mouseX;
      const dy = y - this.mouseY;
      const distSq = dx * dx + dy * dy;

      if (distSq >= this.mouseRadiusSq) {
        opacity = 0.05;
      } else {
        opacity = Math.max(0.05, 1 - distSq / this.mouseRadiusSq);
      }

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

// --- Componente React ---

interface DebugInfo {
  particleCount: number;
  mouseRadius: number;
}

const AnimatedBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [debugInfo, setDebugInfo] = useState<DebugInfo | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: false });
    if (!ctx) return;

    // --- Variáveis de Estado da Animação ---
    let animationFrameId: number;
    const particles: Particle[] = [];
    let frameCount = 0;
    let globalOpacity = 0;
    let targetOpacity = 0;
    const opacitySpeed = 0.01;
    let effectiveRadius = 0;
    let targetRadius = 0;
    const radiusSpeed = 0.005;
    let isVisible = true;

    const mouse = { x: -1000, y: -1000, radius: 800 };

    // --- Parâmetros de Configuração ---
    let gridSize: number,
      mouseRadius: number,
      maxLineLength: number,
      maxLineLengthSquared: number,
      propagationRadius: number,
      propagationRadiusSquared: number,
      maxLayers: number;

    // Constantes pré-calculadas para otimizar o loop de renderização.
    const propagationOpacityBands = 6;
    const interOpacityBands = 8;
    const invPropagationBands = 1 / (propagationOpacityBands - 1);
    const invInterBands = 1 / (interOpacityBands - 1);

    // --- Sistemas de Otimização ---
    let spatialGrid: SpatialGrid;
    const connectionBatch = new ConnectionBatch();
    const distanceCache = new DistanceCache();
    const opacityCache = new OpacityCache();

    /**
     * @function computeConfig
     * @description Calcula os parâmetros da animação com base no tamanho da tela.
     * Para telas maiores, usa valores fixos. Para telas menores, calcula dinamicamente
     * para garantir boa performance em dispositivos móveis.
     */
    const computeConfig = (w: number, h: number) => {
      const area = w * h;
      const isMobile = w < 768;
      let newParticleCount: number;

      if (isMobile) {
        const dpr = window.devicePixelRatio || 1;
        const base = Math.max(
          60,
          Math.min(800, Math.round((area / 6000) * (dpr / 1)))
        );
        newParticleCount = Math.max(60, Math.round(base * 0.25));
        gridSize = 36;
        maxLineLength = 60;
        propagationRadius = 28;
        maxLayers = 4;
        mouseRadius = Math.max(200, Math.round(Math.min(w, h) * 0.55));
      } else {
        newParticleCount = 400;
        gridSize = 100;
        mouseRadius = 800;
        maxLineLength = 95;
        propagationRadius = 40;
        maxLayers = 30;
      }

      maxLineLengthSquared = maxLineLength * maxLineLength;
      propagationRadiusSquared = propagationRadius * propagationRadius;
      mouse.radius = mouseRadius;

      return { newParticleCount };
    };

    /**
     * @function handleResize
     * @description Lida com o redimensionamento da janela. Ajusta o tamanho do canvas,
     * recalcula a configuração e gerencia o "pool" de partículas.
     */
    const handleResize = () => {
      const win = window as unknown as { visualViewport?: VisualViewport };
      const vv = win.visualViewport;
      const cssWidth = vv?.width ? Math.round(vv.width) : window.innerWidth;
      const cssHeight = vv?.height ? Math.round(vv.height) : window.innerHeight;
      const dpr = Math.max(1, window.devicePixelRatio || 1);

      canvas.style.width = `${cssWidth}px`;
      canvas.style.height = `${cssHeight}px`;
      canvas.width = Math.round(cssWidth * dpr);
      canvas.height = Math.round(cssHeight * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const { newParticleCount } = computeConfig(cssWidth, cssHeight);

      // --- Lógica de Pooling de Partículas ---
      // Em vez de recriar o array de partículas a cada redimensionamento (o que causa
      // "engasgos" na animação), reutilizamos as partículas existentes, adicionando
      // ou removendo apenas a diferença. Isso é muito mais eficiente.
      const diff = newParticleCount - particles.length;
      if (diff > 0) {
        for (let i = 0; i < diff; i++) {
          particles.push(new Particle(cssWidth, cssHeight));
        }
      } else {
        particles.length = newParticleCount;
      }
      // A classe Particle já armazena as dimensões no construtor.
      // A recriação de partículas no 'if (diff > 0)' garante que as novas partículas
      // tenham as dimensões corretas. Não é necessário atualizar as existentes.

      spatialGrid = new SpatialGrid(gridSize, cssWidth, cssHeight);
    };

    // --- Handlers de Eventos ---
    const checkMouseInHero = (x: number, y: number) => {
      if (x === -1000 || y === -1000) return false;
      const elementUnderMouse = document.elementFromPoint(x, y);
      return elementUnderMouse?.closest(".hero") !== null;
    };

    const handleMouseMove = (e: MouseEvent) => {
      const isInHero = checkMouseInHero(e.clientX, e.clientY);
      if (isInHero) {
        mouse.x = e.clientX;
        mouse.y = e.clientY;
        targetOpacity = 1;
        targetRadius = mouse.radius;
      } else {
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

    const handleVisibility = (): void => {
      isVisible = document.visibilityState === "visible";
      if (isVisible) {
        lastFrameTime = performance.now();
        animationFrameId = requestAnimationFrame(animate);
      } else {
        cancelAnimationFrame(animationFrameId);
      }
    };

    // --- Inicialização ---
    handleResize();
    window.addEventListener("resize", handleResize);
    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("mouseleave", handleMouseLeave, { passive: true });
    window.addEventListener("scroll", handleScroll, { passive: true });
    document.addEventListener("visibilitychange", handleVisibility, {
      passive: true,
    });

    let lastFrameTime = performance.now();
    let lastDebugUpdateTime = 0;
    const debugUpdateInterval = 250;

    /**
     * @function animate
     * @description O coração da animação. Este loop é executado a cada frame.
     */
    const animate = () => {
      if (!isVisible) return;
      animationFrameId = requestAnimationFrame(animate);
      frameCount++;

      const now = performance.now();
      const dt = now - lastFrameTime;
      lastFrameTime = now;

      // Otimização adaptativa: se a animação estiver lenta (frame > 40ms),
      // reduz gradualmente o número de partículas para melhorar a performance.
      if (dt > 40 && particles.length > 200) {
        const reduceBy = Math.min(20, Math.round(particles.length * 0.02));
        particles.splice(0, reduceBy);
      }

      // Interpolação linear para suavizar a aparição/desaparição do efeito.
      globalOpacity += (targetOpacity - globalOpacity) * opacitySpeed;
      effectiveRadius += (targetRadius - effectiveRadius) * radiusSpeed;

      if (effectiveRadius <= 1) {
        mouse.x = -1000;
        mouse.y = -1000;
      } else {
        opacityCache.updateMouse(mouse.x, mouse.y, mouse.radius);
      }

      ctx.fillStyle = "#000000";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Atualiza e desenha cada partícula, e as adiciona à grade espacial.
      spatialGrid.clear();
      for (let i = 0; i < particles.length; i++) {
        particles[i].update(gridSize);
        particles[i].draw(ctx);
        spatialGrid.add(particles[i]);
      }

      // Limpa o cache de distância periodicamente.
      if (frameCount % 120 === 0) {
        distanceCache.clear();
      }

      // Encontra partículas próximas ao mouse usando a grade espacial.
      const mouseGridX = Math.floor(mouse.x / gridSize);
      const mouseGridY = Math.floor(mouse.y / gridSize);
      const nearbyParticles =
        mouse.x !== -1000
          ? spatialGrid.getNeighbors(mouseGridX, mouseGridY, mouse.radius)
          : [];

      // Filtra as partículas que estão realmente dentro do raio de efeito.
      const effectiveRadiusSquared = effectiveRadius * effectiveRadius;
      const connectedParticles: Particle[] = [];
      for (const p of nearbyParticles) {
        const distSquared = distanceCache.get(mouse.x, mouse.y, p.x, p.y);
        if (distSquared < effectiveRadiusSquared) {
          p.layer = 0;
          connectedParticles.push(p);
        }
      }

      if (connectedParticles.length > 0) {
        ctx.save();
        ctx.globalCompositeOperation = "lighter"; // Efeito de brilho nas sobreposições.
        ctx.globalAlpha = globalOpacity;

        const processedSet = new Set<Particle>(connectedParticles);

        const getOpacityFromMouseDistance = (x: number, y: number): number => {
          return opacityCache.get(x, y);
        };

        // --- Renderização das Conexões ---
        // O código abaixo agrupa as linhas por estilo e as desenha em lotes (batching)
        // para otimizar a performance.

        // 1. Conexões diretas com o mouse.
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

        // 2. Conexões propagadas em camadas.
        let currentLayer = [...connectedParticles];
        let styleOffset = 3;

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
                const cpOpacity = getOpacityFromMouseDistance(cp.x, cp.y);
                const pOpacity = getOpacityFromMouseDistance(p.x, p.y);
                const connectionOpacity = Math.min(cpOpacity, pOpacity);

                const band = Math.min(
                  propagationOpacityBands - 1,
                  Math.floor(connectionOpacity * propagationOpacityBands)
                );
                propagationLinesByOpacity[band].push({ cp, p, layer });

                p.layer = layer + 1;
                processedSet.add(p);
                nextLayer.push(p);
              }
            }
          }

          currentLayer = nextLayer;
          if (currentLayer.length === 0) break;
        }

        for (let band = 0; band < propagationOpacityBands; band++) {
          const lines = propagationLinesByOpacity[band];
          if (lines.length === 0) continue;

          const bandOpacity = band * invPropagationBands;

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

          styleOffset += 3;
        }

        const processedArray = Array.from(processedSet);
        const processedIndexMap = new Map<Particle, number>();
        processedArray.forEach((p, index) => processedIndexMap.set(p, index));

        // 3. Conexões entre partículas (inter-conexões).
        const interLines: Array<{ p1: Particle; p2: Particle }> = [];

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
            const p2Index = processedIndexMap.get(p2)!;
            if (p2Index <= i) continue;

            const distSquared = distanceCache.get(p1.x, p1.y, p2.x, p2.y);
            if (distSquared < maxLineLengthSquared) {
              interLines.push({ p1, p2 });
            }
          }
        }

        if (interLines.length > 0) {
          const linesByOpacity: Array<Array<{ p1: Particle; p2: Particle }>> =
            Array.from({ length: interOpacityBands }, () => []);

          for (const line of interLines) {
            const p1Opacity = getOpacityFromMouseDistance(line.p1.x, line.p1.y);
            const p2Opacity = getOpacityFromMouseDistance(line.p2.x, line.p2.y);
            const interOpacity = Math.min(p1Opacity, p2Opacity) * 0.7;
            const band = Math.min(
              interOpacityBands - 1,
              Math.floor(interOpacity * interOpacityBands)
            );
            linesByOpacity[band].push(line);
          }

          for (let band = 0; band < interOpacityBands; band++) {
            const lines = linesByOpacity[band];
            if (lines.length === 0) continue;

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

            styleOffset += 3;
          }
        }

        connectionBatch.draw(ctx);
        ctx.restore();
      }

      // Atualiza as informações de debug em intervalos para não impactar a performance.
      if (
        process.env.NODE_ENV === "development" &&
        now - lastDebugUpdateTime > debugUpdateInterval
      ) {
        setDebugInfo({
          particleCount: particles.length,
          mouseRadius: mouse.radius,
        });
        lastDebugUpdateTime = now;
      }
    };

    animate();

    // --- Limpeza ---
    // É crucial remover os event listeners quando o componente é desmontado
    // para evitar vazamentos de memória.
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseleave", handleMouseLeave);
      window.removeEventListener("scroll", handleScroll);
      document.removeEventListener("visibilitychange", handleVisibility);
    };
  }, []);

  return (
    <>
      {/* O painel de debug só é renderizado em ambiente de desenvolvimento. */}
      {process.env.NODE_ENV === "development" && debugInfo && (
        <div
          style={{
            position: "fixed",
            top: "10px",
            left: "10px",
            backgroundColor: "rgba(0, 0, 0, 0.7)",
            color: "#64ffda",
            padding: "8px 12px",
            borderRadius: "4px",
            fontFamily: "monospace",
            fontSize: "14px",
            zIndex: 9999,
            border: "1px solid #64ffda",
          }}
        >
          <p style={{ margin: 0 }}>Particles: {debugInfo.particleCount}</p>
          <p style={{ margin: 0 }}>
            Mouse Radius: {debugInfo.mouseRadius.toFixed(2)}
          </p>
        </div>
      )}
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
    </>
  );
};

export default AnimatedBackground;