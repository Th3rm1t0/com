import { useEffect, useRef } from "react";

const IDLE_MIN = 2000;
const IDLE_MAX = 6000;
const FRAME_DURATION_MIN = 50;
const FRAME_DURATION_MAX = 120;
const BURST_FRAMES_MIN = 3;
const BURST_FRAMES_MAX = 8;

function rand(min: number, max: number) {
  return Math.random() * (max - min) + min;
}

function randInt(min: number, max: number) {
  return Math.floor(rand(min, max + 1));
}

function pick<T>(arr: readonly T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

type FrameStyle = {
  beforeClip: string;
  afterClip: string;
  beforeTx: number;
  afterTx: number;
  beforeSkew: number;
  afterSkew: number;
  beforeShadow: string;
  afterShadow: string;
  opacity: number;
};

const IDLE_FRAME: FrameStyle = {
  beforeClip: "inset(0 0 100% 0)",
  afterClip: "inset(0 0 100% 0)",
  beforeTx: 0,
  afterTx: 0,
  beforeSkew: 0,
  afterSkew: 0,
  beforeShadow: "transparent",
  afterShadow: "transparent",
  opacity: 1,
};

function randomClip(): string {
  const top = randInt(0, 90);
  const height = randInt(5, 40);
  const bottom = Math.max(0, 100 - top - height);
  return `inset(${top}% 0 ${bottom}% 0)`;
}

function thinSliceClip(): string {
  const top = randInt(0, 88);
  const thickness = randInt(2, 8);
  return `inset(${top}% 0 ${100 - top - thickness}% 0)`;
}

const patterns = {
  sliceShift(): FrameStyle {
    return {
      beforeClip: randomClip(),
      afterClip: randomClip(),
      beforeTx: rand(-8, 8),
      afterTx: rand(-8, 8),
      beforeSkew: rand(-3, 3),
      afterSkew: rand(-3, 3),
      beforeShadow: "#ff003c",
      afterShadow: "#00e4ff",
      opacity: 1,
    };
  },

  rgbSplit(): FrameStyle {
    return {
      beforeClip: "inset(0 0 0 0)",
      afterClip: "inset(0 0 0 0)",
      beforeTx: rand(-6, -2),
      afterTx: rand(2, 6),
      beforeSkew: 0,
      afterSkew: 0,
      beforeShadow: `rgba(255,0,60,${rand(0.5, 0.9).toFixed(2)})`,
      afterShadow: `rgba(0,228,255,${rand(0.5, 0.9).toFixed(2)})`,
      opacity: 1,
    };
  },

  heavySkew(): FrameStyle {
    return {
      beforeClip: randomClip(),
      afterClip: randomClip(),
      beforeTx: rand(-3, 3),
      afterTx: rand(-3, 3),
      beforeSkew: rand(-8, 8),
      afterSkew: rand(-8, 8),
      beforeShadow: "#ff003c",
      afterShadow: "#00e4ff",
      opacity: 1,
    };
  },

  flicker(): FrameStyle {
    return {
      ...IDLE_FRAME,
      opacity: Math.random() > 0.5 ? 0 : 1,
    };
  },

  scanLine(): FrameStyle {
    const top = randInt(0, 85);
    const thickness = randInt(2, 6);
    const offset = randInt(5, 15);
    return {
      beforeClip: thinSliceClip(),
      afterClip: `inset(${Math.min(top + offset, 95)}% 0 ${Math.max(0, 100 - top - thickness - offset)}% 0)`,
      beforeTx: rand(-12, 12),
      afterTx: rand(-12, 12),
      beforeSkew: 0,
      afterSkew: 0,
      beforeShadow: "#ff003c",
      afterShadow: "#00e4ff",
      opacity: 1,
    };
  },

  blockGlitch(): FrameStyle {
    return {
      beforeClip: randomClip(),
      afterClip: randomClip(),
      beforeTx: rand(-15, 15),
      afterTx: rand(-15, 15),
      beforeSkew: rand(-1, 1),
      afterSkew: rand(-1, 1),
      beforeShadow: "#ff003c",
      afterShadow: "#00e4ff",
      opacity: 1,
    };
  },

  jitter(): FrameStyle {
    return {
      beforeClip: "inset(0 0 0 0)",
      afterClip: "inset(0 0 0 0)",
      beforeTx: rand(-2, 2),
      afterTx: rand(-2, 2),
      beforeSkew: rand(-0.5, 0.5),
      afterSkew: rand(-0.5, 0.5),
      beforeShadow: "rgba(255,0,60,0.3)",
      afterShadow: "rgba(0,228,255,0.3)",
      opacity: 1,
    };
  },

  chromatic(): FrameStyle {
    const spread = rand(3, 8);
    return {
      beforeClip: "inset(0 0 0 0)",
      afterClip: "inset(0 0 0 0)",
      beforeTx: -spread,
      afterTx: spread,
      beforeSkew: 0,
      afterSkew: 0,
      beforeShadow: "#ff003c",
      afterShadow: "#00e4ff",
      opacity: rand(0.85, 1),
    };
  },
} as const;

type PatternName = keyof typeof patterns;
const patternNames = Object.keys(patterns) as PatternName[];

function applyFrame(el: HTMLElement, frame: FrameStyle) {
  const s = el.style;
  s.setProperty("--g-b-clip", frame.beforeClip);
  s.setProperty("--g-a-clip", frame.afterClip);
  s.setProperty("--g-b-tx", `${frame.beforeTx}px`);
  s.setProperty("--g-a-tx", `${frame.afterTx}px`);
  s.setProperty("--g-b-skew", `${frame.beforeSkew}deg`);
  s.setProperty("--g-a-skew", `${frame.afterSkew}deg`);
  s.setProperty("--g-b-shadow", frame.beforeShadow);
  s.setProperty("--g-a-shadow", frame.afterShadow);
  s.opacity = String(frame.opacity);
}

export function useGlitchEffect() {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const el = ref.current;
    if (!el) return;

    let mainTimer: number;
    let frameTimers: number[] = [];
    let disposed = false;

    function scheduleNext() {
      if (disposed) return;
      mainTimer = window.setTimeout(
        () => !disposed && runBurst(),
        rand(IDLE_MIN, IDLE_MAX),
      );
    }

    function runBurst() {
      if (disposed || !el) return;

      const primary = pick(patternNames);
      const secondary = Math.random() > 0.5 ? pick(patternNames) : primary;
      const frameCount = randInt(BURST_FRAMES_MIN, BURST_FRAMES_MAX);
      let elapsed = 0;

      for (let i = 0; i < frameCount; i++) {
        const pattern = i < frameCount / 2 ? primary : secondary;
        const tid = window.setTimeout(() => {
          if (disposed || !el) return;
          applyFrame(el, patterns[pattern]());
        }, elapsed);
        frameTimers.push(tid);
        elapsed += rand(FRAME_DURATION_MIN, FRAME_DURATION_MAX);
      }

      const resetTid = window.setTimeout(() => {
        if (disposed || !el) return;
        applyFrame(el, IDLE_FRAME);
        frameTimers = [];
        scheduleNext();
      }, elapsed + 50);
      frameTimers.push(resetTid);
    }

    applyFrame(el, IDLE_FRAME);
    scheduleNext();

    return () => {
      disposed = true;
      window.clearTimeout(mainTimer);
      for (const t of frameTimers) window.clearTimeout(t);
    };
  }, []);

  return ref;
}
