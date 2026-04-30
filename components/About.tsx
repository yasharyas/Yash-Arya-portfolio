"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { profile, stats, education } from "@/lib/content";

gsap.registerPlugin(ScrollTrigger);

export function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const photoRef = useRef<HTMLImageElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const mm = gsap.matchMedia();

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const section = sectionRef.current;
      if (!section) return;

      // ── Headline: line-by-line clip reveal ─────────────────────────────────
      // Created first — headline is higher in the DOM than the photo.
      // ScrollTriggers must be created top-to-bottom in page order.
      if (headlineRef.current) {
        const lines = Array.from(
          headlineRef.current.querySelectorAll<HTMLElement>(".about-line")
        );
        // defaults: all child tweens share duration + ease — no repetition
        const headlineTl = gsap.timeline({
          defaults: { ease: "power3.out", duration: 0.9 },
          scrollTrigger: {
            trigger: headlineRef.current,
            start: "top 80%",
            toggleActions: "play none none none",
            once: true,
          },
        });
        // Label "reveal" anchors the stagger sequence — each line placed at
        // "reveal+={i * 0.15}" so the offset is explicit and readable.
        headlineTl.addLabel("reveal", 0);
        lines.forEach((line, i) =>
          headlineTl.from(line, { yPercent: 108 }, `reveal+=${i * 0.15}`)
        );
      }

      // ── Photo: fade + scale reveal — timeline for independent property durations ─
      if (photoRef.current) {
        const photoTl = gsap.timeline({
          defaults: { ease: "sine.out" },
          scrollTrigger: {
            trigger: photoRef.current,
            start: "top 82%",
            toggleActions: "play none none none",
            once: true,
          },
        });
        // Fade runs slightly longer than the scale for a lingering, natural feel.
        // "<" positions the scale tween to start at the same time as the fade.
        photoTl
          .from(photoRef.current, { autoAlpha: 0, duration: 1.2 })
          .from(
            photoRef.current,
            { scale: 0.95, duration: 0.95, transformOrigin: "center center" },
            "<"   // starts simultaneously; scale completes first → image "settles" before fully opaque
          );
      }

      // ── Stat counters: gsap.to with native stagger — gsap-core pattern ───────
      // Each proxy holds its element + suffix so onUpdate (fired per sub-tween)
      // can read the correct values without an index lookup.
      const statsStrip = section.querySelector<HTMLElement>(".stats-strip");
      const statEls = Array.from(
        section.querySelectorAll<HTMLElement>(".stat-value")
      );
      if (statsStrip && statEls.length) {
        type StatProxy = { val: number; el: HTMLElement; suffix: string };
        const proxies: StatProxy[] = statEls.map((el) => ({
          val: 0,
          el,
          suffix: el.dataset.suffix ?? "",
        }));

        // function-based value: each proxy gets its own target count
        // stagger: { each: 0.12, from: "start" } is the gsap-core stagger pattern —
        // GSAP creates one sub-tween per proxy with offset start times
        const counterTween = gsap.to(proxies, {
          val: (i: number) => parseInt(statEls[i].dataset.count ?? "0", 10),
          duration: 1.6,
          ease: "power2.out",
          stagger: { each: 0.12, from: "start" },
          snap: { val: 1 },
          // onUpdate fires per sub-tween; this.targets()[0] is that proxy
          onUpdate(this: gsap.core.Tween) {
            const p = this.targets()[0] as StatProxy;
            p.el.textContent = String(p.val) + p.suffix;
          },
          paused: true,
        });

        ScrollTrigger.create({
          trigger: statsStrip,
          start: "top 82%",
          once: true,
          onEnter: () => counterTween.play(),
        });
      }
    });

    return () => mm.revert();
  }, []);

  return (
    <section ref={sectionRef} id="about" className="py-24 md:py-40">
      <div className="mx-auto max-w-[1400px] px-6 md:px-10">
        <div className="grid grid-cols-12 gap-6 mb-16">
          <p className="col-span-12 md:col-span-3 font-mono text-[11px] tracking-[0.25em] uppercase text-muted">
            §02 — Notes
          </p>
          <h2
            ref={headlineRef}
            className="col-span-12 md:col-span-9 display text-5xl md:text-7xl leading-[0.95] tracking-tightest"
          >
            <span className="block overflow-hidden pb-[0.06em]">
              <span className="about-line block">
                A frontend engineer who reads SQL,
              </span>
            </span>
            <span className="block overflow-hidden pb-[0.06em]">
              <span className="about-line block italic">
                writes Solidity, and ships the README.
              </span>
            </span>
          </h2>
        </div>

        <div className="grid grid-cols-12 gap-6 md:gap-10">
          {/* Portrait */}
          <div className="col-span-12 md:col-span-3">
            <figure className="relative">
              <img
                ref={photoRef}
                src="/avatar.jpg"
                alt="Yash Arya"
                width={460}
                height={460}
                className="w-full h-auto"
                style={{ filter: "grayscale(1) contrast(1.04)" }}
              />
              <figcaption className="mt-3 font-mono text-[10px] tracking-[0.22em] uppercase text-muted">
                Yash Arya · Faridabad, IN
              </figcaption>
            </figure>
          </div>

          {/* Bio */}
          <div className="col-span-12 md:col-span-8 md:col-start-5 space-y-6 text-[17px] leading-[1.65] text-ink2 max-w-[68ch]">
            {profile.bio.map((p, i) => (
              <p key={i} className={i === 0 ? "text-ink" : ""}>
                {p}
              </p>
            ))}
          </div>
        </div>

        {/* Stats strip */}
        <div className="stats-strip mt-24 md:mt-32 grid grid-cols-2 md:grid-cols-4 gap-px bg-rule border border-rule">
          {stats.map((s) => {
            const countNum = parseInt(s.value, 10);
            const countSuffix = s.value.replace(/^\d+/, "");
            return (
              <div key={s.label} className="bg-paper p-8 md:p-10">
                <p
                  className="stat-value display text-6xl md:text-7xl text-ink"
                  data-count={countNum}
                  data-suffix={countSuffix}
                >
                  {s.value}
                </p>
                <p className="mt-3 font-mono text-[10px] tracking-[0.22em] uppercase text-muted">
                  {s.label}
                </p>
              </div>
            );
          })}
        </div>

        {/* Education line */}
        <div className="mt-20 grid grid-cols-12 gap-6 items-baseline border-t border-rule pt-8">
          <p className="col-span-12 md:col-span-3 font-mono text-[11px] tracking-[0.25em] uppercase text-muted">
            Education
          </p>
          <p className="col-span-12 md:col-span-6 text-lg text-ink">
            {education.degree} ·{" "}
            <span className="italic display text-2xl">{education.school}</span>
          </p>
          <p className="col-span-12 md:col-span-3 md:text-right text-sm text-ink2 font-mono">
            {education.period}
          </p>
        </div>
      </div>
    </section>
  );
}
