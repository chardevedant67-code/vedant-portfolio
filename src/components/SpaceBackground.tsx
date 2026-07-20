"use client";

import { useEffect, useRef } from "react";

type Star = {
  x: number;
  y: number;
  z: number;
  r: number;
  tw: number;
  twSpeed: number;
};

type Shooter = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
};

type NebulaSprite = {
  canvas: HTMLCanvasElement;
  r: number;
  baseX: number;
  baseY: number;
};

export default function SpaceBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouse = useRef({ x: 0, y: 0 });
  const scrollY = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = window.innerWidth;
    let height = window.innerHeight;
    let dpr = Math.min(window.devicePixelRatio || 1, 2);
    let isMobile = width < 768 || window.matchMedia("(pointer: coarse)").matches;

    let STAR_COUNT = Math.min(isMobile ? 140 : 320, Math.floor((width * height) / 4500));
    let stars: Star[] = [];
    let shooters: Shooter[] = [];
    let nebulaSprites: NebulaSprite[] = [];

    // Nebula glows are pre-rendered once (here + on resize) into small offscreen
    // canvases instead of re-running createRadialGradient + a full-viewport fillRect
    // every animation frame — that full-screen fill (x3 blobs, 60x/sec) was the
    // single biggest cost in this component.
    function buildNebulaSprites() {
      const defs = [
        { x: width * 0.18, y: height * 0.25, r: width * 0.35, c: "rgba(80,60,200,0.16)" },
        { x: width * 0.82, y: height * 0.15, r: width * 0.3, c: "rgba(60,150,220,0.14)" },
        { x: width * 0.55, y: height * 0.85, r: width * 0.4, c: "rgba(180,60,220,0.1)" },
      ];
      nebulaSprites = defs.map((n) => {
        const d = Math.max(1, Math.ceil(n.r * 2));
        const off = document.createElement("canvas");
        off.width = d;
        off.height = d;
        const octx = off.getContext("2d")!;
        const grad = octx.createRadialGradient(n.r, n.r, 0, n.r, n.r, n.r);
        grad.addColorStop(0, n.c);
        grad.addColorStop(1, "rgba(0,0,0,0)");
        octx.fillStyle = grad;
        octx.fillRect(0, 0, d, d);
        return { canvas: off, r: n.r, baseX: n.x, baseY: n.y };
      });
    }

    function resize() {
      width = window.innerWidth;
      height = window.innerHeight;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      isMobile = width < 768 || window.matchMedia("(pointer: coarse)").matches;
      STAR_COUNT = Math.min(isMobile ? 140 : 320, Math.floor((width * height) / 4500));
      canvas!.width = width * dpr;
      canvas!.height = height * dpr;
      canvas!.style.width = width + "px";
      canvas!.style.height = height + "px";
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
      buildNebulaSprites();
    }

    function initStars() {
      stars = Array.from({ length: STAR_COUNT }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        z: Math.random() * 0.8 + 0.2,
        r: Math.random() * 1.4 + 0.3,
        tw: Math.random() * Math.PI * 2,
        twSpeed: Math.random() * 0.02 + 0.005,
      }));
    }

    resize();
    initStars();

    // resize fires repeatedly while a window is being dragged or a phone
    // rotates — debounce so the star-field + nebula-sprite rebuild (both
    // non-trivial work) only runs once the size has settled
    let resizeTimeout: ReturnType<typeof setTimeout>;
    const onResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        resize();
        initStars();
      }, 150);
    };
    window.addEventListener("resize", onResize);

    const onMouseMove = (e: MouseEvent) => {
      mouse.current.x = (e.clientX / width - 0.5) * 2;
      mouse.current.y = (e.clientY / height - 0.5) * 2;
    };
    window.addEventListener("mousemove", onMouseMove);

    const onScroll = () => {
      scrollY.current = window.scrollY;
    };
    window.addEventListener("scroll", onScroll, { passive: true });

    let raf = 0;
    let t = 0;
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    function maybeSpawnShooter() {
      if (Math.random() < 0.006 && shooters.length < 3) {
        const startX = Math.random() * width * 0.6 + width * 0.2;
        shooters.push({
          x: startX,
          y: -20,
          vx: -(Math.random() * 4 + 5),
          vy: Math.random() * 3 + 4,
          life: 0,
          maxLife: 60 + Math.random() * 30,
        });
      }
    }

    function draw() {
      t += 1;
      ctx!.clearRect(0, 0, width, height);

      // nebula glow blobs — pre-rendered sprites, just blitted at the parallax offset
      for (const sprite of nebulaSprites) {
        const parallaxX = sprite.baseX + mouse.current.x * 20 - scrollY.current * 0.03;
        const parallaxY = sprite.baseY + mouse.current.y * 20 + scrollY.current * 0.05;
        ctx!.drawImage(sprite.canvas, parallaxX - sprite.r, parallaxY - sprite.r);
      }

      // stars with parallax + twinkle
      for (const s of stars) {
        const px = s.x + mouse.current.x * 14 * s.z - ((scrollY.current * 0.06) % height) * s.z;
        let py = s.y + mouse.current.y * 14 * s.z + scrollY.current * 0.02 * s.z;
        py = ((py % height) + height) % height;
        const px2 = ((px % width) + width) % width;

        s.tw += s.twSpeed;
        const alpha = prefersReduced ? 0.6 : 0.5 + Math.sin(s.tw) * 0.5;

        ctx!.beginPath();
        ctx!.arc(px2, py, s.r * (0.6 + s.z * 0.6), 0, Math.PI * 2);
        ctx!.fillStyle = `rgba(255,255,255,${alpha * s.z})`;
        ctx!.fill();

        if (s.r > 1.2) {
          ctx!.beginPath();
          ctx!.arc(px2, py, s.r * 3, 0, Math.PI * 2);
          ctx!.fillStyle = `rgba(140,180,255,${alpha * 0.08})`;
          ctx!.fill();
        }
      }

      // shooting stars — skipped on mobile, extra flourish not worth the cost there
      if (!prefersReduced && !isMobile) {
        maybeSpawnShooter();
        shooters = shooters.filter((sh) => sh.life < sh.maxLife);
        for (const sh of shooters) {
          sh.x += sh.vx;
          sh.y += sh.vy;
          sh.life += 1;
          const alpha = 1 - sh.life / sh.maxLife;
          const grad = ctx!.createLinearGradient(sh.x, sh.y, sh.x - sh.vx * 6, sh.y - sh.vy * 6);
          grad.addColorStop(0, `rgba(255,255,255,${alpha})`);
          grad.addColorStop(1, "rgba(255,255,255,0)");
          ctx!.strokeStyle = grad;
          ctx!.lineWidth = 2;
          ctx!.beginPath();
          ctx!.moveTo(sh.x, sh.y);
          ctx!.lineTo(sh.x - sh.vx * 6, sh.y - sh.vy * 6);
          ctx!.stroke();
        }
      }

      // small orbiting solar system, top-right, subtle — skipped on mobile
      if (!isMobile) {
        const cx = width * 0.85;
        const cy = height * 0.22;
        const orbits = [46, 74, 104];
        ctx!.strokeStyle = "rgba(140,160,255,0.12)";
        ctx!.lineWidth = 1;
        for (const orad of orbits) {
          ctx!.beginPath();
          ctx!.ellipse(cx, cy, orad, orad * 0.4, 0.3, 0, Math.PI * 2);
          ctx!.stroke();
        }
        ctx!.beginPath();
        ctx!.arc(cx, cy, 7, 0, Math.PI * 2);
        const sunGrad = ctx!.createRadialGradient(cx, cy, 0, cx, cy, 20);
        sunGrad.addColorStop(0, "rgba(255,220,150,0.9)");
        sunGrad.addColorStop(1, "rgba(255,220,150,0)");
        ctx!.fillStyle = sunGrad;
        ctx!.fillRect(cx - 20, cy - 20, 40, 40);
        ctx!.fillStyle = "#ffe9c2";
        ctx!.fill();

        orbits.forEach((orad, i) => {
          const speed = 0.004 + i * 0.0015;
          const angle = t * speed + i * 2;
          const px = cx + Math.cos(angle) * orad;
          const py = cy + Math.sin(angle) * orad * 0.4;
          ctx!.beginPath();
          ctx!.arc(px, py, 3 - i * 0.4, 0, Math.PI * 2);
          ctx!.fillStyle = i === 0 ? "#4deaff" : i === 1 ? "#b04dff" : "#4d7cff";
          ctx!.shadowColor = ctx!.fillStyle as string;
          ctx!.shadowBlur = 8;
          ctx!.fill();
          ctx!.shadowBlur = 0;
        });
      }

      raf = requestAnimationFrame(draw);
    }

    // Pause the render loop entirely while the tab is in the background —
    // no point burning CPU/GPU on a decorative canvas nobody can see.
    const onVisibility = () => {
      if (document.hidden) {
        cancelAnimationFrame(raf);
      } else {
        raf = requestAnimationFrame(draw);
      }
    };
    document.addEventListener("visibilitychange", onVisibility);

    raf = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(resizeTimeout);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("scroll", onScroll);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  return (
    <div className="fixed inset-0 z-0 overflow-hidden bg-[#05050a]">
      <canvas ref={canvasRef} className="absolute inset-0" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#05050a]" />
    </div>
  );
}
