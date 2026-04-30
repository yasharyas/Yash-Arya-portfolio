"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { experience } from "@/lib/content";

gsap.registerPlugin(ScrollTrigger);

// Words that make up the two-line heading. Each is wrapped in a clip container
// so GSAP can animate yPercent without overflow showing on neighbouring lines.
const LINE_1 = ["Four", "internships,"];
const LINE_2 = ["production", "scars", "to", "show", "for", "it."];

function WordClip({
  word,
  italic = false,
}: {
  word: string;
  italic?: boolean;
}) {
  return (
    // overflow-hidden clips the word during its travel; pb keeps descenders visible
    <span className="inline-block overflow-hidden pb-[0.09em] align-bottom">
      <span className={`exp-word inline-block${italic ? " italic" : ""}`}>
        {word}
      </span>
    </span>
  );
}

export function Experience() {
  const headlineRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const mm = gsap.matchMedia();

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      if (!headlineRef.current) return;

      const words = Array.from(
        headlineRef.current.querySelectorAll<HTMLElement>(".exp-word")
      );

      // Timeline with shared defaults — no repetition of ease/duration per tween.
      // ScrollTrigger lives on the top-level timeline, not on a child tween.
      const expTl = gsap.timeline({
        defaults: { ease: "power2.out", duration: 0.7 },
        scrollTrigger: {
          trigger: headlineRef.current,
          start: "top 80%",
          toggleActions: "play none none none",
          once: true,
        },
      });

      // Label "drop" anchors the stagger sequence.
      // yPercent: -110 = word starts above the clip boundary and falls into place.
      expTl.addLabel("drop", 0);
      words.forEach((word, i) =>
        expTl.from(word, { yPercent: -110 }, `drop+=${i * 0.07}`)
      );

      // ── Job rows: left-to-right slide + fade via ScrollTrigger.batch ─────────
      // Each <li class="exp-row"> slides in from the left as it enters the viewport.
      // batch() groups rows that fire onEnter within the interval into one staggered call.
      // Created after the headline ST — correct top-to-bottom DOM order.
      const rows = Array.from(
        document.querySelectorAll<HTMLElement>(".exp-row")
      );
      // Set initial hidden state before batch registers so there's no flash
      gsap.set(rows, { autoAlpha: 0, x: -36 });

      ScrollTrigger.batch(".exp-row", {
        start: "top 86%",
        once: true,
        interval: 0.08,
        onEnter: (batch) =>
          gsap.to(batch, {
            autoAlpha: 1,
            x: 0,
            duration: 0.75,
            ease: "power2.out",
            stagger: 0.1,
            overwrite: true,
          }),
      });
    });

    return () => mm.revert();
  }, []);

  return (
    <section id="experience" className="py-24 md:py-40 bg-cream/40 border-y border-rule">
      <div className="mx-auto max-w-[1400px] px-6 md:px-10">
        <div className="grid grid-cols-12 gap-6 mb-20">
          <p className="col-span-12 md:col-span-3 font-mono text-[11px] tracking-[0.25em] uppercase text-muted">
            §03 — Practice
          </p>
          <h2
            ref={headlineRef}
            className="col-span-12 md:col-span-9 display text-5xl md:text-7xl leading-[0.95] tracking-tightest"
          >
            {/* Line 1: plain words */}
            {LINE_1.map((w, i) => (
              <span key={w}>
                <WordClip word={w} />
                {i < LINE_1.length - 1 && " "}
              </span>
            ))}
            <br />
            {/* Line 2: italic words */}
            {LINE_2.map((w, i) => (
              <span key={w}>
                <WordClip word={w} italic />
                {i < LINE_2.length - 1 && " "}
              </span>
            ))}
          </h2>
        </div>

        <ol className="space-y-px">
          {experience.map((job, i) => (
            <li
              key={job.company}
              className="exp-row group grid grid-cols-12 gap-6 py-10 md:py-14 border-t border-rule"
            >
              <div className="col-span-12 md:col-span-3">
                <p className="font-mono text-[11px] tracking-[0.2em] uppercase text-muted">
                  {String(i + 1).padStart(2, "0")} · {job.period}
                </p>
                <p className="mt-3 font-mono text-[11px] tracking-[0.2em] uppercase text-ink2">
                  {job.location}
                </p>
              </div>
              <div className="col-span-12 md:col-span-9">
                <h3 className="display text-3xl md:text-5xl text-ink leading-[1.05]">
                  {job.company}
                </h3>
                <p className="mt-2 text-base md:text-lg text-ink2 italic">
                  {job.role} · <span className="not-italic">{job.products}</span>
                </p>
                <ul className="mt-7 space-y-3 text-[15px] leading-[1.65] text-ink2 max-w-[78ch]">
                  {job.bullets.map((b, j) => (
                    <li key={j} className="flex gap-4">
                      <span className="font-mono text-[10px] text-muted pt-1.5 shrink-0">
                        {String(j + 1).padStart(2, "0")}
                      </span>
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-7 flex flex-wrap gap-x-5 gap-y-2 font-mono text-[11px] tracking-wide text-muted">
                  {job.stack.map((s) => (
                    <span key={s}>{s}</span>
                  ))}
                </div>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
