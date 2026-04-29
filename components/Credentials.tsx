import { certifications, gcpBadges, links } from "@/lib/content";

export function Credentials() {
  return (
    <section className="py-24 md:py-40">
      <div className="mx-auto max-w-[1400px] px-6 md:px-10">
        <div className="grid grid-cols-12 gap-6 mb-16">
          <p className="col-span-12 md:col-span-3 font-mono text-[11px] tracking-[0.25em] uppercase text-muted">
            §05 — Credentials
          </p>
          <h2 className="col-span-12 md:col-span-9 display text-5xl md:text-7xl leading-[0.95] tracking-tightest">
            Coursework,<br />
            <span className="italic">cloud labs, certifications.</span>
          </h2>
        </div>

        <div className="grid grid-cols-12 gap-6">
          {/* Cert list */}
          <div className="col-span-12 lg:col-span-8">
            <ul className="divide-y divide-rule border-y border-rule">
              {certifications.map((c, i) => (
                <li key={c.title} className="grid grid-cols-12 gap-4 py-5">
                  <span className="col-span-1 font-mono text-[11px] text-muted pt-0.5">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="col-span-11 md:col-span-7 text-[15px] text-ink">
                    {c.title}
                  </span>
                  <span className="col-span-12 md:col-span-4 text-sm text-ink2 italic md:text-right">
                    {c.issuer}
                  </span>
                </li>
              ))}
            </ul>
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
                <div key={b.profile} className="bg-paper p-6">
                  <p className="font-mono text-[10px] tracking-[0.22em] uppercase text-muted">
                    Profile {b.profile} · since {b.since}
                  </p>
                  <p className="display text-5xl mt-2 text-ink">{b.points}</p>
                  <p className="mt-1 text-sm text-ink2">{b.league} League</p>
                </div>
              ))}
            </div>
            <div className="mt-6 flex flex-col gap-2 text-sm">
              <a href={links.gcpA} target="_blank" rel="noreferrer" className="link-u">
                Profile A →
              </a>
              <a href={links.gcpB} target="_blank" rel="noreferrer" className="link-u">
                Profile B →
              </a>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
