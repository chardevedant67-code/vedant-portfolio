import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import dynamic from "next/dynamic";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";
import CustomCursor from "@/components/CustomCursor";
import Loader from "@/components/Loader";
import Nav from "@/components/Nav";

// Hidden until a user hits Cmd/Ctrl+K — code-split out of the main bundle
// instead of parsing its framer-motion overlay + icon set on every load.
const CommandPalette = dynamic(() => import("@/components/CommandPalette"));

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Vedant Charde — Automation Engineer & AI Automation Expert",
  description:
    "Portfolio of Vedant Charde — Automation Engineer, Full Stack Developer, and AI Automation Expert building intelligent workflows and scalable web applications.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${spaceGrotesk.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground">
        <Loader />
        <CustomCursor />
        <div className="noise" />
        <SmoothScroll>
          <Nav />
          <CommandPalette />
          {children}
        </SmoothScroll>
      </body>
    </html>
  );
}
