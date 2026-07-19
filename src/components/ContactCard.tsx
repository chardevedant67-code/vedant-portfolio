"use client";

import { motion } from "framer-motion";
import type { IconType } from "react-icons";
import type { LucideIcon } from "lucide-react";
import TiltCard from "@/components/TiltCard";

type ContactLink = {
  icon: LucideIcon | IconType;
  label: string;
  href: string;
};

export default function ContactCard({
  icon: Icon,
  label,
  gradient,
  delay,
  href,
  value,
  links,
}: {
  icon: LucideIcon | IconType;
  label: string;
  gradient: string;
  delay: number;
  href?: string;
  value?: string;
  links?: ContactLink[];
}) {
  const isExternal = href?.startsWith("http");

  return (
    <motion.div
      initial={{ opacity: 0, x: -40 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ y: -6 }}
      className="group relative"
    >
      <div
        className={`pointer-events-none absolute -inset-2 -z-10 rounded-[26px] bg-gradient-to-br ${gradient} opacity-0 blur-xl transition-opacity duration-500 group-hover:opacity-25`}
      />

      <TiltCard
        maxTilt={5}
        className="shimmer-border glass relative overflow-hidden rounded-[20px] p-6 transition-shadow duration-500 group-hover:shadow-[0_20px_55px_rgba(80,60,200,0.25)]"
      >
        <div
          className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          style={{
            background: "radial-gradient(180px circle at var(--mx, 50%) var(--my, 50%), rgba(255,255,255,0.08), transparent 70%)",
          }}
        />

        <div className="relative z-10 flex items-start gap-4">
          <motion.div
            animate={{ y: [0, -4, 0] }}
            transition={{ duration: 3.6, repeat: Infinity, ease: "easeInOut", delay: delay * 0.6 }}
            className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br ${gradient} shadow-[0_0_20px_rgba(77,124,255,0.35)] transition-transform duration-500 group-hover:scale-110`}
          >
            <Icon size={20} className="text-white" />
          </motion.div>

          <div className="min-w-0 flex-1">
            <p className="text-xs font-medium uppercase tracking-[0.2em] text-white/45">{label}</p>

            {value && !href && <p className="mt-1.5 break-words text-base font-medium text-white/90">{value}</p>}

            {value && href && (
              <a
                href={href}
                target={isExternal ? "_blank" : undefined}
                rel={isExternal ? "noreferrer" : undefined}
                data-cursor-hover
                className="mt-1.5 block break-words text-base font-medium text-white/90 transition-colors hover:text-neon-cyan"
              >
                {value}
              </a>
            )}

            {links && (
              <div className="mt-2 flex flex-col gap-2">
                {links.map((link) => {
                  const LinkIcon = link.icon;
                  return (
                    <a
                      key={link.label}
                      href={link.href}
                      target="_blank"
                      rel="noreferrer"
                      data-cursor-hover
                      className="flex items-center gap-2 text-sm text-white/70 transition-colors hover:text-neon-cyan"
                    >
                      <LinkIcon size={14} className="shrink-0" />
                      <span className="truncate">{link.label}</span>
                    </a>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </TiltCard>
    </motion.div>
  );
}
