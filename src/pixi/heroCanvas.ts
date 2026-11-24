import { Application, Graphics, Container } from 'pixi.js';

export interface HeroMetrics {
  fps: number;
  frameTime: number;
  particleCount: number;
  rendererType: string;
}

export type InteractionMode = 'repel' | 'attract' | 'vortex';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  color: number;
  alpha: number;
  baseAlpha: number;
  pulsePhase: number;
  pulseSpeed: number;
}

interface Spark {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  color: number;
  alpha: number;
  life: number;
  maxLife: number;
}

export class HeroCanvas {
  private app: Application | null = null;
  private containerElement: HTMLElement;
  private particleLayer = new Container();
  private linkLayer = new Container();
  private sparkLayer = new Container();
  private mouseGlowLayer = new Container();

  private linkGraphics = new Graphics();
  private particleGraphics = new Graphics();
  private sparkGraphics = new Graphics();
  private mouseGlowGraphics = new Graphics();

  private particles: Particle[] = [];
  private sparks: Spark[] = [];
  private maxParticles = 120;
  private connectionDistance = 110;

  private mouseX = -1000;
  private mouseY = -1000;
  private targetMouseX = -1000;
  private targetMouseY = -1000;
  private isPointerInside = false;

  public interactionMode: InteractionMode = 'repel';

  // FPS & Metrics
  private frameCount = 0;
  private lastFpsUpdate = performance.now();
  private currentFps = 60;
  private currentFrameTime = 16.6;
  private onMetricsUpdate?: (metrics: HeroMetrics) => void;

  private isDestroyed = false;
  private colors = [0x00f0ff, 0x8a2be2, 0xff007f, 0x00ffcc, 0xffd700];

  constructor(containerElement: HTMLElement, onMetricsUpdate?: (metrics: HeroMetrics) => void) {
    this.containerElement = containerElement;
    this.onMetricsUpdate = onMetricsUpdate;
  }

  public async init(): Promise<void> {
    this.app = new Application();

    await this.app.init({
      resizeTo: this.containerElement,
      backgroundAlpha: 0,
      antialias: true,
      resolution: Math.min(window.devicePixelRatio || 1, 2),
      autoDensity: true,
      powerPreference: 'high-performance',
    });

    if (this.isDestroyed) {
      this.app.destroy(true);
      return;
    }

    this.containerElement.appendChild(this.app.canvas);

    // Build scene graph
    this.linkLayer.addChild(this.linkGraphics);
    this.particleLayer.addChild(this.particleGraphics);
    this.sparkLayer.addChild(this.sparkGraphics);
    this.mouseGlowLayer.addChild(this.mouseGlowGraphics);

    this.app.stage.addChild(this.mouseGlowLayer);
    this.app.stage.addChild(this.linkLayer);
    this.app.stage.addChild(this.particleLayer);
    this.app.stage.addChild(this.sparkLayer);

    this.spawnParticles();
    this.bindEvents();

    // Start main game loop ticker
    let lastTime = performance.now();

    this.app.ticker.add(() => {
      if (this.isDestroyed) return;
      const now = performance.now();
      const dtMs = now - lastTime;
      lastTime = now;
      this.currentFrameTime = dtMs;

      this.update(dtMs / 16.666);
      this.renderGraphics();

      // FPS tracking
      this.frameCount++;
      if (now - this.lastFpsUpdate >= 250) {
        this.currentFps = Math.round((this.frameCount * 1000) / (now - this.lastFpsUpdate));
        this.frameCount = 0;
        this.lastFpsUpdate = now;

        if (this.onMetricsUpdate) {
          this.onMetricsUpdate({
            fps: Math.min(this.currentFps, 120),
            frameTime: Number(this.currentFrameTime.toFixed(1)),
            particleCount: this.particles.length + this.sparks.length,
            rendererType: this.app?.renderer.name?.toUpperCase() || 'WEBGL',
          });
        }
      }
    });
  }

  private spawnParticles() {
    if (!this.app) return;
    const w = this.app.screen.width;
    const h = this.app.screen.height;

    // Adjust particle count dynamically based on screen width
    const targetCount = w < 768 ? 60 : this.maxParticles;

    this.particles = [];
    for (let i = 0; i < targetCount; i++) {
      this.particles.push({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.9,
        vy: (Math.random() - 0.5) * 0.9,
        radius: Math.random() * 2.5 + 1.2,
        color: this.colors[Math.floor(Math.random() * this.colors.length)],
        alpha: Math.random() * 0.5 + 0.3,
        baseAlpha: Math.random() * 0.4 + 0.3,
        pulsePhase: Math.random() * Math.PI * 2,
        pulseSpeed: Math.random() * 0.03 + 0.015,
      });
    }
  }

  private bindEvents() {
    const handleMove = (e: MouseEvent) => {
      const rect = this.containerElement.getBoundingClientRect();
      this.targetMouseX = e.clientX - rect.left;
      this.targetMouseY = e.clientY - rect.top;
      this.isPointerInside = true;
    };

    const handleTouch = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        const rect = this.containerElement.getBoundingClientRect();
        this.targetMouseX = e.touches[0].clientX - rect.left;
        this.targetMouseY = e.touches[0].clientY - rect.top;
        this.isPointerInside = true;
      }
    };

    const handleLeave = () => {
      this.isPointerInside = false;
      this.targetMouseX = -1000;
      this.targetMouseY = -1000;
    };

    const handleClick = (e: MouseEvent) => {
      const rect = this.containerElement.getBoundingClientRect();
      const clickX = e.clientX - rect.left;
      const clickY = e.clientY - rect.top;
      this.spawnSparkBurst(clickX, clickY, 24);
    };

    this.containerElement.addEventListener('mousemove', handleMove);
    this.containerElement.addEventListener('mouseenter', () => {
      this.isPointerInside = true;
    });
    this.containerElement.addEventListener('mouseleave', handleLeave);
    this.containerElement.addEventListener('touchmove', handleTouch, { passive: true });
    this.containerElement.addEventListener('touchstart', handleTouch, { passive: true });
    this.containerElement.addEventListener('touchend', handleLeave);
    this.containerElement.addEventListener('click', handleClick);

    window.addEventListener('resize', () => {
      if (this.app) {
        this.spawnParticles();
      }
    });
  }

  public spawnSparkBurst(x: number, y: number, count = 20) {
    for (let i = 0; i < count; i++) {
      const angle = (Math.PI * 2 * i) / count + (Math.random() - 0.5) * 0.5;
      const speed = Math.random() * 4.5 + 2.0;
      const life = Math.random() * 25 + 25;
      this.sparks.push({
        x,
        y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        radius: Math.random() * 2.2 + 1.2,
        color: this.colors[Math.floor(Math.random() * this.colors.length)],
        alpha: 1.0,
        life,
        maxLife: life,
      });
    }
  }

  private update(delta: number) {
    if (!this.app) return;
    const w = this.app.screen.width;
    const h = this.app.screen.height;

    // Smooth mouse position lerping
    this.mouseX += (this.targetMouseX - this.mouseX) * 0.15 * delta;
    this.mouseY += (this.targetMouseY - this.mouseY) * 0.15 * delta;

    // Update main particles
    for (let i = 0; i < this.particles.length; i++) {
      const p = this.particles[i];

      // Natural movement
      p.x += p.vx * delta;
      p.y += p.vy * delta;

      // Pulse alpha
      p.pulsePhase += p.pulseSpeed * delta;
      p.alpha = p.baseAlpha + Math.sin(p.pulsePhase) * 0.25;

      // Wrap boundaries smoothly
      if (p.x < -10) p.x = w + 10;
      if (p.x > w + 10) p.x = -10;
      if (p.y < -10) p.y = h + 10;
      if (p.y > h + 10) p.y = -10;

      // Pointer interactions
      if (this.isPointerInside) {
        const dx = p.x - this.mouseX;
        const dy = p.y - this.mouseY;
        const distSq = dx * dx + dy * dy;
        const radius = 180;
        const radiusSq = radius * radius;

        if (distSq < radiusSq && distSq > 1) {
          const dist = Math.sqrt(distSq);
          const force = (1 - dist / radius);

          if (this.interactionMode === 'repel') {
            const push = force * 4.0;
            p.x += (dx / dist) * push * delta;
            p.y += (dy / dist) * push * delta;
          } else if (this.interactionMode === 'attract') {
            const pull = force * 2.5;
            p.x -= (dx / dist) * pull * delta;
            p.y -= (dy / dist) * pull * delta;
          } else if (this.interactionMode === 'vortex') {
            // Swirl around cursor
            const angle = Math.atan2(dy, dx) + 0.08 * delta;
            const targetDist = dist * 0.98;
            p.x = this.mouseX + Math.cos(angle) * targetDist;
            p.y = this.mouseY + Math.sin(angle) * targetDist;
          }
        }
      }
    }

    // Update sparks
    for (let i = this.sparks.length - 1; i >= 0; i--) {
      const s = this.sparks[i];
      s.x += s.vx * delta;
      s.y += s.vy * delta;
      s.vx *= 0.94;
      s.vy *= 0.94;
      s.life -= delta;
      s.alpha = Math.max(0, s.life / s.maxLife);

      if (s.life <= 0) {
        this.sparks.splice(i, 1);
      }
    }
  }

  private renderGraphics() {
    // 1. Mouse Glow
    this.mouseGlowGraphics.clear();
    if (this.isPointerInside && this.mouseX > 0 && this.mouseY > 0) {
      this.mouseGlowGraphics
        .circle(this.mouseX, this.mouseY, 120)
        .fill({ color: 0x00f0ff, alpha: 0.04 });
      this.mouseGlowGraphics
        .circle(this.mouseX, this.mouseY, 50)
        .fill({ color: 0x8a2be2, alpha: 0.08 });
      this.mouseGlowGraphics
        .circle(this.mouseX, this.mouseY, 15)
        .fill({ color: 0xffffff, alpha: 0.2 });
    }

    // 2. Constellation Links
    this.linkGraphics.clear();
    const count = this.particles.length;
    const maxDist = this.connectionDistance;
    const maxDistSq = maxDist * maxDist;

    for (let i = 0; i < count; i++) {
      const p1 = this.particles[i];
      for (let j = i + 1; j < count; j++) {
        const p2 = this.particles[j];
        const dx = p1.x - p2.x;
        const dy = p1.y - p2.y;
        const distSq = dx * dx + dy * dy;

        if (distSq < maxDistSq) {
          const dist = Math.sqrt(distSq);
          const alpha = (1 - dist / maxDist) * 0.22;
          this.linkGraphics
            .moveTo(p1.x, p1.y)
            .lineTo(p2.x, p2.y)
            .stroke({ width: 1, color: p1.color, alpha });
        }
      }
    }

    // 3. Particles
    this.particleGraphics.clear();
    for (let i = 0; i < count; i++) {
      const p = this.particles[i];
      // Outer glow halo
      this.particleGraphics
        .circle(p.x, p.y, p.radius * 2.8)
        .fill({ color: p.color, alpha: p.alpha * 0.22 });
      // Inner bright core
      this.particleGraphics
        .circle(p.x, p.y, p.radius)
        .fill({ color: 0xffffff, alpha: Math.min(1, p.alpha * 1.5) });
    }

    // 4. Sparks
    this.sparkGraphics.clear();
    for (let i = 0; i < this.sparks.length; i++) {
      const s = this.sparks[i];
      this.sparkGraphics
        .circle(s.x, s.y, s.radius * 2.2)
        .fill({ color: s.color, alpha: s.alpha * 0.4 });
      this.sparkGraphics
        .circle(s.x, s.y, s.radius)
        .fill({ color: 0xffffff, alpha: s.alpha });
    }
  }

  public setInteractionMode(mode: InteractionMode) {
    this.interactionMode = mode;
  }

  public triggerBlast() {
    if (!this.app) return;
    const cx = this.app.screen.width / 2;
    const cy = this.app.screen.height / 2;
    this.spawnSparkBurst(cx, cy, 50);
  }

  public destroy() {
    this.isDestroyed = true;
    if (this.app) {
      this.app.destroy(true, { children: true });
      this.app = null;
    }
  }
}

