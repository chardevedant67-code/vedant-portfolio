"use client";

import Reveal from "@/components/Reveal";
import SkillCard from "@/components/SkillCard";
import { skills } from "@/lib/data";

export default function Skills() {
  return (
    <section id="skills" className="relative section-pad container-px overflow-hidden">
      {/* ambient background glows local to this section — radial-gradient instead
          of a blurred solid div, same soft look without a compositor blur pass */}
      <div
        className="pointer-events-none absolute -top-20 left-1/4 h-72 w-72 -translate-x-1/2 rounded-full"
        style={{ background: "radial-gradient(circle, var(--neon-purple) 0%, transparent 70%)", opacity: 0.2 }}
      />
      <div
        className="pointer-events-none absolute bottom-0 right-1/4 h-80 w-80 translate-x-1/2 rounded-full"
        style={{ background: "radial-gradient(circle, var(--neon-blue) 0%, transparent 70%)", opacity: 0.2 }}
      />

      <div className="relative mx-auto max-w-6xl">
        <Reveal>
          <p className="mb-3 font-mono text-xs tracking-[0.3em] text-neon-cyan">02 · SKILLS</p>
          <h2 className="font-display text-4xl md:text-5xl font-semibold text-white">
            Technologies I <span className="gradient-text text-glow">Work With.</span>
          </h2>
        </Reveal>

        <div className="mt-14 grid grid-cols-2 gap-5 sm:grid-cols-4 md:gap-6 lg:grid-cols-6">
          {skills.map((skill, i) => (
            <SkillCard key={skill.name} skill={skill} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
