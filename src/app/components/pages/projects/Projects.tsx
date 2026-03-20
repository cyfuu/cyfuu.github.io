import { motion } from "framer-motion";
import { sectionVariants } from "../../../constants/animationVariants";
import { ProjectHeader } from "./ProjectHeader";
import { ProjectContent } from "./ProjectContent";

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