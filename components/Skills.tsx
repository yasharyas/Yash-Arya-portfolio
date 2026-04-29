import { skills } from "@/lib/content";

export function Skills() {
  return (
    <section id="skills" className="py-24 md:py-40 bg-cream/40 border-y border-rule">
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
                    className="text-ink2 after:content-['·'] after:text-muted after:mx-2 last:after:content-['']"
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
