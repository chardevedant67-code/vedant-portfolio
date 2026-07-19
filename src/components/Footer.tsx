import { profile } from "@/lib/data";

export default function Footer() {
  return (
    <footer className="relative container-px py-10">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 text-xs text-white/40 sm:flex-row">
        <p>© {new Date().getFullYear()} {profile.name}. All rights reserved.</p>
        <p className="font-mono">Built with Next.js, GSAP & Framer Motion.</p>
      </div>
    </footer>
  );
}
