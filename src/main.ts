import './style.css';
import { HeroCanvas, type HeroMetrics, type InteractionMode } from './pixi/heroCanvas';
import { renderNavbar } from './components/navbar';
import { renderShippedGames } from './components/shippedGames';
import { renderPlayableDemos } from './components/playableDemos';
import { renderTechnicalRD } from './components/technicalRD';
import { renderAboutContact } from './components/aboutContact';
import { soundManager } from './audio/soundManager';

async function bootstrap() {
  const appContainer = document.querySelector<HTMLDivElement>('#app');
  if (!appContainer) return;

  appContainer.innerHTML = '';

  // 1. Navbar
  const navbar = renderNavbar();
  appContainer.appendChild(navbar);

  // 2. Hero Section with PixiJS v8 Canvas
  const heroSection = document.createElement('section');
  heroSection.id = 'hero';
  heroSection.className = 'hero-section';

  heroSection.innerHTML = `
    <!-- Interactive PixiJS v8 Canvas Container -->
    <div id="hero-canvas-container"></div>

    <div class="container" style="position: relative; z-index: 10; width: 100%;">
      <div class="hero-content">
        <!-- Badge -->
        <div class="hero-badge-strip">
          <span style="font-size: 1.1rem;">⚡</span>
          <span style="font-weight: 700;">PixiJS v8 Engine Active</span>
          <span style="color: var(--text-muted);">&bull;</span>
          <span>WebGPU / WebGL Native</span>
        </div>

        <!-- Headline -->
        <h1 class="hero-title">
          Engineering High-Performance <span class="glow-text-cyan" style="color: var(--accent-cyan);">HTML5 Games</span> & Next-Gen <span class="glow-text-gold" style="color: var(--accent-gold);">Slot Engines</span>
        </h1>

        <!-- Subtitle -->
        <p class="hero-subtitle">
          I'm <strong>Prabin Krishna M</strong>, a Senior Game Developer specializing in scalable PixiJS v8 game architectures, WebGL shaders, zero-GC memory optimization, and automated generative AI pipelines (ComfyUI / SDXL / Flux).
        </p>

        <!-- CTA Buttons -->
        <div class="hero-cta-group">
          <a href="#playable-demos" class="btn-primary" id="hero-cta-play">
            <span>Play Live Demos</span>
            <span>🎮</span>
          </a>

          <a href="#shipped-games" class="btn-secondary">
            <span>Explore 6 Shipped Titles</span>
            <span>&rarr;</span>
          </a>

          <a href="#technical-rd" class="btn-secondary">
            <span>ComfyUI & Modular Architecture</span>
            <span>⚙️</span>
          </a>
        </div>

        <!-- Shipped Games Quick Pill Bar -->
        <div style="display: flex; flex-wrap: wrap; align-items: center; gap: 0.6rem;">
          <span style="font-size: 0.75rem; text-transform: uppercase; color: var(--text-muted); font-weight: 700; letter-spacing: 0.05em;">Shipped Games:</span>
          <span class="tag-badge" style="background: rgba(0, 240, 255, 0.1); border-color: rgba(0, 240, 255, 0.3); color: #00f0ff;">Choctaw Casino</span>
          <span class="tag-badge" style="background: rgba(168, 85, 247, 0.1); border-color: rgba(168, 85, 247, 0.3); color: #c084fc;">FoxPlay Casino</span>
          <span class="tag-badge" style="background: rgba(16, 185, 129, 0.1); border-color: rgba(16, 185, 129, 0.3); color: #34d399;">APlay Casino</span>
          <span class="tag-badge" style="background: rgba(245, 158, 11, 0.1); border-color: rgba(245, 158, 11, 0.3); color: #fbbf24;">Baker's Delight</span>
          <span class="tag-badge" style="background: rgba(239, 68, 68, 0.1); border-color: rgba(239, 68, 68, 0.3); color: #f87171;">Burning Hot Chilli</span>
          <span class="tag-badge" style="background: rgba(56, 189, 248, 0.1); border-color: rgba(56, 189, 248, 0.3); color: #38bdf8;">Final Whistle</span>
        </div>
      </div>

      <!-- Live FPS & Engine Telemetry Cockpit -->
      <div class="hero-canvas-hud">
        <div class="hud-header">
          <span>Engine Telemetry (PixiJS v8)</span>
          <span id="hud-renderer-tag" class="mono" style="color: var(--accent-cyan); font-weight: 700;">WEBGL</span>
        </div>

        <div class="hud-metrics-row">
          <div class="metric-item">
            <span class="val mono" id="hud-fps-val">60</span>
            <span class="lbl">FPS</span>
          </div>
          <div class="metric-item">
            <span class="val mono" id="hud-dt-val">16.6</span>
            <span class="lbl">Frame (ms)</span>
          </div>
          <div class="metric-item">
            <span class="val mono" id="hud-particles-val">120</span>
            <span class="lbl">Entities</span>
          </div>
        </div>

        <div style="border-top: 1px solid rgba(255, 255, 255, 0.06); padding-top: 0.5rem;">
          <div style="font-size: 0.68rem; color: var(--text-muted); text-transform: uppercase; margin-bottom: 0.35rem;">
            Physics Interaction Mode
          </div>
          <div class="hud-modes-row">
            <button class="btn-mode active" data-mode="repel">Repel</button>
            <button class="btn-mode" data-mode="attract">Attract</button>
            <button class="btn-mode" data-mode="vortex">Vortex</button>
          </div>
        </div>

        <button class="btn-mode" id="btn-hero-blast" style="margin-top: 0.2rem; background: rgba(0, 240, 255, 0.12); color: var(--accent-cyan); border-color: var(--border-glow); font-weight: 700;">
          ✨ Trigger Spark Blast
        </button>
      </div>
    </div>
  `;

  appContainer.appendChild(heroSection);

  // Initialize PixiJS Hero Canvas
  const heroCanvasContainer = heroSection.querySelector('#hero-canvas-container') as HTMLElement;
  const navFpsVal = navbar.querySelector('#nav-fps-val') as HTMLElement;
  const hudFpsVal = heroSection.querySelector('#hud-fps-val') as HTMLElement;
  const hudDtVal = heroSection.querySelector('#hud-dt-val') as HTMLElement;
  const hudParticlesVal = heroSection.querySelector('#hud-particles-val') as HTMLElement;
  const hudRendererTag = heroSection.querySelector('#hud-renderer-tag') as HTMLElement;

  const heroCanvas = new HeroCanvas(heroCanvasContainer, (metrics: HeroMetrics) => {
    navFpsVal.textContent = String(metrics.fps);
    hudFpsVal.textContent = String(metrics.fps);
    hudDtVal.textContent = String(metrics.frameTime);
    hudParticlesVal.textContent = String(metrics.particleCount);
    hudRendererTag.textContent = metrics.rendererType;
  });

  await heroCanvas.init();

  // Mode buttons binding
  const modeButtons = heroSection.querySelectorAll<HTMLButtonElement>('.btn-mode[data-mode]');
  modeButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      soundManager.playClick();
      modeButtons.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');
      const mode = btn.dataset.mode as InteractionMode;
      heroCanvas.setInteractionMode(mode);
    });
  });

  // Blast button
  const blastBtn = heroSection.querySelector('#btn-hero-blast') as HTMLButtonElement;
  blastBtn.addEventListener('click', () => {
    soundManager.playWin();
    heroCanvas.triggerBlast();
  });

  // 3. Playable Demos (Instantiated early for demo shortcuts)
  const { element: demosSection, switchToTab: switchToDemoTab } = renderPlayableDemos();

  // 4. Shipped Titles
  const shippedGamesSection = renderShippedGames((demoType: string) => {
    switchToDemoTab(demoType);
  });
  appContainer.appendChild(shippedGamesSection);

  // Append Playable Demos
  appContainer.appendChild(demosSection);

  // 5. Technical R&D
  const technicalRDSection = renderTechnicalRD();
  appContainer.appendChild(technicalRDSection);

  // 6. About & Contact & Footer
  const aboutContactSection = renderAboutContact();
  appContainer.appendChild(aboutContactSection);

  // Hero CTA Play button shortcut
  const heroCtaPlay = heroSection.querySelector('#hero-cta-play') as HTMLAnchorElement;
  heroCtaPlay.addEventListener('click', (e) => {
    e.preventDefault();
    switchToDemoTab('slot');
  });
}

bootstrap().catch((err) => {
  console.error('Failed to initialize portfolio:', err);
});
