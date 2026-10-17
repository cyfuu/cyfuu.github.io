import React from "react";
import * as Icons from "react-icons/si";
import { skills } from "./skills";

// SVG import
import RxjsIcon from "@shared/assets/icons/rxjs.svg?react";

const iconMap: Record<string, keyof typeof Icons> = {
  C: "SiC",
  Java: "SiOpenjdk",
  JavaScript: "SiJavascript",
  HTML5: "SiHtml5",
  PHP: "SiPhp",
  Python: "SiPython",
  TypeScript: "SiTypescript",
  Markdown: "SiMarkdown",
  Angular: "SiAngular",
  Flutter: "SiFlutter",
  Vite: "SiVite",
  Apache: "SiApache",
  MySQL: "SiMysql",
  Firebase: "SiFirebase",
  Supabase: "SiSupabase",
  Figma: "SiFigma",
  Git: "SiGit",
  Cisco: "SiCisco",
};

export const techLogos = skills.map((skill) => {
  // Handle custom SVG first
  if (skill === "RxJS") {
    return {
      node: <RxjsIcon className="w-8 h-8" />,
      title: skill,
      ariaLabel: skill,
    };
  }

  const iconKey = iconMap[skill];
  const Icon = iconKey ? Icons[iconKey] : null;

  return {
    node: Icon ? <Icon size={32} /> : <span>{skill}</span>,
    title: skill,
    ariaLabel: skill,
  };
});