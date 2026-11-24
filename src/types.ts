export interface ShippedGame {
  id: string;
  title: string;
  subtitle: string;
  category: 'Social Casino' | 'Slots' | 'Arcade / Sports';
  year: string;
  company: string;
  role: string;
  description: string;
  highlightStats: { label: string; value: string }[];
  tags: string[];
  bannerGradient: string;
  accentColor: string;
  iconName: string;
  features: string[];
  architectureHighlights: string[];
  metrics: {
    fps: string;
    loadTime: string;
    bundleSize: string;
    players: string;
  };
  demoPreviewType?: 'slot' | 'shootout' | 'particles';
  liveUrl?: string;
  isLatest?: boolean;
  teamRole?: string;
}

export interface RDProject {
  id: string;
  title: string;
  tagline: string;
  category: 'Generative AI' | 'Core Architecture' | 'Shaders & WebGL';
  badge: string;
  summary: string;
  pipelineSteps: {
    step: string;
    title: string;
    tool: string;
    description: string;
  }[];
  benefits: string[];
  codeSnippet?: {
    filename: string;
    language: string;
    code: string;
  };
}

export interface SkillCategory {
  title: string;
  icon: string;
  skills: { name: string; level: number; note: string }[];
}

