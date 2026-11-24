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
        <h2 class="section-title">Core Engine & Engineering Skills</h2>
        <p class="section-desc">
          Deep expertise across modern browser graphics, high-frequency game loops, memory profiling, and automated AI generation pipelines.
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
        <span class="section-tag">Let's Build Something Extraordinary</span>
        <h2 class="section-title">About Prabin & Contact</h2>
        <p class="section-desc">
          Available for senior game developer roles, technical consultations on PixiJS/WebGL architecture, and high-performance casino game development.
        </p>
      </div>

      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(360px, 1fr)); gap: 2.5rem; align-items: start;">
        <!-- Bio Card -->
        <div class="glass-card" style="padding: 2.25rem;">
          <div style="display: flex; align-items: center; gap: 1.25rem; margin-bottom: 1.5rem;">
            <div style="width: 4rem; height: 4rem; border-radius: 1rem; background: linear-gradient(135deg, var(--accent-cyan), var(--accent-purple)); display: flex; align-items: center; justify-content: center; font-size: 2rem; box-shadow: 0 0 20px rgba(0, 240, 255, 0.3);">
              👨‍💻
            </div>
            <div>
              <h3 style="font-size: 1.5rem; font-weight: 800;">Prabin Krishna M</h3>
              <p style="color: var(--accent-cyan); font-weight: 600; font-size: 0.9rem;">Senior Game Developer & Graphics Engineer</p>
            </div>
          </div>

          <p style="color: #cbd5e1; font-size: 0.95rem; line-height: 1.65; margin-bottom: 1.25rem;">
            Senior HTML5 game developer with extensive commercial experience building high-stakes social casino, slot, and arcade games. Specializing in PixiJS v8, WebGL/WebGPU shaders, sub-frame input responsiveness, and zero-allocation memory pooling.
          </p>

          <p style="color: var(--text-muted); font-size: 0.9rem; line-height: 1.6; margin-bottom: 1.75rem;">
            Passionate about modern developer tooling, automated generative AI pipelines (ComfyUI / SDXL / Flux), and pushing browser gaming performance to native 60–120 FPS standards.
          </p>

          <div style="display: flex; flex-direction: column; gap: 0.75rem; font-size: 0.9rem;">
            <div style="display: flex; align-items: center; gap: 0.75rem;">
              <span style="color: var(--accent-cyan); font-size: 1.1rem;">📍</span>
              <span>Remote / Worldwide Availability</span>
            </div>
            <div style="display: flex; align-items: center; gap: 0.75rem;">
              <span style="color: var(--accent-cyan); font-size: 1.1rem;">💼</span>
              <span>Senior Game Developer / Tech Lead</span>
            </div>
            <div style="display: flex; align-items: center; gap: 0.75rem;">
              <span style="color: var(--accent-cyan); font-size: 1.1rem;">⚡</span>
              <span>PixiJS v8, TypeScript, WebGL, ComfyUI</span>
            </div>
          </div>
        </div>

        <!-- Contact Form Card -->
        <div class="glass-card" style="padding: 2.25rem;">
          <h3 style="font-size: 1.35rem; font-weight: 800; margin-bottom: 1.25rem;">Send a Message</h3>
          
          <form id="contact-form" style="display: flex; flex-direction: column; gap: 1.2rem;">
            <div>
              <label style="display: block; font-size: 0.8rem; font-weight: 600; color: var(--text-muted); margin-bottom: 0.4rem; text-transform: uppercase;">
                Your Name
              </label>
              <input type="text" id="contact-name" required placeholder="e.g. Alex Morgan" style="width: 100%; padding: 0.75rem 1rem; background: rgba(0,0,0,0.4); border: 1px solid var(--border-subtle); border-radius: 0.5rem; color: #fff; font-family: inherit; font-size: 0.95rem;" />
            </div>

            <div>
              <label style="display: block; font-size: 0.8rem; font-weight: 600; color: var(--text-muted); margin-bottom: 0.4rem; text-transform: uppercase;">
                Email Address
              </label>
              <input type="email" id="contact-email" required placeholder="alex@studio.com" style="width: 100%; padding: 0.75rem 1rem; background: rgba(0,0,0,0.4); border: 1px solid var(--border-subtle); border-radius: 0.5rem; color: #fff; font-family: inherit; font-size: 0.95rem;" />
            </div>

            <div>
              <label style="display: block; font-size: 0.8rem; font-weight: 600; color: var(--text-muted); margin-bottom: 0.4rem; text-transform: uppercase;">
                Project or Inquiry Details
              </label>
              <textarea id="contact-message" rows="4" required placeholder="Tell me about your upcoming game project, slot engine requirement, or engineering role..." style="width: 100%; padding: 0.75rem 1rem; background: rgba(0,0,0,0.4); border: 1px solid var(--border-subtle); border-radius: 0.5rem; color: #fff; font-family: inherit; font-size: 0.95rem; resize: vertical;"></textarea>
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
          <div style="font-size: 0.85rem; color: var(--text-muted);">Senior Game Developer &bull; PixiJS v8 &bull; ComfyUI/SDXL/Flux &bull; WebGL</div>
        </div>

        <div style="display: flex; align-items: center; gap: 1rem;">
          <a href="#hero" class="btn-secondary" style="font-size: 0.8rem; padding: 0.4rem 0.8rem;">&uarr; Back to Top</a>
        </div>
      </div>

      <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 1rem; border-top: 1px solid var(--border-subtle); padding-top: 1.5rem; font-size: 0.8rem;">
        <div>&copy; ${new Date().getFullYear()} Prabin Krishna M. All rights reserved. Shipped titles are property of their respective studios.</div>
        <div class="mono" style="color: var(--accent-cyan);">Powered by PixiJS v8 + Vite + TypeScript</div>
      </div>
    </div>
  `;

  container.appendChild(skillsSection);
  container.appendChild(contactSection);
  container.appendChild(footer);

  return container;
}

