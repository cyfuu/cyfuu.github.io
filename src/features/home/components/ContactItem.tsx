import { motion } from "framer-motion";
import { Contact } from "../data/contacts";
import { useContactHover } from "../hooks/useContactHover";

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
      className="relative flex items-start gap-4 group cursor-pointer rounded-lg px-3 py-2 overflow-hidden select-none"
      whileHover={{ scale: 1.05, y: -5 }}
      whileTap={{ scale: 0.97 }}
      transition={{ type: "spring", stiffness: 400, damping: 14 }}
    >
      {/* ICON */}
      <motion.div
        animate={hovered === label ? { y: [0, -4, 0] } : { y: 0 }}
        transition={
          hovered === label
            ? { duration: 0.6, repeat: Infinity, ease: "easeInOut" }
            : { duration: 0.2 }
        }
      >
        <Icon size={22} className="mt-1" />
      </motion.div>

      {/* TEXT */}
      <div>
        <p className="text-sm text-[--color-text-secondary] mb-1 group-hover:text-white transition">{label}</p>
        <p className="text-base group-hover:translate-x-1 transition">{copied === label ? "Copied!" : value}</p>
      </div>

      {/* GLOW */}
      <motion.div
        className="absolute inset-0 rounded-lg pointer-events-none"
        initial={{ opacity: 0 }}
        whileHover={{ opacity: 1 }}
        transition={{ duration: 0.2 }}
      >
        <div className="w-full h-full bg-[radial-gradient(circle_at_left,rgba(255,255,255,0.08),transparent_70%)]" />
      </motion.div>
    </motion.div>
  );
}