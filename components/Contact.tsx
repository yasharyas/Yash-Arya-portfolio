import { links, profile } from "@/lib/content";

export function Contact() {
  return (
    <section
      id="contact"
      className="py-24 md:py-40 bg-ink text-paper relative overflow-hidden"
    >
      <div className="mx-auto max-w-[1400px] px-6 md:px-10">
        <p className="font-mono text-[11px] tracking-[0.25em] uppercase text-paper/60">
          §06 — Get in touch
        </p>

        <h2 className="mt-8 display text-[14vw] md:text-[10vw] leading-[0.9] tracking-tightest">
          Have a project<br />
          <span className="italic text-paper/80">that needs</span>{" "}
          <span className="text-ember">shipping?</span>
        </h2>

        <div className="mt-20 grid grid-cols-12 gap-6 border-t border-paper/15 pt-12">
          <div className="col-span-12 md:col-span-6">
            <p className="font-mono text-[11px] tracking-[0.25em] uppercase text-paper/50 mb-3">
              Direct
            </p>
            <a
              href={`mailto:${links.email}`}
              className="display text-3xl md:text-5xl link-u"
            >
              {links.email}
            </a>
            <p className="mt-3 text-paper/60 text-sm">{links.phone}</p>
          </div>

          <div className="col-span-12 md:col-span-3">
            <p className="font-mono text-[11px] tracking-[0.25em] uppercase text-paper/50 mb-3">
              Elsewhere
            </p>
            <ul className="space-y-2 text-base">
              <li><a href={links.github} className="link-u">GitHub</a></li>
              <li><a href={links.linkedin} className="link-u">LinkedIn</a></li>
              <li><a href={links.twitter} className="link-u">Twitter / X</a></li>
            </ul>
          </div>

          <div className="col-span-12 md:col-span-3">
            <p className="font-mono text-[11px] tracking-[0.25em] uppercase text-paper/50 mb-3">
              Located
            </p>
            <p className="text-base">{profile.location}</p>
            <p className="mt-1 text-paper/60 text-sm">IST · UTC+5:30</p>
          </div>
        </div>
      </div>
    </section>
  );
}

export function Footer() {
  return (
    <footer className="bg-ink text-paper/50 border-t border-paper/10">
      <div className="mx-auto max-w-[1400px] px-6 md:px-10 py-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 font-mono text-[10px] tracking-[0.22em] uppercase">
        <p>© {new Date().getFullYear()} Yash Arya · All Rights Reserved</p>
        <p>Hand-built · Next.js · Tailwind · No Frameworks Were Harmed</p>
      </div>
    </footer>
  );
}
