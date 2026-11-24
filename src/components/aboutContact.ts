import { SKILL_CATEGORIES } from '../data/portfolioData';
import { soundManager } from '../audio/soundManager';

export function renderAboutContact(): HTMLElement {
  const container = document.createElement('div');

  // 1. Skills Matrix Section
  const skillsSection = document.createElement('section');
  skillsSection.id = 'skills-matrix';
  skillsSection.className = 'portfolio-section';

  skillsSection.innerHTML = `
    <div class="container">
      <div class="section-head">
        <span class="section-tag">Technical Competencies</span>
        <h2 class="section-title">Core Engine & Leadership Matrix</h2>
        <p class="section-desc">
          Deep expertise across modern browser graphics, high-frequency game loops, memory profiling, team leadership of 4 developers, and full-stack cryptographic RNG.
        </p>
      </div>

      <div class="skills-grid">
        ${SKILL_CATEGORIES.map(
          (cat) => `
          <div class="glass-card skill-category-card">
            <h3 class="skill-cat-title">
              <span style="color: var(--accent-cyan); font-size: 1.3rem;">★</span>
              <span>${cat.title}</span>
            </h3>

            <div class="skill-list">
              ${cat.skills
                .map(
                  (s) => `
                <div>
                  <div class="skill-header">
                    <span>${s.name}</span>
                    <span class="mono" style="color: var(--accent-cyan); font-size: 0.8rem;">${s.level}%</span>
                  </div>
                  <div class="skill-bar-bg">
                    <div class="skill-bar-fill" style="width: ${s.level}%;"></div>
                  </div>
                  <div class="skill-note">${s.note}</div>
                </div>
              `
                )
                .join('')}
            </div>
          </div>
        `
        ).join('')}
      </div>
    </div>
  `;

  // 2. About & Contact Section
  const contactSection = document.createElement('section');
  contactSection.id = 'about-contact';
  contactSection.className = 'portfolio-section';
  contactSection.style.background = 'radial-gradient(circle at 50% 100%, rgba(0, 240, 255, 0.05) 0%, transparent 60%)';

  contactSection.innerHTML = `
    <div class="container">
      <div class="section-head">
        <span class="section-tag">Leadership & Experience</span>
        <h2 class="section-title">About Prabin Krishna M & Contact</h2>
        <p class="section-desc">
          Available for Lead Game Developer, Principal Engine Architect, and Technical Direction roles.
        </p>
      </div>

      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(360px, 1fr)); gap: 2.5rem; align-items: start;">
        <!-- Bio Card -->
        <div class="glass-card" style="padding: 2.25rem;">
          <div style="display: flex; align-items: center; gap: 1.25rem; margin-bottom: 1.5rem; flex-wrap: wrap;">
            <div style="width: 4.2rem; height: 4.2rem; border-radius: 1rem; background: linear-gradient(135deg, var(--accent-cyan), var(--accent-purple)); display: flex; align-items: center; justify-content: center; font-size: 2.2rem; box-shadow: 0 0 20px rgba(0, 240, 255, 0.3);">
              👨‍💻
            </div>
            <div>
              <div style="display: flex; align-items: center; gap: 0.5rem; flex-wrap: wrap;">
                <h3 style="font-size: 1.5rem; font-weight: 800;">Prabin Krishna M</h3>
                <span style="background: rgba(0, 240, 255, 0.15); border: 1px solid rgba(0, 240, 255, 0.4); color: var(--accent-cyan); font-size: 0.7rem; font-weight: 700; padding: 0.15rem 0.5rem; border-radius: 9999px;">
                  9+ Years Exp
                </span>
              </div>
              <p style="color: var(--accent-cyan); font-weight: 600; font-size: 0.9rem;">
                Lead Game Developer &bull; YGT Gaming (Suribet Platform)
              </p>
              <p style="font-size: 0.8rem; color: #a855f7; font-weight: 600;">
                Directing Engineering Pod of 4 Game Developers
              </p>
            </div>
          </div>

          <p style="color: #cbd5e1; font-size: 0.95rem; line-height: 1.65; margin-bottom: 1.25rem;">
            Senior HTML5 game engineer and tech lead with <strong>9+ years of professional experience</strong> across <strong>YGT Gaming</strong>, <strong>Ruby Seven Studios</strong>, and <strong>GSN Games</strong>. Currently leading an agile squad of 4 developers creating flagship HTML5 slot machines for the <a href="https://www.suribet.sr/YgtGames/YgtGame/" target="_blank" rel="noopener noreferrer" style="color: var(--accent-cyan); text-decoration: underline;">Suribet platform</a> (Super Dice High, Castle of Curses, Lucky Jewels, Bavarian Bonanza).
          </p>

          <p style="color: var(--text-muted); font-size: 0.9rem; line-height: 1.6; margin-bottom: 1.75rem;">
            Specializing in PixiJS v8, custom GLSL shaders, Spine 2D, zero-allocation memory pooling, provably fair cryptographic RNG backends, and internal studio generative AI pipelines (ComfyUI / SDXL / Flux).
          </p>

          <div style="display: flex; flex-direction: column; gap: 0.75rem; font-size: 0.9rem; margin-bottom: 1.75rem;">
            <div style="display: flex; align-items: center; gap: 0.75rem;">
              <span style="color: var(--accent-cyan); font-size: 1.1rem;">📍</span>
              <span>Thrissur, Kerala, India &bull; Remote Worldwide Availability</span>
            </div>
            <div style="display: flex; align-items: center; gap: 0.75rem;">
              <span style="color: var(--accent-cyan); font-size: 1.1rem;">📧</span>
              <a href="mailto:prabinkrishna.m@gmail.com" style="color: #fff; text-decoration: none;">prabinkrishna.m@gmail.com</a>
            </div>
            <div style="display: flex; align-items: center; gap: 0.75rem;">
              <span style="color: var(--accent-cyan); font-size: 1.1rem;">📱</span>
              <span class="mono" style="color: #cbd5e1;">+91 9567864369</span>
            </div>
            <div style="display: flex; align-items: center; gap: 0.75rem;">
              <span style="color: var(--accent-cyan); font-size: 1.1rem;">🎓</span>
              <span>B.Tech in Computer Science & Engineering (MBITS, 2017)</span>
            </div>
          </div>

          <div style="display: flex; gap: 1rem; flex-wrap: wrap;">
            <a href="/resume/Prabin Krishna M - pixijs.pdf" download="Prabin_Krishna_M_Resume.pdf" class="btn-primary" style="font-size: 0.85rem; padding: 0.65rem 1.25rem;">
              <span>📄 Download Official Resume (PDF)</span>
            </a>
            <a href="https://www.suribet.sr/YgtGames/YgtGame/" target="_blank" rel="noopener noreferrer" class="btn-secondary" style="font-size: 0.85rem; padding: 0.65rem 1.25rem;">
              <span>🎰 Visit Suribet Games Platform</span>
              <span>↗</span>
            </a>
          </div>
        </div>

        <!-- Contact Form Card -->
        <div class="glass-card" style="padding: 2.25rem;">
          <h3 style="font-size: 1.35rem; font-weight: 800; margin-bottom: 0.35rem;">Send a Message</h3>
          <p style="font-size: 0.85rem; color: var(--text-muted); margin-bottom: 1.25rem;">
            Inquire about engineering leadership roles, technical consulting, or custom game engine development.
          </p>
          
          <form id="contact-form" style="display: flex; flex-direction: column; gap: 1.2rem;">
            <div>
              <label style="display: block; font-size: 0.8rem; font-weight: 600; color: var(--text-muted); margin-bottom: 0.4rem; text-transform: uppercase;">
                Your Name
              </label>
              <input type="text" id="contact-name" required placeholder="e.g. Studio Lead / Recruiter" style="width: 100%; padding: 0.75rem 1rem; background: rgba(0,0,0,0.4); border: 1px solid var(--border-subtle); border-radius: 0.5rem; color: #fff; font-family: inherit; font-size: 0.95rem;" />
            </div>

            <div>
              <label style="display: block; font-size: 0.8rem; font-weight: 600; color: var(--text-muted); margin-bottom: 0.4rem; text-transform: uppercase;">
                Email Address
              </label>
              <input type="email" id="contact-email" required placeholder="contact@studio.com" style="width: 100%; padding: 0.75rem 1rem; background: rgba(0,0,0,0.4); border: 1px solid var(--border-subtle); border-radius: 0.5rem; color: #fff; font-family: inherit; font-size: 0.95rem;" />
            </div>

            <div>
              <label style="display: block; font-size: 0.8rem; font-weight: 600; color: var(--text-muted); margin-bottom: 0.4rem; text-transform: uppercase;">
                Project or Inquiry Details
              </label>
              <textarea id="contact-message" rows="4" required placeholder="Tell me about your game project, team requirements, or technical consultation..." style="width: 100%; padding: 0.75rem 1rem; background: rgba(0,0,0,0.4); border: 1px solid var(--border-subtle); border-radius: 0.5rem; color: #fff; font-family: inherit; font-size: 0.95rem; resize: vertical;"></textarea>
            </div>

            <button type="submit" class="btn-primary" id="btn-submit-contact" style="justify-content: center; width: 100%; padding: 0.9rem;">
              <span>Send Direct Inquiry</span>
              <span>🚀</span>
            </button>
            <div id="contact-status-msg" style="display: none; text-align: center; font-size: 0.9rem; font-weight: 600; padding: 0.6rem; border-radius: 0.4rem;"></div>
          </form>
        </div>
      </div>
    </div>
  `;

  // Form submission feedback
  const form = contactSection.querySelector('#contact-form') as HTMLFormElement;
  const statusMsg = contactSection.querySelector('#contact-status-msg') as HTMLElement;
  const submitBtn = contactSection.querySelector('#btn-submit-contact') as HTMLButtonElement;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    soundManager.playWin();
    submitBtn.disabled = true;
    submitBtn.innerHTML = '<span>Message Received!</span> <span>✓</span>';

    statusMsg.style.display = 'block';
    statusMsg.style.background = 'rgba(16, 185, 129, 0.15)';
    statusMsg.style.color = '#34d399';
    statusMsg.style.border = '1px solid rgba(16, 185, 129, 0.4)';
    statusMsg.textContent = 'Thank you! Your message has been logged. Prabin will respond shortly.';

    setTimeout(() => {
      form.reset();
      submitBtn.disabled = false;
      submitBtn.innerHTML = '<span>Send Direct Inquiry</span> <span>🚀</span>';
      statusMsg.style.display = 'none';
    }, 4500);
  });

  // Footer
  const footer = document.createElement('footer');
  footer.className = 'site-footer';
  footer.innerHTML = `
    <div class="container">
      <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 1.5rem; margin-bottom: 2rem;">
        <div>
          <div style="font-weight: 800; font-size: 1.2rem; color: #fff; margin-bottom: 0.25rem;">Prabin Krishna M</div>
          <div style="font-size: 0.85rem; color: var(--text-muted);">Lead Game Developer (4 Devs) &bull; PixiJS v8 &bull; YGT Gaming (Suribet) &bull; Ruby Seven &bull; GSN Games</div>
        </div>

        <div style="display: flex; align-items: center; gap: 1rem;">
          <a href="/resume/Prabin Krishna M - pixijs.pdf" download="Prabin_Krishna_M_Resume.pdf" class="btn-secondary" style="font-size: 0.8rem; padding: 0.4rem 0.8rem;">📄 Resume (PDF)</a>
          <a href="#hero" class="btn-secondary" style="font-size: 0.8rem; padding: 0.4rem 0.8rem;">&uarr; Back to Top</a>
        </div>
      </div>

      <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 1rem; border-top: 1px solid var(--border-subtle); padding-top: 1.5rem; font-size: 0.8rem;">
        <div>&copy; ${new Date().getFullYear()} Prabin Krishna M. All rights reserved. Titles & trademarks are property of their respective studios (YGT Gaming, Suribet, Ruby Seven Studios, GSN Games).</div>
        <div class="mono" style="color: var(--accent-cyan);">Powered by PixiJS v8 + Vite + TypeScript</div>
      </div>
    </div>
  `;

  container.appendChild(skillsSection);
  container.appendChild(contactSection);
  container.appendChild(footer);

  return container;
}
