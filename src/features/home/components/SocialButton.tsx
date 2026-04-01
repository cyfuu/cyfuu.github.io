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
      // Smooth 500ms fade for colors/borders/blur
      className={`
        relative flex items-center justify-center w-14 h-14 
        rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm
        transition-all duration-500 ease-out group overflow-hidden
        ${isPlaceholder ? 'opacity-30 cursor-not-allowed' : 'cursor-pointer hover:bg-white/10 hover:border-[--color-primary]/40'}
      `}
      
      // The "Spring Return" (Hover Out)
      // High stiffness + High damping = smooth, no-jiggle landing
      transition={{ type: "spring", stiffness: 400, damping: 25 }}

      // The "Hover In"
      whileHover={isPlaceholder ? {} : { 
        y: -5, 
        scale: 1.05 
      }}
      
      // The "Click"
      whileTap={isPlaceholder ? {} : { 
        scale: 0.95 
      }}
      
      onClick={(e) => isPlaceholder && e.preventDefault()}
    >
      {/* Icon with its own smooth color transition */}
      <link.icon 
        size={22} 
        className="text-white/70 group-hover:text-[--color-primary] transition-colors duration-500" 
      />

      {/* Internal Glow Effect */}
      {!isPlaceholder && (
        <div className="absolute inset-0 bg-gradient-to-br from-[--color-primary]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      )}
    </motion.a>
  );
}