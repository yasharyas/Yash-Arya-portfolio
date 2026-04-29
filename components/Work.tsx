import { featured, otherProjects } from "@/lib/content";
import { ProjectPlate } from "./ProjectPlate";

export function Work() {
  return (
    <section id="work" className="py-24 md:py-40">
      <div className="mx-auto max-w-[1400px] px-6 md:px-10">
        <div className="grid grid-cols-12 gap-6 mb-20">
          <p className="col-span-12 md:col-span-3 font-mono text-[11px] tracking-[0.25em] uppercase text-muted">
            §01 — Selected Work
          </p>
          <h2 className="col-span-12 md:col-span-9 display text-5xl md:text-7xl leading-[0.95] tracking-tightest">
            Seven projects.<br />
            <span className="italic">Editor tooling to explainable AI.</span>
          </h2>
        </div>

        <div className="space-y-px">
          {featured.map((p, i) => (
            <article
              key={p.index}
              className="grid grid-cols-12 gap-6 border-t border-rule py-12 md:py-20"
            >
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
                  {p.title}
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

                <div className="mt-10 max-w-[640px]">
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
                  className="grid grid-cols-12 gap-4 py-5 group"
                >
                  <span className="col-span-7 md:col-span-5 text-lg text-ink group-hover:text-ember transition-colors">
                    {o.name}
                  </span>
                  <span className="col-span-3 md:col-span-5 text-sm text-ink2 truncate">
                    {o.note}
                  </span>
                  <span className="col-span-2 md:col-span-2 text-right font-mono text-xs text-muted">
                    {o.year}
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
