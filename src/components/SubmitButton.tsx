"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, Check, Loader2 } from "lucide-react";
import MagneticButton from "@/components/MagneticButton";

export type SubmitStatus = "idle" | "loading" | "success";

export default function SubmitButton({ status }: { status: SubmitStatus }) {
  const [ripples, setRipples] = useState<{ id: number; x: number; y: number }[]>([]);

  const onMouseDown = (e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => {
    if (status !== "idle") return;
    const rect = e.currentTarget.getBoundingClientRect();
    const id = Date.now();
    setRipples((prev) => [...prev, { id, x: e.clientX - rect.left, y: e.clientY - rect.top }]);
  };

  return (
    <MagneticButton
      type="submit"
      onClick={onMouseDown}
      className="hero-btn-glass hero-btn-primary group relative flex w-full items-center justify-center gap-2 overflow-hidden rounded-full px-8 py-4 text-base font-semibold text-white sm:w-auto sm:min-w-[240px]"
    >
      {ripples.map((r) => (
        <motion.span
          key={r.id}
          initial={{ opacity: 0.5, scale: 0 }}
          animate={{ opacity: 0, scale: 5 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          onAnimationComplete={() => setRipples((prev) => prev.filter((p) => p.id !== r.id))}
          className="pointer-events-none absolute h-4 w-4 rounded-full bg-white/50"
          style={{ left: r.x - 8, top: r.y - 8 }}
        />
      ))}

      <AnimatePresence mode="wait" initial={false}>
        {status === "loading" ? (
          <motion.span
            key="loading"
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.25 }}
            className="flex items-center gap-2"
          >
            <Loader2 size={18} className="animate-spin" />
            Sending...
          </motion.span>
        ) : status === "success" ? (
          <motion.span
            key="success"
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.85 }}
            transition={{ duration: 0.3 }}
            className="flex items-center gap-2"
          >
            <Check size={18} />
            Message Sent!
          </motion.span>
        ) : (
          <motion.span
            key="idle"
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.25 }}
            className="flex items-center gap-2"
          >
            Send Message
            <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
          </motion.span>
        )}
      </AnimatePresence>
    </MagneticButton>
  );
}
