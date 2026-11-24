/**
 * Zero-dependency Web Audio API procedural sound synthesizer.
 * Provides authentic arcade & casino audio feedback without external asset dependencies.
 */
class SoundManager {
  private ctx: AudioContext | null = null;
  private muted: boolean = true; // start muted for friendly UX
  private ambientEnabled: boolean = true;
  private ambientPlaying: boolean = false;
  private ambientGain: GainNode | null = null;
  private ambientNodes: AudioNode[] = [];
  private ambientStoppables: { stop: (when?: number) => void }[] = [];
  private ambientTimer: number | null = null;
  private ambientStep = 0;

  constructor() {
    // AudioContext will be initialized on first user interaction
  }

  private initContext() {
    if (!this.ctx && typeof window !== 'undefined') {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtx();
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  public isMuted(): boolean {
    return this.muted;
  }

  public isAmbientEnabled(): boolean {
    return this.ambientEnabled && !this.muted;
  }

  public setMuted(muted: boolean): void {
    this.muted = muted;
    if (!muted) {
      this.initContext();
      this.playClick();
      if (this.ambientEnabled) {
        this.startAmbience();
      }
    } else {
      this.stopAmbience();
    }
  }

  public toggleMute(): boolean {
    this.setMuted(!this.muted);
    return this.muted;
  }

  public toggleAmbience(): boolean {
    if (this.muted) {
      this.ambientEnabled = true;
      this.setMuted(false);
      return true;
    }
    this.ambientEnabled = !this.ambientEnabled;
    if (this.ambientEnabled) {
      this.initContext();
      this.startAmbience();
    } else {
      this.stopAmbience();
    }
    return this.ambientEnabled;
  }

  public startAmbience(): void {
    if (this.muted || !this.ambientEnabled || this.ambientPlaying) return;
    this.initContext();
    if (!this.ctx) return;

    const ctx = this.ctx;
    const now = ctx.currentTime;
    this.ambientPlaying = true;

    const master = ctx.createGain();
    master.gain.setValueAtTime(0.0001, now);
    master.gain.linearRampToValueAtTime(0.16, now + 1.4);
    master.connect(ctx.destination);
    this.ambientGain = master;

    // Warm low-pass pad filter with slow LFO sweep (cyber-arcade space atmosphere)
    const padFilter = ctx.createBiquadFilter();
    padFilter.type = 'lowpass';
    padFilter.frequency.setValueAtTime(340, now);
    padFilter.Q.setValueAtTime(1.8, now);
    padFilter.connect(master);

    const lfo = ctx.createOscillator();
    const lfoGain = ctx.createGain();
    lfo.type = 'sine';
    lfo.frequency.setValueAtTime(0.07, now);
    lfoGain.gain.setValueAtTime(140, now);
    lfo.connect(lfoGain);
    lfoGain.connect(padFilter.frequency);
    lfo.start(now);

    const padVoices: { freq: number; type: OscillatorType; gain: number; detune: number }[] = [
      { freq: 73.42, type: 'sine', gain: 0.28, detune: 0 },      // D2 sub
      { freq: 110.0, type: 'triangle', gain: 0.11, detune: -5 }, // A2 fifth
      { freq: 174.61, type: 'sine', gain: 0.08, detune: 6 },   // F3 minor third
      { freq: 261.63, type: 'sine', gain: 0.05, detune: -4 },  // C4 seventh
    ];

    const nodes: AudioNode[] = [master, padFilter, lfo, lfoGain];
    const stoppables: { stop: (when?: number) => void }[] = [lfo];

    for (const v of padVoices) {
      const osc = ctx.createOscillator();
      const vGain = ctx.createGain();
      osc.type = v.type;
      osc.frequency.setValueAtTime(v.freq, now);
      osc.detune.setValueAtTime(v.detune, now);
      vGain.gain.setValueAtTime(v.gain, now);
      osc.connect(vGain);
      vGain.connect(padFilter);
      osc.start(now);
      nodes.push(osc, vGain);
      stoppables.push(osc);
    }

    // Subtle stereo-style echo bus for ambient synth plucks
    const delay = ctx.createDelay(1.0);
    delay.delayTime.setValueAtTime(0.38, now);
    const delayFeedback = ctx.createGain();
    delayFeedback.gain.setValueAtTime(0.32, now);
    const delayTone = ctx.createBiquadFilter();
    delayTone.type = 'lowpass';
    delayTone.frequency.setValueAtTime(1100, now);

    delay.connect(delayTone);
    delayTone.connect(delayFeedback);
    delayFeedback.connect(delay);
    delayTone.connect(master);
    nodes.push(delay, delayFeedback, delayTone);

    this.ambientNodes = nodes;
    this.ambientStoppables = stoppables;

    // Evolving D-minor / Dorian synthwave arpeggio progression
    const chords = [
      [293.66, 349.23, 440.0, 523.25, 659.25], // Dm9
      [233.08, 293.66, 349.23, 440.0, 587.33], // Bbmaj7
      [196.0, 293.66, 349.23, 466.16, 523.25], // Gm7
      [220.0, 293.66, 329.63, 440.0, 659.25],  // Asus4
    ];

    const schedulePluck = () => {
      if (!this.ambientPlaying || !this.ctx || !this.ambientGain) return;
      const t = this.ctx.currentTime;
      const chordIdx = Math.floor(this.ambientStep / 8) % chords.length;
      const noteIdx = this.ambientStep % chords[chordIdx].length;
      const freq = chords[chordIdx][noteIdx];

      const osc = this.ctx.createOscillator();
      const noteGain = this.ctx.createGain();
      const noteFilter = this.ctx.createBiquadFilter();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, t);

      noteFilter.type = 'lowpass';
      noteFilter.frequency.setValueAtTime(1600, t);
      noteFilter.frequency.exponentialRampToValueAtTime(380, t + 1.5);

      noteGain.gain.setValueAtTime(0.0001, t);
      noteGain.gain.linearRampToValueAtTime(0.09, t + 0.08);
      noteGain.gain.exponentialRampToValueAtTime(0.0001, t + 1.8);

      osc.connect(noteFilter);
      noteFilter.connect(noteGain);
      noteGain.connect(this.ambientGain);
      noteGain.connect(delay);

      osc.start(t);
      osc.stop(t + 1.85);
      this.ambientStep++;
    };

    schedulePluck();
    this.ambientTimer = window.setInterval(schedulePluck, 650);
  }

  public stopAmbience(): void {
    if (!this.ambientPlaying) return;
    this.ambientPlaying = false;

    if (this.ambientTimer !== null) {
      clearInterval(this.ambientTimer);
      this.ambientTimer = null;
    }

    const ctx = this.ctx;
    const master = this.ambientGain;
    const stoppables = this.ambientStoppables;
    const nodes = this.ambientNodes;

    this.ambientGain = null;
    this.ambientStoppables = [];
    this.ambientNodes = [];

    if (ctx && master) {
      const now = ctx.currentTime;
      master.gain.cancelScheduledValues(now);
      master.gain.setValueAtTime(Math.max(master.gain.value, 0.0001), now);
      master.gain.exponentialRampToValueAtTime(0.0001, now + 0.35);

      window.setTimeout(() => {
        for (const s of stoppables) {
          try {
            s.stop();
          } catch {
            // Ignore already stopped oscillators
          }
        }
        for (const n of nodes) {
          try {
            n.disconnect();
          } catch {
            // Ignore already disconnected nodes
          }
        }
      }, 400);
    }
  }

  public playClick(freq = 600) {
    if (this.muted) return;
    this.initContext();
    if (!this.ctx) return;

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, this.ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(150, this.ctx.currentTime + 0.05);

    gain.gain.setValueAtTime(0.12, this.ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.05);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start();
    osc.stop(this.ctx.currentTime + 0.05);
  }

  public playSpin() {
    if (this.muted) return;
    this.initContext();
    if (!this.ctx) return;

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(180, this.ctx.currentTime);
    osc.frequency.linearRampToValueAtTime(320, this.ctx.currentTime + 0.25);

    gain.gain.setValueAtTime(0.08, this.ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.25);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start();
    osc.stop(this.ctx.currentTime + 0.25);
  }

  public playReelStop(index = 0) {
    if (this.muted) return;
    this.initContext();
    if (!this.ctx) return;

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    const baseFreq = 220 + index * 60;
    osc.type = 'square';
    osc.frequency.setValueAtTime(baseFreq, this.ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(90, this.ctx.currentTime + 0.08);

    gain.gain.setValueAtTime(0.1, this.ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.08);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start();
    osc.stop(this.ctx.currentTime + 0.08);
  }

  public playWin() {
    if (this.muted) return;
    this.initContext();
    if (!this.ctx) return;

    const notes = [523.25, 659.25, 783.99, 1046.5]; // C5, E5, G5, C6
    notes.forEach((freq, idx) => {
      const osc = this.ctx!.createOscillator();
      const gain = this.ctx!.createGain();

      const startTime = this.ctx!.currentTime + idx * 0.08;
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, startTime);

      gain.gain.setValueAtTime(0.15, startTime);
      gain.gain.exponentialRampToValueAtTime(0.001, startTime + 0.2);

      osc.connect(gain);
      gain.connect(this.ctx!.destination);

      osc.start(startTime);
      osc.stop(startTime + 0.2);
    });
  }

  public playKick() {
    if (this.muted) return;
    this.initContext();
    if (!this.ctx) return;

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(140, this.ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(30, this.ctx.currentTime + 0.15);

    gain.gain.setValueAtTime(0.3, this.ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.15);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start();
    osc.stop(this.ctx.currentTime + 0.15);
  }

  public playGoal() {
    if (this.muted) return;
    this.initContext();
    if (!this.ctx) return;

    // Cheer chords
    const chord = [392.0, 523.25, 659.25, 783.99]; // G4, C5, E5, G5
    chord.forEach((freq) => {
      const osc = this.ctx!.createOscillator();
      const gain = this.ctx!.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, this.ctx!.currentTime);

      gain.gain.setValueAtTime(0.1, this.ctx!.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx!.currentTime + 0.6);

      osc.connect(gain);
      gain.connect(this.ctx!.destination);

      osc.start();
      osc.stop(this.ctx!.currentTime + 0.6);
    });
  }
}

export const soundManager = new SoundManager();

