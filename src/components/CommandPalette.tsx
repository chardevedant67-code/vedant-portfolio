"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  User,
  Sparkles,
  Briefcase,
  FolderGit2,
  Trophy,
  Award,
  GraduationCap,
  Mail,
  Download,
} from "lucide-react";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { profile } from "@/lib/data";

type Item = {
  label: string;
  icon: React.ReactNode;
  action: () => void;
  group: string;
};

export default function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((o) => !o);
      }
      if (e.key === "Escape") setOpen(false);
    };
    const onCustom = () => setOpen(true);
    window.addEventListener("keydown", onKey);
    window.addEventListener("open-command-palette", onCustom);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("open-command-palette", onCustom);
    };
  }, []);

  const goto = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setOpen(false);
  };

  const items: Item[] = [
    { label: "About", icon: <User size={16} />, action: () => goto("about"), group: "Navigate" },
    { label: "Skills", icon: <Sparkles size={16} />, action: () => goto("skills"), group: "Navigate" },
    { label: "Experience", icon: <Briefcase size={16} />, action: () => goto("experience"), group: "Navigate" },
    { label: "Projects", icon: <FolderGit2 size={16} />, action: () => goto("projects"), group: "Navigate" },
    { label: "Achievements", icon: <Trophy size={16} />, action: () => goto("achievements"), group: "Navigate" },
    { label: "Certificates", icon: <Award size={16} />, action: () => goto("certificates"), group: "Navigate" },
    { label: "Education", icon: <GraduationCap size={16} />, action: () => goto("education"), group: "Navigate" },
    { label: "Contact", icon: <Mail size={16} />, action: () => goto("contact"), group: "Navigate" },
    {
      label: "Open GitHub",
      icon: <FaGithub size={16} />,
      action: () => window.open(profile.github, "_blank"),
      group: "Actions",
    },
    {
      label: "Open LinkedIn",
      icon: <FaLinkedin size={16} />,
      action: () => window.open(profile.linkedin, "_blank"),
      group: "Actions",
    },
    {
      label: "Download Resume",
      icon: <Download size={16} />,
      action: () => window.open("/resume.pdf", "_blank"),
      group: "Actions",
    },
  ];

  const filtered = items.filter((i) => i.label.toLowerCase().includes(query.toLowerCase()));

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[2000] flex items-start justify-center bg-black/60 backdrop-blur-sm pt-[14vh] px-4"
          onClick={() => setOpen(false)}
        >
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.98 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="glass-strong w-full max-w-lg overflow-hidden rounded-2xl"
          >
            <div className="flex items-center gap-3 border-b border-white/10 px-5 py-4">
              <span className="text-white/40 font-mono text-sm">⌘K</span>
              <input
                autoFocus
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Jump to a section or action…"
                className="flex-1 bg-transparent text-white placeholder-white/30 outline-none text-sm"
              />
            </div>
            <div className="max-h-80 overflow-y-auto py-2">
              {filtered.length === 0 && (
                <p className="px-5 py-6 text-center text-sm text-white/40">No results</p>
              )}
              {filtered.map((item) => (
                <button
                  key={item.label}
                  onClick={item.action}
                  data-cursor-hover
                  className="flex w-full items-center gap-3 px-5 py-3 text-left text-sm text-white/80 hover:bg-white/5 hover:text-white transition-colors"
                >
                  <span className="text-neon-cyan">{item.icon}</span>
                  {item.label}
                </button>
              ))}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
