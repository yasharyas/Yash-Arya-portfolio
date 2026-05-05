"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { certifications, gcpBadges, links } from "@/lib/content";

gsap.registerPlugin(ScrollTrigger);

// Split cert list into two balanced columns
const half = Math.ceil(certifications.length / 2);
const certCol1 = certifications.slice(0, half);
const certCol2 = certifications.slice(half);

export function Credentials() {
  const sectionRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const mm = gsap.matchMedia();

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const section = sectionRef.current;
      if (!section) return;

      // ── Headline: line-by-line clip reveal ─────────────────────────────────
      if (headlineRef.current) {
        const lines = Array.from(
          headlineRef.current.querySelectorAll<HTMLElement>(".cred-line")
        );
        const tl = gsap.timeline({
          defaults: { ease: "power3.out", duration: 0.85 },
          scrollTrigger: {
            trigger: headlineRef.current,
            start: "top 80%",
            toggleActions: "play none none none",
            once: true,
          },
        });
        tl.addLabel("rise", 0);
        lines.forEach((line, i) =>
          tl.from(line, { yPercent: 108 }, `rise+=${i * 0.15}`)
        );
      }

      // ── Cert rows: left-to-right slide via ScrollTrigger.batch ─────────────
      const certRows = Array.from(
        section.querySelectorAll<HTMLElement>(".cred-row")
      );
      gsap.set(certRows, { autoAlpha: 0, x: -24 });
      ScrollTrigger.batch(certRows, {
        start: "top 88%",
        once: true,
        interval: 0.05,
        onEnter: (batch) =>
          gsap.to(batch, {
            autoAlpha: 1,
            x: 0,
            duration: 0.6,
            ease: "power2.out",
            stagger: 0.06,
            overwrite: true,
          }),
      });

      // ── GCP badges: fade + upward drift ────────────────────────────────────
      const badges = Array.from(
        section.querySelectorAll<HTMLElement>(".gcp-badge")
      );
      gsap.set(badges, { autoAlpha: 0, y: 22 });
      ScrollTrigger.batch(badges, {
        start: "top 85%",
        once: true,
        interval: 0.1,
        onEnter: (batch) =>
          gsap.to(batch, {
            autoAlpha: 1,
            y: 0,
            duration: 0.75,
            ease: "power2.out",
            stagger: 0.12,
            overwrite: true,
          }),
      });
    });

    return () => mm.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="py-24 md:py-40"
      style={{ backgroundColor: "rgba(236,228,211,0.22)" }}
    >
      <div className="mx-auto max-w-[1400px] px-6 md:px-10">
        <div className="grid grid-cols-12 gap-6 mb-16">
          <p className="col-span-12 md:col-span-3 font-mono text-[11px] tracking-[0.25em] uppercase text-muted">
            §05 — Credentials
          </p>
          <h2
            ref={headlineRef}
            className="col-span-12 md:col-span-9 display text-5xl md:text-7xl leading-[0.95] tracking-tightest"
          >
            <span className="block overflow-hidden pb-[0.06em]">
              <span className="cred-line block">Coursework,</span>
            </span>
            <span className="block overflow-hidden pb-[0.06em]">
              <span className="cred-line block italic">
                cloud labs, certifications.
              </span>
            </span>
          </h2>
        </div>

        <div className="grid grid-cols-12 gap-6">
          {/* Cert list — two balanced columns on lg screens */}
          <div className="col-span-12 lg:col-span-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 lg:gap-x-12 border-y border-rule">
              {/* Column 1 */}
              <ul className="divide-y divide-rule">
                {certCol1.map((c, i) => (
                  <li key={c.title} className="cred-row py-5">
                    <div className="flex gap-3">
                      <span className="font-mono text-[11px] text-muted pt-0.5 shrink-0">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <div>
                        <p className="text-[14px] text-ink leading-snug">
                          {c.title}
                        </p>
                        <p className="mt-1 text-sm text-ink2 italic">
                          {c.issuer}
                        </p>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
              {/* Column 2 */}
              <ul className="divide-y divide-rule lg:border-l lg:border-rule lg:pl-12">
                {certCol2.map((c, i) => (
                  <li key={c.title} className="cred-row py-5">
                    <div className="flex gap-3">
                      <span className="font-mono text-[11px] text-muted pt-0.5 shrink-0">
                        {String(half + i + 1).padStart(2, "0")}
                      </span>
                      <div>
                        <p className="text-[14px] text-ink leading-snug">
                          {c.title}
                        </p>
                        <p className="mt-1 text-sm text-ink2 italic">
                          {c.issuer}
                        </p>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
            <a
              href={links.certificates}
              target="_blank"
              rel="noreferrer"
              className="mt-6 inline-block link-u text-sm font-mono tracking-[0.18em] uppercase"
            >
              View certificate folder →
            </a>
          </div>

          {/* GCP badges */}
          <aside className="col-span-12 lg:col-span-4">
            <p className="font-mono text-[11px] tracking-[0.25em] uppercase text-ember mb-5">
              Google Cloud Skills Boost
            </p>
            <div className="space-y-px bg-rule border border-rule">
              {gcpBadges.map((b) => (
                <div key={b.profile} className="gcp-badge bg-paper p-6">
                  <p className="font-mono text-[10px] tracking-[0.22em] uppercase text-muted">
                    Profile {b.profile} · since {b.since}
                  </p>
                  <p className="display text-5xl mt-2 text-ink">{b.points}</p>
                  <p className="mt-1 text-sm text-ink2">{b.league} League</p>
                </div>
              ))}
            </div>
            <div className="mt-6 flex flex-col gap-2 text-sm">
              <a
                href={links.gcpA}
                target="_blank"
                rel="noreferrer"
                className="link-u"
              >
                Profile A →
              </a>
              <a
                href={links.gcpB}
                target="_blank"
                rel="noreferrer"
                className="link-u"
              >
                Profile B →
              </a>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
