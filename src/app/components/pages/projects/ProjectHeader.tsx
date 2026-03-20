import { motion } from "framer-motion";
import { itemVariants } from "../../../constants/animationVariants";

export function ProjectHeader() {
  return (
    <motion.div className="mb-8 sm:mb-12" variants={itemVariants}>
      <h1 className="mb-4 text-3xl sm:text-4xl md:text-5xl select-none">
        My Projects
      </h1>
      <p className="text-sm sm:text-base text-[--color-text-secondary] max-w-2xl mb-6 select-none">
        Here are some of the projects I've worked on during my studies and
        personal time. Each project represents a learning experience and
        demonstrates my growing skills in software development.
      </p>
    </motion.div>
  );
}