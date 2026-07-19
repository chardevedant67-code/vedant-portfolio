"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const DISPLAY_MS = 2000;
const TRANSITION_S = 0.6;

export default function RotatingTitle({ titles }: { titles: string[] }) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setIndex((prev) => (prev + 1) % titles.length);
    }, DISPLAY_MS);
    return () => clearInterval(id);
  }, [titles.length]);

  return (
    <div className="flex items-center justify-center gap-2 font-display text-xl sm:text-2xl md:text-3xl">
      <span className="font-bold text-white">I am</span>
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={titles[index]}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -16 }}
          transition={{ duration: TRANSITION_S, ease: [0.16, 1, 0.3, 1] }}
          className="hero-name-blue text-glow whitespace-nowrap font-extrabold tracking-wide"
        >
          {titles[index]}
        </motion.span>
      </AnimatePresence>
    </div>
  );
}
