"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const LINKS = [
  { href: "#about", label: "About" },
  { href: "#skills", label: "Skills" },
  { href: "#experience", label: "Experience" },
  { href: "#projects", label: "Projects" },
  { href: "#achievements", label: "Achievements" },
  { href: "#certificates", label: "Certificates" },
  { href: "#contact", label: "Contact" },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    // Lenis-driven smooth scroll can fire scroll events far more often than
    // the display refreshes; rAF-gate so the state check runs at most once
    // per frame instead of once per raw event.
    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        setScrolled(window.scrollY > 40);
        ticking = false;
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, delay: 2.4, ease: [0.16, 1, 0.3, 1] }}
      className={`fixed top-0 left-0 right-0 z-[500] transition-all duration-500 ${
        scrolled ? "glass-strong shadow-lg" : "bg-transparent"
      }`}
    >
      <nav className="mx-auto flex h-20 lg:h-[86px] w-full max-w-[1400px] items-center px-6 sm:px-8 lg:px-12 xl:px-16">
        <a
          href="#hero"
          data-cursor-hover
          className="font-display flex h-11 items-center text-lg font-semibold tracking-widest gradient-text"
        >
          VC
        </a>

        <div className="hidden flex-1 items-center justify-end lg:flex">
          <div className="flex items-center gap-2 xl:gap-3">
            {LINKS.map((l) => (
              <a
                key={l.href}
                href={l.href}
                data-cursor-hover
                className="flex h-11 items-center rounded-full px-4 text-lg font-medium tracking-wide text-white/70 transition-colors hover:text-white hover:bg-white/5"
              >
                {l.label}
              </a>
            ))}
          </div>
        </div>

        <button
          data-cursor-hover
          className="ml-auto flex h-11 w-11 items-center justify-center rounded-full lg:hidden text-white/80"
          onClick={() => setOpen((o) => !o)}
          aria-label="Toggle menu"
        >
          <div className="flex flex-col gap-1">
            <span className="block h-px w-5 bg-white/80" />
            <span className="block h-px w-5 bg-white/80" />
          </div>
        </button>
      </nav>

      {open && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-strong absolute right-6 top-[calc(100%+0.5rem)] flex flex-col gap-1 rounded-2xl p-3 lg:hidden"
          style={{ width: "min(92vw, 320px)" }}
        >
          {LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="rounded-xl px-4 py-3 text-sm text-white/80 hover:bg-white/5"
            >
              {l.label}
            </a>
          ))}
          <a
            href="#contact"
            onClick={() => setOpen(false)}
            className="mt-1 flex items-center justify-center rounded-xl bg-gradient-to-r from-neon-blue to-neon-purple px-4 py-3 text-sm font-semibold text-white"
          >
            Hire Me
          </a>
        </motion.div>
      )}
    </motion.header>
  );
}
