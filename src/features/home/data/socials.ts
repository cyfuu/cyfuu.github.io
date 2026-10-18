import { FaGithub, FaLinkedin } from "react-icons/fa";
import { IconType } from "react-icons";

export interface SocialLink {
  href: string;
  label: string;
  icon: IconType;
}

export const socialLinks: SocialLink[] = [
  { href: "https://github.com/cyfuu", label: "GitHub", icon: FaGithub },
  { href: "#", label: "LinkedIn (coming soon)", icon: FaLinkedin },
];
