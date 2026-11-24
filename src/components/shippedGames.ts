import { SHIPPED_GAMES } from '../data/portfolioData';
import type { ShippedGame } from '../types';
import { soundManager } from '../audio/soundManager';

export function renderShippedGames(onOpenDemo?: (demoType: string) => void): HTMLElement {
  const section = document.createElement('section');
  section.id = 'shipped-games';
  section.className = 'portfolio-section';

  section.innerHTML = `
    <div class="container">
      <div class="section-head">
        <span class="section-tag">Production Track Record</span>
        <h2 class="section-title">Shipped Titles & Flagship Games</h2>
        <p class="section-desc">
          Commercial HTML5 game titles engineered in PixiJS, WebGL, and TypeScript. Delivering 60fps performance to millions of active casino and arcade players worldwide.
        </p>
      </div>

      <!-- Filters -->
      <div class="filter-tabs">
        <button class="filter-btn active" data-filter="all">All Titles (6)</button>
        <button class="filter-btn" data-filter="Social Casino">Social Casino</button>
        <button class="filter-btn" data-filter="Slots">Slots & Cascades</button>
        <button class="filter-btn" data-filter="Arcade / Sports">Instant Win & Sports</button>
      </div>

      <!-- Games Grid -->
      <div class="games-grid" id="games-grid-container"></div>
    </div>

    <!-- Details Modal -->
    <div class="modal-backdrop" id="game-modal-backdrop">
      <div class="modal-container" id="game-modal-container">
        <button class="modal-close-btn" id="modal-close-btn">&times;</button>
        <div id="modal-content-slot" style="padding: 2.25rem;"></div>
      </div>
    </div>
  `;

  const gridContainer = section.querySelector('#games-grid-container') as HTMLElement;
  const filterButtons = section.querySelectorAll<HTMLButtonElement>('.filter-btn');
  const modalBackdrop = section.querySelector('#game-modal-backdrop') as HTMLElement;
  const modalContent = section.querySelector('#modal-content-slot') as HTMLElement;
  const modalCloseBtn = section.querySelector('#modal-close-btn') as HTMLElement;

  let currentFilter = 'all';

  function renderCards() {
    gridContainer.innerHTML = '';

    const filtered = currentFilter === 'all'
      ? SHIPPED_GAMES
      : SHIPPED_GAMES.filter((g) => g.category === currentFilter);

    filtered.forEach((game) => {
      const card = document.createElement('div');
      card.className = 'glass-card game-card';

      const iconEmoji = getGameEmoji(game.id);

      card.innerHTML = `
        <div class="game-banner" style="background: ${game.bannerGradient};">
          <span class="game-category-tag">${game.category}</span>
          <span class="game-banner-icon">${iconEmoji}</span>
          <div style="position: absolute; bottom: 0.75rem; right: 1rem; font-size: 0.75rem; color: rgba(255,255,255,0.7); font-weight: 600;">
            ${game.year}
          </div>
        </div>

        <div class="game-body">
          <h3 class="game-title">${game.title}</h3>
          <div class="game-subtitle">${game.subtitle}</div>
          <p class="game-desc">${game.description}</p>

          <div class="game-stats-row">
            ${game.highlightStats
              .slice(0, 2)
              .map(
                (s) => `
                <div class="stat-box">
                  <div class="s-val">${s.value}</div>
                  <div class="s-lbl">${s.label}</div>
                </div>
              `
              )
              .join('')}
          </div>

          <div class="game-tags">
            ${game.tags.slice(0, 4).map((t) => `<span class="tag-badge">${t}</span>`).join('')}
          </div>

          <div style="margin-top: 1.25rem; display: flex; align-items: center; justify-content: space-between;">
            <span style="font-size: 0.85rem; font-weight: 700; color: var(--accent-cyan); display: inline-flex; align-items: center; gap: 0.3rem;">
              Inspect Architecture & Specs &rarr;
            </span>
            <span style="font-size: 0.75rem; color: var(--text-muted);">${game.company}</span>
          </div>
        </div>
      `;

      card.addEventListener('click', () => {
        soundManager.playClick();
        openModal(game);
      });

      gridContainer.appendChild(card);
    });
  }

  function getGameEmoji(id: string): string {
    switch (id) {
      case 'choctaw-casino': return '👑';
      case 'foxplay-casino': return '🦊';
      case 'aplay-casino': return '🎰';
      case 'bakers-delight-slots': return '🥐';
      case 'burning-hot-chilli': return '🌶️';
      case 'final-whistle': return '⚽';
      default: return '🎮';
    }
  }

  function openModal(game: ShippedGame) {
    const iconEmoji = getGameEmoji(game.id);

    modalContent.innerHTML = `
      <div style="display: flex; align-items: center; gap: 1rem; margin-bottom: 1.5rem;">
        <div style="width: 3.5rem; height: 3.5rem; background: ${game.bannerGradient}; border-radius: 0.75rem; display: flex; align-items: center; justify-content: center; font-size: 2rem; box-shadow: 0 4px 15px rgba(0,0,0,0.5);">
          ${iconEmoji}
        </div>
        <div>
          <span style="font-size: 0.75rem; text-transform: uppercase; letter-spacing: 0.08em; color: var(--accent-cyan); font-weight: 700;">${game.category} &bull; ${game.year}</span>
          <h2 style="font-size: 1.85rem; font-weight: 800; line-height: 1.2;">${game.title}</h2>
          <span style="font-size: 0.9rem; color: var(--text-muted);">${game.role} &mdash; ${game.company}</span>
        </div>
      </div>

      <p style="font-size: 1.05rem; color: #cbd5e1; line-height: 1.6; margin-bottom: 1.75rem;">
        ${game.description}
      </p>

      <!-- Key Performance Metrics -->
      <div style="background: rgba(0,0,0,0.35); border: 1px solid var(--border-subtle); border-radius: 0.75rem; padding: 1.25rem; margin-bottom: 2rem;">
        <h4 style="font-size: 0.85rem; text-transform: uppercase; color: var(--accent-cyan); letter-spacing: 0.08em; margin-bottom: 1rem; font-weight: 700;">
          Target Performance & Player Scale
        </h4>
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(130px, 1fr)); gap: 1rem;">
          <div>
            <div style="font-size: 0.75rem; color: var(--text-muted); text-transform: uppercase;">Framerate</div>
            <div style="font-size: 1.15rem; font-weight: 800; color: #34d399;" class="mono">${game.metrics.fps}</div>
          </div>
          <div>
            <div style="font-size: 0.75rem; color: var(--text-muted); text-transform: uppercase;">Cold Start</div>
            <div style="font-size: 1.15rem; font-weight: 800; color: var(--accent-cyan);" class="mono">${game.metrics.loadTime}</div>
          </div>
          <div>
            <div style="font-size: 0.75rem; color: var(--text-muted); text-transform: uppercase;">Core Bundle</div>
            <div style="font-size: 1.15rem; font-weight: 800; color: #f59e0b;" class="mono">${game.metrics.bundleSize}</div>
          </div>
          <div>
            <div style="font-size: 0.75rem; color: var(--text-muted); text-transform: uppercase;">Audience</div>
            <div style="font-size: 1.15rem; font-weight: 800; color: #a855f7;" class="mono">${game.metrics.players}</div>
          </div>
        </div>
      </div>

      <!-- Features & Mechanics -->
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1.5rem; margin-bottom: 2rem;">
        <div>
          <h4 style="font-size: 0.95rem; font-weight: 700; color: #fff; margin-bottom: 0.75rem;">Gameplay & VFX Highlights</h4>
          <ul style="list-style: none; display: flex; flex-direction: column; gap: 0.6rem; font-size: 0.875rem; color: var(--text-muted);">
            ${game.features.map((f) => `<li style="display: flex; gap: 0.5rem;"><span style="color: var(--accent-cyan);">✓</span> ${f}</li>`).join('')}
          </ul>
        </div>
        <div>
          <h4 style="font-size: 0.95rem; font-weight: 700; color: #fff; margin-bottom: 0.75rem;">Engine Architecture</h4>
          <ul style="list-style: none; display: flex; flex-direction: column; gap: 0.6rem; font-size: 0.875rem; color: var(--text-muted);">
            ${game.architectureHighlights.map((a) => `<li style="display: flex; gap: 0.5rem;"><span style="color: #a855f7;">⚡</span> ${a}</li>`).join('')}
          </ul>
        </div>
      </div>

      <!-- Tags & Action -->
      <div style="display: flex; flex-wrap: wrap; align-items: center; justify-content: space-between; gap: 1rem; border-top: 1px solid var(--border-subtle); padding-top: 1.5rem;">
        <div style="display: flex; flex-wrap: wrap; gap: 0.5rem;">
          ${game.tags.map((t) => `<span class="tag-badge">${t}</span>`).join('')}
        </div>

        ${
          game.demoPreviewType
            ? `<button class="btn-primary" id="modal-launch-demo-btn" style="padding: 0.6rem 1.4rem; font-size: 0.875rem;">
                🎮 Launch Live Playable Engine Demo
              </button>`
            : ''
        }
      </div>
    `;

    // Demo shortcut binding
    const launchBtn = modalContent.querySelector('#modal-launch-demo-btn');
    if (launchBtn && onOpenDemo && game.demoPreviewType) {
      launchBtn.addEventListener('click', () => {
        closeModal();
        onOpenDemo(game.demoPreviewType!);
      });
    }

    modalBackdrop.classList.add('open');
  }

  function closeModal() {
    modalBackdrop.classList.remove('open');
  }

  modalCloseBtn.addEventListener('click', closeModal);
  modalBackdrop.addEventListener('click', (e) => {
    if (e.target === modalBackdrop) {
      closeModal();
    }
  });

  // Filter click handlers
  filterButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      soundManager.playClick();
      filterButtons.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');
      currentFilter = btn.dataset.filter || 'all';
      renderCards();
    });
  });

  renderCards();

  return section;
}

