import type { IconType } from "react-icons";
import {
  SiN8N,
  SiPython,
  SiReact,
  SiJavascript,
  SiHtml5,
  SiTailwindcss,
  SiNodedotjs,
  SiExpress,
  SiMongodb,
  SiGit,
  SiGithub,
  SiGooglecloud,
  SiFirebase,
} from "react-icons/si";
import { FaCss3Alt } from "react-icons/fa6";
import { Trophy, FileText, ShieldCheck, Globe2 } from "lucide-react";

export const profile = {
  name: "Vedant Charde",
  roles: [
    "Automation Engineer",
    "Full Stack Developer",
    "AI Automation Expert",
    "Creative Web Developer",
  ],
  location: "Wardha, Maharashtra, India",
  email: "chardevedant67@gmail.com",
  phone: "+91 92849 68520",
  linkedin: "https://www.linkedin.com/in/vedant-charde-0660ab3a5",
  github: "https://github.com/chardevedant67-code",
  tagline:
    "I build intelligent automation, scalable web applications, and AI-powered workflows that solve real business problems.",
};

export const stats = [
  { label: "Years Experience", value: 2, suffix: "+" },
  { label: "Projects Shipped", value: 20, suffix: "+" },
  { label: "Automation Workflows", value: 40, suffix: "+" },
  { label: "Research Publications", value: 1, suffix: "" },
];

export type Skill = { name: string; icon: IconType; color: string };

export const skills: Skill[] = [
  { name: "n8n", icon: SiN8N, color: "#EA4B71" },
  { name: "Python", icon: SiPython, color: "#4B8BBE" },
  { name: "React", icon: SiReact, color: "#61DAFB" },
  { name: "JavaScript", icon: SiJavascript, color: "#F7DF1E" },
  { name: "HTML5", icon: SiHtml5, color: "#E34F26" },
  { name: "CSS3", icon: FaCss3Alt, color: "#2965F1" },
  { name: "Tailwind CSS", icon: SiTailwindcss, color: "#38BDF8" },
  { name: "Node.js", icon: SiNodedotjs, color: "#83CD29" },
  { name: "Express.js", icon: SiExpress, color: "#E5E5E5" },
  { name: "MongoDB", icon: SiMongodb, color: "#47A248" },
  { name: "Git", icon: SiGit, color: "#F05032" },
  { name: "GitHub", icon: SiGithub, color: "#F0F0F0" },
  { name: "Google Cloud Platform", icon: SiGooglecloud, color: "#4285F4" },
  { name: "Firebase", icon: SiFirebase, color: "#FFCA28" },
];

export const experience = [
  {
    role: "Automation Intern",
    company: "Cosmogeek Software Solutions",
    period: "Jul 2026 — Present",
    points: [
      "Designed end-to-end automation workflows for internal operations",
      "Built lead generation systems for B2B outreach",
      "Contributed to web development for client-facing products",
      "Implemented business process automation reducing manual work",
    ],
  },
  {
    role: "Growth & Automation Intern",
    company: "Leadkwik",
    period: "Jan 2025 — May 2025",
    points: [
      "Created production-ready n8n workflows powering live client operations",
      "Built automated email verification and lead onboarding pipelines",
      "Python-based scraping systems for structured lead data",
      "AI prompt engineering for automated outreach and enrichment",
      "Hostinger Mail automation for transactional and campaign flows",
    ],
  },
];

export type Project = {
  title: string;
  subtitle: string;
  description: string;
  tags: string[];
  mockup: "automation" | "realestate";
  image: string;
  live?: string;
  github?: string;
  caseStudy?: string;
};

export const projects: Project[] = [
  {
    title: "n8n Lead Automation System",
    subtitle: "Automation Platform",
    description:
      "An end-to-end automation engine handling lead capture, verification, enrichment, and email outreach — orchestrated entirely through custom n8n workflows with a Python backend.",
    tags: ["n8n", "Python", "REST APIs", "Email Automation", "GCP"],
    mockup: "automation",
    image: "/projects/n8n-automation.png",
    live: "#",
    github: "#",
    caseStudy: "#",
  },
  {
    title: "RoomDekhoo.in",
    subtitle: "Real Estate Platform",
    description:
      "A luxury real estate discovery platform with interactive maps, location-based search, and a modern booking experience — designed mobile-first for renters and property owners.",
    tags: ["React", "Next.js", "Maps API", "UI/UX", "Mobile"],
    mockup: "realestate",
    image: "/projects/roomdekhoo.png",
    live: "#",
    github: "#",
    caseStudy: "#",
  },
];

export const researchPaper = {
  title: "Research Paper Accepted",
  subtitle: "ICCCNet 2026 (Springer)",
  points: [
    `Co-authored "Text-Based Mental Health Detection" accepted at ICCCNet 2026`,
    "To be published in Springer's LNNS – indexed in SCOPUS, INSPEC, Web of Science",
    "Ranked in the Top 15% of all submissions",
  ],
};

export type TimelineItem = { icon: IconType; label: string; sublabel: string; color: string };

export const achievementTimeline: TimelineItem[] = [
  { icon: Trophy, label: "Top 15%", sublabel: "Conference Rank", color: "#F5A623" },
  { icon: FileText, label: "Springer", sublabel: "Indexed", color: "#F5A623" },
  { icon: ShieldCheck, label: "SCOPUS", sublabel: "Indexed", color: "#3DDC84" },
  { icon: Globe2, label: "Web of Science", sublabel: "Indexed", color: "#4D9DFF" },
];

export type Certificate = {
  id: string;
  title: string;
  organization: string;
  issueDate: string;
  credentialId?: string;
  description: string;
  skills: string[];
  image: string;
  pdfUrl: string;
};

export const certificates: Certificate[] = [
  {
    id: "icccnet-2026",
    title: "Certificate of Participation — ICCCNet-2026",
    organization: "Manchester Metropolitan University",
    issueDate: "August 2026",
    description:
      'Awarded for presenting and co-authoring the paper "Text-Based Mental Health Detection" at the 6th International Conference on Computing and Communication Networks (ICCCNet-2026), held 17–19 August 2026 in Manchester, United Kingdom.',
    skills: ["Academic Research", "NLP", "Mental Health Detection", "Conference Presentation"],
    image: "/certificates/icccnet-2026.png",
    pdfUrl: "/certificates/icccnet-2026-certificate.pdf",
  },
  {
    id: "fullstack-dapp-react-web3",
    title: "Full-Stack DApp Development with React and Web3",
    organization: "Packt (via Coursera)",
    issueDate: "July 2025",
    credentialId: "P6QVJXI3QKXS",
    description:
      "Completed an online non-credit course covering full-stack decentralized application development, building React front-ends integrated with Web3 smart contract interactions.",
    skills: ["React", "Web3", "DApp Development", "Smart Contracts", "JavaScript"],
    image: "/certificates/fullstack-dapp-react-web3.png",
    pdfUrl: "/certificates/fullstack-dapp-react-web3-certificate.pdf",
  },
  {
    id: "intro-front-end-development",
    title: "Introduction to Front-End Development",
    organization: "Meta (via Coursera)",
    issueDate: "July 2025",
    credentialId: "GU30RVRPURZB",
    description:
      "Completed an online non-credit course introducing core front-end development concepts, including HTML, CSS, and the fundamentals of building responsive user interfaces.",
    skills: ["HTML", "CSS", "Front-End Development", "Web Design"],
    image: "/certificates/intro-front-end-development.png",
    pdfUrl: "/certificates/intro-front-end-development-certificate.pdf",
  },
  {
    id: "programming-with-javascript",
    title: "Programming with JavaScript",
    organization: "Meta (via Coursera)",
    issueDate: "July 2025",
    credentialId: "FTQ3BW0GE46R",
    description:
      "Completed an online non-credit course covering JavaScript programming fundamentals, including syntax, functions, DOM manipulation, and problem-solving techniques.",
    skills: ["JavaScript", "Programming Fundamentals", "DOM Manipulation"],
    image: "/certificates/programming-with-javascript.png",
    pdfUrl: "/certificates/programming-with-javascript-certificate.pdf",
  },
];

export const education = [
  {
    degree: "Bachelor of Computer Applications",
    school: "Datta Meghe Institute of Higher Education and Research",
    location: "Wardha, Maharashtra",
    period: "2022 — 2025",
    board: "",
  },
  {
    degree: "Higher Secondary Education (Class 12)",
    school: "Shri Krishnadas Mahavidyalaya, Pipri (Meghe)",
    location: "Wardha, Maharashtra",
    period: "",
    board: "Maharashtra State Board of Secondary and Higher Secondary Education",
  },
  {
    degree: "Secondary Education (Class 10)",
    school: "New English Convent School",
    location: "Wardha, Maharashtra",
    period: "",
    board: "Maharashtra State Board of Secondary and Higher Secondary Education",
  },
];
