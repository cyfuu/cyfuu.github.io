import { motion } from "framer-motion";
import { SocialLink } from "../data/socials";

interface SocialButtonProps {
  link: SocialLink;
}

export function SocialButton({ link }: SocialButtonProps) {
  const isPlaceholder = link.href === "#";

  return (
    <motion.a
      href={link.href}
      target={isPlaceholder ? undefined : "_blank"}
      rel="noopener noreferrer"
      className={`
        relative flex items-center justify-center w-14 h-14 
        rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm
        transition-all duration-500 ease-out group overflow-hidden
        ${isPlaceholder ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer hover:bg-white/10 hover:border-[--color-primary]/50'}
      `}
      
      transition={{ type: "spring", stiffness: 400, damping: 25 }}

      whileHover={isPlaceholder ? {} : { 
        y: -5, 
        scale: 1.05 
      }}
      
      whileTap={isPlaceholder ? {} : { 
        scale: 0.95 
      }}
      
      onClick={(e) => isPlaceholder && e.preventDefault()}
    >
      <link.icon 
        size={22} 
        className="text-white/90 group-hover:text-[--color-primary] transition-colors duration-500" 
      />

      {!isPlaceholder && (
        <div className="absolute inset-0 bg-gradient-to-br from-[--color-primary]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      )}
    </motion.a>
  );
}