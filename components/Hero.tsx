import { profile, links } from "@/lib/content";

export function Hero() {
  return (
    <section id="top" className="relative pt-16 md:pt-28 pb-24 md:pb-40">
      <div className="mx-auto max-w-[1400px] px-6 md:px-10">
        {/* Top meta row */}
        <div className="grid grid-cols-12 gap-6 mb-14 md:mb-24 items-start">
          <div className="col-span-6 md:col-span-3">
            <p className="font-mono text-[10px] tracking-[0.25em] uppercase text-muted">
              Index — N° 001
            </p>
            <p className="mt-2 text-sm text-ink2">{profile.location}</p>
          </div>
          <div className="hidden md:flex col-span-6 justify-center">
            <div className="relative">
              <img
                src="/avatar.jpg"
                alt="Yash Arya"
                width={72}
                height={72}
                className="rounded-full grayscale"
                style={{ filter: "grayscale(1) contrast(1.05)" }}
              />
              <span className="absolute -right-1 -bottom-1 w-3 h-3 rounded-full bg-ember ring-2 ring-paper" />
            </div>
          </div>
          <div className="col-span-6 md:col-span-3 md:text-right">
            <p className="font-mono text-[10px] tracking-[0.25em] uppercase text-muted">
              Edition
            </p>
            <p className="mt-2 text-sm text-ink2">Apr 2026 — Spring</p>
          </div>
        </div>

        {/* Display name */}
        <h1 className="display text-[18vw] md:text-[14vw] lg:text-[12rem] xl:text-[14rem] leading-[0.85] rise">
          Yash<span className="text-ember">.</span>
          <br />
          <span className="italic font-light pl-[8vw]">Arya</span>
        </h1>

        {/* Tagline + role band */}
        <div className="mt-12 md:mt-20 grid grid-cols-12 gap-6 items-end">
          <div className="col-span-12 md:col-span-7">
            <p className="text-2xl md:text-3xl leading-snug max-w-[28ch] tracking-tight text-ink">
              {profile.tagline}
            </p>
          </div>
          <div className="col-span-12 md:col-span-5 md:text-right">
            <p className="font-mono text-[11px] tracking-[0.2em] uppercase text-muted mb-2">
              Currently
            </p>
            <p className="text-sm text-ink2 max-w-[36ch] md:ml-auto">
              {profile.status}
            </p>
            <div className="mt-6 flex md:justify-end gap-4 text-[11px] font-mono tracking-[0.18em] uppercase">
              <a href={links.github} className="link-u">GitHub</a>
              <a href={links.linkedin} className="link-u">LinkedIn</a>
              <a href={links.twitter} className="link-u">X</a>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom marquee — disciplines */}
      <div className="mt-24 md:mt-32 border-y border-rule overflow-hidden">
        <div className="flex marquee-track whitespace-nowrap py-4 will-change-transform">
          {Array.from({ length: 2 }).map((_, k) => (
            <div key={k} className="flex items-center shrink-0">
              {[
                "Frontend Systems",
                "Web3 / Solidity",
                "AI & ML",
                "Editor Tools",
                "Production React",
                "Design Engineering",
                "PostgreSQL",
                "Smart Contracts",
                "PyTorch",
                "Turborepo",
              ].map((w, i) => (
                <span key={`${k}-${i}`} className="display text-[6vw] md:text-[3.6vw] px-8 italic">
                  {w}
                  <span className="text-ember not-italic"> · </span>
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
