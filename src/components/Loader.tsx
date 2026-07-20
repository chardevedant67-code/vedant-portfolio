"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const NAME = "VEDANT CHARDE";

export default function Loader() {
  const [progress, setProgress] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    let raf: number;
    let timeoutId: ReturnType<typeof setTimeout> | undefined;
    const start = performance.now();
    const DURATION = 2200;

    function tick(now: number) {
      const elapsed = now - start;
      const pct = Math.min(100, (elapsed / DURATION) * 100);
      setProgress(pct);
      if (pct < 100) {
        raf = requestAnimationFrame(tick);
      } else {
        timeoutId = setTimeout(() => {
          setDone(true);
          document.body.style.overflow = "";
        }, 400);
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
          exit={{ opacity: 0, filter: "blur(20px)" }}
          transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
        >
          <div className="relative flex flex-col items-center gap-8">
            <div className="relative flex overflow-hidden">
              {NAME.split("").map((ch, i) => (
                <motion.span
                  key={i}
                  initial={{ y: 60, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{
                    delay: 0.15 + i * 0.045,
                    duration: 0.7,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className="font-display text-3xl md:text-6xl font-semibold tracking-[0.15em] text-glow gradient-text"
                  style={{ whiteSpace: "pre" }}
                >
                  {ch}
                </motion.span>
              ))}
            </div>

            <div className="relative h-px w-56 md:w-80 overflow-hidden bg-white/10">
              <motion.div
                className="absolute inset-y-0 left-0 bg-gradient-to-r from-neon-cyan via-neon-blue to-neon-purple"
                style={{ width: `${progress}%` }}
              />
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
