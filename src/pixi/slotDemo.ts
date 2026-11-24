import { Application, Container, Graphics, Text, TextStyle } from 'pixi.js';
import { soundManager } from '../audio/soundManager';

interface SymbolDef {
  id: string;
  name: string;
  icon: string;
  color: number;
  payout: number;
}

const SYMBOLS: SymbolDef[] = [
  { id: 'wild', name: 'WILD', icon: '👑', color: 0xffd700, payout: 50 },
  { id: 'seven', name: 'SEVEN', icon: '7️⃣', color: 0x00f0ff, payout: 30 },
  { id: 'diamond', name: 'DIAMOND', icon: '💎', color: 0x38bdf8, payout: 20 },
  { id: 'chilli', name: 'CHILLI', icon: '🌶️', color: 0xef4444, payout: 15 },
  { id: 'croissant', name: 'BAKERY', icon: '🥐', color: 0xf59e0b, payout: 12 },
  { id: 'clover', name: 'CLOVER', icon: '🍀', color: 0x10b981, payout: 10 },
  { id: 'bell', name: 'BELL', icon: '🔔', color: 0xeab308, payout: 8 },
];

interface Reel {
  container: Container;
  symbols: {
    container: Container;
    bg: Graphics;
    text: Text;
    label: Text;
    def: SymbolDef;
  }[];
  position: number;
  previousPosition: number;
  blurSpeed: number;
  isSpinning: boolean;
  targetStop: number;
  stopDelay: number;
}

interface WinParticle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  color: number;
  alpha: number;
  life: number;
  maxLife: number;
  size: number;
}

export class SlotDemo {
  private app: Application | null = null;
  private containerElement: HTMLElement;
  private isDestroyed = false;

  private reels: Reel[] = [];
  private readonly REEL_COUNT = 5;
  private readonly ROW_COUNT = 3;
  private readonly SYMBOL_WIDTH = 110;
  private readonly SYMBOL_HEIGHT = 100;

  private reelsContainer = new Container();
  private paylinesGraphics = new Graphics();
  private particleGraphics = new Graphics();
  private winParticles: WinParticle[] = [];

  // Game state
  public balance = 2500;
  public bet = 25;
  public lastWin = 0;
  public isSpinning = false;
  public autoSpin = false;

  private onStateChange?: (state: { balance: number; bet: number; lastWin: number; isSpinning: boolean; autoSpin: boolean }) => void;

  constructor(containerElement: HTMLElement, onStateChange?: (state: { balance: number; bet: number; lastWin: number; isSpinning: boolean; autoSpin: boolean }) => void) {
    this.containerElement = containerElement;
    this.onStateChange = onStateChange;
  }

  public async init(): Promise<void> {
    this.app = new Application();

    const rect = this.containerElement.getBoundingClientRect();
    const width = Math.max(rect.width || 680, 600);
    const height = 400;

    await this.app.init({
      width,
      height,
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

    // Frame styling
    this.setupReelFrame(width, height);
    this.setupReels();

    this.app.stage.addChild(this.reelsContainer);
    this.app.stage.addChild(this.paylinesGraphics);
    this.app.stage.addChild(this.particleGraphics);

    // Main ticker loop
    this.app.ticker.add((ticker) => {
      if (this.isDestroyed) return;
      this.update(ticker.deltaTime);
    });

    this.notifyState();
  }

  private setupReelFrame(totalW: number, totalH: number) {
    if (!this.app) return;
    const bg = new Graphics();
    
    // Slot machine cabinet frame
    const cabinetW = this.REEL_COUNT * this.SYMBOL_WIDTH + 40;
    const cabinetH = this.ROW_COUNT * this.SYMBOL_HEIGHT + 30;
    const startX = (totalW - cabinetW) / 2;
    const startY = (totalH - cabinetH) / 2;

    // Glowing border
    bg.roundRect(startX - 6, startY - 6, cabinetW + 12, cabinetH + 12, 16)
      .fill({ color: 0x00f0ff, alpha: 0.15 });

    bg.roundRect(startX, startY, cabinetW, cabinetH, 12)
      .fill({ color: 0x0a0c16, alpha: 0.85 })
      .stroke({ width: 2, color: 0x00f0ff, alpha: 0.6 });

    // Grid columns
    for (let i = 1; i < this.REEL_COUNT; i++) {
      const rx = startX + 20 + i * this.SYMBOL_WIDTH;
      bg.moveTo(rx, startY + 10)
        .lineTo(rx, startY + cabinetH - 10)
        .stroke({ width: 1, color: 0xffffff, alpha: 0.08 });
    }

    this.app.stage.addChild(bg);

    this.reelsContainer.x = startX + 20;
    this.reelsContainer.y = startY + 15;

    // Mask for reels
    const mask = new Graphics();
    mask.roundRect(startX + 18, startY + 12, this.REEL_COUNT * this.SYMBOL_WIDTH + 4, this.ROW_COUNT * this.SYMBOL_HEIGHT + 6, 8)
      .fill({ color: 0xffffff });
    this.app.stage.addChild(mask);
    this.reelsContainer.mask = mask;
  }

  private setupReels() {
    this.reels = [];
    const textStyle = new TextStyle({
      fontSize: 38,
      align: 'center',
    });

    const labelStyle = new TextStyle({
      fontFamily: 'system-ui, sans-serif',
      fontSize: 10,
      fontWeight: 'bold',
      fill: 0x94a3b8,
      letterSpacing: 1,
    });

    for (let i = 0; i < this.REEL_COUNT; i++) {
      const reelCol = new Container();
      reelCol.x = i * this.SYMBOL_WIDTH;

      const reelSymbols: Reel['symbols'] = [];
      const totalVisualSymbols = this.ROW_COUNT + 4; // Buffer for spinning wrap

      for (let j = 0; j < totalVisualSymbols; j++) {
        const symContainer = new Container();
        symContainer.y = j * this.SYMBOL_HEIGHT;

        const bg = new Graphics();
        bg.roundRect(6, 6, this.SYMBOL_WIDTH - 12, this.SYMBOL_HEIGHT - 12, 10)
          .fill({ color: 0x131826, alpha: 0.7 })
          .stroke({ width: 1, color: 0x223048, alpha: 0.5 });

        const randomDef = SYMBOLS[Math.floor(Math.random() * SYMBOLS.length)];

        const text = new Text({ text: randomDef.icon, style: textStyle });
        text.anchor.set(0.5);
        text.x = this.SYMBOL_WIDTH / 2;
        text.y = this.SYMBOL_HEIGHT / 2 - 4;

        const label = new Text({ text: randomDef.name, style: labelStyle });
        label.anchor.set(0.5);
        label.x = this.SYMBOL_WIDTH / 2;
        label.y = this.SYMBOL_HEIGHT - 16;

        symContainer.addChild(bg);
        symContainer.addChild(text);
        symContainer.addChild(label);
        reelCol.addChild(symContainer);

        reelSymbols.push({
          container: symContainer,
          bg,
          text,
          label,
          def: randomDef,
        });
      }

      this.reelsContainer.addChild(reelCol);

      this.reels.push({
        container: reelCol,
        symbols: reelSymbols,
        position: 0,
        previousPosition: 0,
        blurSpeed: 0,
        isSpinning: false,
        targetStop: 0,
        stopDelay: 0,
      });
    }
  }

  public spin(): boolean {
    if (this.isSpinning) return false;
    if (this.balance < this.bet) {
      alert('Insufficient balance! Resetting to $1000 for demo.');
      this.balance = 1000;
      this.notifyState();
      return false;
    }

    this.balance -= this.bet;
    this.lastWin = 0;
    this.isSpinning = true;
    this.paylinesGraphics.clear();
    this.notifyState();

    soundManager.playSpin();

    for (let i = 0; i < this.REEL_COUNT; i++) {
      const reel = this.reels[i];
      reel.isSpinning = true;
      reel.blurSpeed = 24 + Math.random() * 4;
      reel.stopDelay = 35 + i * 16; // Staggered stop timing
    }

    return true;
  }

  private stopReel(reelIndex: number) {
    const reel = this.reels[reelIndex];
    reel.isSpinning = false;
    reel.blurSpeed = 0;
    soundManager.playReelStop(reelIndex);

    // Snap to grid
    for (let j = 0; j < reel.symbols.length; j++) {
      reel.symbols[j].container.y = j * this.SYMBOL_HEIGHT;
    }

    // Check if last reel stopped
    if (reelIndex === this.REEL_COUNT - 1) {
      this.isSpinning = false;
      this.evaluateWin();
      this.notifyState();

      if (this.autoSpin && this.balance >= this.bet) {
        setTimeout(() => {
          if (this.autoSpin && !this.isSpinning) {
            this.spin();
          }
        }, 1000);
      }
    }
  }

  private evaluateWin() {
    // Check horizontal lines across reels (rows 0, 1, 2)
    let totalWin = 0;
    const winningLines: { row: number; symbol: SymbolDef; count: number }[] = [];

    for (let row = 0; row < this.ROW_COUNT; row++) {
      const firstSym = this.reels[0].symbols[row].def;
      let matchCount = 1;

      for (let col = 1; col < this.REEL_COUNT; col++) {
        const currentSym = this.reels[col].symbols[row].def;
        if (currentSym.id === firstSym.id || currentSym.id === 'wild' || firstSym.id === 'wild') {
          matchCount++;
        } else {
          break;
        }
      }

      if (matchCount >= 3) {
        const lineWin = firstSym.payout * matchCount * (this.bet / 10);
        totalWin += lineWin;
        winningLines.push({ row, symbol: firstSym, count: matchCount });
      }
    }

    if (totalWin > 0) {
      this.lastWin = Math.round(totalWin);
      this.balance += this.lastWin;
      soundManager.playWin();
      this.drawWinningPaylines(winningLines);
      this.spawnWinCoins();
    }
  }

  private drawWinningPaylines(lines: { row: number; symbol: SymbolDef; count: number }[]) {
    this.paylinesGraphics.clear();
    const startX = this.reelsContainer.x;
    const startY = this.reelsContainer.y;

    lines.forEach((line) => {
      const y = startY + line.row * this.SYMBOL_HEIGHT + this.SYMBOL_HEIGHT / 2;
      const x1 = startX + 10;
      const x2 = startX + line.count * this.SYMBOL_WIDTH - 10;

      // Glowing payline stroke
      this.paylinesGraphics
        .moveTo(x1, y)
        .lineTo(x2, y)
        .stroke({ width: 8, color: line.symbol.color, alpha: 0.3 });

      this.paylinesGraphics
        .moveTo(x1, y)
        .lineTo(x2, y)
        .stroke({ width: 3, color: 0xffffff, alpha: 0.9 });
    });
  }

  private spawnWinCoins() {
    if (!this.app) return;
    const cx = this.app.screen.width / 2;
    const cy = this.app.screen.height / 2;

    for (let i = 0; i < 40; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = Math.random() * 7 + 3;
      this.winParticles.push({
        x: cx + (Math.random() - 0.5) * 100,
        y: cy + (Math.random() - 0.5) * 50,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed - 3,
        color: [0xffd700, 0x00f0ff, 0xff007f][Math.floor(Math.random() * 3)],
        alpha: 1,
        life: 45 + Math.random() * 20,
        maxLife: 60,
        size: Math.random() * 4 + 2,
      });
    }
  }

  private update(delta: number) {
    // Reels physics & spin update
    for (let i = 0; i < this.REEL_COUNT; i++) {
      const reel = this.reels[i];
      if (!reel.isSpinning) continue;

      reel.stopDelay -= delta;

      // Shift symbols downwards
      const totalVisualSymbols = reel.symbols.length;
      for (let j = 0; j < totalVisualSymbols; j++) {
        const sym = reel.symbols[j];
        sym.container.y += reel.blurSpeed * delta;

        // Wrap around top when leaving bottom
        if (sym.container.y > (this.ROW_COUNT + 1) * this.SYMBOL_HEIGHT) {
          sym.container.y -= totalVisualSymbols * this.SYMBOL_HEIGHT;

          // Re-roll symbol definition on wrap
          const newDef = SYMBOLS[Math.floor(Math.random() * SYMBOLS.length)];
          sym.def = newDef;
          sym.text.text = newDef.icon;
          sym.label.text = newDef.name;
        }
      }

      if (reel.stopDelay <= 0) {
        this.stopReel(i);
      }
    }

    // Win particles
    this.particleGraphics.clear();
    for (let i = this.winParticles.length - 1; i >= 0; i--) {
      const p = this.winParticles[i];
      p.x += p.vx * delta;
      p.y += p.vy * delta;
      p.vy += 0.22 * delta; // Gravity
      p.life -= delta;
      p.alpha = Math.max(0, p.life / p.maxLife);

      this.particleGraphics
        .circle(p.x, p.y, p.size)
        .fill({ color: p.color, alpha: p.alpha });

      if (p.life <= 0) {
        this.winParticles.splice(i, 1);
      }
    }
  }

  public changeBet(delta: number) {
    const bets = [5, 10, 25, 50, 100, 250, 500];
    const currentIndex = bets.indexOf(this.bet);
    let nextIndex = currentIndex + delta;
    if (nextIndex < 0) nextIndex = 0;
    if (nextIndex >= bets.length) nextIndex = bets.length - 1;
    this.bet = bets[nextIndex];
    soundManager.playClick();
    this.notifyState();
  }

  public toggleAutoSpin() {
    this.autoSpin = !this.autoSpin;
    soundManager.playClick();
    this.notifyState();
    if (this.autoSpin && !this.isSpinning) {
      this.spin();
    }
  }

  private notifyState() {
    if (this.onStateChange) {
      this.onStateChange({
        balance: this.balance,
        bet: this.bet,
        lastWin: this.lastWin,
        isSpinning: this.isSpinning,
        autoSpin: this.autoSpin,
      });
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

