import Image from "next/image";
import { Award, Eye, Download, BadgeCheck } from "lucide-react";
import Reveal from "@/components/Reveal";
import TiltCard from "@/components/TiltCard";
import { certificates } from "@/lib/data";

export default function Certificates() {
  return (
    <section id="certificates" className="relative section-pad container-px overflow-hidden">
      <div
        className="pointer-events-none absolute -top-16 right-1/4 h-72 w-72 rounded-full"
        style={{ background: "radial-gradient(circle, var(--neon-blue) 0%, transparent 70%)", opacity: 0.2 }}
      />
      <div
        className="pointer-events-none absolute bottom-0 left-1/5 h-72 w-72 rounded-full"
        style={{ background: "radial-gradient(circle, var(--neon-purple) 0%, transparent 70%)", opacity: 0.2 }}
      />

      <div className="relative mx-auto max-w-7xl">
        <Reveal>
          <p className="mb-3 font-mono text-xs tracking-[0.3em] text-neon-cyan">06 · CERTIFICATES</p>
          <h2 className="font-display text-4xl md:text-5xl font-semibold text-white">
            Professional <span className="gradient-text">Certifications</span>
          </h2>
          <p className="mt-5 max-w-xl text-balance text-base text-white/60">
            A collection of professional certifications showcasing my technical skills,
            achievements, and continuous learning journey.
          </p>
        </Reveal>

        <div className="mt-14 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {certificates.map((cert, i) => (
            <Reveal key={cert.id} delay={i * 0.12}>
              <TiltCard
                maxTilt={5}
                className="glass shimmer-border group flex h-full flex-col overflow-hidden rounded-[20px] transition-shadow duration-500 hover:glow-blue"
              >
                <div className="relative aspect-[4/3] w-full overflow-hidden">
                  <Image
                    src={cert.image}
                    alt={cert.title}
                    fill
                    sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#05050a] via-transparent to-transparent opacity-80" />
                  <div className="pointer-events-none absolute left-4 top-4 flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-black/40 backdrop-blur-md">
                    <Award size={16} className="text-neon-cyan" />
                  </div>
                </div>

                <div className="flex flex-1 flex-col p-6 sm:p-7">
                  <h3 className="font-display text-lg font-semibold leading-snug text-white">
                    {cert.title}
                  </h3>
                  <p className="mt-2 text-sm text-white/50">{cert.organization}</p>

                  <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-white/40">
                    <span>{cert.issueDate}</span>
                    {cert.credentialId && (
                      <span className="flex items-center gap-1">
                        <BadgeCheck size={12} className="text-neon-purple" />
                        {cert.credentialId}
                      </span>
                    )}
                  </div>

                  <p className="mt-4 text-sm leading-relaxed text-white/60">{cert.description}</p>

                  <div className="mt-5 flex flex-wrap gap-2">
                    {cert.skills.map((skill) => (
                      <span
                        key={skill}
                        className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-[11px] text-white/60"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>

                  <div className="mt-6 flex items-center gap-5 border-t border-white/10 pt-4 text-sm">
                    <a
                      href={cert.pdfUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      data-cursor-hover
                      className="flex items-center gap-1.5 text-white/70 transition-colors hover:text-white"
                    >
                      <Eye size={14} /> View Certificate
                    </a>
                    <a
                      href={cert.pdfUrl}
                      download
                      data-cursor-hover
                      className="flex items-center gap-1.5 text-white/70 transition-colors hover:text-white"
                    >
                      <Download size={14} /> Download PDF
                    </a>
                  </div>
                </div>
              </TiltCard>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
