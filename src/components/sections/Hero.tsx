"use client";

import { useEffect } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ArrowRight, Mail } from "lucide-react";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import MagneticButton from "@/components/MagneticButton";
import RotatingTitle from "@/components/RotatingTitle";
import { profile } from "@/lib/data";

// Loader.tsx runs for ~2.6s before it unmounts — content starts revealing right as it clears.
const LOADER_CLEAR = 2.6;

function NameLine({
  text,
  gradientClass,
  baseDelay,
}: {
  text: string;
  gradientClass: string;
  baseDelay: number;
}) {
  return (
    <span className="block overflow-hidden">
      {text.split("").map((ch, i) => (
        <motion.span
          key={i}
          initial={{ y: "120%", opacity: 0, scale: 0.85 }}
          animate={{ y: "0%", opacity: 1, scale: 1 }}
          transition={{
            delay: baseDelay + i * 0.045,
            duration: 1,
            ease: [0.16, 1, 0.3, 1],
          }}
          style={{
            animation: "letter-shimmer 6s ease-in-out infinite",
            animationDelay: `${baseDelay + 1.4 + i * 0.12}s`,
          }}
          className={`inline-block ${gradientClass}`}
        >
          {ch}
        </motion.span>
      ))}
    </span>
  );
}

export default function Hero() {
  const mvX = useMotionValue(0);
  const mvY = useMotionValue(0);
  const springX = useSpring(mvX, { stiffness: 60, damping: 20, mass: 0.6 });
  const springY = useSpring(mvY, { stiffness: 60, damping: 20, mass: 0.6 });
  const headingX = useTransform(springX, [-0.5, 0.5], [-16, 16]);
  const headingY = useTransform(springY, [-0.5, 0.5], [-10, 10]);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      mvX.set(e.clientX / window.innerWidth - 0.5);
      mvY.set(e.clientY / window.innerHeight - 0.5);
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, [mvX, mvY]);

  const socials = [
    { href: profile.github, icon: FaGithub, label: "GitHub" },
    { href: profile.linkedin, icon: FaLinkedin, label: "LinkedIn" },
    { href: `mailto:${profile.email}`, icon: Mail, label: "Email" },
  ];

  return (
    <section
      id="hero"
      className="relative flex min-h-[100svh] flex-col items-center justify-center container-px pt-24 pb-16"
    >
      <motion.p
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: LOADER_CLEAR, duration: 0.8 }}
        className="text-center font-mono text-sm sm:text-base tracking-[0.4em] text-neon-cyan"
      >
        HELLO, MY NAME IS
      </motion.p>

      <motion.div
        style={{ x: headingX, y: headingY }}
        className="mt-4 w-full max-w-6xl text-center"
      >
        <h1 className="hero-heading-glow font-display text-[clamp(3.75rem,16vw,10.5rem)] font-extrabold leading-[0.88] tracking-tight">
          <NameLine text="Vedant" gradientClass="hero-name-light" baseDelay={LOADER_CLEAR + 0.25} />
          <NameLine text="Charde" gradientClass="hero-name-blue" baseDelay={LOADER_CLEAR + 0.5} />
        </h1>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: LOADER_CLEAR + 1.5, duration: 0.8 }}
        className="mt-6"
      >
        <RotatingTitle titles={profile.roles} />
      </motion.div>

      <motion.p
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: LOADER_CLEAR + 1.75, duration: 0.8 }}
        className="mx-auto mt-5 max-w-[780px] text-center text-balance text-lg md:text-xl text-white/60"
      >
        {profile.tagline}
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: LOADER_CLEAR + 2, duration: 0.8 }}
        className="mt-8 flex flex-wrap items-center justify-center gap-4"
      >
        <MagneticButton
          href="#projects"
          className="hero-btn-glass hero-btn-primary group flex items-center gap-2 rounded-full px-8 py-4 text-base font-medium text-white"
        >
          View Projects
          <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
        </MagneticButton>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: LOADER_CLEAR + 2.2, duration: 0.8 }}
        className="mt-6 flex items-center justify-center gap-4"
      >
        {socials.map(({ href, icon: Icon, label }) => (
          <a
            key={label}
            href={href}
            target={href.startsWith("http") ? "_blank" : undefined}
            rel={href.startsWith("http") ? "noreferrer" : undefined}
            aria-label={label}
            data-cursor-hover
            className="hero-social-icon flex h-12 w-12 items-center justify-center rounded-full text-white/70 hover:text-white"
          >
            <Icon size={18} />
          </a>
        ))}
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: LOADER_CLEAR + 2.6, duration: 1 }}
        className="absolute bottom-4 flex flex-col items-center gap-1.5 text-white/30"
      >
        <span className="text-xs tracking-[0.3em]">SCROLL</span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          className="h-5 w-px bg-gradient-to-b from-white/60 to-transparent"
        />
      </motion.div>
    </section>
  );
}
