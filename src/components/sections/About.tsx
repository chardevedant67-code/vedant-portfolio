import Image from "next/image";
import Reveal from "@/components/Reveal";
import TiltCard from "@/components/TiltCard";
import Counter from "@/components/Counter";
import { profile, stats } from "@/lib/data";

export default function About() {
  return (
    <section id="about" className="relative section-pad container-px">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <p className="mb-3 font-mono text-xs tracking-[0.3em] text-neon-cyan">01 · ABOUT</p>
          <h2 className="font-display text-4xl md:text-5xl font-semibold text-white">
            Engineering intelligence into <span className="gradient-text">every workflow.</span>
          </h2>
        </Reveal>

        <div className="mt-14 grid grid-cols-1 gap-8 md:grid-cols-5">
          <Reveal delay={0.1} className="md:col-span-2">
            <TiltCard className="glass shimmer-border relative flex h-full flex-col justify-between rounded-3xl p-8">
              <div className="relative h-40 w-40 overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-neon-blue/20 to-neon-purple/20">
                <Image
                  src="/profile.jpg"
                  alt={profile.name}
                  fill
                  sizes="160px"
                  className="object-cover"
                  preload
                />
              </div>
              <div className="mt-8">
                <p className="font-display text-xl font-semibold text-white">{profile.name}</p>
                <p className="mt-1 text-sm text-white/50">{profile.location}</p>
              </div>
            </TiltCard>
          </Reveal>

          <Reveal delay={0.2} className="md:col-span-3">
            <div className="glass h-full rounded-3xl p-8">
              <p className="text-base leading-relaxed text-white/70 md:text-lg">
                I&apos;m an automation-obsessed engineer based in Wardha, India — I design systems
                that quietly do the work humans shouldn&apos;t have to. From{" "}
                <span className="text-white">n8n workflow architecture</span> to{" "}
                <span className="text-white">AI-driven lead pipelines</span> and{" "}
                <span className="text-white">full-stack web products</span>, I bridge the gap
                between business processes and intelligent software. My focus is simple: build
                things that scale, save time, and feel premium doing it.
              </p>

              <div className="mt-10 grid grid-cols-2 gap-6 sm:grid-cols-4">
                {stats.map((s) => (
                  <div key={s.label}>
                    <p className="font-display text-3xl md:text-4xl font-semibold">
                      <Counter value={s.value} suffix={s.suffix} />
                    </p>
                    <p className="mt-1 text-xs text-white/50">{s.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
