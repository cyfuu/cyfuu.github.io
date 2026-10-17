import { Github, Linkedin } from "lucide-react";

export interface SocialLink {
  href: string;
  label: string;
  icon: typeof Github | typeof Linkedin;
}

export const socialLinks: SocialLink[] = [
  { href: "https://github.com/cyfuu", label: "GitHub", icon: Github },
  { href: "#", label: "LinkedIn (coming soon)", icon: Linkedin },
];
