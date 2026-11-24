import { Application, Container, Graphics, Text, TextStyle } from 'pixi.js';
import { soundManager } from '../audio/soundManager';

interface DiceState {
  die1: number;
  die2: number;
  multiplier: number;
  streak: number;
  totalRolls: number;
  isRolling: boolean;
}

export class DiceDemo {
  private app: Application | null = null;
  private containerElement: HTMLElement;
  private isDestroyed = false;

  private stageWidth = 640;
  private stageHeight = 400;

  // Dice visual containers
  private dice1Container = new Container();
  private dice2Container = new Container();
  private dice1Graphics = new Graphics();
  private dice2Graphics = new Graphics();
  private bannerText: Text | null = null;
  private winParticles: { x: number; y: number; vx: number; vy: number; color: number; alpha: number; life: number }[] = [];
  private particleGraphics = new Graphics();

  // Animation values
  private rollTicks = 0;
  private isRolling = false;
  private die1Val = 6;
  private die2Val = 6;

  public state: DiceState = {
    die1: 6,
    die2: 6,
    multiplier: 36,
    streak: 0,
    totalRolls: 0,
    isRolling: false,
  };

  private onStateChange?: (state: DiceState) => void;

  constructor(containerElement: HTMLElement, onStateChange?: (state: DiceState) => void) {
    this.containerElement = containerElement;
    this.onStateChange = onStateChange;
  }

  public async init(): Promise<void> {
    this.app = new Application();

    const rect = this.containerElement.getBoundingClientRect();
    this.stageWidth = Math.max(rect.width || 640, 600);
    this.stageHeight = 400;

    await this.app.init({
      width: this.stageWidth,
      height: this.stageHeight,
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

    this.setupScene();
    this.drawDie(this.dice1Graphics, this.die1Val, 0x4f46e5);
    this.drawDie(this.dice2Graphics, this.die2Val, 0x06b6d4);

    this.dice1Container.addChild(this.dice1Graphics);
    this.dice2Container.addChild(this.dice2Graphics);

    this.dice1Container.x = this.stageWidth / 2 - 80;
    this.dice1Container.y = 200;
    this.dice2Container.x = this.stageWidth / 2 + 80;
    this.dice2Container.y = 200;

    this.app.stage.addChild(this.dice1Container);
    this.app.stage.addChild(this.dice2Container);
    this.app.stage.addChild(this.particleGraphics);
    if (this.bannerText) this.app.stage.addChild(this.bannerText);

    this.app.ticker.add((ticker) => {
      if (this.isDestroyed) return;
      this.update(ticker.deltaTime);
    });

    this.notifyState();
  }

  private setupScene() {
    if (!this.app) return;

    // Felt background table
    const table = new Graphics();
    table.roundRect(40, 30, this.stageWidth - 80, this.stageHeight - 60, 20)
      .fill({ color: 0x0f172a, alpha: 0.85 })
      .stroke({ width: 2, color: 0x38bdf8, alpha: 0.4 });

    // Inner glowing ring
    table.circle(this.stageWidth / 2, 200, 140)
      .stroke({ width: 1, color: 0x00f0ff, alpha: 0.15 });

    this.app.stage.addChild(table);

    // Banner
    this.bannerText = new Text({
      text: 'SUPER DICE HIGH • ROLL FOR MULTIPLIERS',
      style: new TextStyle({
        fontFamily: 'system-ui, sans-serif',
        fontSize: 16,
        fontWeight: '900',
        fill: 0x38bdf8,
        letterSpacing: 1,
        align: 'center',
      }),
    });
    this.bannerText.anchor.set(0.5);
    this.bannerText.x = this.stageWidth / 2;
    this.bannerText.y = 70;
  }

  private drawDie(graphics: Graphics, value: number, glowColor: number) {
    graphics.clear();
    const size = 100;
    const half = size / 2;

    // Outer shadow & glow
    graphics.roundRect(-half - 4, -half - 4, size + 8, size + 8, 18)
      .fill({ color: glowColor, alpha: 0.25 });

    // Main Die Cube
    graphics.roundRect(-half, -half, size, size, 14)
      .fill({ color: 0x1e293b })
      .stroke({ width: 2, color: glowColor, alpha: 0.8 });

    // Pip Dots
    const dotColor = 0xffffff;
    const r = 7;
    const d = 26;

    if (value === 1 || value === 3 || value === 5) {
      graphics.circle(0, 0, r).fill({ color: dotColor });
    }
    if (value >= 2) {
      graphics.circle(-d, -d, r).fill({ color: dotColor });
      graphics.circle(d, d, r).fill({ color: dotColor });
    }
    if (value >= 4) {
      graphics.circle(d, -d, r).fill({ color: dotColor });
      graphics.circle(-d, d, r).fill({ color: dotColor });
    }
    if (value === 6) {
      graphics.circle(-d, 0, r).fill({ color: dotColor });
      graphics.circle(d, 0, r).fill({ color: dotColor });
    }
  }

  public roll(): boolean {
    if (this.isRolling) return false;
    this.isRolling = true;
    this.rollTicks = 32;
    this.state.isRolling = true;
    this.state.totalRolls++;

    soundManager.playSpin();

    if (this.bannerText) {
      this.bannerText.text = 'ROLLING HIGH DICE...';
      this.bannerText.style.fill = 0xfacc15;
    }

    this.notifyState();
    return true;
  }

  private update(delta: number) {
    if (this.isRolling) {
      this.rollTicks -= delta;

      // Random jitter & tumble
      this.die1Val = Math.floor(Math.random() * 6) + 1;
      this.die2Val = Math.floor(Math.random() * 6) + 1;
      this.drawDie(this.dice1Graphics, this.die1Val, 0x4f46e5);
      this.drawDie(this.dice2Graphics, this.die2Val, 0x06b6d4);

      this.dice1Container.rotation += 0.3 * delta;
      this.dice2Container.rotation -= 0.3 * delta;
      this.dice1Container.scale.set(1.0 + Math.sin(this.rollTicks * 0.5) * 0.15);
      this.dice2Container.scale.set(1.0 + Math.cos(this.rollTicks * 0.5) * 0.15);

      if (this.rollTicks <= 0) {
        this.resolveRoll();
      }
    }

    // Win Particles
    this.particleGraphics.clear();
    for (let i = this.winParticles.length - 1; i >= 0; i--) {
      const p = this.winParticles[i];
      p.x += p.vx * delta;
      p.y += p.vy * delta;
      p.vy += 0.2 * delta;
      p.life -= delta;
      p.alpha = Math.max(0, p.life / 50);

      this.particleGraphics
        .circle(p.x, p.y, 4)
        .fill({ color: p.color, alpha: p.alpha });

      if (p.life <= 0) {
        this.winParticles.splice(i, 1);
      }
    }
  }

  private resolveRoll() {
    this.isRolling = false;
    this.state.isRolling = false;

    // Reset transform
    this.dice1Container.rotation = 0;
    this.dice2Container.rotation = 0;
    this.dice1Container.scale.set(1.0);
    this.dice2Container.scale.set(1.0);

    this.state.die1 = this.die1Val;
    this.state.die2 = this.die2Val;
    const isDouble = this.die1Val === this.die2Val;
    const mult = this.die1Val * this.die2Val * (isDouble ? 2 : 1);
    this.state.multiplier = mult;

    if (isDouble) {
      this.state.streak++;
      soundManager.playWin();
      if (this.bannerText) {
        this.bannerText.text = `🎉 DOUBLE ${this.die1Val}s! BONUS MULTIPLIER ${mult}x!`;
        this.bannerText.style.fill = 0xffd700;
      }
      this.spawnConfetti();
    } else {
      soundManager.playReelStop(0);
      if (this.bannerText) {
        this.bannerText.text = `ROLLED ${this.die1Val} & ${this.die2Val} • PAYOUT ${mult}x`;
        this.bannerText.style.fill = 0x38bdf8;
      }
    }

    this.notifyState();
  }

  private spawnConfetti() {
    for (let i = 0; i < 50; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = Math.random() * 8 + 3;
      this.winParticles.push({
        x: this.stageWidth / 2,
        y: 200,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed - 2,
        color: [0x00f0ff, 0xffd700, 0x4f46e5, 0x10b981][Math.floor(Math.random() * 4)],
        alpha: 1,
        life: 50,
      });
    }
  }

  private notifyState() {
    if (this.onStateChange) {
      this.onStateChange({ ...this.state });
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

