"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const TITLE = "WELCOME TO MY PORTFOLIO";
const SUBTITLE = "Loading Experience...";

// Progress fill + hold must sum to the same 2600ms window the original
// loader used — Hero.tsx times its own reveal off that exact mark.
const FILL_DURATION = 1800;
const HOLD_DURATION = 800;

const GRADIENT_TEXT_STYLE: React.CSSProperties = {
  backgroundImage:
    "linear-gradient(90deg, var(--neon-blue), var(--neon-purple), var(--neon-blue))",
  backgroundSize: "200% auto",
  WebkitBackgroundClip: "text",
  backgroundClip: "text",
  color: "transparent",
};

export default function Loader() {
  const [progress, setProgress] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    let raf: number;
    let timeoutId: ReturnType<typeof setTimeout> | undefined;
    const start = performance.now();

    function tick(now: number) {
      const elapsed = now - start;
      const pct = Math.min(100, (elapsed / FILL_DURATION) * 100);
      setProgress(pct);
      if (pct < 100) {
        raf = requestAnimationFrame(tick);
      } else {
        timeoutId = setTimeout(() => {
          setDone(true);
          document.body.style.overflow = "";
        }, HOLD_DURATION);
      }
    }
    raf = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(timeoutId);
      document.body.style.overflow = "";
    };
  }, []);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          className="fixed inset-0 z-[10000] flex flex-col items-center justify-center bg-[#05050a]"
          exit={{ opacity: 0, scale: 0.92, filter: "blur(24px)" }}
          transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
        >
          <div className="relative flex flex-col items-center gap-7 px-6">
            <motion.div
              initial={{ opacity: 0, scale: 0.85, y: 24 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            >
              <motion.h1
                className="font-display text-center text-2xl sm:text-4xl md:text-6xl font-bold leading-tight tracking-[0.05em] sm:tracking-[0.12em]"
                style={GRADIENT_TEXT_STYLE}
                animate={{
                  backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                  filter: [
                    "drop-shadow(0 0 18px rgba(77,124,255,0.35)) drop-shadow(0 0 42px rgba(176,77,255,0.2))",
                    "drop-shadow(0 0 34px rgba(77,124,255,0.55)) drop-shadow(0 0 80px rgba(176,77,255,0.35))",
                    "drop-shadow(0 0 18px rgba(77,124,255,0.35)) drop-shadow(0 0 42px rgba(176,77,255,0.2))",
                  ],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                {TITLE}
              </motion.h1>
            </motion.div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.55 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="font-mono text-xs md:text-sm tracking-[0.3em] text-white/50"
            >
              {SUBTITLE}
            </motion.p>

            <div className="relative h-2 w-56 md:w-80 overflow-hidden rounded-full border border-white/10 bg-white/5 backdrop-blur-md">
              <motion.div
                className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-neon-cyan via-neon-blue to-neon-purple shadow-[0_0_16px_rgba(77,234,255,0.6)]"
                style={{ width: `${progress}%` }}
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent"
                  animate={{ x: ["-100%", "200%"] }}
                  transition={{ duration: 1.4, repeat: Infinity, ease: "linear" }}
                />
              </motion.div>
            </div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.6 }}
              transition={{ delay: 0.6 }}
              className="font-mono text-xs tracking-[0.3em] text-white/50"
            >
              {Math.floor(progress).toString().padStart(3, "0")}%
            </motion.p>
          </div>

          {/* energy particles */}
          {Array.from({ length: 24 }).map((_, i) => (
            <motion.span
              key={i}
              className="absolute h-1 w-1 rounded-full bg-neon-cyan"
              style={{
                left: `${(i * 37) % 100}%`,
                top: `${(i * 53) % 100}%`,
                boxShadow: "0 0 8px 2px rgba(77,234,255,0.8)",
              }}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: [0, 1, 0], scale: [0, 1, 0] }}
              transition={{
                duration: 2 + (i % 5) * 0.3,
                repeat: Infinity,
                delay: (i % 7) * 0.25,
              }}
            />
          ))}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
