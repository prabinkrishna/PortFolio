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
          Commercial HTML5 game titles engineered in PixiJS, WebGL, and TypeScript. Featuring latest games developed leading a team of 4 developers for <strong>YGT Gaming on the Suribet platform</strong>, alongside proven titles from Ruby Seven Studios and GSN Games.
        </p>
      </div>

      <!-- Filters -->
      <div class="filter-tabs">
        <button class="filter-btn active" data-filter="all">All Titles (9)</button>
        <button class="filter-btn" data-filter="latest">🔥 Latest YGT / Suribet (4)</button>
        <button class="filter-btn" data-filter="Social Casino">Social Casino (3)</button>
        <button class="filter-btn" data-filter="Slots">Slots & Cascades (6)</button>
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
      : currentFilter === 'latest'
      ? SHIPPED_GAMES.filter((g) => g.isLatest)
      : SHIPPED_GAMES.filter((g) => g.category === currentFilter);

    filtered.forEach((game) => {
      const card = document.createElement('div');
      card.className = 'glass-card game-card';

      const iconEmoji = getGameEmoji(game.id);

      card.innerHTML = `
        <div class="game-banner" style="background: ${game.bannerGradient};">
          <div style="position: absolute; top: 0.75rem; left: 0.75rem; display: flex; flex-direction: column; gap: 0.35rem; align-items: flex-start; z-index: 2;">
            <span class="game-category-tag">${game.category}</span>
            ${
              game.isLatest
                ? `<span style="background: rgba(239, 68, 68, 0.85); backdrop-filter: blur(8px); padding: 0.2rem 0.55rem; border-radius: 0.35rem; font-size: 0.7rem; font-weight: 800; color: #fff; text-transform: uppercase; letter-spacing: 0.05em; box-shadow: 0 0 10px rgba(239, 68, 68, 0.5);">
                    🔥 Team Lead (4 Devs) &bull; Suribet Live
                   </span>`
                : ''
            }
          </div>

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

          <div style="margin-top: 1.25rem; display: flex; align-items: center; justify-content: space-between; gap: 0.5rem; flex-wrap: wrap;">
            <span style="font-size: 0.85rem; font-weight: 700; color: var(--accent-cyan); display: inline-flex; align-items: center; gap: 0.3rem;">
              Inspect Architecture & Specs &rarr;
            </span>
            ${
              game.liveUrl
                ? `<a href="${game.liveUrl}" target="_blank" rel="noopener noreferrer" class="btn-mode" style="padding: 0.25rem 0.6rem; font-size: 0.75rem; border-color: rgba(0, 240, 255, 0.4); color: var(--accent-cyan);" onclick="event.stopPropagation();">
                    Play on Suribet ↗
                   </a>`
                : `<span style="font-size: 0.75rem; color: var(--text-muted);">${game.company}</span>`
            }
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
      case 'super-dice-high': return '🎲';
      case 'castle-of-curses': return '🏰';
      case 'lucky-jewels': return '💎';
      case 'bavarian-bonanza': return '🍺';
      case 'choctaw-casino': return '👑';
      case 'foxplay-casino': return '🦊';
      case 'aplay-casino': return '🎰';
      case 'bakers-delight-slots': return '🥐';
      case 'burning-hot-chilli': return '🌶️';
      default: return '🎮';
    }
  }

  function openModal(game: ShippedGame) {
    const iconEmoji = getGameEmoji(game.id);

    modalContent.innerHTML = `
      <div style="display: flex; align-items: center; gap: 1rem; margin-bottom: 1.5rem; flex-wrap: wrap;">
        <div style="width: 3.8rem; height: 3.8rem; background: ${game.bannerGradient}; border-radius: 0.75rem; display: flex; align-items: center; justify-content: center; font-size: 2.2rem; box-shadow: 0 4px 15px rgba(0,0,0,0.5);">
          ${iconEmoji}
        </div>
        <div>
          <div style="display: flex; align-items: center; gap: 0.5rem; flex-wrap: wrap;">
            <span style="font-size: 0.75rem; text-transform: uppercase; letter-spacing: 0.08em; color: var(--accent-cyan); font-weight: 700;">${game.category} &bull; ${game.year}</span>
            ${
              game.isLatest
                ? `<span style="background: rgba(239, 68, 68, 0.2); border: 1px solid rgba(239, 68, 68, 0.5); padding: 0.15rem 0.5rem; border-radius: 9999px; font-size: 0.7rem; font-weight: 800; color: #f87171;">
                    🔥 Live on Suribet
                   </span>`
                : ''
            }
          </div>
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
            <div style="font-size: 0.75rem; color: var(--text-muted); text-transform: uppercase;">Audience / Status</div>
            <div style="font-size: 1.15rem; font-weight: 800; color: #a855f7;" class="mono">${game.metrics.players}</div>
          </div>
        </div>
      </div>

      <!-- Features & Mechanics -->
      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 1.5rem; margin-bottom: 2rem;">
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

      <!-- Tags & Actions -->
      <div style="display: flex; flex-wrap: wrap; align-items: center; justify-content: space-between; gap: 1rem; border-top: 1px solid var(--border-subtle); padding-top: 1.5rem;">
        <div style="display: flex; flex-wrap: wrap; gap: 0.5rem;">
          ${game.tags.map((t) => `<span class="tag-badge">${t}</span>`).join('')}
        </div>

        <div style="display: flex; align-items: center; gap: 0.75rem; flex-wrap: wrap;">
          ${
            game.liveUrl
              ? `<a href="${game.liveUrl}" target="_blank" rel="noopener noreferrer" class="arcade-btn arcade-btn-cyan" style="padding: 0.6rem 1.2rem; font-size: 0.85rem; text-decoration: none;">
                  <span>Play Live on Suribet</span>
                  <span>↗</span>
                </a>`
              : ''
          }
          ${
            game.demoPreviewType
              ? `<button class="btn-secondary" id="modal-launch-demo-btn" style="padding: 0.6rem 1.2rem; font-size: 0.85rem;">
                  🎮 Launch Interactive Engine Demo
                </button>`
              : ''
          }
        </div>
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
