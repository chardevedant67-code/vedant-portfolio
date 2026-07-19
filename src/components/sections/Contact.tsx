"use client";

import { Mail, Phone, MapPin, Link2 } from "lucide-react";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import Reveal from "@/components/Reveal";
import ContactCard from "@/components/ContactCard";
import ContactForm from "@/components/ContactForm";
import { profile } from "@/lib/data";

export default function Contact() {
  return (
    <section id="contact" className="relative section-pad container-px overflow-hidden">
      <div className="mx-auto max-w-6xl">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="mb-3 font-mono text-xs tracking-[0.3em] text-neon-cyan">07 • CONTACT</p>
          <h2 className="font-display text-4xl md:text-6xl font-extrabold text-white">
            Let&apos;s Build Something{" "}
            <span className="hero-name-blue text-glow font-extrabold">Intelligent.</span>
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-balance text-base md:text-lg text-white/60">
            I&apos;m currently looking for internships, freelance projects, and full-time
            opportunities. Whether you have a project idea or just want to connect, my inbox is
            always open.
          </p>
        </Reveal>

        <div className="mt-14 grid grid-cols-1 gap-6 lg:grid-cols-5 lg:gap-8">
          <div className="flex flex-col gap-6 lg:col-span-2">
            <ContactCard
              icon={Mail}
              label="Email"
              value={profile.email}
              href={`mailto:${profile.email}`}
              gradient="from-neon-blue to-neon-cyan"
              delay={0}
            />
            <ContactCard
              icon={Phone}
              label="Phone"
              value={profile.phone}
              href={`tel:${profile.phone}`}
              gradient="from-neon-purple to-neon-pink"
              delay={0.1}
            />
            <ContactCard
              icon={MapPin}
              label="Location"
              value={profile.location}
              gradient="from-neon-cyan to-neon-blue"
              delay={0.2}
            />
            <ContactCard
              icon={Link2}
              label="Social Links"
              gradient="from-neon-purple to-neon-blue"
              delay={0.3}
              links={[
                { icon: FaGithub, label: "GitHub", href: profile.github },
                { icon: FaLinkedin, label: "LinkedIn", href: profile.linkedin },
              ]}
            />
          </div>

          <div className="lg:col-span-3">
            <ContactForm />
          </div>
        </div>
      </div>
    </section>
  );
}
