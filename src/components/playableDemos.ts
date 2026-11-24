import { SlotDemo } from '../pixi/slotDemo';
import { ParticleSandbox, type ColorTheme } from '../pixi/particleSandbox';
import { soundManager } from '../audio/soundManager';

export function renderPlayableDemos(): { element: HTMLElement; switchToTab: (tabId: string) => void } {
  const section = document.createElement('section');
  section.id = 'playable-demos';
  section.className = 'portfolio-section';

  section.innerHTML = `
    <div class="container">
      <div class="section-head">
        <span class="section-tag">Interactive Sandbox</span>
        <h2 class="section-title">Live Playable Demos (PixiJS v8)</h2>
        <p class="section-desc">
          Test real-time HTML5 game engineering in action. Spin a simulated 5x3 slot machine or manipulate GPU-accelerated particle physics right in your browser.
        </p>
      </div>

      <div class="demos-wrapper">
        <!-- Header Tabs -->
        <div class="demos-header-tabs">
          <button class="demo-tab-btn active" data-tab="slot">
            <span style="font-size: 1.25rem;">🎰</span>
            <span>Neon Reels (Slot Engine)</span>
          </button>
          <button class="demo-tab-btn" data-tab="particles">
            <span style="font-size: 1.25rem;">🌌</span>
            <span>Quantum Particle Sandbox</span>
          </button>
        </div>

        <!-- Stage Container -->
        <div class="demo-stage-container" id="demo-stage-container"></div>

        <!-- Dynamic Controls Bar -->
        <div class="demo-controls-bar" id="demo-controls-bar"></div>
      </div>
    </div>
  `;

  const stageContainer = section.querySelector('#demo-stage-container') as HTMLElement;
  const controlsBar = section.querySelector('#demo-controls-bar') as HTMLElement;
  const tabButtons = section.querySelectorAll<HTMLButtonElement>('.demo-tab-btn');

  let slotDemoInstance: SlotDemo | null = null;
  let particleSandboxInstance: ParticleSandbox | null = null;

  function destroyCurrentDemo() {
    if (slotDemoInstance) {
      slotDemoInstance.destroy();
      slotDemoInstance = null;
    }
    if (particleSandboxInstance) {
      particleSandboxInstance.destroy();
      particleSandboxInstance = null;
    }
    stageContainer.innerHTML = '';
    controlsBar.innerHTML = '';
  }

  async function loadSlotDemo() {
    destroyCurrentDemo();

    controlsBar.innerHTML = `
      <div style="display: flex; align-items: center; gap: 1.5rem; flex-wrap: wrap;">
        <!-- Balance -->
        <div>
          <div style="font-size: 0.7rem; color: var(--text-muted); text-transform: uppercase;">Player Balance</div>
          <div id="slot-balance-display" class="mono" style="font-size: 1.35rem; font-weight: 800; color: #34d399;">$2,500</div>
        </div>

        <!-- Last Win -->
        <div>
          <div style="font-size: 0.7rem; color: var(--text-muted); text-transform: uppercase;">Last Win</div>
          <div id="slot-win-display" class="mono" style="font-size: 1.35rem; font-weight: 800; color: #ffd700;">$0</div>
        </div>

        <!-- Bet Selector -->
        <div style="display: flex; align-items: center; gap: 0.5rem; background: rgba(0,0,0,0.3); padding: 0.4rem 0.8rem; border-radius: 0.5rem;">
          <span style="font-size: 0.75rem; color: var(--text-muted); text-transform: uppercase;">Bet:</span>
          <button id="btn-bet-minus" class="btn-mode" style="width: 28px; height: 28px; font-weight: 800;">-</button>
          <span id="slot-bet-display" class="mono" style="font-size: 1.1rem; font-weight: 700; color: var(--accent-cyan); min-width: 48px; text-align: center;">$25</span>
          <button id="btn-bet-plus" class="btn-mode" style="width: 28px; height: 28px; font-weight: 800;">+</button>
        </div>
      </div>

      <div style="display: flex; align-items: center; gap: 0.75rem;">
        <!-- Auto Spin -->
        <button id="btn-auto-spin" class="btn-secondary" style="font-size: 0.85rem; padding: 0.75rem 1.1rem;">
          Auto: Off
        </button>

        <!-- Spin Button -->
        <button id="btn-slot-spin" class="arcade-btn arcade-btn-cyan">
          <span>SPIN</span>
          <span style="font-size: 1.1rem;">⚡</span>
        </button>
      </div>
    `;

    const balanceEl = controlsBar.querySelector('#slot-balance-display') as HTMLElement;
    const winEl = controlsBar.querySelector('#slot-win-display') as HTMLElement;
    const betEl = controlsBar.querySelector('#slot-bet-display') as HTMLElement;
    const spinBtn = controlsBar.querySelector('#btn-slot-spin') as HTMLButtonElement;
    const autoBtn = controlsBar.querySelector('#btn-auto-spin') as HTMLButtonElement;
    const betMinus = controlsBar.querySelector('#btn-bet-minus') as HTMLButtonElement;
    const betPlus = controlsBar.querySelector('#btn-bet-plus') as HTMLButtonElement;

    slotDemoInstance = new SlotDemo(stageContainer, (state) => {
      balanceEl.textContent = `$${state.balance.toLocaleString()}`;
      winEl.textContent = state.lastWin > 0 ? `+$${state.lastWin.toLocaleString()}` : '$0';
      betEl.textContent = `$${state.bet}`;
      spinBtn.disabled = state.isSpinning;
      autoBtn.textContent = state.autoSpin ? 'Auto: ON' : 'Auto: Off';
      autoBtn.style.color = state.autoSpin ? 'var(--accent-cyan)' : 'var(--text-main)';
      autoBtn.style.borderColor = state.autoSpin ? 'var(--accent-cyan)' : 'var(--border-subtle)';
    });

    await slotDemoInstance.init();

    spinBtn.addEventListener('click', () => {
      slotDemoInstance?.spin();
    });

    autoBtn.addEventListener('click', () => {
      slotDemoInstance?.toggleAutoSpin();
    });

    betMinus.addEventListener('click', () => {
      slotDemoInstance?.changeBet(-1);
    });

    betPlus.addEventListener('click', () => {
      slotDemoInstance?.changeBet(1);
    });
  }

  async function loadParticleSandbox() {
    destroyCurrentDemo();

    controlsBar.innerHTML = `
      <div style="display: flex; align-items: center; gap: 1rem; flex-wrap: wrap;">
        <div style="display: flex; align-items: center; gap: 0.5rem;">
          <span style="font-size: 0.75rem; color: var(--text-muted); text-transform: uppercase;">Theme:</span>
          <select id="sandbox-theme-select" style="background: rgba(0,0,0,0.5); border: 1px solid var(--border-subtle); color: #fff; padding: 0.35rem 0.6rem; border-radius: 0.4rem; font-size: 0.85rem;">
            <option value="cyberpunk">Cyberpunk Neon</option>
            <option value="solar">Solar Flare / Chilli</option>
            <option value="ocean">Deep Ocean</option>
            <option value="matrix">Matrix Emerald</option>
          </select>
        </div>

        <button id="btn-sandbox-shockwave" class="btn-secondary" style="font-size: 0.85rem; padding: 0.45rem 0.85rem;">
          💥 Shockwave Blast
        </button>

        <button id="btn-sandbox-reset" class="btn-secondary" style="font-size: 0.85rem; padding: 0.45rem 0.85rem;">
          🔄 Reset Emitters
        </button>
      </div>

      <div style="font-size: 0.8rem; color: var(--text-muted);">
        💡 Click on canvas to spawn gravity wells. 450+ particles at locked 60 FPS.
      </div>
    `;

    const themeSelect = controlsBar.querySelector('#sandbox-theme-select') as HTMLSelectElement;
    const shockwaveBtn = controlsBar.querySelector('#btn-sandbox-shockwave') as HTMLButtonElement;
    const resetBtn = controlsBar.querySelector('#btn-sandbox-reset') as HTMLButtonElement;

    particleSandboxInstance = new ParticleSandbox(stageContainer);
    await particleSandboxInstance.init();

    themeSelect.addEventListener('change', () => {
      soundManager.playClick();
      particleSandboxInstance?.setTheme(themeSelect.value as ColorTheme);
    });

    shockwaveBtn.addEventListener('click', () => {
      soundManager.playClick(350);
      particleSandboxInstance?.triggerShockwave(320, 200);
    });

    resetBtn.addEventListener('click', () => {
      soundManager.playClick();
      particleSandboxInstance?.resetParticles();
    });
  }

  function switchTab(tabId: string) {
    tabButtons.forEach((btn) => {
      btn.classList.toggle('active', btn.dataset.tab === tabId);
    });

    if (tabId === 'slot') {
      loadSlotDemo();
    } else if (tabId === 'particles') {
      loadParticleSandbox();
    }
  }

  tabButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      soundManager.playClick();
      const tab = btn.dataset.tab || 'slot';
      switchTab(tab);
    });
  });

  // Initial load
  loadSlotDemo();

  return {
    element: section,
    switchToTab: (tabId: string) => {
      switchTab(tabId);
      section.scrollIntoView({ behavior: 'smooth' });
    },
  };
}
