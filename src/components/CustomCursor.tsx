"use client";

import { useEffect, useRef, useState } from "react";

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [hidden, setHidden] = useState(true);
  const [hover, setHover] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const pos = { x: 0, y: 0 };
    const ring = { x: 0, y: 0 };
    let lastTarget: EventTarget | null = null;
    let isHidden = true;
    let lastHover = false;

    // Only the cheap ref writes happen on the raw mousemove event, which can
    // fire far faster than the display refresh rate on high-polling-rate mice.
    // The DOM writes, hover detection (closest() walks the tree — not free),
    // and any state updates are deferred to the rAF loop below so they run at
    // most once per rendered frame instead of once per input event.
    const onMove = (e: MouseEvent) => {
      pos.x = e.clientX;
      pos.y = e.clientY;
      lastTarget = e.target;
      if (isHidden) {
        isHidden = false;
        setHidden(false);
      }
    };

    let raf = 0;
    const animate = () => {
      ring.x += (pos.x - ring.x) * 0.18;
      ring.y += (pos.y - ring.y) * 0.18;
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${pos.x}px, ${pos.y}px, 0) translate(-50%, -50%)`;
      }
      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ring.x}px, ${ring.y}px, 0) translate(-50%, -50%)`;
      }
      const isHover = !!(lastTarget as HTMLElement | null)?.closest?.(
        "a, button, [data-cursor-hover]"
      );
      if (isHover !== lastHover) {
        lastHover = isHover;
        setHover(isHover);
      }
      raf = requestAnimationFrame(animate);
    };
    raf = requestAnimationFrame(animate);

    window.addEventListener("mousemove", onMove, { passive: true });
    const onLeave = () => setHidden(true);
    document.documentElement.addEventListener("mouseleave", onLeave);

    return () => {
      window.removeEventListener("mousemove", onMove);
      document.documentElement.removeEventListener("mouseleave", onLeave);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div
      className={`pointer-events-none fixed inset-0 z-[9999] hidden md:block transition-opacity duration-300 ${
        hidden ? "opacity-0" : "opacity-100"
      }`}
      aria-hidden
    >
      <div
        ref={dotRef}
        className="fixed left-0 top-0 h-2 w-2 rounded-full bg-white"
        style={{ boxShadow: "0 0 12px 2px rgba(77,234,255,0.9)" }}
      />
      <div
        ref={ringRef}
        className="fixed left-0 top-0 rounded-full border transition-[width,height,border-color,background-color] duration-200 ease-out"
        style={{
          width: hover ? 56 : 34,
          height: hover ? 56 : 34,
          borderColor: hover ? "rgba(176,77,255,0.9)" : "rgba(77,234,255,0.6)",
          background: hover ? "rgba(176,77,255,0.08)" : "transparent",
        }}
      />
    </div>
  );
}
