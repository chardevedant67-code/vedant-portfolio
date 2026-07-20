"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Check } from "lucide-react";
import Reveal from "@/components/Reveal";
import TiltCard from "@/components/TiltCard";
import { researchPaper, achievementTimeline } from "@/lib/data";

function ResearchGem() {
  return (
    <motion.div
      className="relative h-40 w-40 sm:h-48 sm:w-48"
      animate={{ y: [0, -8, 0] }}
      transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
    >
      <div className="pointer-events-none absolute inset-0 rounded-full bg-neon-purple/30 blur-2xl" />
      <Image
        src="/achievements/springer-award.png"
        alt="Springer research paper award"
        fill
        sizes="192px"
        className="relative object-contain drop-shadow-[0_0_22px_rgba(176,77,255,0.5)]"
        style={{
          maskImage: "radial-gradient(circle, black 58%, transparent 88%)",
          WebkitMaskImage: "radial-gradient(circle, black 58%, transparent 88%)",
        }}
      />
    </motion.div>
  );
}

function TimelineNode({
  item,
  index,
}: {
  item: (typeof achievementTimeline)[number];
  index: number;
}) {
  const Icon = item.icon;
  return (
    <div className="flex flex-col items-center gap-3">
      <motion.div
        initial={{ opacity: 0, y: 16, scale: 0.8 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ duration: 0.5, delay: index * 0.12, ease: [0.16, 1, 0.3, 1] }}
        className="group relative flex h-14 w-14 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:scale-110 hover:rotate-3 sm:h-20 sm:w-20 md:h-24 md:w-24"
        style={{ boxShadow: `0 0 18px ${item.color}33, inset 0 1px 0 rgba(255,255,255,0.08)` }}
      >
        <div
          className="absolute inset-0 rounded-full opacity-60 transition-opacity duration-300 group-hover:opacity-100"
          style={{
            background: `radial-gradient(circle at 50% 40%, ${item.color}2e, transparent 70%)`,
            animation: "glow-breathe 4s ease-in-out infinite",
            animationDelay: `${index * 0.5}s`,
          }}
        />
        <Icon size={24} style={{ color: item.color }} className="relative drop-shadow-[0_0_8px_currentColor] sm:size-8 md:size-9" />
      </motion.div>
      <div className="text-center">
        <p className="text-xs font-semibold text-white sm:text-base">{item.label}</p>
        <p className="mt-0.5 text-[10px] text-white/45 sm:text-sm">{item.sublabel}</p>
      </div>
    </div>
  );
}

function Connector({ index }: { index: number }) {
  return (
    <div className="flex h-14 w-6 flex-shrink-0 items-center justify-center sm:h-20 sm:w-12 md:h-24 md:w-16">
      <div className="relative h-px w-full">
        <div className="absolute inset-0 bg-gradient-to-r from-white/5 via-white/25 to-white/5" />
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/80 to-transparent"
          animate={{ opacity: [0.2, 1, 0.2] }}
          transition={{ duration: 2.4, repeat: Infinity, delay: index * 0.3, ease: "easeInOut" }}
        />
        <span className="absolute left-1/2 top-1/2 h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white shadow-[0_0_8px_2px_rgba(255,255,255,0.7)]" />
      </div>
    </div>
  );
}

export default function Achievements() {
  return (
    <section id="achievements" className="relative section-pad container-px overflow-hidden">
      <div
        className="pointer-events-none absolute -top-10 left-1/5 h-72 w-72 rounded-full"
        style={{ background: "radial-gradient(circle, var(--neon-purple) 0%, transparent 70%)", opacity: 0.2 }}
      />
      <div
        className="pointer-events-none absolute bottom-0 right-1/5 h-72 w-72 rounded-full"
        style={{ background: "radial-gradient(circle, var(--neon-blue) 0%, transparent 70%)", opacity: 0.2 }}
      />

      <div className="relative mx-auto max-w-7xl">
        <Reveal>
          <p className="mb-3 font-mono text-xs tracking-[0.3em] text-neon-cyan">05 · ACHIEVEMENTS</p>
          <h2 className="font-display text-4xl md:text-5xl font-semibold text-white">
            <span className="gradient-text">Achievements</span>
          </h2>
        </Reveal>

        <div className="mt-14 flex flex-col gap-7 lg:flex-row lg:items-stretch">
          {/* LEFT CARD — 45% */}
          <Reveal className="lg:basis-[45%]">
            <TiltCard maxTilt={4} className="glass shimmer-border relative h-full overflow-hidden rounded-[20px] p-6 sm:p-9 md:p-10 transition-shadow duration-500 hover:glow-purple">
              <div className="flex h-full flex-col items-center gap-7 sm:flex-row sm:items-center sm:justify-between">
                <div className="min-w-0">
                  <h3 className="font-display text-2xl font-semibold text-white">{researchPaper.title}</h3>
                  <p className="mt-1 text-base text-white/50">{researchPaper.subtitle}</p>

                  <ul className="mt-6 flex flex-col gap-3">
                    {researchPaper.points.map((pt) => (
                      <li key={pt} className="flex items-start gap-2.5 text-base leading-snug text-white/70">
                        <Check size={18} strokeWidth={3} className="mt-0.5 flex-shrink-0 text-neon-cyan" />
                        <span>{pt}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="flex flex-shrink-0 items-center justify-center">
                  <ResearchGem />
                </div>
              </div>
            </TiltCard>
          </Reveal>

          {/* RIGHT CARD — 55% */}
          <Reveal delay={0.12} className="lg:basis-[55%]">
            <TiltCard maxTilt={4} className="glass shimmer-border hide-scrollbar relative flex h-full items-center justify-center overflow-x-auto rounded-[20px] p-6 sm:p-9 md:p-10 transition-shadow duration-500 hover:glow-blue">
              <div className="flex items-start">
                {achievementTimeline.map((item, i) => (
                  <div key={item.label} className="flex items-start">
                    <TimelineNode item={item} index={i} />
                    {i < achievementTimeline.length - 1 && <Connector index={i} />}
                  </div>
                ))}
              </div>
            </TiltCard>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
