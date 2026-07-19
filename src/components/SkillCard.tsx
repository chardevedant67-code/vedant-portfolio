"use client";

import { useMemo, useRef } from "react";
import { motion } from "framer-motion";
import type { Skill } from "@/lib/data";

// deterministic pseudo-random so server and client render identical output
function seededRandom(seed: number) {
  const x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
}

export default function SkillCard({ skill, index }: { skill: Skill; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const Icon = skill.icon;

  const particles = useMemo(
    () =>
      Array.from({ length: 5 }, (_, i) => {
        const seed = index * 17 + i * 5;
        return {
          left: 15 + seededRandom(seed) * 70,
          top: 20 + seededRandom(seed + 1) * 60,
          size: 2 + seededRandom(seed + 2) * 2.5,
          delay: (i * 0.35 + seededRandom(seed + 3) * 0.3).toFixed(2),
        };
      }),
    [index]
  );

  const onMouseMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;
    el.style.setProperty("--mx", `${px * 100}%`);
    el.style.setProperty("--my", `${py * 100}%`);
    el.style.transform = `perspective(800px) rotateX(${(0.5 - py) * 16}deg) rotateY(${
      (px - 0.5) * 16
    }deg) translateY(-8px) scale(1.03)`;
  };

  const onMouseLeave = () => {
    if (ref.current) {
      ref.current.style.transform =
        "perspective(800px) rotateX(0deg) rotateY(0deg) translateY(0) scale(1)";
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 36, scale: 0.85 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.6, delay: index * 0.045, ease: [0.16, 1, 0.3, 1] }}
      className="group relative"
    >
      {/* ambient color glow, breathing */}
      <div
        className="skill-glow pointer-events-none absolute -inset-3 -z-10 rounded-[26px] blur-xl transition-opacity duration-500 group-hover:opacity-70"
        style={{ background: skill.color, animationDelay: `${(index % 6) * 0.4}s` }}
      />

      <div
        ref={ref}
        onMouseMove={onMouseMove}
        onMouseLeave={onMouseLeave}
        className="shimmer-border relative aspect-square overflow-hidden rounded-[20px] border border-white/10 bg-white/[0.03] shadow-[0_8px_30px_rgba(0,0,0,0.35)] backdrop-blur-xl transition-[box-shadow,background-color] duration-300 ease-out will-change-transform group-hover:bg-white/[0.06] group-hover:shadow-[0_20px_50px_rgba(0,0,0,0.5)]"
        style={{ transformStyle: "preserve-3d" }}
      >
        {/* mouse spotlight */}
        <div
          className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          style={{
            background: `radial-gradient(140px circle at var(--mx, 50%) var(--my, 50%), ${skill.color}30, transparent 70%)`,
          }}
        />

        {/* reflection sheen sweep */}
        <div
          className="pointer-events-none absolute inset-0 -translate-x-[120%] transition-transform duration-700 ease-out group-hover:translate-x-[120%]"
          style={{
            background:
              "linear-gradient(115deg, transparent 35%, rgba(255,255,255,0.14) 50%, transparent 65%)",
          }}
        />

        {/* floating particles */}
        {particles.map((p, i) => (
          <span
            key={i}
            suppressHydrationWarning
            className="particle pointer-events-none absolute rounded-full opacity-0 transition-opacity duration-300 group-hover:opacity-100"
            style={{
              left: `${p.left.toFixed(3)}%`,
              top: `${p.top.toFixed(3)}%`,
              width: `${p.size.toFixed(3)}px`,
              height: `${p.size.toFixed(3)}px`,
              background: skill.color,
              animationDelay: `${p.delay}s`,
            }}
          />
        ))}

        <div className="relative z-10 flex h-full flex-col items-center justify-center gap-3 p-3 text-center">
          <motion.div
            animate={{ y: [0, -5, 0] }}
            transition={{
              duration: 3.4 + (index % 4) * 0.4,
              repeat: Infinity,
              ease: "easeInOut",
              delay: (index % 5) * 0.2,
            }}
          >
            <div className="transition-transform duration-500 ease-out group-hover:scale-110 group-hover:rotate-[14deg]">
              <Icon size={30} style={{ color: skill.color }} className="drop-shadow-[0_0_10px_currentColor]" />
            </div>
          </motion.div>
          <span className="text-[12px] font-medium leading-tight text-white/70 transition-colors duration-300 group-hover:text-white sm:text-[13px]">
            {skill.name}
          </span>
        </div>
      </div>
    </motion.div>
  );
}
