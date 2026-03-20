import { motion } from "framer-motion";
import { Wrench } from "lucide-react";
import { itemVariants } from "../../../constants/animationVariants";

export function ProjectContent() {
  return (
    <motion.div
      className="flex-1 flex flex-col items-center justify-center select-none"
      variants={itemVariants}
    >
      <motion.div
        className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-[--color-primary] bg-opacity-10 flex items-center justify-center mb-5 sm:mb-6 select-none"
        variants={itemVariants}
      >
        <Wrench className="text-[--color-primary] select-none" size={32} />
      </motion.div>

      <motion.h2
        className="mb-3 sm:mb-4 text-2xl sm:text-3xl text-center select-none"
        variants={itemVariants}
      >
        Projects Coming Soon
      </motion.h2>

      <motion.p
        className="text-[--color-text-secondary] text-center max-w-md text-sm sm:text-base px-4 select-none"
        variants={itemVariants}
      >
        I'm currently working on documenting my projects. Check back soon to
        see what I've been building!
      </motion.p>
    </motion.div>
  );
}