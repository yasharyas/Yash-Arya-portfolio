import { profile, stats, education } from "@/lib/content";

export function About() {
  return (
    <section id="about" className="py-24 md:py-40">
      <div className="mx-auto max-w-[1400px] px-6 md:px-10">
        <div className="grid grid-cols-12 gap-6 mb-16">
          <p className="col-span-12 md:col-span-3 font-mono text-[11px] tracking-[0.25em] uppercase text-muted">
            §02 — Notes
          </p>
          <h2 className="col-span-12 md:col-span-9 display text-5xl md:text-7xl leading-[0.95] tracking-tightest">
            A frontend engineer who reads SQL,<br />
            <span className="italic">writes Solidity, and ships the README.</span>
          </h2>
        </div>

        <div className="grid grid-cols-12 gap-6 md:gap-10">
          {/* Portrait */}
          <div className="col-span-12 md:col-span-3">
            <figure className="relative">
              <img
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
        <div className="mt-24 md:mt-32 grid grid-cols-2 md:grid-cols-4 gap-px bg-rule border border-rule">
          {stats.map((s) => (
            <div key={s.label} className="bg-paper p-8 md:p-10">
              <p className="display text-6xl md:text-7xl text-ink">{s.value}</p>
              <p className="mt-3 font-mono text-[10px] tracking-[0.22em] uppercase text-muted">
                {s.label}
              </p>
            </div>
          ))}
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
