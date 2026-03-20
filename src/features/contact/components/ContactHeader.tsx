import { motion } from "framer-motion";
import { itemVariants } from "@shared/constants/animationVariants";

export function ContactHeader() {
  return (
    <motion.div className="mb-4 text-center" variants={itemVariants}>
      <h1 className="mb-2 text-3xl sm:text-4xl md:text-5xl">Get In Touch</h1>
      <p className="text-sm sm:text-base text-[--color-text-secondary] max-w-xl mx-auto mb-6">
        I'm always open to discussing opportunities, collaborations, or just connecting.
      </p>
    </motion.div>
  );
}