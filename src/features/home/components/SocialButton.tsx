import { motion } from "framer-motion";
import { SocialLink } from "../data/socials";
import { itemVariants } from "@shared/constants/animationVariants";

interface SocialButtonProps {
  link: SocialLink;
}

export function SocialButton({ link }: SocialButtonProps) {
  const { href, icon: Icon } = link;
  const isExternal = href.startsWith("http");

  return (
    <motion.a
      href={href}
      target={isExternal ? "_blank" : undefined}
      rel={isExternal ? "noopener noreferrer" : undefined}
      variants={itemVariants}
      whileHover={{ scale: 1.18, y: -6, rotate: [0, 8, -8, 5, -5, 0] }}
      whileTap={{ scale: 0.9 }}
      transition={{ duration: 0.4, ease: "easeInOut" }}
      className="p-4 bg-white text-black rounded-full shadow-md hover:shadow-xl will-change-transform flex items-center justify-center"
    >
      <Icon size={20} />
    </motion.a>
  );
}