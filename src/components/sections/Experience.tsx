import { Briefcase } from "lucide-react";
import Reveal from "@/components/Reveal";
import { experience } from "@/lib/data";

export default function Experience() {
  return (
    <section id="experience" className="relative section-pad container-px">
      <div className="mx-auto max-w-4xl">
        <Reveal>
          <p className="mb-3 font-mono text-xs tracking-[0.3em] text-neon-cyan">03 · EXPERIENCE</p>
          <h2 className="font-display text-4xl md:text-5xl font-semibold text-white">
            Where the <span className="gradient-text">work happened.</span>
          </h2>
        </Reveal>

        <div className="relative mt-14 ml-4 border-l border-white/10 pl-8 md:ml-8 md:pl-12">
          {experience.map((exp, i) => (
            <Reveal key={exp.company} delay={i * 0.12} className="relative mb-14 last:mb-0">
              <span className="absolute -left-[41px] top-1 flex h-6 w-6 items-center justify-center rounded-full border border-white/10 bg-[#0a0a14] glow-purple md:-left-[57px]">
                <Briefcase size={12} className="text-neon-cyan" />
              </span>

              <div className="glass rounded-2xl p-6 md:p-8">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <h3 className="font-display text-xl font-semibold text-white">{exp.role}</h3>
                  <span className="font-mono text-xs text-neon-cyan">{exp.period}</span>
                </div>
                <p className="mt-1 text-sm text-white/50">{exp.company}</p>
                <ul className="mt-5 flex flex-col gap-2.5">
                  {exp.points.map((p) => (
                    <li key={p} className="flex gap-3 text-sm text-white/70">
                      <span className="mt-2 h-1 w-1 flex-shrink-0 rounded-full bg-neon-purple" />
                      {p}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
