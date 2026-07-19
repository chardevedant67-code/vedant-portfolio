"use client";

import { useRef } from "react";
import { motion } from "framer-motion";

export default function MagneticButton({
  children,
  className = "",
  onClick,
  href,
  type = "button",
}: {
  children: React.ReactNode;
  className?: string;
  onClick?: (e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => void;
  href?: string;
  type?: "button" | "submit";
}) {
  const ref = useRef<HTMLDivElement>(null);

  const onMouseMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    el.style.transform = `translate(${x * 0.35}px, ${y * 0.35}px)`;
  };

  const onMouseLeave = () => {
    if (ref.current) ref.current.style.transform = "translate(0,0)";
  };

  const Comp = href ? motion.a : motion.button;

  return (
    <div
      ref={ref}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      className="inline-block transition-transform duration-200 ease-out"
      style={{ willChange: "transform" }}
    >
      <Comp
        {...(href
          ? { href, target: href.startsWith("http") ? "_blank" : undefined }
          : { onClick, type })}
        data-cursor-hover
        suppressHydrationWarning
        whileTap={{ scale: 0.95 }}
        className={className}
      >
        {children}
      </Comp>
    </div>
  );
}
