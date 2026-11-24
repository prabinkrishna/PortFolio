import { TECHNICAL_RD } from '../data/portfolioData';

export function renderTechnicalRD(): HTMLElement {
  const section = document.createElement('section');
  section.id = 'technical-rd';
  section.className = 'portfolio-section';

  section.innerHTML = `
    <div class="container">
      <div class="section-head">
        <span class="section-tag">Engineering Innovation</span>
        <h2 class="section-title">Technical R&D & Systems Architecture</h2>
        <p class="section-desc">
          Pioneering game asset automation pipelines and rock-solid modular architectures that power zero-garbage collection 60 FPS gameplay.
        </p>
      </div>

      <!-- ComfyUI / SDXL / Flux Section -->
      <div class="glass-card rd-card" style="margin-bottom: 2.5rem;">
        <div style="display: flex; justify-content: space-between; align-items: flex-start; flex-wrap: wrap; gap: 1rem;">
          <div>
            <span class="rd-badge">${TECHNICAL_RD[0].badge}</span>
            <h3 class="rd-title">${TECHNICAL_RD[0].title}</h3>
            <div class="rd-tagline">${TECHNICAL_RD[0].tagline}</div>
          </div>
          <div style="background: rgba(0, 240, 255, 0.08); border: 1px solid rgba(0, 240, 255, 0.25); border-radius: 0.6rem; padding: 0.6rem 1rem;">
            <span style="font-size: 0.75rem; color: var(--text-muted); text-transform: uppercase;">Asset Turnaround</span>
            <div style="font-size: 1.25rem; font-weight: 800; color: var(--accent-cyan);" class="mono">3 Days &rarr; 45 Mins</div>
          </div>
        </div>

        <p class="rd-summary">${TECHNICAL_RD[0].summary}</p>

        <!-- Interactive Visual Node Diagram -->
        <div style="background: #080b13; border: 1px solid rgba(255,255,255,0.08); border-radius: 0.75rem; padding: 1.5rem; margin-bottom: 2rem;">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem;">
            <span style="font-size: 0.8rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em; color: #cbd5e1;">
              ⚡ End-to-End ComfyUI Automation Node Graph
            </span>
            <span style="font-size: 0.75rem; color: #a855f7; font-weight: 600;">Flux 1.0 + BiRefNet + MaxRects</span>
          </div>

          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); gap: 1rem;">
            <div style="background: rgba(15, 23, 42, 0.7); border: 1px solid #38bdf8; border-radius: 0.5rem; padding: 0.85rem;">
              <div style="font-size: 0.7rem; color: #38bdf8; font-weight: 700;">NODE 01</div>
              <div style="font-size: 0.9rem; font-weight: 700; margin: 0.2rem 0;">Conditioning & LoRA</div>
              <div style="font-size: 0.75rem; color: var(--text-muted);">Trained Slot Asset LoRA, SDXL/Flux Base</div>
            </div>

            <div style="background: rgba(15, 23, 42, 0.7); border: 1px solid #c084fc; border-radius: 0.5rem; padding: 0.85rem;">
              <div style="font-size: 0.7rem; color: #c084fc; font-weight: 700;">NODE 02</div>
              <div style="font-size: 0.9rem; font-weight: 700; margin: 0.2rem 0;">ControlNet Guides</div>
              <div style="font-size: 0.75rem; color: var(--text-muted);">Bounding box fit, 160x160 silhouette locks</div>
            </div>

            <div style="background: rgba(15, 23, 42, 0.7); border: 1px solid #f472b6; border-radius: 0.5rem; padding: 0.85rem;">
              <div style="font-size: 0.7rem; color: #f472b6; font-weight: 700;">NODE 03</div>
              <div style="font-size: 0.9rem; font-weight: 700; margin: 0.2rem 0;">Auto Alpha Matting</div>
              <div style="font-size: 0.75rem; color: var(--text-muted);">BiRefNet edge isolation, fringe removal</div>
            </div>

            <div style="background: rgba(15, 23, 42, 0.7); border: 1px solid #fbbf24; border-radius: 0.5rem; padding: 0.85rem;">
              <div style="font-size: 0.7rem; color: #fbbf24; font-weight: 700;">NODE 04</div>
              <div style="font-size: 0.9rem; font-weight: 700; margin: 0.2rem 0;">MaxRects Pack</div>
              <div style="font-size: 0.75rem; color: var(--text-muted);">Automated sprite atlas & JSON manifest</div>
            </div>

            <div style="background: rgba(15, 23, 42, 0.7); border: 1px solid #34d399; border-radius: 0.5rem; padding: 0.85rem;">
              <div style="font-size: 0.7rem; color: #34d399; font-weight: 700;">NODE 05</div>
              <div style="font-size: 0.9rem; font-weight: 700; margin: 0.2rem 0;">PixiJS Ingestion</div>
              <div style="font-size: 0.75rem; color: var(--text-muted);">Direct Assets.load() with mipmapping</div>
            </div>
          </div>
        </div>

        <!-- Pipeline Steps List -->
        <div class="pipeline-steps">
          ${TECHNICAL_RD[0].pipelineSteps
            .map(
              (step) => `
            <div class="pipeline-step-item">
              <div class="step-number">${step.step}</div>
              <div class="step-body">
                <h4>${step.title}</h4>
                <div class="step-tool">${step.tool}</div>
                <p>${step.description}</p>
              </div>
            </div>
          `
            )
            .join('')}
        </div>

        <!-- Measurable Benefits -->
        <div style="background: rgba(0,0,0,0.25); border-radius: 0.75rem; padding: 1.25rem; margin-bottom: 1.5rem;">
          <h4 style="font-size: 0.9rem; font-weight: 700; margin-bottom: 0.6rem; color: #fff;">Key Pipeline Achievements:</h4>
          <ul style="list-style: none; display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 0.6rem; font-size: 0.875rem; color: var(--text-muted);">
            ${TECHNICAL_RD[0].benefits.map((b) => `<li style="display: flex; gap: 0.5rem;"><span style="color: var(--accent-cyan);">✓</span> ${b}</li>`).join('')}
          </ul>
        </div>

        <!-- Code Snippet -->
        <div class="code-box">
          <div class="code-header">
            <span>${TECHNICAL_RD[0].codeSnippet?.filename}</span>
            <span style="font-size: 0.7rem; color: var(--accent-cyan); text-transform: uppercase;">TypeScript / PixiJS v8</span>
          </div>
          <pre class="code-body"><code>${escapeHtml(TECHNICAL_RD[0].codeSnippet?.code || '')}</code></pre>
        </div>
      </div>

      <!-- Modular PixiJS Architecture Section -->
      <div class="glass-card rd-card">
        <div style="display: flex; justify-content: space-between; align-items: flex-start; flex-wrap: wrap; gap: 1rem;">
          <div>
            <span class="rd-badge" style="background: rgba(0, 240, 255, 0.12); border-color: rgba(0, 240, 255, 0.35); color: var(--accent-cyan);">${TECHNICAL_RD[1].badge}</span>
            <h3 class="rd-title">${TECHNICAL_RD[1].title}</h3>
            <div class="rd-tagline">${TECHNICAL_RD[1].tagline}</div>
          </div>
          <div style="background: rgba(16, 185, 129, 0.08); border: 1px solid rgba(16, 185, 129, 0.25); border-radius: 0.6rem; padding: 0.6rem 1rem;">
            <span style="font-size: 0.75rem; color: var(--text-muted); text-transform: uppercase;">Garbage Collection</span>
            <div style="font-size: 1.25rem; font-weight: 800; color: #34d399;" class="mono">0 Allocation / Spin</div>
          </div>
        </div>

        <p class="rd-summary">${TECHNICAL_RD[1].summary}</p>

        <!-- Architecture Pillars -->
        <div class="pipeline-steps">
          ${TECHNICAL_RD[1].pipelineSteps
            .map(
              (step) => `
            <div class="pipeline-step-item" style="border-left-color: var(--accent-purple);">
              <div class="step-number" style="color: #c084fc;">${step.step}</div>
              <div class="step-body">
                <h4>${step.title}</h4>
                <div class="step-tool" style="color: var(--accent-cyan);">${step.tool}</div>
                <p>${step.description}</p>
              </div>
            </div>
          `
            )
            .join('')}
        </div>

        <!-- Code Snippet -->
        <div class="code-box">
          <div class="code-header">
            <span>${TECHNICAL_RD[1].codeSnippet?.filename}</span>
            <span style="font-size: 0.7rem; color: #a855f7; text-transform: uppercase;">TypeScript / Zero-GC Pattern</span>
          </div>
          <pre class="code-body"><code>${escapeHtml(TECHNICAL_RD[1].codeSnippet?.code || '')}</code></pre>
        </div>
      </div>
    </div>
  `;

  return section;
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}
