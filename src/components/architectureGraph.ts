import { soundManager } from '../audio/soundManager';

export interface GraphNode {
  id: string;
  label: string;
  sublabel: string;
  category: 'core' | 'flow' | 'feature' | 'render' | 'network';
  x: number;
  y: number;
  description: string;
  responsibilities: string[];
  inputs: string[];
  outputs: string[];
  metrics: string;
}

export interface GraphEdge {
  from: string;
  to: string;
  label?: string;
  condition?: string;
}

export interface GraphPreset {
  id: string;
  name: string;
  subtitle: string;
  nodes: GraphNode[];
  edges: GraphEdge[];
  simulationSteps?: string[];
}

export const STATE_MACHINE_PRESET: GraphPreset = {
  id: 'state-machine',
  name: 'Hierarchical State Machine Flow',
  subtitle: 'Condition-based recursive FSM orchestrating reel cycles, bonus loops, and win presentations',
  nodes: [
    {
      id: 'AWAKE',
      label: 'AWAKE',
      sublabel: 'Lifecycle Boot',
      category: 'core',
      x: 80,
      y: 190,
      description: 'Initial boot phase. Loads baseline game definitions, initializes viewport parameters, and establishes socket handshake.',
      responsibilities: [
        'Awaits INITIAL_INFO_LOADED server signal',
        'Populates immutable SlotGameData',
        'Validates player credentials & initial balance',
      ],
      inputs: ['Game Bootstrap', 'Socket Handshake'],
      outputs: ['INITIALIZE'],
      metrics: 'Executes in < 50ms',
    },
    {
      id: 'INITIALIZE',
      label: 'INITIALIZE',
      sublabel: 'Asset Prewarm',
      category: 'core',
      x: 230,
      y: 190,
      description: 'Pre-warms symbol sprite pools, loads spine skeletons, and compiles GLSL custom shaders.',
      responsibilities: [
        'Awaits splash completion & texture atlases',
        'Mounts YKSlotScene into YKSceneManager',
        'Instantiates pooled visual entities to eliminate runtime GC',
      ],
      inputs: ['AWAKE'],
      outputs: ['LOADED'],
      metrics: 'Zero runtime allocations',
    },
    {
      id: 'LOADED',
      label: 'LOADED',
      sublabel: 'Resume Router',
      category: 'flow',
      x: 380,
      y: 190,
      description: 'Evaluates persisted game state to determine whether to resume interrupted bonus sessions, gamble rounds, or idle.',
      responsibilities: [
        'Checks for pending FreeSpins / Hold & Spin features',
        'Validates uncollected gamble state',
        'Transitions to IDLE if no session restore needed',
      ],
      inputs: ['INITIALIZE'],
      outputs: ['IDLE', 'FEATURE', 'GAMBLE'],
      metrics: 'Deterministic state restore',
    },
    {
      id: 'IDLE',
      label: 'IDLE',
      sublabel: 'User Await Loop',
      category: 'flow',
      x: 530,
      y: 190,
      description: 'Primary interactive state. Listens for user bet modifications, line configuration, sound settings, and spin triggers.',
      responsibilities: [
        'Validates balance before initiating bet deduction',
        'Dispatches SPIN_START / AUTO_SPIN_START events',
        'Maintains subtle idle ambient symbol animations',
      ],
      inputs: ['LOADED', 'ALL_WIN', 'WIN', 'GAMBLE', 'FEATURE'],
      outputs: ['SPIN'],
      metrics: 'Instant input response < 8ms',
    },
    {
      id: 'SPIN',
      label: 'SPIN',
      sublabel: 'Reel Physics & RNG',
      category: 'flow',
      x: 690,
      y: 190,
      description: 'Dispatches spin payload to game server, launches reel acceleration physics, blur filters, and handles anticipation delays.',
      responsibilities: [
        'Sends ygtgame-spin socket payload with cryptographic seed',
        'Executes staggered reel spin loops with motion blur passes',
        'Handles instant quick-stop interrupts and server response timeouts',
      ],
      inputs: ['IDLE'],
      outputs: ['BIG_WIN', 'ALL_WIN', 'FEATURE', 'IDLE'],
      metrics: '60 FPS with motion blur shader',
    },
    {
      id: 'BIG_WIN',
      label: 'BIG WIN',
      sublabel: 'Celebration Sequence',
      category: 'feature',
      x: 870,
      y: 90,
      description: 'Triggered when payout multiplier exceeds Big Win threshold (e.g. 20x+). Launches cinematic spine popup and coin particle emitters.',
      responsibilities: [
        'Lazy-loads Big Win spine assets without blocking main thread',
        'Increments rolling counter with dynamic WebAudio pitch shift',
        'Listens for user screen tap to skip celebration sequence',
      ],
      inputs: ['SPIN', 'FEATURE'],
      outputs: ['ALL_WIN', 'IDLE'],
      metrics: '2,500 particles @ 60 FPS',
    },
    {
      id: 'FEATURE',
      label: 'FEATURE (Bonus)',
      sublabel: 'Recursive Substate',
      category: 'feature',
      x: 690,
      y: 330,
      description: 'Autonomous nested state machine managing Free Spins, Wheel Bonus, Hold & Spin, and Expanding Wilds with independent sub-cycles.',
      responsibilities: [
        'Spawns secondary FreeSpinMachine with dedicated reel configs',
        'Tracks remaining attempts and accumulating bonus multipliers',
        'Displays start / retrigger / completion popup overlays',
      ],
      inputs: ['SPIN', 'LOADED'],
      outputs: ['BIG_WIN', 'ALL_WIN', 'IDLE'],
      metrics: 'Modular plugin interface',
    },
    {
      id: 'ALL_WIN',
      label: 'ALL WIN',
      sublabel: 'Total Payline Burst',
      category: 'render',
      x: 870,
      y: 290,
      description: 'Simultaneously highlights all winning symbol clusters with glow shaders, audio clacks, and win ticker meter animation.',
      responsibilities: [
        'Highlights winning payline trajectories',
        'Animates winning symbols with customized Spine skeleton loops',
        'Auto-collects if auto-spin is active or awaits user interaction',
      ],
      inputs: ['SPIN', 'BIG_WIN', 'FEATURE'],
      outputs: ['WIN', 'GAMBLE', 'IDLE'],
      metrics: 'Synchronized audio/visual triggers',
    },
    {
      id: 'WIN',
      label: 'WIN (Cycle)',
      sublabel: 'Line-by-Line Tour',
      category: 'render',
      x: 1020,
      y: 290,
      description: 'Iterates sequentially through individual winning paylines (Line 1 -> Line 7 -> Line 14) showing symbol pay table values.',
      responsibilities: [
        'Isolates each win line with darkened dimming underlay',
        'Displays symbol count, wild multipliers, and line payout value',
        'Loops continuously until next spin trigger or win collect',
      ],
      inputs: ['ALL_WIN'],
      outputs: ['WIN', 'GAMBLE', 'IDLE'],
      metrics: 'Smooth cyclical playback',
    },
    {
      id: 'GAMBLE',
      label: 'GAMBLE',
      sublabel: 'Double-Up Feature',
      category: 'flow',
      x: 1020,
      y: 190,
      description: 'Optional double-or-nothing card / coin flip mini-game allowing players to risk their spin payout for multiplied rewards.',
      responsibilities: [
        'Interacts with server gamble endpoint',
        'Displays historical card ladder and probability stats',
        'Collects or busts payout before returning to IDLE',
      ],
      inputs: ['ALL_WIN', 'WIN', 'LOADED'],
      outputs: ['IDLE'],
      metrics: 'Sub-second settlement',
    },
  ],
  edges: [
    { from: 'AWAKE', to: 'INITIALIZE', label: 'info_loaded' },
    { from: 'INITIALIZE', to: 'LOADED', label: 'assets_ready' },
    { from: 'LOADED', to: 'IDLE', label: 'default' },
    { from: 'LOADED', to: 'FEATURE', label: 'resume_bonus' },
    { from: 'IDLE', to: 'SPIN', label: 'spin_start' },
    { from: 'SPIN', to: 'BIG_WIN', label: 'multiplier >= 20x' },
    { from: 'SPIN', to: 'ALL_WIN', label: 'has_wins' },
    { from: 'SPIN', to: 'FEATURE', label: 'scatter_trigger' },
    { from: 'SPIN', to: 'IDLE', label: 'no_win' },
    { from: 'BIG_WIN', to: 'ALL_WIN', label: 'celebration_done' },
    { from: 'FEATURE', to: 'BIG_WIN', label: 'bonus_big_win' },
    { from: 'FEATURE', to: 'ALL_WIN', label: 'bonus_complete' },
    { from: 'ALL_WIN', to: 'WIN', label: 'cycle_lines' },
    { from: 'ALL_WIN', to: 'IDLE', label: 'collect_win' },
    { from: 'ALL_WIN', to: 'GAMBLE', label: 'gamble_opt' },
    { from: 'WIN', to: 'IDLE', label: 'new_spin' },
    { from: 'GAMBLE', to: 'IDLE', label: 'finish' },
  ],
  simulationSteps: ['IDLE', 'SPIN', 'BIG_WIN', 'ALL_WIN', 'WIN', 'IDLE'],
};

export const SUBSYSTEM_TIER_PRESET: GraphPreset = {
  id: 'subsystem-tier',
  name: '4-Tier Architectural Subsystem Hierarchy',
  subtitle: 'Decoupled architectural boundaries enforcing strict unidirectional dependencies',
  nodes: [
    {
      id: 'GAME_TIER',
      label: 'GAME LAYER',
      sublabel: 'FinalWhistle / Title Specs',
      category: 'core',
      x: 180,
      y: 90,
      description: 'Game-specific business logic, theme configuration, audio manifests, symbol definitions, and title-specific scenes.',
      responsibilities: [
        'Configures 5-reel / 3-row layout coordinates and symbol indices',
        'Binds game-specific features (Dice Rolls, Free Spins, Expanding Wilds, Gothic VFX)',
        'Extends base YKSlotScene with custom UI styling',
      ],
      inputs: ['Studio Theme Design', 'Slot Math Specs'],
      outputs: ['SLOT_ENGINE_TIER'],
      metrics: 'New game theme in < 3 days',
    },
    {
      id: 'SLOT_ENGINE_TIER',
      label: 'SLOT ENGINE',
      sublabel: '@ygt-game-engine/slot-engine',
      category: 'flow',
      x: 180,
      y: 210,
      description: 'Reusable slot machine orchestrator, recursive state machine, reel managers, payline solvers, and win presentation engines.',
      responsibilities: [
        'YKSlotMachine & YKSlotEngine state management',
        'YKSlotReelManager handling reel strip physics & anticipation',
        'Feature handlers (Expanding Wilds, Nudge, Cascades, FreeSpinMachine)',
      ],
      inputs: ['GAME_TIER'],
      outputs: ['PIXI_ENGINE_TIER'],
      metrics: 'Zero GC memory allocation pattern',
    },
    {
      id: 'PIXI_ENGINE_TIER',
      label: 'PIXI CORE FRAMEWORK',
      sublabel: '@ygt-game-engine/pixi-engine',
      category: 'render',
      x: 180,
      y: 330,
      description: 'High-performance rendering foundation, responsive viewport scaling, JSON layout generators, tween engines, and network pipelines.',
      responsibilities: [
        'YKApplication & YKViewport responsive virtual resolution',
        'YKSceneManager handling layered z-index scene stacks',
        'YKWebRequest & YKSocketIORequest event pairing',
      ],
      inputs: ['SLOT_ENGINE_TIER'],
      outputs: ['SHARED_LIB_TIER'],
      metrics: 'Cross-device scaling 9:16 to 21:9',
    },
    {
      id: 'SHARED_LIB_TIER',
      label: 'HARDWARE & RUNTIME',
      sublabel: 'PixiJS v8 · WebGL · WebGPU · Spine',
      category: 'network',
      x: 180,
      y: 440,
      description: 'Unified third-party wrapper: PixiJS v8 engine, Spine 2D runtimes, WebAudio API, RevoltFX particle engine, and Tween.js.',
      responsibilities: [
        'Hardware-accelerated sprite batching & WebGPU/WebGL render pipelines',
        'Real-time spine bone matrix transformations',
        'Procedural and spatial WebAudio node synthesis',
      ],
      inputs: ['PIXI_ENGINE_TIER'],
      outputs: ['GPU & Display'],
      metrics: 'Locked 60–120 FPS output',
    },
    {
      id: 'FEATURE_PLUGINS',
      label: 'FEATURE PLUGINS',
      sublabel: 'Modular Mechanics',
      category: 'feature',
      x: 580,
      y: 210,
      description: 'Plug-and-play feature modules: Expanding Wilds, Walking Wilds, Sticky Symbols, Nudge, Cascades, and Spin Wheels.',
      responsibilities: [
        'Dynamic symbol mutation during spin resolution',
        'Secondary sub-reels and bonus wheel overlays',
        'Isolated animation managers with zero engine coupling',
      ],
      inputs: ['SLOT_ENGINE_TIER'],
      outputs: ['PIXI_ENGINE_TIER'],
      metrics: '8+ modular slot features',
    },
    {
      id: 'NETWORK_BUS',
      label: 'NETWORK & SOCKET BUS',
      sublabel: 'Deterministic RNG Sync',
      category: 'network',
      x: 580,
      y: 330,
      description: 'Event-paired WebSocket & HTTP layer verifying regulatory compliant server seed outcomes and error fallbacks.',
      responsibilities: [
        'Handles session timeout, reconnects, and offline detection',
        'Streams real-time progressive jackpot meters',
        'Cryptographically validates server payline returns',
      ],
      inputs: ['Game Server Socket.IO'],
      outputs: ['SLOT_ENGINE_TIER'],
      metrics: 'Sub-20ms round-trip latency',
    },
  ],
  edges: [
    { from: 'GAME_TIER', to: 'SLOT_ENGINE_TIER', label: 'implements' },
    { from: 'SLOT_ENGINE_TIER', to: 'PIXI_ENGINE_TIER', label: 'orchestrates' },
    { from: 'PIXI_ENGINE_TIER', to: 'SHARED_LIB_TIER', label: 'renders' },
    { from: 'SLOT_ENGINE_TIER', to: 'FEATURE_PLUGINS', label: 'activates' },
    { from: 'PIXI_ENGINE_TIER', to: 'NETWORK_BUS', label: 'transmits' },
    { from: 'NETWORK_BUS', to: 'SLOT_ENGINE_TIER', label: 'syncs_state' },
  ],
};

export const PROVABLY_FAIR_RNG_PRESET: GraphPreset = {
  id: 'provably-fair-rng',
  name: 'Provably Fair HMAC-SHA256 RNG & Full-Stack Data Flow',
  subtitle: 'Cryptographic client-server seed pairing, deterministic float slices, and real-time Socket.IO spin protocol',
  nodes: [
    {
      id: 'CLIENT_SPIN',
      label: 'PIXI CLIENT',
      sublabel: 'Spin Trigger & Seeds',
      category: 'core',
      x: 80,
      y: 190,
      description: 'Client triggers spin with active bet, player clientSeed, and incremental nonce via Socket.IO/REST.',
      responsibilities: [
        'Collects client-selected bet amount & paylines',
        'Generates clientSeed (browser crypto.getRandomValues)',
        'Tracks monotonic nonce sequence to guarantee unique outcomes',
      ],
      inputs: ['Player Interaction'],
      outputs: ['SOCKET_GATEWAY'],
      metrics: 'Sub-1ms payload generation',
    },
    {
      id: 'SOCKET_GATEWAY',
      label: 'SOCKET.IO GATEWAY',
      sublabel: 'Session & Auth Filter',
      category: 'network',
      x: 230,
      y: 190,
      description: 'Authenticates player JWT session, enforces rate-limiting, and locks player balance in Redis before RNG evaluation.',
      responsibilities: [
        'Validates JWT credentials and active session token',
        'Acquires distributed balance mutex in Redis',
        'Pairs request event `ygtgame-spin` with response ack',
      ],
      inputs: ['CLIENT_SPIN'],
      outputs: ['HMAC_RNG'],
      metrics: '< 4ms WebSocket transit',
    },
    {
      id: 'HMAC_RNG',
      label: 'HMAC-SHA256 RNG',
      sublabel: 'Cryptographic Core',
      category: 'flow',
      x: 390,
      y: 190,
      description: 'Generates deterministic 64-hex SHA-256 hash by combining secret serverSeed with message `${clientSeed}:${nonce}`.',
      responsibilities: [
        'Applies HMAC-SHA256 using server private key seed',
        'Ensures mathematical impossibility of outcome tampering',
        'Stores revealed hash commitment for later public verification',
      ],
      inputs: ['SOCKET_GATEWAY'],
      outputs: ['FLOAT_SLICER'],
      metrics: '100% Deterministic & Provably Fair',
    },
    {
      id: 'FLOAT_SLICER',
      label: '32-BIT NORMALIZER',
      sublabel: 'Uniform Float [0, 1)',
      category: 'flow',
      x: 550,
      y: 190,
      description: 'Extracts consecutive 8-hex character substrings (4 bytes each), parsing into 32-bit integers divided by 0x100000000.',
      responsibilities: [
        'Parses 8-hex chunks into 32-bit unsigned integers',
        'Normalizes integer to float: 0 <= float < 1',
        'Provides uniform random floats for each reel strip',
      ],
      inputs: ['HMAC_RNG'],
      outputs: ['REEL_MAPPER'],
      metrics: 'Uniform distribution chi-square passed',
    },
    {
      id: 'REEL_MAPPER',
      label: 'REEL MAPPER',
      sublabel: 'Strip Stop Indexer',
      category: 'render',
      x: 710,
      y: 190,
      description: 'Maps floats to exact reel stop positions: stopIndex = floor(float * stripLength). Constructs 3x3 view matrix.',
      responsibilities: [
        'Computes stopIndex = min(floor(float * len), len - 1)',
        'Resolves adjacent wrap-around top and bottom row symbols',
        'Builds 3x3 symbol matrix view for payline evaluation',
      ],
      inputs: ['FLOAT_SLICER'],
      outputs: ['PAYLINE_SOLVER'],
      metrics: '< 0.5ms matrix compilation',
    },
    {
      id: 'PAYLINE_SOLVER',
      label: 'PAYLINE SOLVER',
      sublabel: 'Math Engine & RTP',
      category: 'feature',
      x: 880,
      y: 190,
      description: 'Evaluates paylines against paytable. Detects 3-of-a-kind, scatters, wilds, and computes final payout multiplier.',
      responsibilities: [
        'Matches payline vectors against PAYTABLE definitions',
        'Calculates total win = bet * winMultiplier',
        'Triggers bonus game / free-spin flags if scatters match',
      ],
      inputs: ['REEL_MAPPER'],
      outputs: ['REDIS_POSTGRES', 'VERIFY_AUDIT'],
      metrics: 'Compliant with target RTP (e.g. 96.5%)',
    },
    {
      id: 'REDIS_POSTGRES',
      label: 'STATE & LEDGER',
      sublabel: 'Redis Mutex + PostgreSQL',
      category: 'network',
      x: 710,
      y: 330,
      description: 'Atomic balance deduction, win credit, spin journal entry, and real-time ledger recording for financial auditability.',
      responsibilities: [
        'Atomically updates wallet balance via SQL transaction',
        'Persists spin audit payload (serverSeed, clientSeed, nonce, stops, payout)',
        'Releases Redis balance mutex lock',
      ],
      inputs: ['PAYLINE_SOLVER'],
      outputs: ['SOCKET_GATEWAY'],
      metrics: 'ACID compliant financial logging',
    },
    {
      id: 'VERIFY_AUDIT',
      label: 'PUBLIC VERIFIER',
      sublabel: '/api/v1/verification',
      category: 'core',
      x: 880,
      y: 330,
      description: 'Independent verification API. Players paste revealed seeds and nonce to recreate the exact hash and reel matrix.',
      responsibilities: [
        'Accepts serverSeed, clientSeed, nonce',
        'Recalculates HMAC-SHA256 and proves zero tampering',
        'Returns reproducible reel view & payout verification',
      ],
      inputs: ['PAYLINE_SOLVER'],
      outputs: ['CLIENT_SPIN'],
      metrics: 'Public zero-trust transparency',
    },
  ],
  edges: [
    { from: 'CLIENT_SPIN', to: 'SOCKET_GATEWAY', label: 'spin_request' },
    { from: 'SOCKET_GATEWAY', to: 'HMAC_RNG', label: 'auth_locked' },
    { from: 'HMAC_RNG', to: 'FLOAT_SLICER', label: 'sha256_hash' },
    { from: 'FLOAT_SLICER', to: 'REEL_MAPPER', label: 'float_array' },
    { from: 'REEL_MAPPER', to: 'PAYLINE_SOLVER', label: '3x3_matrix' },
    { from: 'PAYLINE_SOLVER', to: 'REDIS_POSTGRES', label: 'commit_tx' },
    { from: 'PAYLINE_SOLVER', to: 'VERIFY_AUDIT', label: 'audit_log' },
    { from: 'REDIS_POSTGRES', to: 'SOCKET_GATEWAY', label: 'ack_payload' },
    { from: 'SOCKET_GATEWAY', to: 'CLIENT_SPIN', label: 'render_spin' },
  ],
  simulationSteps: [
    'CLIENT_SPIN',
    'SOCKET_GATEWAY',
    'HMAC_RNG',
    'FLOAT_SLICER',
    'REEL_MAPPER',
    'PAYLINE_SOLVER',
    'REDIS_POSTGRES',
    'VERIFY_AUDIT',
    'CLIENT_SPIN',
  ],
};

export class ArchitectureGraphVisualizer {
  private container: HTMLElement;
  private currentPreset: GraphPreset = STATE_MACHINE_PRESET;
  private selectedNode: GraphNode | null = null;
  private simulationIndex = 0;
  private isSimulating = false;
  private simTimer: number | null = null;

  constructor(container: HTMLElement) {
    this.container = container;
  }

  public render() {
    this.container.innerHTML = `
      <div style="background: #090c15; border: 1px solid var(--border-subtle); border-radius: 1.25rem; overflow: hidden; box-shadow: 0 20px 50px rgba(0,0,0,0.6);">
        <!-- Header Controls -->
        <div style="display: flex; justify-content: space-between; align-items: center; padding: 1.25rem 1.75rem; background: rgba(15, 20, 35, 0.7); border-bottom: 1px solid var(--border-subtle); flex-wrap: wrap; gap: 1rem;">
          <div>
            <div style="font-size: 0.75rem; font-weight: 700; text-transform: uppercase; color: var(--accent-cyan); letter-spacing: 0.08em;">
              Interactive Graph Engine
            </div>
            <h3 id="graph-preset-title" style="font-size: 1.25rem; font-weight: 800; color: #fff;">
              ${this.currentPreset.name}
            </h3>
            <p id="graph-preset-subtitle" style="font-size: 0.825rem; color: var(--text-muted);">
              ${this.currentPreset.subtitle}
            </p>
          </div>

          <div style="display: flex; align-items: center; gap: 0.6rem; flex-wrap: wrap;">
            <!-- View Selector Tabs -->
            <button class="btn-mode active" id="btn-view-fsm" style="padding: 0.5rem 0.9rem; font-size: 0.8rem;">
              🔄 State Machine Graph
            </button>
            <button class="btn-mode" id="btn-view-tiers" style="padding: 0.5rem 0.9rem; font-size: 0.8rem;">
              🏛️ 4-Tier Subsystems
            </button>
            <button class="btn-mode" id="btn-view-rng" style="padding: 0.5rem 0.9rem; font-size: 0.8rem;">
              🎲 Provably Fair RNG Flow
            </button>

            <!-- Simulation Action -->
            <button class="arcade-btn arcade-btn-cyan" id="btn-simulate-spin" style="padding: 0.5rem 1rem; font-size: 0.8rem; height: 34px;">
              <span>▶ Run Lifecycle Sim</span>
            </button>
          </div>
        </div>

        <!-- Visual Canvas & Inspector Layout -->
        <div style="display: grid; grid-template-columns: 1fr 340px; min-height: 480px; position: relative;">
          <!-- SVG Graph Area -->
          <div id="svg-graph-viewport" style="position: relative; overflow: auto; background: radial-gradient(circle at center, #0e1424 0%, #060810 100%); cursor: grab;">
            <svg id="architecture-svg" width="1120" height="520" style="display: block;"></svg>
          </div>

          <!-- Node Inspector Drawer -->
          <div id="node-inspector-panel" style="background: rgba(11, 15, 25, 0.95); border-left: 1px solid var(--border-subtle); padding: 1.5rem; display: flex; flex-direction: column; overflow-y: auto;">
            <div style="font-size: 0.75rem; text-transform: uppercase; color: var(--accent-cyan); font-weight: 700; letter-spacing: 0.05em; margin-bottom: 0.5rem;">
              Subsystem Inspector
            </div>
            <div id="inspector-content">
              <p style="font-size: 0.85rem; color: var(--text-muted); line-height: 1.5;">
                💡 <em>Click any node in the architecture graph to inspect its execution lifecycle, responsibilities, state contracts, and zero-GC performance metrics.</em>
              </p>
            </div>
          </div>
        </div>

        <!-- Graph Legend Footer -->
        <div style="display: flex; align-items: center; justify-content: space-between; padding: 0.75rem 1.5rem; background: rgba(8, 11, 20, 0.9); border-top: 1px solid rgba(255, 255, 255, 0.06); font-size: 0.75rem; color: var(--text-muted); flex-wrap: wrap; gap: 0.75rem;">
          <div style="display: flex; align-items: center; gap: 1rem; flex-wrap: wrap;">
            <span style="display: flex; align-items: center; gap: 0.35rem;">
              <span style="width: 10px; height: 10px; border-radius: 2px; background: #00f0ff;"></span> Core / Lifecycle
            </span>
            <span style="display: flex; align-items: center; gap: 0.35rem;">
              <span style="width: 10px; height: 10px; border-radius: 2px; background: #34d399;"></span> State Flow
            </span>
            <span style="display: flex; align-items: center; gap: 0.35rem;">
              <span style="width: 10px; height: 10px; border-radius: 2px; background: #ffd700;"></span> Bonus & Features
            </span>
            <span style="display: flex; align-items: center; gap: 0.35rem;">
              <span style="width: 10px; height: 10px; border-radius: 2px; background: #a855f7;"></span> Rendering & VFX
            </span>
            <span style="display: flex; align-items: center; gap: 0.35rem;">
              <span style="width: 10px; height: 10px; border-radius: 2px; background: #f43f5e;"></span> Network & Sockets
            </span>
          </div>

          <div class="mono" style="color: var(--accent-cyan);">
            Interactive Node Engine &bull; Zero Raw Code Exposed
          </div>
        </div>
      </div>
    `;

    this.bindControls();
    this.drawGraph();
  }

  private bindControls() {
    const btnFsm = this.container.querySelector('#btn-view-fsm') as HTMLButtonElement;
    const btnTiers = this.container.querySelector('#btn-view-tiers') as HTMLButtonElement;
    const btnRng = this.container.querySelector('#btn-view-rng') as HTMLButtonElement;
    const btnSim = this.container.querySelector('#btn-simulate-spin') as HTMLButtonElement;

    btnFsm.addEventListener('click', () => {
      soundManager.playClick();
      btnFsm.classList.add('active');
      btnTiers.classList.remove('active');
      btnRng.classList.remove('active');
      this.switchPreset(STATE_MACHINE_PRESET);
    });

    btnTiers.addEventListener('click', () => {
      soundManager.playClick();
      btnTiers.classList.add('active');
      btnFsm.classList.remove('active');
      btnRng.classList.remove('active');
      this.switchPreset(SUBSYSTEM_TIER_PRESET);
    });

    btnRng.addEventListener('click', () => {
      soundManager.playClick();
      btnRng.classList.add('active');
      btnFsm.classList.remove('active');
      btnTiers.classList.remove('active');
      this.switchPreset(PROVABLY_FAIR_RNG_PRESET);
    });

    btnSim.addEventListener('click', () => {
      this.startSimulation();
    });
  }

  private switchPreset(preset: GraphPreset) {
    this.stopSimulation();
    this.currentPreset = preset;
    const title = this.container.querySelector('#graph-preset-title') as HTMLElement;
    const subtitle = this.container.querySelector('#graph-preset-subtitle') as HTMLElement;
    if (title) title.textContent = preset.name;
    if (subtitle) subtitle.textContent = preset.subtitle;

    const simBtn = this.container.querySelector('#btn-simulate-spin') as HTMLButtonElement;
    if (simBtn) {
      simBtn.style.display = preset.simulationSteps ? 'inline-flex' : 'none';
    }

    this.selectedNode = null;
    this.updateInspector(null);
    this.drawGraph();
  }

  private drawGraph(activeNodeId: string | null = null) {
    const svg = this.container.querySelector('#architecture-svg') as SVGSVGElement;
    if (!svg) return;

    svg.innerHTML = `
      <defs>
        <!-- Gradients -->
        <linearGradient id="edge-grad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stop-color="#00f0ff" stop-opacity="0.4" />
          <stop offset="100%" stop-color="#a855f7" stop-opacity="0.6" />
        </linearGradient>

        <linearGradient id="active-edge-grad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stop-color="#ffd700" stop-opacity="0.8" />
          <stop offset="100%" stop-color="#00f0ff" stop-opacity="1.0" />
        </linearGradient>

        <!-- Arrow Markers -->
        <marker id="arrow" viewBox="0 0 10 10" refX="16" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
          <path d="M 0 0 L 10 5 L 0 10 z" fill="#38bdf8" fill-opacity="0.7"/>
        </marker>

        <marker id="active-arrow" viewBox="0 0 10 10" refX="16" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
          <path d="M 0 0 L 10 5 L 0 10 z" fill="#ffd700"/>
        </marker>

        <!-- Glow filter -->
        <filter id="glow-filter" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="6" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
      </defs>
    `;

    // 1. Draw Edges
    const edgesGroup = document.createElementNS('http://www.w3.org/2000/svg', 'g');
    edgesGroup.setAttribute('class', 'edges-group');

    this.currentPreset.edges.forEach((edge) => {
      const fromNode = this.currentPreset.nodes.find((n) => n.id === edge.from);
      const toNode = this.currentPreset.nodes.find((n) => n.id === edge.to);
      if (!fromNode || !toNode) return;

      const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
      const isActiveEdge = activeNodeId && (edge.from === activeNodeId || edge.to === activeNodeId);

      // Curved bezier path
      const dx = toNode.x - fromNode.x;
      const dy = toNode.y - fromNode.y;
      const mx = (fromNode.x + toNode.x) / 2;
      const my = (fromNode.y + toNode.y) / 2 + (dx === 0 ? 0 : dy * 0.2);

      const d = `M ${fromNode.x} ${fromNode.y} Q ${mx} ${my} ${toNode.x} ${toNode.y}`;
      path.setAttribute('d', d);
      path.setAttribute('fill', 'none');
      path.setAttribute('stroke', isActiveEdge ? 'url(#active-edge-grad)' : 'rgba(56, 189, 248, 0.3)');
      path.setAttribute('stroke-width', isActiveEdge ? '3' : '1.5');
      path.setAttribute('marker-end', isActiveEdge ? 'url(#active-arrow)' : 'url(#arrow)');

      if (isActiveEdge) {
        path.setAttribute('stroke-dasharray', '8 4');
        path.setAttribute('style', 'animation: dashFlow 1s linear infinite;');
      }

      edgesGroup.appendChild(path);

      // Edge condition label
      if (edge.label && Math.abs(dx) > 60) {
        const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
        text.setAttribute('x', String(mx));
        text.setAttribute('y', String(my - 6));
        text.setAttribute('fill', '#94a3b8');
        text.setAttribute('font-size', '10');
        text.setAttribute('font-family', 'var(--font-mono)');
        text.setAttribute('text-anchor', 'middle');
        text.textContent = edge.label;
        edgesGroup.appendChild(text);
      }
    });

    svg.appendChild(edgesGroup);

    // 2. Draw Nodes
    const nodesGroup = document.createElementNS('http://www.w3.org/2000/svg', 'g');
    nodesGroup.setAttribute('class', 'nodes-group');

    this.currentPreset.nodes.forEach((node) => {
      const g = document.createElementNS('http://www.w3.org/2000/svg', 'g');
      g.setAttribute('transform', `translate(${node.x}, ${node.y})`);
      g.setAttribute('cursor', 'pointer');

      const isSelected = this.selectedNode?.id === node.id;
      const isActive = activeNodeId === node.id;
      const color = this.getNodeColor(node.category);

      const nodeW = 130;
      const nodeH = 56;

      // Outer glow when active or selected
      if (isActive || isSelected) {
        const halo = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
        halo.setAttribute('x', String(-nodeW / 2 - 6));
        halo.setAttribute('y', String(-nodeH / 2 - 6));
        halo.setAttribute('width', String(nodeW + 12));
        halo.setAttribute('height', String(nodeH + 12));
        halo.setAttribute('rx', '10');
        halo.setAttribute('fill', color);
        halo.setAttribute('fill-opacity', '0.25');
        halo.setAttribute('filter', 'url(#glow-filter)');
        g.appendChild(halo);
      }

      // Main Node Card Box
      const rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
      rect.setAttribute('x', String(-nodeW / 2));
      rect.setAttribute('y', String(-nodeH / 2));
      rect.setAttribute('width', String(nodeW));
      rect.setAttribute('height', String(nodeH));
      rect.setAttribute('rx', '8');
      rect.setAttribute('fill', isActive ? '#1e293b' : '#0f172a');
      rect.setAttribute('stroke', isActive ? '#ffd700' : isSelected ? '#00f0ff' : color);
      rect.setAttribute('stroke-width', isActive || isSelected ? '2.5' : '1.5');
      g.appendChild(rect);

      // Category Pill Indicator Bar
      const catBar = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
      catBar.setAttribute('x', String(-nodeW / 2 + 4));
      catBar.setAttribute('y', String(-nodeH / 2 + 4));
      catBar.setAttribute('width', '4');
      catBar.setAttribute('height', String(nodeH - 8));
      catBar.setAttribute('rx', '2');
      catBar.setAttribute('fill', color);
      g.appendChild(catBar);

      // Node Label
      const title = document.createElementNS('http://www.w3.org/2000/svg', 'text');
      title.setAttribute('x', '0');
      title.setAttribute('y', '-6');
      title.setAttribute('fill', '#ffffff');
      title.setAttribute('font-size', '12');
      title.setAttribute('font-weight', '700');
      title.setAttribute('text-anchor', 'middle');
      title.setAttribute('font-family', 'var(--font-heading)');
      title.textContent = node.label;
      g.appendChild(title);

      // Node Sublabel
      const sub = document.createElementNS('http://www.w3.org/2000/svg', 'text');
      sub.setAttribute('x', '0');
      sub.setAttribute('y', '12');
      sub.setAttribute('fill', color);
      sub.setAttribute('font-size', '9');
      sub.setAttribute('font-weight', '600');
      sub.setAttribute('text-anchor', 'middle');
      sub.setAttribute('font-family', 'var(--font-mono)');
      sub.textContent = node.sublabel;
      g.appendChild(sub);

      // Interactivity
      g.addEventListener('click', () => {
        soundManager.playClick();
        this.selectedNode = node;
        this.updateInspector(node);
        this.drawGraph(node.id);
      });

      nodesGroup.appendChild(g);
    });

    svg.appendChild(nodesGroup);
  }

  private getNodeColor(category: GraphNode['category']): string {
    switch (category) {
      case 'core': return '#00f0ff';
      case 'flow': return '#34d399';
      case 'feature': return '#ffd700';
      case 'render': return '#a855f7';
      case 'network': return '#f43f5e';
      default: return '#38bdf8';
    }
  }

  private updateInspector(node: GraphNode | null) {
    const content = this.container.querySelector('#inspector-content') as HTMLElement;
    if (!content) return;

    if (!node) {
      content.innerHTML = `
        <p style="font-size: 0.85rem; color: var(--text-muted); line-height: 1.5;">
          💡 <em>Click any node in the architecture graph to inspect its execution lifecycle, responsibilities, state contracts, and zero-GC performance metrics.</em>
        </p>
      `;
      return;
    }

    const color = this.getNodeColor(node.category);

    content.innerHTML = `
      <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 0.75rem;">
        <h4 style="font-size: 1.15rem; font-weight: 800; color: #fff;">${node.label}</h4>
        <span style="font-size: 0.7rem; padding: 0.2rem 0.5rem; border-radius: 9999px; background: rgba(255,255,255,0.06); color: ${color}; font-weight: 700; text-transform: uppercase;">
          ${node.category}
        </span>
      </div>

      <div style="font-size: 0.8rem; font-weight: 600; color: ${color}; margin-bottom: 0.75rem;" class="mono">
        ${node.sublabel}
      </div>

      <p style="font-size: 0.85rem; color: #cbd5e1; line-height: 1.55; margin-bottom: 1.25rem;">
        ${node.description}
      </p>

      <!-- Key Responsibilities -->
      <div style="margin-bottom: 1.25rem;">
        <div style="font-size: 0.75rem; text-transform: uppercase; color: var(--text-muted); font-weight: 700; margin-bottom: 0.4rem;">
          Subsystem Responsibilities:
        </div>
        <ul style="list-style: none; display: flex; flex-direction: column; gap: 0.4rem; font-size: 0.8rem; color: #94a3b8;">
          ${node.responsibilities.map((r) => `<li style="display: flex; gap: 0.4rem;"><span style="color: ${color};">✓</span> ${r}</li>`).join('')}
        </ul>
      </div>

      <!-- State Contracts / IO -->
      <div style="background: rgba(0,0,0,0.3); border-radius: 0.5rem; padding: 0.75rem; margin-bottom: 1rem; font-size: 0.75rem;">
        <div style="margin-bottom: 0.35rem;">
          <span style="color: var(--text-muted);">Incoming Triggers:</span>
          <span style="color: #fff; font-weight: 600;"> ${node.inputs.join(', ')}</span>
        </div>
        <div>
          <span style="color: var(--text-muted);">Valid Transitions:</span>
          <span style="color: var(--accent-cyan); font-weight: 600;"> ${node.outputs.join(', ')}</span>
        </div>
      </div>

      <!-- Performance Metric -->
      <div style="background: rgba(16, 185, 129, 0.08); border: 1px solid rgba(16, 185, 129, 0.3); border-radius: 0.5rem; padding: 0.6rem 0.8rem; font-size: 0.75rem; color: #34d399; font-weight: 600;">
        ⚡ ${node.metrics}
      </div>
    `;
  }

  public startSimulation() {
    if (!this.currentPreset.simulationSteps || this.currentPreset.simulationSteps.length === 0) return;
    this.stopSimulation();
    this.isSimulating = true;
    this.simulationIndex = 0;

    const simBtn = this.container.querySelector('#btn-simulate-spin') as HTMLButtonElement;
    if (simBtn) simBtn.innerHTML = '<span>⏸ Pause Sim</span>';

    const step = () => {
      if (!this.isSimulating || !this.currentPreset.simulationSteps) return;

      const activeId = this.currentPreset.simulationSteps[this.simulationIndex];
      const activeNode = this.currentPreset.nodes.find((n) => n.id === activeId) || null;

      soundManager.playClick(400 + this.simulationIndex * 60);
      this.selectedNode = activeNode;
      this.updateInspector(activeNode);
      this.drawGraph(activeId);

      this.simulationIndex = (this.simulationIndex + 1) % this.currentPreset.simulationSteps.length;
      this.simTimer = window.setTimeout(step, 1400);
    };

    step();
  }

  public stopSimulation() {
    this.isSimulating = false;
    if (this.simTimer) {
      clearTimeout(this.simTimer);
      this.simTimer = null;
    }
    const simBtn = this.container.querySelector('#btn-simulate-spin') as HTMLButtonElement;
    if (simBtn) simBtn.innerHTML = '<span>▶ Run Lifecycle Sim</span>';
  }

  public destroy() {
    this.stopSimulation();
  }
}
