/**
 * Shared Web Audio singleton for the portfolio.
 *
 * KEY BEHAVIOUR — works without explicit user click on any sound element:
 *   1. AudioContext is created eagerly on first import (client-side only).
 *   2. Unlock listeners are attached IMMEDIATELY to document for
 *      `pointerdown`, `touchstart`, `keydown`, `click`. The first interaction
 *      anywhere on the page unlocks audio for every subsequent tone.
 *   3. Tones requested while the context is still suspended are pushed into
 *      a small queue (cap 12) and drained the moment the context resumes —
 *      so the counter ticks fire even if the user hadn't interacted yet.
 *   4. Once unlocked, hover sounds work everywhere with zero extra setup.
 */

let _ctx: AudioContext | null = null;
let _unlocked = false;
const _queue: Array<() => void> = [];
const QUEUE_CAP = 12;

function drainQueue() {
  while (_queue.length) _queue.shift()?.();
}

function ensureCtx(): AudioContext | null {
  if (typeof window === "undefined") return null;
  if (_ctx) return _ctx;

  try {
    _ctx = new (window.AudioContext ||
      (window as unknown as { webkitAudioContext: typeof AudioContext })
        .webkitAudioContext)();
  } catch {
    return null;
  }

  if (_ctx.state === "running") {
    _unlocked = true;
  } else {
    // Listen on document for any user gesture that grants user-activation.
    // `pointerdown`, `click`, `touchstart`, `keydown` all qualify per spec.
    const events: Array<keyof DocumentEventMap> = [
      "pointerdown",
      "click",
      "touchstart",
      "keydown",
    ];

    const unlock = () => {
      if (!_ctx) return;
      _ctx.resume().then(() => {
        _unlocked = true;
        drainQueue();
      });
      events.forEach((e) => document.removeEventListener(e, unlock, true));
    };

    events.forEach((e) =>
      document.addEventListener(e, unlock, {
        capture: true,
        passive: true,
      })
    );
  }

  return _ctx;
}

// Eagerly create the context + attach listeners as soon as this module loads
// in the browser. Whichever component imports first triggers it, and all
// subsequent components share the same already-listening instance.
if (typeof window !== "undefined") {
  Promise.resolve().then(() => ensureCtx());
}

export function initAudio(): void {
  ensureCtx();
}

/**
 * Fire a short synthesised tone.
 * If the context is still suspended (no user gesture yet) the tone is queued
 * and played the moment the user first interacts with the page.
 */
export function playTone(
  freq = 1100,
  freqEnd = 880,
  gainPeak = 0.06,
  dur = 0.06,
  type: OscillatorType = "sine"
): void {
  const ctx = ensureCtx();
  if (!ctx) return;

  const fire = () => {
    try {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.type = type;
      const now = ctx.currentTime;
      osc.frequency.setValueAtTime(freq, now);
      osc.frequency.exponentialRampToValueAtTime(freqEnd, now + dur * 0.8);

      gain.gain.setValueAtTime(gainPeak, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + dur);

      osc.start(now);
      osc.stop(now + dur + 0.01);
    } catch {
      // Ignore — audio nodes occasionally throw when context is closing.
    }
  };

  if (_unlocked && ctx.state === "running") {
    fire();
  } else if (_queue.length < QUEUE_CAP) {
    _queue.push(fire);
  }
}

/**
 * Mechanical clock-tick — two-transient escapement model.
 *
 * Transient 1 (initial strike): sawtooth 2800 → 400 Hz over 12 ms — the
 *   hard "click" of a gear tooth catching.
 * Transient 2 (body resonance): square 900 → 220 Hz starting 6 ms later,
 *   16 ms duration — the hollow "tick" body that follows.
 *
 * Total perceptible duration ≈ 28 ms, which sounds like a genuine clock
 * escapement rather than a synthesised tone.
 */
export function playClockTick(): void {
  const ctx = ensureCtx();
  if (!ctx) return;

  const fire = () => {
    try {
      const now = ctx.currentTime;

      // ── Strike transient ──────────────────────────────────────────────────
      const osc1  = ctx.createOscillator();
      const gain1 = ctx.createGain();
      osc1.connect(gain1);
      gain1.connect(ctx.destination);
      osc1.type = "sawtooth";
      osc1.frequency.setValueAtTime(2800, now);
      osc1.frequency.exponentialRampToValueAtTime(400, now + 0.012);
      gain1.gain.setValueAtTime(0.09, now);
      gain1.gain.exponentialRampToValueAtTime(0.0001, now + 0.015);
      osc1.start(now);
      osc1.stop(now + 0.018);

      // ── Body resonance ────────────────────────────────────────────────────
      const osc2  = ctx.createOscillator();
      const gain2 = ctx.createGain();
      osc2.connect(gain2);
      gain2.connect(ctx.destination);
      osc2.type = "square";
      osc2.frequency.setValueAtTime(900, now + 0.006);
      osc2.frequency.exponentialRampToValueAtTime(220, now + 0.025);
      gain2.gain.setValueAtTime(0.0001, now + 0.006);
      gain2.gain.setValueAtTime(0.048, now + 0.007);
      gain2.gain.exponentialRampToValueAtTime(0.0001, now + 0.030);
      osc2.start(now + 0.006);
      osc2.stop(now + 0.032);
    } catch {
      // AudioNode can throw if context is closing — silently ignore.
    }
  };

  if (_unlocked && ctx.state === "running") {
    fire();
  } else if (_queue.length < QUEUE_CAP) {
    _queue.push(fire);
  }
}
