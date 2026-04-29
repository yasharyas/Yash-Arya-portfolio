import Link from "next/link";
import { links } from "@/lib/content";

export function Nav() {
  const items = [
    { label: "Work", href: "#work" },
    { label: "About", href: "#about" },
    { label: "Experience", href: "#experience" },
    { label: "Skills", href: "#skills" },
    { label: "Contact", href: "#contact" },
  ];
  return (
    <header className="sticky top-0 z-40 backdrop-blur-md bg-paper/70 border-b border-rule">
      <div className="mx-auto max-w-[1400px] px-6 md:px-10 h-14 flex items-center justify-between">
        <Link href="#top" className="flex items-center gap-3 font-mono text-[11px] tracking-[0.2em] uppercase">
          <img src="/marks/monogram.svg" alt="" width={28} height={28} aria-hidden="true" />
          Yash Arya<span className="text-ember"> · </span>Index 2026
        </Link>
        <nav className="hidden md:flex items-center gap-7 text-[12px] tracking-wide text-ink2">
          {items.map((i) => (
            <a key={i.href} href={i.href} className="link-u">
              {i.label}
            </a>
          ))}
        </nav>
        <a
          href={`mailto:${links.email}`}
          className="text-[11px] tracking-[0.2em] uppercase font-mono link-u"
        >
          Available →
        </a>
      </div>
    </header>
  );
}
