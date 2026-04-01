import { motion } from "framer-motion";
import { Contact } from "../data/contacts";
import { useContactHover } from "@shared/hooks/useContactHover";

interface ContactItemProps {
  contact: Contact;
}

export function ContactItem({ contact }: ContactItemProps) {
  const { hovered, copied, handleCopy, onHoverStart, onHoverEnd } = useContactHover();
  const { icon: Icon, label, value, copyable } = contact;

  return (
    <motion.div
      onClick={() => copyable && handleCopy(value, label)}
      onHoverStart={() => onHoverStart(label)}
      onHoverEnd={onHoverEnd}
      className="relative flex items-center gap-5 group cursor-pointer rounded-2xl px-5 py-4 overflow-hidden select-none border border-transparent hover:border-white/10 hover:bg-white/[0.03] transition-all duration-500 ease-out hover:backdrop-blur-sm"
      transition={{ type: "spring", stiffness: 400, damping: 25 }}
      whileHover={{ x: 10 }}
      whileTap={{ scale: 0.98 }}
    >
      {/* ICON Container */}
      <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-white/[0.03] flex items-center justify-center group-hover:bg-[--color-primary]/10 border border-white/5 group-hover:border-[--color-primary]/20 transition-all duration-300">
        <Icon 
          size={20} 
          className="text-white/40 group-hover:text-[--color-primary] transition-colors" 
        />
      </div>

      {/* TEXT */}
      <div className="flex flex-col relative z-10">
        <span className="text-[10px] uppercase tracking-[0.25em] text-white/20 font-bold mb-1 group-hover:text-[--color-primary]/60 transition-colors">
          {label}
        </span>
        
        <span className="text-base sm:text-lg text-white/60 group-hover:text-white transition-colors font-mono tracking-tight">
          {copied === label ? "Copied to clipboard!" : value}
        </span>
      </div>

      {/* Hover Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-r from-[--color-primary]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
    </motion.div>
  );
}