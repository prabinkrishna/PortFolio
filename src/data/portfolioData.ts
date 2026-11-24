import type { ShippedGame, RDProject, SkillCategory } from '../types';

export const SHIPPED_GAMES: ShippedGame[] = [
  // --- Latest Games Developed by Prabin's Team at YGT Gaming (Suribet) ---
  {
    id: 'super-dice-high',
    title: 'Super Dice High',
    subtitle: 'High-Roller Neon Dice Slot with Dual-Multiplier Scatter Wheels',
    category: 'Slots',
    year: '2024 - 2025',
    company: 'YGT Gaming &bull; Suribet',
    role: 'Lead Game Developer (Managing Team of 4 Developers)',
    isLatest: true,
    liveUrl: 'https://www.suribet.sr/YgtGames/YgtGame/',
    teamRole: 'Led 4 Developers from Architecture to Shipped Release',
    description:
      'Spearheaded the engineering leadership and core PixiJS v8 reel architecture for Super Dice High on the Suribet platform. Directed a pod of 4 developers implementing dynamic dice-roll physics, cascading multipliers, dual scatter bonus wheels, and high-frequency WebSocket state synchronization.',
    highlightStats: [
      { label: 'Engineering Pod', value: '4 Developers Led' },
      { label: 'Max Win Multiplier', value: '15,000x' },
      { label: 'Reel Spin Framerate', value: '60 FPS Solid' },
      { label: 'Production Status', value: 'Live on Suribet' },
    ],
    tags: ['PixiJS v8', 'TypeScript', 'YGT Slot Engine', 'Team Leadership', 'Dice Physics', 'Suribet Live'],
    bannerGradient: 'linear-gradient(135deg, #4f46e5 0%, #06b6d4 100%)',
    accentColor: '#00f0ff',
    iconName: 'Dice',
    features: [
      'Interactive 3D-perspective dice tumble animation with WebGL motion blur passes',
      'Dual scatter trigger launching the High-Roller Bonus Wheel with accumulating dice multipliers',
      'Instant-spin turbo mode with synchronized sound tempo acceleration',
      'Zero-allocation symbol pooling ensuring 0 frame drops on mobile web',
    ],
    architectureHighlights: [
      'Architected modular state handler for dice multiplier cascades decoupled from visual reels',
      'Conducted daily code reviews and sprint planning for 4 game developers',
      'Integrated GLI-19 compliant server RNG verification with sub-16ms latency',
    ],
    metrics: {
      fps: '60 FPS locked',
      loadTime: '0.9s instant boot',
      bundleSize: '340 KB core',
      players: 'Live on Suribet',
    },
    demoPreviewType: 'slot',
  },
  {
    id: 'castle-of-curses',
    title: 'Castle of Curses',
    subtitle: 'Dark Gothic Horror 5x4 Slot with Expanding Mystery Skeletons & Sticky Wilds',
    category: 'Slots',
    year: '2024 - 2025',
    company: 'YGT Gaming &bull; Suribet',
    role: 'Lead Game Developer (Managing Team of 4 Developers)',
    isLatest: true,
    liveUrl: 'https://www.suribet.sr/YgtGames/YgtGame/',
    teamRole: 'Architecture Lead & Sprint Coordinator',
    description:
      'Led the technical development of Castle of Curses, an atmospheric 5x4 gothic slot machine. Supervised shader pipeline development for dynamic torchlight vignettes, mystery symbol reveal transitions, and sticky gargoyle wild animations across free-spin cycles.',
    highlightStats: [
      { label: 'Grid Geometry', value: '5x4 / 40 Lines' },
      { label: 'GLSL Lighting Passes', value: 'Real-time Fog' },
      { label: 'Team Led', value: '4 Developers' },
      { label: 'Platform', value: 'Suribet Platform' },
    ],
    tags: ['PixiJS v8', 'Custom GLSL', 'Spine 2D', 'Sticky Wilds', 'Horror VFX', 'Suribet Live'],
    bannerGradient: 'linear-gradient(135deg, #18181b 0%, #4c0519 50%, #881337 100%)',
    accentColor: '#f43f5e',
    iconName: 'Skull',
    features: [
      'Dynamic torchlight flicker and volumetric fog shaders rendered directly in WebGL',
      'Mystery Curse symbol transformation with bone-shattering audio and particle bursts',
      'Free Spins feature with sticky gargoyle wilds accumulating progressive multipliers',
      'Spine 2D animated skeleton gatekeeper reacting dynamically to high-value spin hits',
    ],
    architectureHighlights: [
      'Engineered custom PixiJS v8 Filter pipeline for fullscreen atmospheric vignette and fog',
      'Established modular substate architecture for seamless free-spin retrigger sequences',
      'Mentored junior engineers on memory management and Spine asset atlas packing',
    ],
    metrics: {
      fps: '60 FPS with full shaders',
      loadTime: '1.1s',
      bundleSize: '360 KB',
      players: 'Live on Suribet',
    },
    demoPreviewType: 'slot',
  },
  {
    id: 'lucky-jewels',
    title: 'Lucky Jewels',
    subtitle: 'Prismatic Cascading Gem Slot with Cluster Multipliers & Refractive Bloom',
    category: 'Slots',
    year: '2024',
    company: 'YGT Gaming &bull; Suribet',
    role: 'Lead Game Developer (Managing Team of 4 Developers)',
    isLatest: true,
    liveUrl: 'https://www.suribet.sr/YgtGames/YgtGame/',
    teamRole: 'Technical Lead & Math Visualizer',
    description:
      'Directed engineering for Lucky Jewels, a high-octane cascading jewel slot. Implemented recursive cluster payout algorithms, chromatic aberration screen-shake upon big wins, and automated asset ingestion from the ComfyUI pipeline.',
    highlightStats: [
      { label: 'Cluster Solver', value: '< 0.6ms' },
      { label: 'Particle Burst', value: '2,000 Gems' },
      { label: 'Audio Engine', value: 'WebAudio Synth' },
      { label: 'Platform', value: 'Suribet Platform' },
    ],
    tags: ['PixiJS v8', 'Cluster Pays', 'Refractive Shaders', 'Cascades', 'ComfyUI Assets', 'Suribet Live'],
    bannerGradient: 'linear-gradient(135deg, #0f172a 0%, #0284c7 50%, #38bdf8 100%)',
    accentColor: '#38bdf8',
    iconName: 'Gem',
    features: [
      'Cascading jewel tumble physics with jelly elasticity and shatter particle emitter',
      'Color-coded jewel multiplier meters escalating consecutively during cascade streaks',
      'Prismatic chromatic aberration screen-shake shader triggered on mega wins',
      'Bespoke crystal bell audio chimes synthesized procedurally via Web Audio API',
    ],
    architectureHighlights: [
      'High-speed connected-component cluster solver resolving 35-symbol grids in sub-millisecond CPU time',
      'Automated sprite packing pipeline ingesting ComfyUI/SDXL generated gem atlases',
      'Coordinated feature delivery across 4 developers ensuring on-time studio milestone delivery',
    ],
    metrics: {
      fps: '60 FPS during heavy cascades',
      loadTime: '1.0s',
      bundleSize: '330 KB',
      players: 'Live on Suribet',
    },
    demoPreviewType: 'particles',
  },
  {
    id: 'bavarian-bonanza',
    title: 'Bavarian Bonanza',
    subtitle: 'Festive Oktoberfest Beer & Pretzel Cascade Slot with Frothy Expanding Wilds',
    category: 'Slots',
    year: '2024',
    company: 'YGT Gaming &bull; Suribet',
    role: 'Lead Game Developer (Managing Team of 4 Developers)',
    isLatest: true,
    liveUrl: 'https://www.suribet.sr/YgtGames/YgtGame/',
    teamRole: 'Team Lead & Feature Architect',
    description:
      'Engineered the celebratory Oktoberfest slot Bavarian Bonanza. Led a 4-developer engineering team delivering frothy beer mug expanding wilds, pretzel multipliers, rhythmic accordion-synced reel transitions, and responsive multi-platform layout generation.',
    highlightStats: [
      { label: 'Expanding Wilds', value: 'Full Column' },
      { label: 'Audio Sync', value: 'Rhythmic BPS' },
      { label: 'Team Size', value: '4 Developers' },
      { label: 'Platform', value: 'Suribet Platform' },
    ],
    tags: ['PixiJS v8', 'Expanding Wilds', 'Audio-Synced Loops', 'Oktoberfest Theme', 'Suribet Live'],
    bannerGradient: 'linear-gradient(135deg, #78350f 0%, #d97706 50%, #fde68a 100%)',
    accentColor: '#f59e0b',
    iconName: 'Beer',
    features: [
      'Expanding Golden Beer Mug wilds overflowing with bubbly procedural foam shader ripples',
      'Pretzel scatter collection meter unlocking escalating free-spin multiplier tiers',
      'Rhythmic accordion reel clack audio engine locked dynamically to spin cadence',
      'Adaptive UI scaling seamlessly between mobile vertical hold and widescreen desktop',
    ],
    architectureHighlights: [
      'Engineered expanding wild column animation utilizing pooled Sprite mesh slices',
      'Architected JSON layout generator deserializing festival UI assets without coordinate hardcoding',
      'Mentored team members on state machine event dispatching and audio concurrency limits',
    ],
    metrics: {
      fps: '60 FPS buttery smooth',
      loadTime: '1.2s',
      bundleSize: '370 KB',
      players: 'Live on Suribet',
    },
    demoPreviewType: 'slot',
  },

  // --- Proven Flagship Titles from Ruby Seven Studios & GSN Games ---
  {
    id: 'choctaw-casino',
    title: 'Choctaw Casino',
    subtitle: 'High-Stakes Social Casino Platform with Multi-Tier Progressive Jackpots',
    category: 'Social Casino',
    year: '2021 - 2023',
    company: 'Ruby Seven Studios Inc.',
    role: 'Senior Game Programmer',
    description:
      'Engineered core slot reel display engines, high-speed VIP reward animations, and multi-tier progressive jackpot meter overlays. Designed a modular rendering pipeline in PixiJS with WebGL batching to maintain constant 60 FPS across mid-tier mobile web views and desktop clients.',
    highlightStats: [
      { label: 'Active Daily Players', value: '250K+' },
      { label: 'Sustained Framerate', value: '60 FPS' },
      { label: 'Texture Memory Reduction', value: '42%' },
      { label: 'Reel Spin Latency', value: '< 16ms' },
    ],
    tags: ['PixiJS', 'TypeScript', 'WebGL', 'Spine 2D', 'WebSockets', 'VIP Systems', 'Ruby Seven'],
    bannerGradient: 'linear-gradient(135deg, #0f2027 0%, #203a43 50%, #2c5364 100%)',
    accentColor: '#00f0ff',
    iconName: 'Crown',
    features: [
      'Multi-tiered real-time progressive jackpot counters with synchronized particle cascades',
      'High-performance 5-reel and 6-reel slot engines with dynamic payline rendering',
      'Dynamic resolution handling for seamless transitions from mobile portrait to 4K desktop',
      'VIP lounge animations with custom WebGL blend modes and glow shader effects',
    ],
    architectureHighlights: [
      'Decoupled Reel Renderer using custom PixiJS Container hierarchy and pooled display objects',
      'State Machine orchestration managing complex spin cycles, anticipation delays, and big win celebrations',
      'Smart Asset Preloader with chunked texture atlases reducing initial load time by 3.4 seconds',
    ],
    metrics: {
      fps: '60 FPS locked',
      loadTime: '1.2s cold start',
      bundleSize: '380 KB core',
      players: '2.5M+ total registered',
    },
    demoPreviewType: 'slot',
  },
  {
    id: 'foxplay-casino',
    title: 'FoxPlay Casino',
    subtitle: 'Dynamic Multi-Game Social Suite & Real-Time Tournament Arena',
    category: 'Social Casino',
    year: '2021 - 2023',
    company: 'Ruby Seven Studios Inc.',
    role: 'Senior Game Programmer',
    description:
      'Architected interactive game lobbies, multi-game concurrent reel previews, and live tournament leaderboards. Developed an ultra-low overhead particle emission engine in PixiJS for celebration events and instant bonus rounds.',
    highlightStats: [
      { label: 'Simultaneous Games', value: '30+' },
      { label: 'Tournament Concurrency', value: '15,000' },
      { label: 'Cold Load Time', value: '0.9s' },
      { label: 'Render Calls / Frame', value: '< 18' },
    ],
    tags: ['PixiJS', 'TypeScript', 'EventBus', 'GSAP', 'Real-time Leaderboard', 'Ruby Seven'],
    bannerGradient: 'linear-gradient(135deg, #1f1c2c 0%, #928dab 100%)',
    accentColor: '#a855f7',
    iconName: 'Sparkles',
    features: [
      'Interactive multi-tab lobby with live video/canvas reel previews of 30+ titles',
      'Synchronized real-time tournament leaderboard overlay updating at 10Hz without hitching',
      'Dynamic coin fountain and celebratory particle vortex with zero garbage collection allocations',
      'Adaptive UI layout supporting split-screen multi-game sessions on tablets',
    ],
    architectureHighlights: [
      'Event-driven architecture connecting WebSocket tournament feeds directly into PixiJS ticker updates',
      'Custom sprite batching system eliminating draw call overhead across distinct game icons',
      'Memory manager with LRU asset eviction guaranteeing 0 out-of-memory crashes on low-RAM devices',
    ],
    metrics: {
      fps: '60 FPS steady',
      loadTime: '0.9s instant lobby',
      bundleSize: '410 KB',
      players: '1.8M+ active',
    },
    demoPreviewType: 'slot',
  },
  {
    id: 'aplay-casino',
    title: 'APlay Casino',
    subtitle: 'Cross-Platform Real-Money & Social Hybrid Gaming Suite',
    category: 'Social Casino',
    year: '2021 - 2022',
    company: 'Ruby Seven Studios Inc.',
    role: 'Senior Game Programmer',
    description:
      'Engineered regulatory-compliant slot math visualization, secure transaction synchronization, and high-fidelity bonus wheels. Built a zero-lag WebAudio engine with positional sound and synchronized reel stops.',
    highlightStats: [
      { label: 'Regulatory Compliance', value: 'GLI-19' },
      { label: 'Input-to-Render Delay', value: '8.4ms' },
      { label: 'Cross-Device Coverage', value: '99.4%' },
      { label: 'Audio Latency', value: '< 20ms' },
    ],
    tags: ['PixiJS', 'TypeScript', 'WebAudio API', 'Strict RNG Math Vis', 'GLI Certified', 'Ruby Seven'],
    bannerGradient: 'linear-gradient(135deg, #0b0c10 0%, #1f2833 50%, #45a29e 100%)',
    accentColor: '#10b981',
    iconName: 'ShieldCheck',
    features: [
      'GLI-19 compliant visual reel stop verification system ensuring exact mathematical stops',
      'Interactive 3D-perspective Bonus Wheel built with PixiJS transformation matrices and blur shaders',
      'Zero-lag WebAudio synthesis engine triggering reel clacks, coin showers, and musical anticipation',
      'Seamless orientation morphing between vertical hand-held mobile and horizontal desktop',
    ],
    architectureHighlights: [
      'Immutable state pipeline enforcing cryptographically validated server RNG results',
      'Custom Bezier tween engine optimizing reel bounce back and physics-based momentum',
      'Automated headless unit testing with visual regression snapshots for all payline permutations',
    ],
    metrics: {
      fps: '60 FPS rock solid',
      loadTime: '1.4s',
      bundleSize: '360 KB',
      players: '1.2M+ players',
    },
    demoPreviewType: 'slot',
  },
  {
    id: 'bakers-delight-slots',
    title: "Baker's Delight Slots",
    subtitle: 'Delicious Cascading Match-and-Tumble 5x6 Slot Adventure',
    category: 'Slots',
    year: '2022',
    company: 'Ruby Seven Studios Inc.',
    role: 'Senior Game Programmer',
    description:
      'Independently designed and engineered cascading symbol tumble mechanics, gravity physics simulation, sticky pastry wilds, and combo multiplier meters. Delivered the complete slot machine within schedule.',
    highlightStats: [
      { label: 'Cascade Depth', value: '12+ Combos' },
      { label: 'Active Particle Count', value: '2,500' },
      { label: 'Animation Smoothness', value: '16.6ms / frame' },
      { label: 'Delivery', value: 'Solo Complete' },
    ],
    tags: ['PixiJS', 'Cascade Mechanics', 'Object Pooling', 'Physics Tweens', 'Particle Emitter', 'Ruby Seven'],
    bannerGradient: 'linear-gradient(135deg, #3a1c71 0%, #d76d77 50%, #ffaf7b 100%)',
    accentColor: '#f59e0b',
    iconName: 'Sparkles',
    features: [
      'Cascading tumble symbol drops with realistic bounce compression and jelly elasticity shaders',
      'Sugar rush combo multipliers with escalating screen-shake and neon frosting glow borders',
      'Free spins bonus game featuring sticky wild croissants with persistent multiplier counters',
      'Over 2,500 confetti and flour particle bursts rendered in a single draw call with WebGL instancing',
    ],
    architectureHighlights: [
      'Grid Matrix Solver evaluating 30-cell tumble clusters in under 0.8ms on mobile CPUs',
      'Pre-allocated Symbol Pool preventing memory allocation during chain reaction combos',
      'Dynamic sound pitch ramp accelerating musical tempo as cascade streak increases',
    ],
    metrics: {
      fps: '60 FPS with 2.5k particles',
      loadTime: '1.1s',
      bundleSize: '340 KB',
      players: '800K+ monthly spins',
    },
    demoPreviewType: 'slot',
  },
  {
    id: 'burning-hot-chilli',
    title: 'Burning Hot Chilli',
    subtitle: 'Ultra-Fiery Mexican Fiesta Slot with Expanding Wilds & Screen Inferno FX',
    category: 'Slots',
    year: '2022',
    company: 'Ruby Seven Studios Inc.',
    role: 'Senior Game Programmer & VFX Specialist',
    description:
      'Crafted the fiery visual identity, custom GLSL fire and heat-distortion shaders, expanding wild chilli animations, and spicy jackpot wheel. Created high-intensity screen shake and rhythmic audio-synced reel transitions.',
    highlightStats: [
      { label: 'Shader Performance', value: '60 FPS on Mobile' },
      { label: 'Expanding Wild Rate', value: 'Instant' },
      { label: 'Custom GLSL Shaders', value: '4 Passes' },
      { label: 'Spicy Win Factor', value: '10,000x Max' },
    ],
    tags: ['PixiJS', 'Custom GLSL Shaders', 'Heat Distortion', 'Spine 2D', 'Screen Shake', 'Ruby Seven'],
    bannerGradient: 'linear-gradient(135deg, #870000 0%, #190a05 100%)',
    accentColor: '#ef4444',
    iconName: 'Flame',
    features: [
      'Custom WebGL fragment shaders producing real-time flame ripples and heat distortion around reels',
      'Expanding Sombrero Chilli Wilds that stretch across entire columns with explosive sparks',
      'Fiesta Free Spins with spicy multiplier jalapenos and rhythmic maraca reel click sound design',
      'Cinematic Big Win pyro blast sequence utilizing pooled particle emitters and camera zoom punches',
    ],
    architectureHighlights: [
      'Filter Pipeline written in GLSL with fallback pass for low-power mobile GPUs',
      'Procedural Camera Shake system offering trauma-decay calculations for punchy impact feel',
      'Stateful spine animation controller handling 14 distinct character celebration states',
    ],
    metrics: {
      fps: '60 FPS with full screen shader',
      loadTime: '1.3s',
      bundleSize: '390 KB',
      players: '950K+ plays',
    },
    demoPreviewType: 'particles',
  },
];

export const TECHNICAL_RD: RDProject[] = [
  {
    id: 'antigravity-game-engine',
    title: 'Antigravity Game Engine (Monorepo ECS)',
    tagline: '17-Package Modular Entity Component System (ECS) Architecture for Next-Gen HTML5 Gaming',
    category: 'Core Architecture',
    badge: 'Ongoing Next-Gen R&D',
    summary:
      'An enterprise-grade monorepo game engine architecture engineered with PNPM workspaces, TypeScript 5.4, and PixiJS v8. Decoupled into 17 high-cohesion packages spanning Entity-Component-System (ECS) pipelines, spine 2D runtimes, input abstraction, event buses, reactive audio, and pluggable slot/reel frameworks.',
    pipelineSteps: [
      {
        step: '01',
        title: 'Entity Component System (ECS)',
        tool: 'packages/engine-ecs',
        description:
          'Data-oriented architecture separating pure data components (Transform, Sprite, ReelData) from stateless logic systems (RenderSystem, PhysicsSystem, ReelSpinSystem).',
      },
      {
        step: '02',
        title: 'Modular Package Monorepo',
        tool: 'PNPM Workspaces + Vitest',
        description:
          '17 dedicated packages (engine-core, engine-renderer, engine-spine, engine-workflow, framework-slot, framework-reel) ensuring zero code entanglement and independent versioning.',
      },
      {
        step: '03',
        title: 'Spine v8 & RevoltFX Integrations',
        tool: '@esotericsoftware/spine-pixi-v8',
        description:
          'Hardware-accelerated skeletal animation supporting custom blend modes, track listeners, skin attachments, and GPU-instanced particle bursts.',
      },
      {
        step: '04',
        title: 'Framework Reel & Slot Domain Layers',
        tool: 'framework-reel + framework-slot',
        description:
          'Specialized game-type engines providing plug-and-play reel strips, anticipation curves, cascade tumbling solvers, and payline evaluation.',
      },
    ],
    benefits: [
      'Strict separation of concerns allowing multiple frontend engineers to work concurrently without merge conflicts',
      'Deterministic test suite running across Vitest and Happy-DOM in under 1.2 seconds',
      'Seamless multi-game reusability across casual slots, instant-win crash games, and arcade sports',
      'Ultra-lean bundle tree-shaking importing only the required packages for each target client',
    ],
  },
  {
    id: 'provably-fair-slot-backend',
    title: 'Provably Fair HMAC-SHA256 RNG & Slot Backend',
    tagline: 'Cryptographically Verified Deterministic Slot Server & Math Simulator',
    category: 'Core Architecture',
    badge: 'Full-Stack & Cryptography',
    summary:
      'Engineered a provably fair, regulatory-compliant slot game backend with deterministic HMAC-SHA256 Random Number Generation (RNG). Combines client seed, server seed, and monotonic nonce to generate tamper-proof reel stops. Features real-time Socket.IO spin streaming, Redis caching, PostgreSQL persistence, public verification API, and high-frequency RTP mathematical simulation scripts.',
    pipelineSteps: [
      {
        step: '01',
        title: 'HMAC-SHA256 Seed Combination',
        tool: 'Node.js Crypto Subsystem',
        description:
          'Server creates secret serverSeed and reveals its SHA-256 hash. Client provides clientSeed. Combined message `${clientSeed}:${nonce}` is hashed using HMAC-SHA256.',
      },
      {
        step: '02',
        title: '32-Bit Hex Slice Float Generation',
        tool: 'RNG.js Deterministic Float Parser',
        description:
          'Extracts 8-hex character slices (4 bytes each) from the 64-hex hash, parsing each as a 32-bit integer and dividing by 0x100000000 to produce uniform floats [0, 1).',
      },
      {
        step: '03',
        title: 'Deterministic Reel Stop Mapping',
        tool: 'SlotEngine.js & math/Reels.js',
        description:
          'Maps random floats directly to reel strip indices: `stopIndex = floor(float * stripLength)`. Constructs 3x3 payline view matrix and evaluates win multipliers.',
      },
      {
        step: '04',
        title: 'Public Verification Endpoint',
        tool: '/api/v1/verification/verify',
        description:
          'Allows players to independently verify every spin by entering the revealed serverSeed, clientSeed, and nonce to mathematically reproduce the exact reel view.',
      },
      {
        step: '05',
        title: 'RTP & Volatility Mathematical Simulator',
        tool: 'sim.js (100M Spins Stress Test)',
        description:
          'Monte Carlo simulation script testing millions of spins to mathematically prove theoretical Return-to-Player (RTP) and hit frequencies before deployment.',
      },
    ],
    benefits: [
      '100% Provably Fair and mathematically tamper-proof: neither casino nor player can rig the spin',
      'Sub-15ms spin response via optimized Node.js / Socket.IO event pairing with Redis state cache',
      'Complete full-stack game engineering coverage: frontend PixiJS v8 + backend math/RNG + Docker deployment',
      'Automated integration testing for session controllers, rate limiters, and transaction isolation',
    ],
  },
  {
    id: 'comfyui-sdxl-flux-pipeline',
    title: 'ComfyUI / SDXL / Flux Game Asset Pipeline',
    tagline: 'Automated Generative AI Production Pipeline for Casino & Slot 2D Game Assets',
    category: 'Generative AI',
    badge: 'Production AI R&D',
    summary:
      'Built an end-to-end automated asset generation and sprite packing workflow combining ComfyUI node graphs, SDXL LoRAs, and Flux 1.0 dev models. Eliminates 70% of manual asset turnaround time while maintaining pixel-perfect casino art direction, alpha mask precision, and immediate PixiJS texture atlas ingestion.',
    pipelineSteps: [
      {
        step: '01',
        title: 'Prompt & LoRA Conditioning',
        tool: 'ComfyUI + SDXL + Flux 1.0',
        description:
          'Conditioning nodes with custom-trained slot symbol LoRAs (chilli, crowns, diamonds, fruit symbols) enforcing isometric 2.5D angles, hyper-detailed metallic specular maps, and clean lighting.',
      },
      {
        step: '02',
        title: 'ControlNet Edge & Depth Guidance',
        tool: 'ControlNet (Canny / Depth / LineArt)',
        description:
          'Strict geometric silhouette constraints ensuring symbols fit precisely within standard 160x160 slot reel bounding boxes without clipping or awkward perspective warps.',
      },
      {
        step: '03',
        title: 'Automated Alpha Masking & Clean-up',
        tool: 'RMBG-1.4 / BiRefNet Nodes',
        description:
          'Deep-learning background removal generating crisp 8-bit alpha channels, semi-transparent glows, and anti-aliased perimeter fringes ready for compositing.',
      },
      {
        step: '04',
        title: 'Sprite Sheet Packing & Manifest Generation',
        tool: 'MaxRects BinPacker + Node.js CLI',
        description:
          'Automated sprite sheet packing into WebP/PNG atlases with JSON texture manifests containing frame anchor points, trim data, and 1x/2x resolution variants.',
      },
      {
        step: '05',
        title: 'Direct PixiJS v8 Texture Ingestion',
        tool: 'PixiJS Assets.load() System',
        description:
          'Seamless runtime loading via PixiJS Assets bundle system with automatic mipmapping, texture bleeding prevention padding, and GPU VRAM footprint tracking.',
      },
    ],
    benefits: [
      'Turnaround time for a 20-symbol theme reduced from 3 full days to 45 minutes',
      '100% consistent art direction, palette grading, and specular reflections across symbols',
      'Automated batch generation of normal maps and emissive glow textures for custom WebGL shaders',
      'Zero manual cropping: exports JSON spritesheets directly consumed by PixiJS game engines',
    ],
  },
];

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    title: 'Game Engines & Graphics',
    icon: 'Gamepad2',
    skills: [
      { name: 'PixiJS (v7 & v8)', level: 98, note: 'Primary engine, custom shaders, WebGPU/WebGL' },
      { name: 'WebGL & GLSL Shaders', level: 92, note: 'Custom filters, blur, bloom, heat distortion' },
      { name: 'Entity Component System (ECS)', level: 94, note: 'Antigravity monorepo architecture' },
      { name: 'Spine 2D Animation', level: 90, note: 'Complex character & symbol skeletons' },
      { name: 'GSAP & Physics Tweens', level: 95, note: 'Sub-pixel fluid animation & bounce timing' },
    ],
  },
  {
    title: 'Leadership & Backend RNG',
    icon: 'Code2',
    skills: [
      { name: 'Engineering Leadership (4 Devs)', level: 96, note: 'Sprint planning, code reviews & architecture' },
      { name: 'Provably Fair Cryptographic RNG', level: 95, note: 'HMAC-SHA256, seeds & nonces' },
      { name: 'TypeScript / Node.js ESNext', level: 96, note: 'Full-stack strict type safety' },
      { name: 'WebSockets & Socket.IO Streaming', level: 92, note: 'Real-time spin event synchronization' },
      { name: 'Redis & PostgreSQL Persistence', level: 88, note: 'Session caching & ledger balance' },
    ],
  },
  {
    title: 'AI Workflows & Tooling',
    icon: 'Sparkles',
    skills: [
      { name: 'ComfyUI Node Pipelines', level: 92, note: 'Internal studio GenAI platform for artists' },
      { name: 'SDXL & Flux 1.0 Models', level: 90, note: 'Trained LoRAs for slots, symbols & UI' },
      { name: 'ControlNet & Segmentation', level: 88, note: 'Edge guidance & alpha mask pipelines' },
      { name: 'PNPM Monorepo & Vitest', level: 92, note: 'Multi-package workspace orchestration' },
      { name: 'Vite / Docker Deployment', level: 90, note: 'Containerized microservice architecture' },
    ],
  },
];
