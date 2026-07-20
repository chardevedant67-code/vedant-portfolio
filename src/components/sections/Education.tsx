import { GraduationCap } from "lucide-react";
import Reveal from "@/components/Reveal";
import { education } from "@/lib/data";

export default function Education() {
  return (
    <section id="education" className="relative section-pad container-px">
      <div className="mx-auto max-w-4xl">
        <Reveal>
          <p className="mb-3 font-mono text-xs tracking-[0.3em] text-neon-cyan">07 · EDUCATION</p>
          <h2 className="font-display text-4xl md:text-5xl font-semibold text-white">
            Academic <span className="gradient-text">foundation.</span>
          </h2>
        </Reveal>

        <div className="mt-14 flex flex-col gap-6">
          {education.map((e) => (
            <Reveal key={e.degree}>
              <div className="glass flex flex-col gap-6 rounded-3xl p-8 sm:flex-row sm:items-center">
                <div className="flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-neon-cyan/20 to-neon-blue/20 glow-cyan">
                  <GraduationCap size={28} className="text-neon-cyan" />
                </div>
                <div>
                  <h3 className="font-display text-xl font-semibold text-white">{e.degree}</h3>
                  <p className="mt-1 text-sm text-white/60">{e.school}</p>
                  <p className="mt-1 text-xs text-white/40">
                    {e.location}
                    {e.period && ` · ${e.period}`}
                  </p>
                  {e.board && <p className="mt-1 text-xs text-white/40">{e.board}</p>}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
