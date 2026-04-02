import { motion } from "framer-motion";
import { itemVariants } from "@shared/constants/animationVariants";

export function ProjectHeader() {
  return (
    <motion.div className="mb-8 sm:mb-12" variants={itemVariants}>
      <h1 className="mb-4 text-3xl sm:text-4xl md:text-5xl select-none font-bold text-white">
        My Projects
      </h1>
      <p className="text-base sm:text-lg text-white/90 max-w-2xl mb-6 select-none leading-relaxed">
        Here are some of the projects I've worked on during my studies and
        personal time. Each project represents a learning experience and
        demonstrates my growing skills in software development.
      </p>
    </motion.div>
  );
}