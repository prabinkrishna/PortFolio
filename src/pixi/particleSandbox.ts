import { Application, Graphics } from 'pixi.js';

interface SandboxParticle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  color: number;
  radius: number;
  mass: number;
}

interface Attractor {
  x: number;
  y: number;
  strength: number; // positive = attract, negative = repel
  color: number;
  radius: number;
}

export type ColorTheme = 'cyberpunk' | 'solar' | 'ocean' | 'matrix';

const THEME_PALETTES: Record<ColorTheme, number[]> = {
  cyberpunk: [0x00f0ff, 0x8a2be2, 0xff007f, 0xffd700, 0x00ffcc],
  solar: [0xff4500, 0xff8c00, 0xffd700, 0xef4444, 0xffe066],
  ocean: [0x00d2ff, 0x3a7bd5, 0x00f2fe, 0x4facfe, 0x00c6ff],
  matrix: [0x10b981, 0x059669, 0x34d399, 0xa7f3d0, 0x00ff88],
};

export class ParticleSandbox {
  private app: Application | null = null;
  private containerElement: HTMLElement;
  private isDestroyed = false;

  private particleGraphics = new Graphics();
  private attractorGraphics = new Graphics();

  private particles: SandboxParticle[] = [];
  private attractors: Attractor[] = [];

  public particleCount = 450;
  public gravityStrength = 1.8;
  public damping = 0.985;
  public currentTheme: ColorTheme = 'cyberpunk';

  private width = 640;
  private height = 400;

  constructor(containerElement: HTMLElement) {
    this.containerElement = containerElement;
  }

  public async init(): Promise<void> {
    this.app = new Application();

    const rect = this.containerElement.getBoundingClientRect();
    this.width = Math.max(rect.width || 640, 600);
    this.height = 400;

    await this.app.init({
      width: this.width,
      height: this.height,
      backgroundAlpha: 0,
      antialias: true,
      resolution: Math.min(window.devicePixelRatio || 1, 2),
      autoDensity: true,
    });

    if (this.isDestroyed) {
      this.app.destroy(true);
      return;
    }

    this.containerElement.appendChild(this.app.canvas);

    this.app.stage.addChild(this.attractorGraphics);
    this.app.stage.addChild(this.particleGraphics);

    this.resetParticles();
    this.bindEvents();

    this.app.ticker.add((ticker) => {
      if (this.isDestroyed) return;
      this.update(ticker.deltaTime);
    });
  }

  public resetParticles() {
    this.particles = [];
    const colors = THEME_PALETTES[this.currentTheme];

    for (let i = 0; i < this.particleCount; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = Math.random() * 2;
      this.particles.push({
        x: Math.random() * this.width,
        y: Math.random() * this.height,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        color: colors[Math.floor(Math.random() * colors.length)],
        radius: Math.random() * 2 + 1,
        mass: Math.random() * 1.5 + 0.5,
      });
    }

    // Default center attractor
    this.attractors = [
      {
        x: this.width / 2,
        y: this.height / 2,
        strength: 2.2,
        color: 0x00f0ff,
        radius: 12,
      },
    ];
  }

  public setTheme(theme: ColorTheme) {
    this.currentTheme = theme;
    const colors = THEME_PALETTES[theme];
    for (const p of this.particles) {
      p.color = colors[Math.floor(Math.random() * colors.length)];
    }
  }

  public addAttractor(x: number, y: number, strength = 2.0) {
    const colors = THEME_PALETTES[this.currentTheme];
    const color = colors[Math.floor(Math.random() * colors.length)];
    this.attractors.push({
      x,
      y,
      strength,
      color,
      radius: 10,
    });
    if (this.attractors.length > 5) {
      this.attractors.shift();
    }
  }

  public triggerShockwave(x: number, y: number) {
    for (const p of this.particles) {
      const dx = p.x - x;
      const dy = p.y - y;
      const dist = Math.hypot(dx, dy) || 1;
      if (dist < 200) {
        const force = (1 - dist / 200) * 12;
        p.vx += (dx / dist) * force;
        p.vy += (dy / dist) * force;
      }
    }
  }

  private bindEvents() {
    const handleClick = (e: MouseEvent) => {
      const rect = this.containerElement.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      if (e.shiftKey) {
        this.triggerShockwave(x, y);
      } else {
        this.addAttractor(x, y);
      }
    };

    this.containerElement.addEventListener('click', handleClick);
  }

  private update(delta: number) {
    this.particleGraphics.clear();
    this.attractorGraphics.clear();

    // Render Attractors
    for (const a of this.attractors) {
      this.attractorGraphics
        .circle(a.x, a.y, a.radius * 2.5)
        .fill({ color: a.color, alpha: 0.15 });

      this.attractorGraphics
        .circle(a.x, a.y, a.radius)
        .fill({ color: a.color, alpha: 0.8 })
        .stroke({ width: 2, color: 0xffffff, alpha: 0.9 });
    }

    // Update Particles
    for (let i = 0; i < this.particles.length; i++) {
      const p = this.particles[i];

      // Sum forces from all attractors
      for (const a of this.attractors) {
        const dx = a.x - p.x;
        const dy = a.y - p.y;
        const distSq = dx * dx + dy * dy;
        const dist = Math.sqrt(distSq);

        if (dist > 8 && dist < 400) {
          const force = (a.strength * this.gravityStrength * 100) / distSq;
          p.vx += (dx / dist) * force * delta;
          p.vy += (dy / dist) * force * delta;
        }
      }

      // Apply damping & movement
      p.vx *= Math.pow(this.damping, delta);
      p.vy *= Math.pow(this.damping, delta);
      p.x += p.vx * delta;
      p.y += p.vy * delta;

      // Bounce at screen edges
      if (p.x < 0) {
        p.x = 0;
        p.vx *= -0.7;
      } else if (p.x > this.width) {
        p.x = this.width;
        p.vx *= -0.7;
      }
      if (p.y < 0) {
        p.y = 0;
        p.vy *= -0.7;
      } else if (p.y > this.height) {
        p.y = this.height;
        p.vy *= -0.7;
      }

      // Render particle
      this.particleGraphics
        .circle(p.x, p.y, p.radius)
        .fill({ color: p.color, alpha: 0.75 });
    }
  }

  public destroy() {
    this.isDestroyed = true;
    if (this.app) {
      this.app.destroy(true, { children: true });
      this.app = null;
    }
  }
}

