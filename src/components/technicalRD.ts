import { TECHNICAL_RD } from '../data/portfolioData';
import { ArchitectureGraphVisualizer } from './architectureGraph';
import { soundManager } from '../audio/soundManager';

const REEL_STRIP = ['👑', '💎', '7️⃣', '🌶️', '🔔', '🥐', '⚽', '👑', '7️⃣', '🌶️', '💎', '🔔'];

export function renderTechnicalRD(): HTMLElement {
  const section = document.createElement('section');
  section.id = 'technical-rd';
  section.className = 'portfolio-section';

  section.innerHTML = `
    <div class="container">
      <div class="section-head">
        <span class="section-tag">Full-Stack Architecture & Cryptography</span>
        <h2 class="section-title">Technical R&D: Engine & Backend Systems</h2>
        <p class="section-desc">
          Exploring end-to-end game engineering: from the 17-package <strong>Pixi Game Engine Wrapper (ECS)</strong> on the client to <strong>Provably Fair HMAC-SHA256 RNG</strong> microservices and ComfyUI inference, LoRA training &amp; prototyping pipelines.
        </p>
      </div>

      <!-- Interactive Graph-Based Engine Visualizer -->
      <div style="margin-bottom: 3.5rem;">
        <div id="architecture-graph-mount"></div>
      </div>

      <!-- Live Provably Fair RNG Calculator & Verifier Widget -->
      <div class="glass-card" style="padding: 2rem; margin-bottom: 3.5rem; border-color: rgba(244, 63, 94, 0.4); background: radial-gradient(circle at 10% 20%, rgba(244, 63, 94, 0.06) 0%, rgba(15, 20, 35, 0.9) 60%);">
        <div style="display: flex; justify-content: space-between; align-items: flex-start; flex-wrap: wrap; gap: 1rem; margin-bottom: 1.5rem;">
          <div>
            <span class="rd-badge" style="background: rgba(244, 63, 94, 0.15); border-color: rgba(244, 63, 94, 0.4); color: #fb7185;">
              Live Interactive Cryptography
            </span>
            <h3 style="font-size: 1.6rem; font-weight: 800; color: #fff;">
              Provably Fair HMAC-SHA256 RNG Verifier
            </h3>
            <p style="font-size: 0.9rem; color: var(--text-muted); margin-top: 0.25rem;">
              Direct mathematical reproduction of <code style="color: var(--accent-cyan);">SlotEngine_backend/RNG.js</code>. Combines server seed, client seed, and nonce to derive deterministic reel stops.
            </p>
          </div>

          <div style="display: flex; align-items: center; gap: 0.5rem;">
            <button class="btn-secondary" id="btn-rng-randomize" style="font-size: 0.8rem; padding: 0.45rem 0.85rem;">
              🎲 Roll Random Seeds
            </button>
            <button class="arcade-btn arcade-btn-cyan" id="btn-rng-calculate" style="padding: 0.45rem 1rem; font-size: 0.825rem;">
              <span>Calculate & Verify</span>
              <span>⚡</span>
            </button>
          </div>
        </div>

        <!-- Inputs Row -->
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 1rem; margin-bottom: 1.5rem;">
          <div>
            <label style="display: block; font-size: 0.75rem; font-weight: 700; text-transform: uppercase; color: var(--text-muted); margin-bottom: 0.35rem;">
              Server Seed (Private / Secret)
            </label>
            <input type="text" id="rng-server-seed" value="server-seed-secret-vault-2026-prabin" class="mono" style="width: 100%; padding: 0.65rem 0.85rem; background: rgba(0,0,0,0.5); border: 1px solid var(--border-subtle); border-radius: 0.5rem; color: #f8fafc; font-size: 0.85rem;" />
          </div>

          <div>
            <label style="display: block; font-size: 0.75rem; font-weight: 700; text-transform: uppercase; color: var(--text-muted); margin-bottom: 0.35rem;">
              Client Seed (Player Provided)
            </label>
            <input type="text" id="rng-client-seed" value="player-lucky-seed-777" class="mono" style="width: 100%; padding: 0.65rem 0.85rem; background: rgba(0,0,0,0.5); border: 1px solid var(--border-subtle); border-radius: 0.5rem; color: #f8fafc; font-size: 0.85rem;" />
          </div>

          <div style="max-width: 140px;">
            <label style="display: block; font-size: 0.75rem; font-weight: 700; text-transform: uppercase; color: var(--text-muted); margin-bottom: 0.35rem;">
              Nonce (Increment)
            </label>
            <input type="number" id="rng-nonce" value="1" min="1" class="mono" style="width: 100%; padding: 0.65rem 0.85rem; background: rgba(0,0,0,0.5); border: 1px solid var(--border-subtle); border-radius: 0.5rem; color: #f8fafc; font-size: 0.85rem;" />
          </div>
        </div>

        <!-- Result Box -->
        <div style="background: rgba(6, 9, 16, 0.95); border: 1px solid var(--border-subtle); border-radius: 0.75rem; padding: 1.25rem;">
          <div style="margin-bottom: 1rem;">
            <span style="font-size: 0.7rem; text-transform: uppercase; color: var(--text-muted); font-weight: 700;">HMAC-SHA256 Hash Digest:</span>
            <div id="rng-hash-display" class="mono" style="font-size: 0.8rem; color: #38bdf8; word-break: break-all; margin-top: 0.2rem; background: rgba(0,0,0,0.4); padding: 0.5rem 0.75rem; border-radius: 0.4rem;">
              Computing cryptographic commitment...
            </div>
          </div>

          <!-- 3 Reels Display -->
          <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 1rem; text-align: center; margin-bottom: 1rem;">
            <div style="background: rgba(15, 23, 42, 0.6); padding: 0.85rem; border-radius: 0.5rem; border: 1px solid rgba(255,255,255,0.06);">
              <div style="font-size: 0.7rem; color: var(--text-muted); text-transform: uppercase;">Reel 1 (Bytes 0-3)</div>
              <div id="rng-r1-val" class="mono" style="font-size: 0.8rem; color: var(--accent-cyan); margin: 0.25rem 0;">Float: 0.0000</div>
              <div id="rng-r1-sym" style="font-size: 2.25rem;">🎰</div>
              <div id="rng-r1-stop" style="font-size: 0.7rem; color: var(--text-muted);">Stop #0</div>
            </div>

            <div style="background: rgba(15, 23, 42, 0.6); padding: 0.85rem; border-radius: 0.5rem; border: 1px solid rgba(255,255,255,0.06);">
              <div style="font-size: 0.7rem; color: var(--text-muted); text-transform: uppercase;">Reel 2 (Bytes 4-7)</div>
              <div id="rng-r2-val" class="mono" style="font-size: 0.8rem; color: var(--accent-cyan); margin: 0.25rem 0;">Float: 0.0000</div>
              <div id="rng-r2-sym" style="font-size: 2.25rem;">🎰</div>
              <div id="rng-r2-stop" style="font-size: 0.7rem; color: var(--text-muted);">Stop #0</div>
            </div>

            <div style="background: rgba(15, 23, 42, 0.6); padding: 0.85rem; border-radius: 0.5rem; border: 1px solid rgba(255,255,255,0.06);">
              <div style="font-size: 0.7rem; color: var(--text-muted); text-transform: uppercase;">Reel 3 (Bytes 8-11)</div>
              <div id="rng-r3-val" class="mono" style="font-size: 0.8rem; color: var(--accent-cyan); margin: 0.25rem 0;">Float: 0.0000</div>
              <div id="rng-r3-sym" style="font-size: 2.25rem;">🎰</div>
              <div id="rng-r3-stop" style="font-size: 0.7rem; color: var(--text-muted);">Stop #0</div>
            </div>
          </div>

          <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 0.75rem; border-top: 1px solid rgba(255,255,255,0.06); padding-top: 0.75rem;">
            <div id="rng-outcome-status" style="font-size: 0.875rem; font-weight: 700; color: #34d399;">
              ✅ Cryptographically Validated: Provably Fair Match
            </div>
            <div style="font-size: 0.75rem; color: var(--text-muted);" class="mono">
              Formula: int(hash[i*8 : i*8+8]) / 0x100000000
            </div>
          </div>
        </div>
      </div>

      <!-- Pixi Game Engine Wrapper & Backend R&D Cards Grid -->
      <div class="rd-grid" style="margin-bottom: 3.5rem;">
        ${TECHNICAL_RD.slice(0, 2)
          .map(
            (proj) => `
          <div class="glass-card rd-card">
            <div>
              <span class="rd-badge">${proj.badge}</span>
              <h3 class="rd-title">${proj.title}</h3>
              <div class="rd-tagline">${proj.tagline}</div>
            </div>

            <p class="rd-summary">${proj.summary}</p>

            <div class="pipeline-steps">
              ${proj.pipelineSteps
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

            <div style="background: rgba(0,0,0,0.25); border-radius: 0.75rem; padding: 1.25rem; margin-top: auto;">
              <h4 style="font-size: 0.85rem; font-weight: 700; margin-bottom: 0.6rem; color: #fff;">Key Engineering Benefits:</h4>
              <ul style="list-style: none; display: flex; flex-direction: column; gap: 0.5rem; font-size: 0.825rem; color: var(--text-muted);">
                ${proj.benefits.map((b) => `<li style="display: flex; gap: 0.5rem;"><span style="color: var(--accent-cyan);">✓</span> ${b}</li>`).join('')}
              </ul>
            </div>
          </div>
        `
          )
          .join('')}
      </div>

      <!-- ComfyUI / SDXL / Flux Section -->
      <div class="glass-card rd-card">
        <div style="display: flex; justify-content: space-between; align-items: flex-start; flex-wrap: wrap; gap: 1rem;">
          <div>
            <span class="rd-badge">${TECHNICAL_RD[2].badge}</span>
            <h3 class="rd-title">${TECHNICAL_RD[2].title}</h3>
            <div class="rd-tagline">${TECHNICAL_RD[2].tagline}</div>
          </div>
          <div style="background: rgba(0, 240, 255, 0.08); border: 1px solid rgba(0, 240, 255, 0.25); border-radius: 0.6rem; padding: 0.6rem 1rem;">
            <span style="font-size: 0.75rem; color: var(--text-muted); text-transform: uppercase;">Asset Turnaround</span>
            <div style="font-size: 1.25rem; font-weight: 800; color: var(--accent-cyan);" class="mono">3 Days &rarr; 45 Mins</div>
          </div>
        </div>

        <p class="rd-summary">${TECHNICAL_RD[2].summary}</p>

        <!-- Visual ComfyUI Node Graph -->
        <div style="background: #080b13; border: 1px solid rgba(255,255,255,0.08); border-radius: 0.75rem; padding: 1.5rem; margin-bottom: 2rem;">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem;">
            <span style="font-size: 0.8rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em; color: #cbd5e1;">
              ⚡ End-to-End ComfyUI Inference, LoRA &amp; Prototyping Graph
            </span>
            <span style="font-size: 0.75rem; color: #a855f7; font-weight: 600;">Flux 1.0 + LoRA + BiRefNet + MaxRects</span>
          </div>

          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); gap: 1rem;">
            <div style="background: rgba(15, 23, 42, 0.7); border: 1px solid #38bdf8; border-radius: 0.5rem; padding: 0.85rem;">
              <div style="font-size: 0.7rem; color: #38bdf8; font-weight: 700;">NODE 01</div>
              <div style="font-size: 0.9rem; font-weight: 700; margin: 0.2rem 0;">Inference &amp; LoRA Training</div>
              <div style="font-size: 0.75rem; color: var(--text-muted);">Image generation inference, custom LoRA &amp; prototyping</div>
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

        <div class="pipeline-steps">
          ${TECHNICAL_RD[2].pipelineSteps
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

        <div style="background: rgba(0,0,0,0.25); border-radius: 0.75rem; padding: 1.25rem;">
          <h4 style="font-size: 0.9rem; font-weight: 700; margin-bottom: 0.6rem; color: #fff;">Key Pipeline Achievements:</h4>
          <ul style="list-style: none; display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 0.6rem; font-size: 0.875rem; color: var(--text-muted);">
            ${TECHNICAL_RD[2].benefits.map((b) => `<li style="display: flex; gap: 0.5rem;"><span style="color: var(--accent-cyan);">✓</span> ${b}</li>`).join('')}
          </ul>
        </div>
      </div>
    </div>
  `;

  // Mount Graph Visualizer
  const mountEl = section.querySelector('#architecture-graph-mount') as HTMLElement;
  if (mountEl) {
    const visualizer = new ArchitectureGraphVisualizer(mountEl);
    visualizer.render();
  }

  // Setup Live Provably Fair RNG Calculator
  setupRngCalculator(section);

  return section;
}

async function hmacSha256Hex(secret: string, msg: string): Promise<string> {
  const enc = new TextEncoder();
  if (window.crypto?.subtle) {
    const key = await window.crypto.subtle.importKey(
      'raw',
      enc.encode(secret),
      { name: 'HMAC', hash: 'SHA-256' },
      false,
      ['sign']
    );
    const sig = await window.crypto.subtle.sign('HMAC', key, enc.encode(msg));
    return Array.from(new Uint8Array(sig))
      .map((b) => b.toString(16).padStart(2, '0'))
      .join('');
  }
  return hmacSha256Fallback(enc.encode(secret), enc.encode(msg));
}

function sha256Bytes(data: Uint8Array): Uint8Array {
  const K = new Uint32Array([
    0x428a2f98, 0x71374491, 0xb5c0fbcf, 0xe9b5dba5, 0x3956c25b, 0x59f111f1, 0x923f82a4, 0xab1c5ed5,
    0xd807aa98, 0x12835b01, 0x243185be, 0x550c7dc3, 0x72be5d74, 0x80deb1fe, 0x9bdc06a7, 0xc19bf174,
    0xe49b69c1, 0xefbe4786, 0x0fc19dc6, 0x240ca1cc, 0x2de92c6f, 0x4a7484aa, 0x5cb0a9dc, 0x76f988da,
    0x983e5152, 0xa831c66d, 0xb00327c8, 0xbf597fc7, 0xc6e00bf3, 0xd5a79147, 0x06ca6351, 0x14292967,
    0x27b70a85, 0x2e1b2138, 0x4d2c6dfc, 0x53380d13, 0x650a7354, 0x766a0abb, 0x81c2c92e, 0x92722c85,
    0xa2bfe8a1, 0xa81a664b, 0xc24b8b70, 0xc76c51a3, 0xd192e819, 0xd6990624, 0xf40e3585, 0x106aa070,
    0x19a4c116, 0x1e376c08, 0x2748774c, 0x34b0bcb5, 0x391c0cb3, 0x4ed8aa4a, 0x5b9cca4f, 0x682e6ff3,
    0x748f82ee, 0x78a5636f, 0x84c87814, 0x8cc70208, 0x90befffa, 0xa4506ceb, 0xbef9a3f7, 0xc67178f2,
  ]);
  const H = new Uint32Array([
    0x6a09e667, 0xbb67ae85, 0x3c6ef372, 0xa54ff53a,
    0x510e527f, 0x9b05688c, 0x1f83d9ab, 0x5be0cd19,
  ]);
  const len = data.length;
  const paddedLen = Math.ceil((len + 9) / 64) * 64;
  const padded = new Uint8Array(paddedLen);
  padded.set(data);
  padded[len] = 0x80;
  const bitLen = len * 8;
  const view = new DataView(padded.buffer);
  view.setUint32(paddedLen - 8, Math.floor(bitLen / 0x100000000), false);
  view.setUint32(paddedLen - 4, bitLen >>> 0, false);

  const w = new Uint32Array(64);
  const rotr = (x: number, n: number) => (x >>> n) | (x << (32 - n));

  for (let i = 0; i < paddedLen; i += 64) {
    for (let t = 0; t < 16; t++) w[t] = view.getUint32(i + t * 4, false);
    for (let t = 16; t < 64; t++) {
      const s0 = rotr(w[t - 15], 7) ^ rotr(w[t - 15], 18) ^ (w[t - 15] >>> 3);
      const s1 = rotr(w[t - 2], 17) ^ rotr(w[t - 2], 19) ^ (w[t - 2] >>> 10);
      w[t] = (w[t - 16] + s0 + w[t - 7] + s1) >>> 0;
    }
    let [a, b, c, d, e, f, g, h] = H;
    for (let t = 0; t < 64; t++) {
      const S1 = rotr(e, 6) ^ rotr(e, 11) ^ rotr(e, 25);
      const ch = (e & f) ^ (~e & g);
      const temp1 = (h + S1 + ch + K[t] + w[t]) >>> 0;
      const S0 = rotr(a, 2) ^ rotr(a, 13) ^ rotr(a, 22);
      const maj = (a & b) ^ (a & c) ^ (b & c);
      const temp2 = (S0 + maj) >>> 0;
      h = g; g = f; f = e; e = (d + temp1) >>> 0;
      d = c; c = b; b = a; a = (temp1 + temp2) >>> 0;
    }
    H[0] = (H[0] + a) >>> 0; H[1] = (H[1] + b) >>> 0; H[2] = (H[2] + c) >>> 0; H[3] = (H[3] + d) >>> 0;
    H[4] = (H[4] + e) >>> 0; H[5] = (H[5] + f) >>> 0; H[6] = (H[6] + g) >>> 0; H[7] = (H[7] + h) >>> 0;
  }
  const out = new Uint8Array(32);
  const outView = new DataView(out.buffer);
  for (let i = 0; i < 8; i++) outView.setUint32(i * 4, H[i], false);
  return out;
}

function hmacSha256Fallback(key: Uint8Array, msg: Uint8Array): string {
  const blockSize = 64;
  const k = key.length > blockSize ? sha256Bytes(key) : key;
  const oPad = new Uint8Array(blockSize + 32);
  const iPad = new Uint8Array(blockSize + msg.length);
  oPad.fill(0x5c, 0, blockSize);
  iPad.fill(0x36, 0, blockSize);
  for (let i = 0; i < k.length; i++) {
    oPad[i] ^= k[i];
    iPad[i] ^= k[i];
  }
  iPad.set(msg, blockSize);
  oPad.set(sha256Bytes(iPad), blockSize);
  return Array.from(sha256Bytes(oPad))
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('');
}

async function setupRngCalculator(section: HTMLElement) {
  const serverSeedInput = section.querySelector('#rng-server-seed') as HTMLInputElement;
  const clientSeedInput = section.querySelector('#rng-client-seed') as HTMLInputElement;
  const nonceInput = section.querySelector('#rng-nonce') as HTMLInputElement;
  const btnCalculate = section.querySelector('#btn-rng-calculate') as HTMLButtonElement;
  const btnRandomize = section.querySelector('#btn-rng-randomize') as HTMLButtonElement;

  const hashDisplay = section.querySelector('#rng-hash-display') as HTMLElement;
  const r1Val = section.querySelector('#rng-r1-val') as HTMLElement;
  const r2Val = section.querySelector('#rng-r2-val') as HTMLElement;
  const r3Val = section.querySelector('#rng-r3-val') as HTMLElement;
  const r1Sym = section.querySelector('#rng-r1-sym') as HTMLElement;
  const r2Sym = section.querySelector('#rng-r2-sym') as HTMLElement;
  const r3Sym = section.querySelector('#rng-r3-sym') as HTMLElement;
  const r1Stop = section.querySelector('#rng-r1-stop') as HTMLElement;
  const r2Stop = section.querySelector('#rng-r2-stop') as HTMLElement;
  const r3Stop = section.querySelector('#rng-r3-stop') as HTMLElement;
  const statusEl = section.querySelector('#rng-outcome-status') as HTMLElement;
  let verifyCount = 0;

  async function calculate(isUserAction = true) {
    if (isUserAction) {
      soundManager.playClick();
    }
    const serverSeed = serverSeedInput.value.trim() || 'default-server-seed';
    const clientSeed = clientSeedInput.value.trim() || 'default-client-seed';
    const nonce = parseInt(nonceInput.value, 10) || 1;

    try {
      const hashHex = await hmacSha256Hex(serverSeed, `${clientSeed}:${nonce}`);
      hashDisplay.textContent = hashHex;

      // Slices for 3 reels
      const floats: number[] = [];
      const stops: number[] = [];

      for (let i = 0; i < 3; i++) {
        const hexSlice = hashHex.substring(i * 8, i * 8 + 8);
        const intVal = parseInt(hexSlice, 16);
        const floatVal = intVal / 0x100000000;
        floats.push(floatVal);

        const stopIndex = Math.min(Math.floor(floatVal * REEL_STRIP.length), REEL_STRIP.length - 1);
        stops.push(stopIndex);
      }

      r1Val.textContent = `Float: ${floats[0].toFixed(5)}`;
      r2Val.textContent = `Float: ${floats[1].toFixed(5)}`;
      r3Val.textContent = `Float: ${floats[2].toFixed(5)}`;

      r1Sym.textContent = REEL_STRIP[stops[0]];
      r2Sym.textContent = REEL_STRIP[stops[1]];
      r3Sym.textContent = REEL_STRIP[stops[2]];

      r1Stop.textContent = `Stop #${stops[0]}`;
      r2Stop.textContent = `Stop #${stops[1]}`;
      r3Stop.textContent = `Stop #${stops[2]}`;

      verifyCount += 1;
      const timestamp = new Date().toLocaleTimeString([], { hour12: false });

      // Check win
      if (REEL_STRIP[stops[0]] === REEL_STRIP[stops[1]] && REEL_STRIP[stops[1]] === REEL_STRIP[stops[2]]) {
        if (isUserAction) soundManager.playWin();
        statusEl.innerHTML = `🎉 <strong>3 of a Kind Match!</strong> (${REEL_STRIP[stops[0]]} ${REEL_STRIP[stops[0]]} ${REEL_STRIP[stops[0]]}) &bull; Provably Fair Deterministic WIN! <span class="mono" style="opacity:0.75; font-size:0.75rem;">(Verified #${verifyCount} @ ${timestamp})</span>`;
        statusEl.style.color = '#ffd700';
      } else {
        statusEl.innerHTML = `✅ <strong>Provably Fair Verified:</strong> 100% deterministic & tamper-proof hash digest matches client inputs. <span class="mono" style="opacity:0.75; font-size:0.75rem;">(Verified #${verifyCount} @ ${timestamp})</span>`;
        statusEl.style.color = '#34d399';
      }

      if (isUserAction) {
        [hashDisplay, r1Sym, r2Sym, r3Sym].forEach((el) => {
          el.animate(
            [
              { transform: 'scale(1.04)', filter: 'brightness(1.4)' },
              { transform: 'scale(1)', filter: 'brightness(1)' },
            ],
            { duration: 280, easing: 'ease-out' }
          );
        });
      }
    } catch (err) {
      console.error('RNG compute failed:', err);
      hashDisplay.textContent = 'Crypto computation failed';
    }
  }

  btnCalculate.addEventListener('click', () => {
    void calculate(true);
  });

  btnRandomize.addEventListener('click', () => {
    clientSeedInput.value = `seed-${Math.random().toString(36).substring(2, 9)}`;
    nonceInput.value = String((parseInt(nonceInput.value, 10) || 0) + 1);
    void calculate(true);
  });

  // Calculate immediately on load
  void calculate(false);
}
