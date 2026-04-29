import { experience } from "@/lib/content";

export function Experience() {
  return (
    <section id="experience" className="py-24 md:py-40 bg-cream/40 border-y border-rule">
      <div className="mx-auto max-w-[1400px] px-6 md:px-10">
        <div className="grid grid-cols-12 gap-6 mb-20">
          <p className="col-span-12 md:col-span-3 font-mono text-[11px] tracking-[0.25em] uppercase text-muted">
            §03 — Practice
          </p>
          <h2 className="col-span-12 md:col-span-9 display text-5xl md:text-7xl leading-[0.95] tracking-tightest">
            Four internships,<br />
            <span className="italic">production scars to show for it.</span>
          </h2>
        </div>

        <ol className="space-y-px">
          {experience.map((job, i) => (
            <li
              key={job.company}
              className="group grid grid-cols-12 gap-6 py-10 md:py-14 border-t border-rule"
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
