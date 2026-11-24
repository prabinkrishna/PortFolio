import type { ShippedGame, RDProject, SkillCategory } from '../types';

export const SHIPPED_GAMES: ShippedGame[] = [
  {
    id: 'choctaw-casino',
    title: 'Choctaw Casino',
    subtitle: 'High-Stakes Social Casino Platform with Multi-Tier Progressive Jackpots',
    category: 'Social Casino',
    year: '2023 - 2024',
    company: 'Leading Social Casino Studio',
    role: 'Lead Frontend / Game Developer',
    description:
      'Engineered core slot reel display engines, high-speed VIP reward animations, and multi-tier progressive jackpot meter overlays. Designed a modular rendering pipeline in PixiJS with WebGL batching to maintain constant 60 FPS across mid-tier mobile web views and desktop clients.',
    highlightStats: [
      { label: 'Active Daily Players', value: '250K+' },
      { label: 'Sustained Framerate', value: '60 FPS' },
      { label: 'Texture Memory Reduction', value: '42%' },
      { label: 'Reel Spin Latency', value: '< 16ms' },
    ],
    tags: ['PixiJS v8', 'TypeScript', 'WebGL', 'Spine 2D', 'WebSockets', 'VIP Systems'],
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
    year: '2023',
    company: 'Global Gaming Network',
    role: 'Senior Game Developer',
    description:
      'Architected interactive game lobbies, multi-game concurrent reel previews, and live tournament leaderboards. Developed an ultra-low overhead particle emission engine in PixiJS for celebration events and instant bonus rounds.',
    highlightStats: [
      { label: 'Simultaneous Games', value: '30+' },
      { label: 'Tournament Concurrency', value: '15,000' },
      { label: 'Cold Load Time', value: '0.9s' },
      { label: 'Render Calls / Frame', value: '< 18' },
    ],
    tags: ['PixiJS v8', 'TypeScript', 'EventBus', 'GSAP', 'Real-time Leaderboard', 'Canvas 2D/WebGL'],
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
    year: '2022 - 2023',
    company: 'Apex Interactive',
    role: 'Senior Frontend Game Engineer',
    description:
      'Engineered regulatory-compliant slot math visualization, secure transaction synchronization, and high-fidelity bonus wheels. Built a zero-lag WebAudio engine with positional sound and synchronized reel stops.',
    highlightStats: [
      { label: 'Regulatory Compliance', value: 'GLI-19' },
      { label: 'Input-to-Render Delay', value: '8.4ms' },
      { label: 'Cross-Device Coverage', value: '99.4%' },
      { label: 'Audio Latency', value: '< 20ms' },
    ],
    tags: ['PixiJS', 'TypeScript', 'WebAudio API', 'Strict RNG Math Vis', 'GLI Certified', 'Responsive'],
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
    company: 'SweetSpins Games',
    role: 'Lead Game Developer',
    description:
      'Designed and engineered the cascading symbol tumble mechanics, gravity physics simulation, sticky pastry wilds, and combo multiplier meters. Achieved 60fps tumble cascades using custom object pools and physics-assisted tween curves.',
    highlightStats: [
      { label: 'Cascade Depth', value: '12+ Combos' },
      { label: 'Active Particle Count', value: '2,500' },
      { label: 'Animation Smoothness', value: '16.6ms / frame' },
      { label: 'Player Retention Uplift', value: '+24%' },
    ],
    tags: ['PixiJS v8', 'Cascade Mechanics', 'Object Pooling', 'Physics Tweens', 'Particle Emitter', 'Juice/VFX'],
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
    year: '2021 - 2022',
    company: 'Picante Games',
    role: 'Senior Game Developer & VFX Specialist',
    description:
      'Crafted the fiery visual identity, custom GLSL fire and heat-distortion shaders, expanding wild chilli animations, and spicy jackpot wheel. Created high-intensity screen shake and rhythmic audio-synced reel transitions.',
    highlightStats: [
      { label: 'Shader Performance', value: '60 FPS on Mobile' },
      { label: 'Expanding Wild Rate', value: 'Instant' },
      { label: 'Custom GLSL Shaders', value: '4 Passes' },
      { label: 'Spicy Win Factor', value: '10,000x Max' },
    ],
    tags: ['PixiJS', 'Custom GLSL Shaders', 'Heat Distortion', 'Spine 2D', 'Screen Shake', 'Jackpot Wheel'],
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
  {
    id: 'final-whistle',
    title: 'Final Whistle',
    subtitle: 'High-Stakes Soccer Penalty Shootout Arcade & Instant-Win Simulator',
    category: 'Arcade / Sports',
    year: '2021',
    company: 'KickOff Entertainment',
    role: 'Game Developer & Physics Programmer',
    description:
      'Engineered an instant-win penalty shootout game with touch/mouse swipe trajectory prediction, goalkeeper AI positioning, dynamic net ripple physics in PixiJS, and roaring stadium audio atmospheres.',
    highlightStats: [
      { label: 'Trajectory Accuracy', value: 'Sub-pixel' },
      { label: 'Goalkeeper AI Dive States', value: '16 Angles' },
      { label: 'Physics Loop', value: 'Fixed 60Hz' },
      { label: 'Instant Settlement', value: '< 200ms' },
    ],
    tags: ['PixiJS v8', 'Trajectory Physics', 'Spring-Mass Mesh Net', 'Goalkeeper AI', 'Instant Win', 'WebAudio'],
    bannerGradient: 'linear-gradient(135deg, #0575e6 0%, #021b79 100%)',
    accentColor: '#38bdf8',
    iconName: 'Trophy',
    features: [
      'Interactive curved swipe / flick kick mechanics calculating ball spin, velocity, and apex trajectory',
      'Procedural soccer goal net physics modeled with spring-mass mesh nodes in PixiJS Graphics',
      'Predictive Goalkeeper AI diving algorithm with dynamic reaction delays and dramatic fingertips saves',
      'Adaptive stadium crowd audio reacting dynamically to near misses, crossbar strikes, and wonder-goals',
    ],
    architectureHighlights: [
      'Verlet integration physics engine maintaining lightweight sub-10KB footprint',
      'Custom Mesh deformation in PixiJS simulating realistic 3D net bulge upon ball impact',
      'Deterministic trajectory serialization for instant server validation and anti-cheat compliance',
    ],
    metrics: {
      fps: '60 FPS smooth physics',
      loadTime: '0.8s ultra-light',
      bundleSize: '290 KB',
      players: '1.5M+ penalty kicks taken',
    },
    demoPreviewType: 'shootout',
  },
];

export const TECHNICAL_RD: RDProject[] = [
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
    codeSnippet: {
      filename: 'comfyui-asset-ingest.ts',
      language: 'typescript',
      code: `// Automated PixiJS v8 Asset Bundle Loader for AI Pipeline Atlases
import { Assets, Texture, Spritesheet } from 'pixi.js';

export async function loadComfyUIGameBundle(themeId: string): Promise<Record<string, Texture>> {
  // Load manifest generated automatically by our ComfyUI post-processing hook
  const manifest = await Assets.load(\`/assets/themes/\${themeId}/atlas.json\`);
  const sheet = manifest as Spritesheet;

  console.log(\`[Pipeline] Loaded \${Object.keys(sheet.textures).length} AI-generated symbols for \${themeId}\`);
  
  // Return typed symbol dictionary with pre-computed anchors and padding
  return sheet.textures;
}`,
    },
  },
  {
    id: 'modular-pixijs-architecture',
    title: 'Modular PixiJS v8 Game Engine Architecture',
    tagline: 'Zero-GC, Component-Driven 60 FPS Slot & Arcade Foundation',
    category: 'Core Architecture',
    badge: 'Engine Architecture',
    summary:
      'Engineered a scalable, production-tested architectural pattern for high-performance browser games. Implements a lightweight Entity-Component-System (ECS) pattern, pre-allocated memory object pools for zero Garbage Collector hiccups, resolution-agnostic virtual stage projection, and decoupled State Machine spin controllers.',
    pipelineSteps: [
      {
        step: '01',
        title: 'Virtual Stage & Scaler',
        tool: 'Core Engine Viewport',
        description:
          'Decouples logical coordinates (e.g. 1920x1080) from device display boundaries. Smoothly handles aspect ratios from 9:16 portrait to 21:9 ultrawide with safe-zone clamping.',
      },
      {
        step: '02',
        title: 'Zero-GC Object Pooling',
        tool: 'PoolManager<T>',
        description:
          'Pre-warms symbol sprites, particle quads, and text badges at startup. Reuses instances without releasing references to eliminate micro-stutters during heavy spins.',
      },
      {
        step: '03',
        title: 'Finite State Machine (FSM)',
        tool: 'SpinStateMachine',
        description:
          'Enforces deterministic lifecycle: Idle -> Anticipation -> Spin -> StopReels -> EvaluatePaylines -> BigWinCascade -> Idle, fully decoupled from rendering.',
      },
      {
        step: '04',
        title: 'Custom Shader Pipeline',
        tool: 'PixiJS v8 Shader / Filter',
        description:
          'Optimized WebGL/WebGPU passes for motion blur on spinning reels, golden win particle glows, and heat distortion with automatic low-spec fallback.',
      },
    ],
    benefits: [
      'Steady 60 FPS on low-power mobile devices with zero frame drops from garbage collection',
      'Clean separation of business logic (RNG, math, state) from presentation (sprites, tweens, audio)',
      'Sub-50ms spin cycle response with deterministic visual recreation',
      'Modular plugin architecture enabling new slot mechanics (cascades, cluster pays, expanding wilds) in days',
    ],
    codeSnippet: {
      filename: 'ObjectPool.ts',
      language: 'typescript',
      code: `// High-performance Generic Object Pool for PixiJS v8 Entities
export class ObjectPool<T> {
  private available: T[] = [];
  private active: Set<T> = new Set();

  constructor(
    private factory: () => T,
    private reset: (item: T) => void,
    initialSize: number = 64
  ) {
    for (let i = 0; i < initialSize; i++) {
      this.available.push(this.factory());
    }
  }

  public acquire(): T {
    const item = this.available.pop() ?? this.factory();
    this.active.add(item);
    return item;
  }

  public release(item: T): void {
    if (this.active.delete(item)) {
      this.reset(item);
      this.available.push(item);
    }
  }

  public releaseAll(): void {
    for (const item of this.active) {
      this.reset(item);
      this.available.push(item);
    }
    this.active.clear();
  }
}`,
    },
  },
];

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    title: 'Game Engines & Graphics',
    icon: 'Gamepad2',
    skills: [
      { name: 'PixiJS (v7 & v8)', level: 98, note: 'Primary engine, custom shaders, WebGPU/WebGL' },
      { name: 'WebGL & GLSL Shaders', level: 92, note: 'Custom filters, blur, bloom, heat distortion' },
      { name: 'Canvas 2D / WebGPU API', level: 88, note: 'High concurrency hardware rendering' },
      { name: 'Spine 2D Animation', level: 90, note: 'Complex character & symbol skeletons' },
      { name: 'GSAP & Physics Tweens', level: 95, note: 'Sub-pixel fluid animation & bounce timing' },
    ],
  },
  {
    title: 'Core Architecture & Code',
    icon: 'Code2',
    skills: [
      { name: 'TypeScript / JavaScript ESNext', level: 96, note: 'Strict typing, modern patterns' },
      { name: 'Object Pooling & Zero-GC', level: 95, note: 'Predictable 60fps frame budgets' },
      { name: 'State Machines & ECS', level: 92, note: 'Deterministic game loop management' },
      { name: 'WebSockets & Multiplayer', level: 88, note: 'Real-time tournaments & synchronized games' },
      { name: 'WebAudio API Synthesis', level: 90, note: 'Positional audio, procedural soundscapes' },
    ],
  },
  {
    title: 'AI Workflows & Tools',
    icon: 'Sparkles',
    skills: [
      { name: 'ComfyUI Node Pipelines', level: 92, note: 'Custom workflows for automated game art' },
      { name: 'SDXL & Flux 1.0 Models', level: 90, note: 'Trained LoRAs for slots, symbols & UI' },
      { name: 'ControlNet & Segmentation', level: 88, note: 'Edge guidance & alpha mask pipelines' },
      { name: 'Automated Atlas Packaging', level: 94, note: 'MaxRects bin packing & CLI tooling' },
      { name: 'Vite / Webpack / Rollup', level: 90, note: 'Optimized bundler pipelines' },
    ],
  },
];

