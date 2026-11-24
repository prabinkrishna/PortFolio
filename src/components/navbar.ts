import { soundManager } from '../audio/soundManager';

export function renderNavbar(): HTMLElement {
  const header = document.createElement('header');
  header.className = 'site-header';

  header.innerHTML = `
    <div class="container">
      <div class="nav-wrap">
        <a href="#hero" class="logo-brand">
          <div class="logo-icon">
            <span style="font-size: 1.2rem;">🎮</span>
          </div>
          <div>
            <span>Prabin Krishna M</span>
            <span style="display: block; font-size: 0.68rem; font-weight: 500; color: var(--accent-cyan); letter-spacing: 0.05em; text-transform: uppercase;">Senior Game Developer</span>
          </div>
        </a>

        <ul class="nav-links">
          <li><a href="#hero">Overview</a></li>
          <li><a href="#shipped-games">Shipped Titles</a></li>
          <li><a href="#playable-demos">Live Demos</a></li>
          <li><a href="#technical-rd">Technical R&D</a></li>
          <li><a href="#skills-matrix">Engine & Skills</a></li>
          <li><a href="#about-contact">Contact</a></li>
        </ul>

        <div class="nav-actions">
          <!-- Live FPS Badge -->
          <div class="telemetry-pill mono" id="nav-fps-badge" title="Live PixiJS v8 Frame Rate">
            <span class="pulse-dot"></span>
            <span id="nav-fps-val">60</span> FPS
          </div>

          <!-- Sound & Ambient Music Toggles -->
          <button class="btn-icon-sound" id="btn-music-toggle" title="Toggle Ambient Theme Music">
            <span id="music-icon">🎵</span>
            <span id="music-label" class="nav-btn-label" style="font-size: 0.8rem; font-weight: 600;">Music Off</span>
          </button>

          <button class="btn-icon-sound" id="btn-sound-toggle" title="Toggle Synthesized Audio SFX & Music">
            <span id="sound-icon">🔇</span>
            <span id="sound-label" class="nav-btn-label" style="font-size: 0.8rem; font-weight: 600;">Audio Off</span>
          </button>

          <!-- Contact CTA -->
          <a href="#about-contact" class="btn-primary nav-cta-btn" style="padding: 0.5rem 1.1rem; font-size: 0.85rem;">
            Get in Touch
          </a>
        </div>
      </div>
    </div>
  `;

  // Audio toggle bindings
  const soundBtn = header.querySelector('#btn-sound-toggle') as HTMLButtonElement;
  const soundIcon = header.querySelector('#sound-icon') as HTMLElement;
  const soundLabel = header.querySelector('#sound-label') as HTMLElement;
  const musicBtn = header.querySelector('#btn-music-toggle') as HTMLButtonElement;
  const musicLabel = header.querySelector('#music-label') as HTMLElement;

  const syncAudioUI = () => {
    const isMuted = soundManager.isMuted();
    const isMusicOn = soundManager.isAmbientEnabled();

    soundIcon.textContent = isMuted ? '🔇' : '🔊';
    soundLabel.textContent = isMuted ? 'Audio Off' : 'Audio On';
    soundBtn.style.borderColor = isMuted ? 'var(--border-subtle)' : 'var(--accent-cyan)';
    soundBtn.style.color = isMuted ? 'var(--text-main)' : 'var(--accent-cyan)';

    musicLabel.textContent = isMusicOn ? 'Music On' : 'Music Off';
    musicBtn.style.borderColor = isMusicOn ? 'var(--accent-cyan)' : 'var(--border-subtle)';
    musicBtn.style.color = isMusicOn ? 'var(--accent-cyan)' : 'var(--text-main)';
  };

  soundBtn.addEventListener('click', () => {
    soundManager.toggleMute();
    syncAudioUI();
  });

  musicBtn.addEventListener('click', () => {
    soundManager.toggleAmbience();
    syncAudioUI();
  });

  syncAudioUI();

  return header;
}

