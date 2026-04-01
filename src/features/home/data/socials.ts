import { Mail, Github, Linkedin } from "lucide-react";

export interface SocialLink {
  href: string;
  icon: typeof Mail | typeof Github | typeof Linkedin;
}

export const socialLinks: SocialLink[] = [
  { href: "mailto:cyfuu.dev@gmail.com", icon: Mail },
  { href: "https://github.com/cyfuu", icon: Github },
  { href: "#", icon: Linkedin },
];