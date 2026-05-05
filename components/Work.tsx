"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { featured, otherProjects } from "@/lib/content";
import { ProjectPlate } from "./ProjectPlate";

gsap.registerPlugin(ScrollTrigger);

// Clip-mask word splitter — wordClass targets the animatable inner span
function WordSplit({
  text,
  italic = false,
  wordClass = "word-inner",
}: {
  text: string;
  italic?: boolean;
  wordClass?: string;
}) {
  return (
    <>
      {text.split(" ").map((word, i, arr) => (
        <span key={i} className="inline-block overflow-hidden pb-[0.12em] leading-[0.95]">
          <span className={`${wordClass} inline-block${italic ? " italic" : ""}`}>
            {word}
          </span>
          {i < arr.length - 1 && "\u00a0"}
        </span>
      ))}
    </>
  );
}

export function Work() {
  const introRef = useRef<HTMLDivElement>(null);
  const subheadRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const mm = gsap.matchMedia();

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      // ── Section headline word rise ──────────────────────────────────────────
      const section = introRef.current;
      if (section) {
        const words = Array.from(section.querySelectorAll<HTMLElement>(".word-inner"));
        const tl = gsap.timeline({
          defaults: { ease: "power3.out", duration: 0.85 },
          scrollTrigger: {
            trigger: section,
            start: "top 78%",
            toggleActions: "play none none none",
            once: true,
          },
        });
        tl.addLabel("rise", 0);
        words.forEach((word, i) => tl.from(word, { yPercent: 115 }, `rise+=${i * 0.065}`));
      }

      // ── Subheading scrub ────────────────────────────────────────────────────
      if (subheadRef.current) {
        gsap.from(subheadRef.current, {
          autoAlpha: 0,
          y: 12,
          ease: "none",
          scrollTrigger: {
            trigger: subheadRef.current,
            start: "top 90%",
            end: "top 55%",
            scrub: true,
          },
        });
      }

      // ── Per-card animations ─────────────────────────────────────────────────
      const cards = Array.from(document.querySelectorAll<HTMLElement>(".project-card"));

      // Batch: Y-slide + fade stagger on scroll entry
      gsap.set(cards, { autoAlpha: 0, y: 48 });
      ScrollTrigger.batch(cards, {
        start: "top 85%",
        interval: 0.08,
        onEnter: (batch) =>
          gsap.to(batch, {
            autoAlpha: 1,
            y: 0,
            duration: 0.75,
            ease: "power3.out",
            stagger: 0.1,
            overwrite: true,
          }),
        onLeaveBack: (batch) =>
          gsap.set(batch, { autoAlpha: 0, y: 48, overwrite: true }),
      });

      // Collect event-listener teardowns for mm cleanup
      const teardowns: (() => void)[] = [];

      cards.forEach((card) => {
        // Per-card title word rise — ScrollTrigger on the timeline (top-level)
        const titleWords = Array.from(
          card.querySelectorAll<HTMLElement>(".proj-word-inner")
        );
        if (titleWords.length) {
          const ttl = gsap.timeline({
            defaults: { ease: "power3.out", duration: 0.7 },
            scrollTrigger: {
              trigger: card,
              start: "top 75%",
              toggleActions: "play none none none",
              once: true,
            },
          });
          ttl.addLabel("ptitle", 0);
          titleWords.forEach((w, i) => ttl.from(w, { yPercent: 110 }, `ptitle+=${i * 0.07}`));
        }

        // Mockup: scale-up 0.96 → 1 + subtle parallax Y, scrubbed
        const plate = card.querySelector<HTMLElement>(".project-plate-wrap");
        if (plate) {
          gsap.fromTo(
            plate,
            { scale: 0.96 },
            {
              scale: 1,
              ease: "none",
              scrollTrigger: {
                trigger: plate,
                start: "top 88%",
                end: "top 30%",
                scrub: 1,
              },
            }
          );
          gsap.fromTo(
            plate,
            { y: 24 },
            {
              y: -16,
              ease: "none",
              scrollTrigger: {
                trigger: plate,
                start: "top bottom",
                end: "bottom top",
                scrub: 1,
              },
            }
          );
        }

        // Hover: lift + border fade (opacity-only — no repaint)
        const highlight = card.querySelector<HTMLElement>(".card-border-highlight");
        const onEnter = () => {
          gsap.to(card, { y: -5, duration: 0.25, ease: "power2.out", overwrite: "auto" });
          if (highlight) gsap.to(highlight, { autoAlpha: 1, duration: 0.2, ease: "power2.out", overwrite: "auto" });
        };
        const onLeave = () => {
          gsap.to(card, { y: 0, duration: 0.3, ease: "power2.out", overwrite: "auto" });
          if (highlight) gsap.to(highlight, { autoAlpha: 0, duration: 0.3, ease: "power2.out", overwrite: "auto" });
        };

        card.addEventListener("mouseenter", onEnter);
        card.addEventListener("mouseleave", onLeave);
        teardowns.push(() => {
          card.removeEventListener("mouseenter", onEnter);
          card.removeEventListener("mouseleave", onLeave);
        });
      });

      return () => teardowns.forEach((fn) => fn());
    });

    return () => mm.revert();
  }, []);

  return (
    <section id="work" className="py-24 md:py-40">
      <div className="mx-auto max-w-[1400px] px-6 md:px-10">
        <div className="grid grid-cols-12 gap-6 mb-20">
          <p
            ref={subheadRef}
            className="col-span-12 md:col-span-3 font-mono text-[11px] tracking-[0.25em] uppercase text-muted"
          >
            §01 — Selected Work
          </p>
          <h2
            ref={introRef}
            className="col-span-12 md:col-span-9 display text-5xl md:text-7xl leading-[0.95] tracking-tightest"
          >
            <WordSplit text="Seven projects." />
            <br />
            <WordSplit text="Editor tooling to explainable AI." italic />
          </h2>
        </div>

        <div className="space-y-px">
          {featured.map((p, i) => (
            <article
              key={p.index}
              className="project-card relative grid grid-cols-12 gap-6 border-t border-rule py-12 md:py-20"
            >
              {/* Hover border highlight — opacity-only, no paint cost */}
              <span
                className="card-border-highlight absolute inset-x-0 top-0 h-px bg-ink pointer-events-none"
                style={{ opacity: 0 }}
              />
              {/* Left rail */}
              <div className="col-span-12 md:col-span-2">
                <p className="font-mono text-[11px] tracking-[0.2em] uppercase text-ember">
                  {p.index}
                </p>
                <p className="mt-2 font-mono text-[11px] tracking-[0.2em] uppercase text-muted">
                  {p.year}
                </p>
              </div>

              {/* Title + body */}
              <div className="col-span-12 md:col-span-7">
                <h3 className="display text-4xl md:text-6xl leading-[0.95] tracking-tightest text-ink">
                  <WordSplit text={p.title} wordClass="proj-word-inner" />
                </h3>
                <p className="mt-3 text-lg md:text-xl text-ink2 italic max-w-[40ch]">
                  {p.tagline}
                </p>
                <p className="mt-7 text-[15px] leading-[1.7] text-ink2 max-w-[68ch]">
                  {p.description}
                </p>
                <ul className="mt-6 space-y-2 text-[14px] leading-[1.65] text-ink2 max-w-[68ch]">
                  {p.highlights.map((h, j) => (
                    <li key={j} className="flex gap-3">
                      <span className="text-ember pt-2 shrink-0">
                        <svg width="6" height="6" viewBox="0 0 6 6" aria-hidden="true">
                          <rect width="6" height="6" fill="currentColor" />
                        </svg>
                      </span>
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>

                <div className="project-plate-wrap mt-10 max-w-[640px]">
                  <ProjectPlate index={p.index} />
                </div>
              </div>

              {/* Right meta */}
              <div className="col-span-12 md:col-span-3 md:pl-6 md:border-l md:border-rule">
                <p className="font-mono text-[10px] tracking-[0.2em] uppercase text-muted">
                  Status
                </p>
                <p className="mt-1 text-sm text-ink2">{p.status}</p>

                <p className="mt-6 font-mono text-[10px] tracking-[0.2em] uppercase text-muted">
                  Stack
                </p>
                <p className="mt-1 text-sm text-ink2 leading-relaxed">
                  {p.stack.join(" · ")}
                </p>

                <div className="mt-8 flex flex-col gap-2">
                  {p.links.map((l) => (
                    <a
                      key={l.href}
                      href={l.href}
                      target="_blank"
                      rel="noreferrer"
                      className="link-u text-sm text-ink"
                    >
                      {l.label} →
                    </a>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Other projects ledger */}
        <div className="mt-32 grid grid-cols-12 gap-6">
          <p className="col-span-12 md:col-span-3 font-mono text-[11px] tracking-[0.25em] uppercase text-muted">
            Also in the archive
          </p>
          <ul className="col-span-12 md:col-span-9 divide-y divide-rule border-y border-rule">
            {otherProjects.map((o) => (
              <li key={o.name}>
                <a
                  href={o.href}
                  target="_blank"
                  rel="noreferrer"
                  className="grid grid-cols-12 gap-x-4 gap-y-1 py-5 group"
                >
                  <span className="col-span-9 md:col-span-5 text-base md:text-lg text-ink group-hover:text-ember transition-colors">
                    {o.name}
                  </span>
                  <span className="col-span-3 md:col-span-2 md:order-3 text-right font-mono text-xs text-muted">
                    {o.year}
                  </span>
                  <span className="col-span-12 md:col-span-5 md:order-2 text-sm text-ink2 md:truncate">
                    {o.note}
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
