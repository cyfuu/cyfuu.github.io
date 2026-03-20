import { motion } from "framer-motion";
import { ProjectHeader } from "./components/ProjectHeader";
import { ProjectContent } from "./components/ProjectContent";
import { sectionVariants } from "@shared/constants/animationVariants";

export function Projects() {
  return (
    <motion.section
      className="snap-section snap-start min-h-screen flex flex-col pt-16 select-none"
      initial="hidden"
      animate="visible"
      variants={sectionVariants}
    >
      <div className="flex-1 w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 flex flex-col select-none">
        <ProjectHeader />
        <ProjectContent />
      </div>
    </motion.section>
  );
}