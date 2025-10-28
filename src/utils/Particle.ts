export class Particle {
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
  layer: number; // Camada de propagação (0 = mouse, 1+ = propagação)

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
    this.layer = 0; // Inicialmente na camada 0
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
