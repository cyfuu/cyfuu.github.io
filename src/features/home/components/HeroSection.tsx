import { Link } from "react-router";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { heroVariants } from "@shared/constants/animationVariants";

export function HeroSection() {
  return (
    <motion.section
      className="snap-section snap-start min-h-screen flex items-center pt-16 select-none"
      initial="hidden"
      animate="visible"
      variants={heroVariants}
    >
      <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.div
          className="max-w-3xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.8 }}
        >
          <h1 className="mb-4 sm:mb-6 text-3xl sm:text-4xl md:text-5xl lg:text-6xl select-none">
            I'm <span className="text-[--color-primary] select-none">Brian Joseph B. Aratia</span>
          </h1>
          <h2 className="mb-4 sm:mb-6 text-xl sm:text-2xl md:text-3xl text-[--color-text-secondary] select-none">
            IT Student & Developer
          </h2>
          <p className="text-base sm:text-lg text-[--color-text-secondary] mb-6 sm:mb-8 leading-relaxed select-none">
            I'm passionate about technology and creating innovative solutions. Welcome to my portfolio where I showcase my projects and share my journey in the world of IT.
          </p>

          <div className="flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4">
            <Link
              to="/projects"
              className="inline-flex items-center justify-center gap-2 px-5 sm:px-6 py-2.5 sm:py-3 bg-[--color-primary] text-white rounded-lg hover:brightness-110 hover:shadow-xl transition-all active:scale-95 active:brightness-125 text-sm sm:text-base select-none"
            >
              View My Work
              <ArrowRight size={18} className="sm:w-5 sm:h-5 select-none" />
            </Link>

            <Link
              to="/contact"
              className="inline-flex items-center justify-center gap-2 px-5 sm:px-6 py-2.5 sm:py-3 border-2 border-gray-300 bg-white text-black font-normal rounded-lg
                        hover:bg-gray-100 hover:border-black hover:shadow-xl hover:scale-105
                        transition-transform transition-colors duration-300 ease-in-out
                        will-change-transform text-sm sm:text-base select-none"
            >
              Get In Touch
            </Link>
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
}