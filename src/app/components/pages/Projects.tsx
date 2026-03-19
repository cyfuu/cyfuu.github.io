import { Wrench } from "lucide-react";
import { motion, Variants } from "framer-motion";
import { sectionVariants, itemVariants } from "../../constants/animationVariants";

export function Projects() {
  return (
    <motion.section
      className="snap-section snap-start min-h-screen flex flex-col pt-16 select-none"
      initial="hidden"
      animate="visible"
      variants={sectionVariants}
    >
      <div className="flex-1 w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 flex flex-col select-none">
        
        {/* Header */}
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

        {/* Centered Content */}
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
      </div>
    </motion.section>
  );
}