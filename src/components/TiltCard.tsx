"use client";

import { useRef } from "react";

export default function TiltCard({
  children,
  className = "",
  maxTilt = 8,
}: {
  children: React.ReactNode;
  className?: string;
  maxTilt?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);

  const onMouseEnter = () => {
    if (ref.current) ref.current.style.willChange = "transform";
  };

  const onMouseMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    el.style.transform = `perspective(900px) rotateY(${px * maxTilt}deg) rotateX(${
      -py * maxTilt
    }deg) translateZ(0)`;
    el.style.setProperty("--mx", `${(px + 0.5) * 100}%`);
    el.style.setProperty("--my", `${(py + 0.5) * 100}%`);
  };

  // will-change promotes an element to its own GPU layer; dropping it once the
  // return-to-rest transition finishes (rather than keeping it set for the
  // component's whole lifetime) avoids paying that memory cost for every
  // tilt card on the page simultaneously, most of which are never touched.
  const onMouseLeave = () => {
    const el = ref.current;
    if (!el) return;
    el.style.transform = "perspective(900px) rotateY(0deg) rotateX(0deg)";
    el.addEventListener(
      "transitionend",
      () => {
        el.style.willChange = "auto";
      },
      { once: true }
    );
  };

  return (
    <div
      ref={ref}
      onMouseEnter={onMouseEnter}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      className={`transition-transform duration-300 ease-out [transform-style:preserve-3d] ${className}`}
    >
      {children}
    </div>
  );
}
