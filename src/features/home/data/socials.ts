import { Mail, Github, Facebook } from "lucide-react";

export interface SocialLink {
  href: string;
  icon: typeof Mail | typeof Github | typeof Facebook;
}

export const socialLinks: SocialLink[] = [
  { href: "mailto:cyfuu.dev@gmail.com", icon: Mail },
  { href: "https://github.com/cyfuu", icon: Github },
  { href: "https://www.facebook.com/brianjoseph.aratia/", icon: Facebook },
];