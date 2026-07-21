import Image from "next/image";
import { ExternalLink, FileText } from "lucide-react";
import { FaGithub } from "react-icons/fa";
import Reveal from "@/components/Reveal";
import TiltCard from "@/components/TiltCard";
import { projects } from "@/lib/data";

export default function Projects() {
  return (
    <section id="projects" className="relative section-pad container-px">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <p className="mb-3 font-mono text-xs tracking-[0.3em] text-neon-cyan">04 · PROJECTS</p>
          <h2 className="font-display text-4xl md:text-5xl font-semibold text-white">
            Selected <span className="gradient-text">work.</span>
          </h2>
        </Reveal>

        <div className="mt-14 grid grid-cols-1 gap-8 lg:grid-cols-2">
          {projects.map((p, i) => {
            return (
              <Reveal key={p.title} delay={i * 0.12}>
                <TiltCard maxTilt={4} className="glass group h-full rounded-3xl p-5 hover:glow-blue transition-shadow duration-500">
                  <div className="relative aspect-[16/10] w-full overflow-hidden rounded-2xl">
                    <Image
                      src={p.image}
                      alt={p.title}
                      fill
                      sizes="(min-width: 1024px) 50vw, 100vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>

                  <div className="p-3">
                    <p className="font-mono text-[11px] tracking-widest text-neon-cyan">{p.subtitle}</p>
                    <h3 className="font-display mt-1 text-2xl font-semibold text-white">{p.title}</h3>
                    <p className="mt-3 text-sm leading-relaxed text-white/60">{p.description}</p>

                    <div className="mt-4 flex flex-wrap gap-2">
                      {p.tags.map((t) => (
                        <span
                          key={t}
                          className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-[11px] text-white/60"
                        >
                          {t}
                        </span>
                      ))}
                    </div>

                    <div className="mt-6 flex items-center gap-5 border-t border-white/10 pt-4 text-sm">
                      {p.live ? (
                        <a href={p.live} data-cursor-hover className="flex items-center gap-1.5 text-white/70 hover:text-white transition-colors">
                          <ExternalLink size={14} /> Live Demo
                        </a>
                      ) : (
                        <span className="flex items-center gap-1.5 text-white/30 cursor-not-allowed">
                          <ExternalLink size={14} /> Coming Soon
                        </span>
                      )}
                      {p.github ? (
                        <a href={p.github} data-cursor-hover className="flex items-center gap-1.5 text-white/70 hover:text-white transition-colors">
                          <FaGithub size={14} /> GitHub
                        </a>
                      ) : (
                        <span className="flex items-center gap-1.5 text-white/30 cursor-not-allowed">
                          <FaGithub size={14} /> GitHub
                        </span>
                      )}
                      {p.caseStudy ? (
                        <a href={p.caseStudy} data-cursor-hover className="flex items-center gap-1.5 text-white/70 hover:text-white transition-colors">
                          <FileText size={14} /> Case Study
                        </a>
                      ) : (
                        <span className="flex items-center gap-1.5 text-white/30 cursor-not-allowed">
                          <FileText size={14} /> Case Study
                        </span>
                      )}
                    </div>
                  </div>
                </TiltCard>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
