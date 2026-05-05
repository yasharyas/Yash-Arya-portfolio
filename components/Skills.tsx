"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { skills } from "@/lib/content";

gsap.registerPlugin(ScrollTrigger);

export function Skills() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const mm = gsap.matchMedia();

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const section = sectionRef.current;
      if (!section) return;

      // Pre-hide all tags so there's no flash before the batch fires
      const tags = Array.from(section.querySelectorAll<HTMLElement>(".skill-tag"));
      gsap.set(tags, { autoAlpha: 0 });

      // ScrollTrigger.batch — groups tags that enter around the same time.
      // fromTo with function-based x/y gives each tag a unique random start
      // position → scatter-to-settle effect. "back.out" overshoots the scale
      // slightly for a tactile pop-into-place feel.
      ScrollTrigger.batch(tags, {
        start: "top 88%",
        once: true,
        interval: 0.06,
        onEnter: (batch) =>
          gsap.fromTo(
            batch,
            {
              autoAlpha: 0,
              scale: 0.65,
              x: () => gsap.utils.random(-14, 14) as number,
              y: () => gsap.utils.random(-16, 16) as number,
            },
            {
              autoAlpha: 1,
              scale: 1,
              x: 0,
              y: 0,
              duration: 0.6,
              ease: "back.out(1.5)",
              stagger: { each: 0.04, from: "random" },
              overwrite: true,
            }
          ),
      });

      // ── Skill pill hover: background flash + scale pulse ─────────────────────
      // mouseenter → quick scale to 1.12 (back.out overshoot) + bg flash
      // mouseleave → scale back to 1
      // Listeners are torn down via the mm handler's return function so they
      // clean up when prefers-reduced-motion changes or component unmounts.
      const teardowns: Array<() => void> = [];
      tags.forEach((tag) => {
        const onEnter = () => {
          // Scale pulse — back.out(2) gives a tactile overshoot
          gsap.to(tag, {
            scale: 1.12,
            duration: 0.18,
            ease: "back.out(2)",
            overwrite: "auto",
          });
          // Background flash: transparent → subtle tint → transparent
          gsap.fromTo(
            tag,
            { backgroundColor: "rgba(0,0,0,0)" },
            {
              backgroundColor: "rgba(0,0,0,0.07)",
              duration: 0.14,
              ease: "power1.out",
              yoyo: true,
              repeat: 1,
            }
          );
        };
        const onLeave = () => {
          gsap.to(tag, {
            scale: 1,
            backgroundColor: "rgba(0,0,0,0)",
            duration: 0.25,
            ease: "power2.out",
            overwrite: "auto",
          });
        };
        tag.addEventListener("mouseenter", onEnter);
        tag.addEventListener("mouseleave", onLeave);
        teardowns.push(() => {
          tag.removeEventListener("mouseenter", onEnter);
          tag.removeEventListener("mouseleave", onLeave);
        });
      });

      // Return cleanup so mm reverts listeners when query stops matching
      return () => teardowns.forEach((fn) => fn());
    });
  }, []);

  return (
    <section ref={sectionRef} id="skills" className="py-24 md:py-40 bg-cream/40 border-y border-rule">
      <div className="mx-auto max-w-[1400px] px-6 md:px-10">
        <div className="grid grid-cols-12 gap-6 mb-20">
          <p className="col-span-12 md:col-span-3 font-mono text-[11px] tracking-[0.25em] uppercase text-muted">
            §04 — Toolkit
          </p>
          <h2 className="col-span-12 md:col-span-9 display text-5xl md:text-7xl leading-[0.95] tracking-tightest">
            Polyglot,<br />
            <span className="italic">but sharpest in TypeScript.</span>
          </h2>
        </div>

        <div className="grid grid-cols-12 gap-y-12 gap-x-6">
          {skills.map((s) => (
            <div key={s.group} className="col-span-12 md:col-span-6 lg:col-span-4">
              <p className="font-mono text-[11px] tracking-[0.25em] uppercase text-ember mb-4">
                {s.group}
              </p>
              <ul className="flex flex-wrap gap-x-2 gap-y-2 text-[15px]">
                {s.items.map((it) => (
                  <li
                    key={it}
                    className="skill-tag text-ink2 after:content-['·'] after:text-muted after:mx-2 last:after:content-['']"
                  >
                    {it}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
