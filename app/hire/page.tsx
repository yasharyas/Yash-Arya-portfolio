import type { Metadata } from "next";
import Link from "next/link";
import { Cursor } from "@/components/Cursor";
import { HirePage } from "@/components/HirePage";
import { ThemeToggle } from "@/components/ThemeToggle";

export const metadata: Metadata = {
  title: "Hire Yash Arya — Full Stack Developer",
  description:
    "Hire Yash Arya for React, TypeScript, Web3, AI/ML, and VS Code extension projects. 4 internships, 7 shipped projects. Based in New Delhi — works remotely.",
};

function HireNav() {
  return (
    <header className="sticky top-0 z-40 backdrop-blur-md bg-paper/70 border-b border-rule">
      <div className="mx-auto max-w-[1400px] px-6 md:px-10 h-14 flex items-center justify-between">
        <Link
          href="/"
          className="flex items-center gap-2 font-mono text-[10px] sm:text-[11px] tracking-[0.2em] uppercase text-ink2 hover:text-ink transition-colors"
        >
          <img src="/marks/monogram.svg" alt="" width={24} height={24} aria-hidden="true" />
          <span>Yash Arya</span>
          <span className="text-muted hidden sm:inline">← Portfolio</span>
        </Link>
        <div className="flex items-center gap-5">
          <nav className="hidden md:flex items-center gap-6 text-[12px] tracking-wide text-ink2">
            <a href="#work" className="link-u">Work</a>
            <a href="#services" className="link-u">Services</a>
            <a href="#process" className="link-u">Process</a>
          </nav>
          <ThemeToggle />
          <a
            href="mailto:yasharyas@proton.me"
            className="font-mono text-[10px] tracking-[0.2em] uppercase bg-ember text-paper px-4 py-2 hover:bg-ink transition-colors duration-300"
          >
            Hire me
          </a>
        </div>
      </div>
    </header>
  );
}

export default function Page() {
  return (
    <>
      <Cursor />
      <HireNav />
      <main>
        <HirePage />
      </main>
      <footer className="border-t border-rule py-6">
        <div className="mx-auto max-w-[1400px] px-6 md:px-10 flex items-center justify-between">
          <p className="font-mono text-[10px] tracking-[0.2em] uppercase text-muted">
            © 2026 Yash Arya
          </p>
          <Link href="/" className="font-mono text-[10px] tracking-[0.2em] uppercase text-muted hover:text-ink transition-colors link-u">
            Back to Portfolio
          </Link>
        </div>
      </footer>
    </>
  );
}
