import { Application, Container, Graphics, Text, TextStyle } from 'pixi.js';
import { soundManager } from '../audio/soundManager';

interface ShootoutState {
  score: number;
  attempts: number;
  streak: number;
  lastResult: 'GOAL' | 'SAVED' | 'POST' | 'AIMING';
}

export class ShootoutDemo {
  private app: Application | null = null;
  private containerElement: HTMLElement;
  private isDestroyed = false;

  private stageWidth = 640;
  private stageHeight = 400;

  // Scene elements
  private pitchGraphics = new Graphics();
  private goalGraphics = new Graphics();
  private goalieGraphics = new Graphics();
  private ballContainer = new Container();
  private ballGraphics = new Graphics();
  private confettiGraphics = new Graphics();
  private bannerText: Text | null = null;

  // Goalkeeper state
  private goalieX = 320;
  private goalieY = 160;
  private goalieTargetX = 320;
  private goalieTargetY = 160;
  private goalieWidth = 54;
  private goalieHeight = 64;

  // Ball state
  private ballStartX = 320;
  private ballStartY = 330;
  private ballX = 320;
  private ballY = 330;
  private ballScale = 1.0;
  private ballTargetX = 320;
  private ballTargetY = 160;
  private ballVelocityZ = 0;
  private ballZ = 0; // 0 = at penalty spot, 1 = at goal line
  private isKicking = false;

  // Goal coordinates
  private goalLeft = 140;
  private goalRight = 500;
  private goalTop = 110;
  private goalBottom = 220;

  // Confetti particles
  private confettis: { x: number; y: number; vx: number; vy: number; color: number; alpha: number; life: number }[] = [];

  // Game tracking
  public state: ShootoutState = {
    score: 0,
    attempts: 0,
    streak: 0,
    lastResult: 'AIMING',
  };

  private onStateChange?: (state: ShootoutState) => void;

  constructor(containerElement: HTMLElement, onStateChange?: (state: ShootoutState) => void) {
    this.containerElement = containerElement;
    this.onStateChange = onStateChange;
  }

  public async init(): Promise<void> {
    this.app = new Application();

    const rect = this.containerElement.getBoundingClientRect();
    this.stageWidth = Math.max(rect.width || 640, 600);
    this.stageHeight = 400;

    // Recalculate centers
    this.goalLeft = this.stageWidth / 2 - 180;
    this.goalRight = this.stageWidth / 2 + 180;
    this.ballStartX = this.stageWidth / 2;
    this.ballX = this.ballStartX;
    this.goalieX = this.stageWidth / 2;
    this.goalieTargetX = this.goalieX;

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

    this.setupPitch();
    this.setupGoal();
    this.setupGoalie();
    this.setupBall();
    this.setupBanner();

    this.app.stage.addChild(this.pitchGraphics);
    this.app.stage.addChild(this.goalGraphics);
    this.app.stage.addChild(this.goalieGraphics);
    this.app.stage.addChild(this.ballContainer);
    this.app.stage.addChild(this.confettiGraphics);
    if (this.bannerText) this.app.stage.addChild(this.bannerText);

    this.bindEvents();

    this.app.ticker.add((ticker) => {
      if (this.isDestroyed) return;
      this.update(ticker.deltaTime);
    });

    this.notifyState();
  }

  private setupPitch() {
    this.pitchGraphics.clear();

    // Turf perspective field
    this.pitchGraphics
      .poly([
        0, this.stageHeight,
        this.stageWidth, this.stageHeight,
        this.stageWidth * 0.9, 100,
        this.stageWidth * 0.1, 100,
      ])
      .fill({ color: 0x052e16, alpha: 0.9 })
      .stroke({ width: 2, color: 0x166534, alpha: 0.4 });

    // Penalty box line
    this.pitchGraphics
      .moveTo(this.stageWidth * 0.22, 190)
      .lineTo(this.stageWidth * 0.78, 190)
      .stroke({ width: 2, color: 0xffffff, alpha: 0.25 });

    // Penalty spot mark
    this.pitchGraphics
      .circle(this.ballStartX, this.ballStartY, 5)
      .fill({ color: 0xffffff, alpha: 0.5 });
  }

  private setupGoal() {
    this.goalGraphics.clear();

    // Net background mesh
    const netCols = 16;
    const netRows = 8;
    const w = this.goalRight - this.goalLeft;
    const h = this.goalBottom - this.goalTop;

    this.goalGraphics
      .rect(this.goalLeft, this.goalTop, w, h)
      .fill({ color: 0x000000, alpha: 0.35 });

    // Net lines
    for (let c = 0; c <= netCols; c++) {
      const gx = this.goalLeft + (c * w) / netCols;
      this.goalGraphics
        .moveTo(gx, this.goalTop)
        .lineTo(gx, this.goalBottom)
        .stroke({ width: 1, color: 0x00f0ff, alpha: 0.18 });
    }
    for (let r = 0; r <= netRows; r++) {
      const gy = this.goalTop + (r * h) / netRows;
      this.goalGraphics
        .moveTo(this.goalLeft, gy)
        .lineTo(this.goalRight, gy)
        .stroke({ width: 1, color: 0x00f0ff, alpha: 0.18 });
    }

    // Goal posts & Crossbar
    this.goalGraphics
      // Left post
      .rect(this.goalLeft - 6, this.goalTop - 6, 8, h + 6)
      .fill({ color: 0xffffff })
      .stroke({ width: 1, color: 0x94a3b8 })
      // Right post
      .rect(this.goalRight - 2, this.goalTop - 6, 8, h + 6)
      .fill({ color: 0xffffff })
      .stroke({ width: 1, color: 0x94a3b8 })
      // Crossbar
      .rect(this.goalLeft - 6, this.goalTop - 8, w + 12, 8)
      .fill({ color: 0xffffff })
      .stroke({ width: 1, color: 0x94a3b8 });
  }

  private setupGoalie() {
    this.drawGoalie();
  }

  private drawGoalie() {
    this.goalieGraphics.clear();
    const x = this.goalieX;
    const y = this.goalieY;

    // Goalkeeper jersey & body
    this.goalieGraphics
      .roundRect(x - this.goalieWidth / 2, y - this.goalieHeight / 2, this.goalieWidth, this.goalieHeight, 8)
      .fill({ color: 0xf59e0b })
      .stroke({ width: 2, color: 0xffd700 });

    // Goalkeeper head
    this.goalieGraphics
      .circle(x, y - this.goalieHeight / 2 - 12, 12)
      .fill({ color: 0xfde047 });

    // Keeper gloves
    this.goalieGraphics
      .circle(x - this.goalieWidth / 2 - 8, y - 8, 10)
      .fill({ color: 0x00f0ff })
      .circle(x + this.goalieWidth / 2 + 8, y - 8, 10)
      .fill({ color: 0x00f0ff });
  }

  private setupBall() {
    this.ballContainer.x = this.ballX;
    this.ballContainer.y = this.ballY;

    this.ballGraphics.clear();
    // Soccer ball body
    this.ballGraphics
      .circle(0, 0, 16)
      .fill({ color: 0xffffff })
      .stroke({ width: 2, color: 0x0f172a });

    // Black pentagon spots
    this.ballGraphics.circle(0, 0, 5).fill({ color: 0x0f172a });
    this.ballGraphics.circle(-7, -6, 3).fill({ color: 0x0f172a });
    this.ballGraphics.circle(7, -6, 3).fill({ color: 0x0f172a });
    this.ballGraphics.circle(-6, 7, 3).fill({ color: 0x0f172a });
    this.ballGraphics.circle(6, 7, 3).fill({ color: 0x0f172a });

    this.ballContainer.addChild(this.ballGraphics);
  }

  private setupBanner() {
    this.bannerText = new Text({
      text: 'CLICK GOAL TO SHOOT!',
      style: new TextStyle({
        fontFamily: 'system-ui, sans-serif',
        fontSize: 22,
        fontWeight: '900',
        fill: 0x00f0ff,
        stroke: { color: 0x0a0c16, width: 4 },
        align: 'center',
      }),
    });
    this.bannerText.anchor.set(0.5);
    this.bannerText.x = this.stageWidth / 2;
    this.bannerText.y = 50;
  }

  private bindEvents() {
    const handleClick = (e: MouseEvent) => {
      if (this.isKicking) return;
      const rect = this.containerElement.getBoundingClientRect();
      const clickX = e.clientX - rect.left;
      const clickY = e.clientY - rect.top;

      // Check if clicked in shooting zone (upper 70% of canvas)
      if (clickY < this.ballStartY - 20) {
        this.shoot(clickX, clickY);
      }
    };

    this.containerElement.addEventListener('click', handleClick);
  }

  public shoot(targetX?: number, targetY?: number) {
    if (this.isKicking) return;
    this.isKicking = true;
    this.state.attempts++;

    // Randomize or apply target
    const tx = targetX !== undefined ? targetX : this.goalLeft + Math.random() * (this.goalRight - this.goalLeft);
    const ty = targetY !== undefined ? targetY : this.goalTop + Math.random() * (this.goalBottom - this.goalTop);

    this.ballTargetX = tx;
    this.ballTargetY = ty;
    this.ballZ = 0;
    this.ballVelocityZ = 0.042; // Speeds ball towards goal

    soundManager.playKick();

    // AI Goalkeeper dives
    // AI has ~60% chance to jump towards the approximate quadrant
    const aiAccuracy = 0.65;
    if (Math.random() < aiAccuracy) {
      this.goalieTargetX = tx + (Math.random() - 0.5) * 40;
      this.goalieTargetY = ty + (Math.random() - 0.5) * 30;
    } else {
      // Goalie dives wrong way
      this.goalieTargetX = tx < this.stageWidth / 2 ? this.goalRight - 40 : this.goalLeft + 40;
      this.goalieTargetY = this.goalTop + 50;
    }

    if (this.bannerText) {
      this.bannerText.text = 'IN FLIGHT...';
      this.bannerText.style.fill = 0xfacc15;
    }
    this.notifyState();
  }

  private update(delta: number) {
    // Goalie patrol / dive lerp
    if (!this.isKicking) {
      // Idle patrol along goal line
      this.goalieTargetX = this.stageWidth / 2 + Math.sin(performance.now() * 0.003) * 60;
      this.goalieTargetY = (this.goalTop + this.goalBottom) / 2 + 10;
    }

    this.goalieX += (this.goalieTargetX - this.goalieX) * (this.isKicking ? 0.14 : 0.05) * delta;
    this.goalieY += (this.goalieTargetY - this.goalieY) * (this.isKicking ? 0.14 : 0.05) * delta;
    this.drawGoalie();

    // Ball flight physics
    if (this.isKicking) {
      this.ballZ += this.ballVelocityZ * delta;

      // Parabolic flight lerp
      this.ballX = this.ballStartX + (this.ballTargetX - this.ballStartX) * this.ballZ;
      this.ballY = this.ballStartY + (this.ballTargetY - this.ballStartY) * this.ballZ - Math.sin(this.ballZ * Math.PI) * 50;
      this.ballScale = 1.0 - this.ballZ * 0.45; // Depth perspective shrink

      this.ballContainer.x = this.ballX;
      this.ballContainer.y = this.ballY;
      this.ballContainer.scale.set(this.ballScale);
      this.ballContainer.rotation += 0.2 * delta;

      // Check arrival at goal line
      if (this.ballZ >= 1.0) {
        this.resolveShot();
      }
    }

    // Confetti update
    this.confettiGraphics.clear();
    for (let i = this.confettis.length - 1; i >= 0; i--) {
      const c = this.confettis[i];
      c.x += c.vx * delta;
      c.y += c.vy * delta;
      c.vy += 0.15 * delta;
      c.life -= delta;
      c.alpha = Math.max(0, c.life / 60);

      this.confettiGraphics
        .circle(c.x, c.y, 4)
        .fill({ color: c.color, alpha: c.alpha });

      if (c.life <= 0) {
        this.confettis.splice(i, 1);
      }
    }
  }

  private resolveShot() {
    this.isKicking = false;
    this.ballZ = 1.0;

    // Check collision with Goalie
    const distToGoalie = Math.hypot(this.ballTargetX - this.goalieX, this.ballTargetY - this.goalieY);
    const goalieReach = (this.goalieWidth + this.goalieHeight) / 3.2;

    // Check bounds of Goal
    const isInsideGoal =
      this.ballTargetX > this.goalLeft + 15 &&
      this.ballTargetX < this.goalRight - 15 &&
      this.ballTargetY > this.goalTop + 10 &&
      this.ballTargetY < this.goalBottom;

    if (distToGoalie < goalieReach) {
      // SAVED!
      this.state.lastResult = 'SAVED';
      this.state.streak = 0;
      if (this.bannerText) {
        this.bannerText.text = '🧤 SPECTACULAR SAVE!';
        this.bannerText.style.fill = 0xef4444;
      }
      soundManager.playClick(240);
    } else if (isInsideGoal) {
      // GOAL!
      this.state.score++;
      this.state.streak++;
      this.state.lastResult = 'GOAL';
      if (this.bannerText) {
        this.bannerText.text = '⚽ GOOOAL! WHAT A STRIKE!';
        this.bannerText.style.fill = 0x10b981;
      }
      soundManager.playGoal();
      this.spawnConfetti();
    } else {
      // MISS / POST
      this.state.lastResult = 'POST';
      this.state.streak = 0;
      if (this.bannerText) {
        this.bannerText.text = '💥 OFF THE POST / WIDE!';
        this.bannerText.style.fill = 0xf59e0b;
      }
      soundManager.playClick(150);
    }

    this.notifyState();

    // Auto-reset after 1.8 seconds for next penalty
    setTimeout(() => {
      if (!this.isDestroyed && !this.isKicking) {
        this.resetBall();
      }
    }, 1800);
  }

  private spawnConfetti() {
    for (let i = 0; i < 60; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = Math.random() * 8 + 2;
      this.confettis.push({
        x: this.ballTargetX,
        y: this.ballTargetY,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed - 2,
        color: [0x00f0ff, 0xffd700, 0x10b981, 0xff007f][Math.floor(Math.random() * 4)],
        alpha: 1,
        life: 60,
      });
    }
  }

  public resetBall() {
    this.ballX = this.ballStartX;
    this.ballY = this.ballStartY;
    this.ballZ = 0;
    this.ballScale = 1.0;
    this.ballContainer.x = this.ballX;
    this.ballContainer.y = this.ballY;
    this.ballContainer.scale.set(1.0);
    this.ballContainer.rotation = 0;
    this.isKicking = false;

    if (this.bannerText) {
      this.bannerText.text = 'AIM & CLICK GOAL TO SHOOT!';
      this.bannerText.style.fill = 0x00f0ff;
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

