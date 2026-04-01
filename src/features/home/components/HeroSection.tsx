import { Link } from "react-router";
import { ArrowRight, Send } from "lucide-react";
import { motion } from "framer-motion";
import { heroVariants } from "@shared/constants/animationVariants";
import { ShufflingRoles } from "./ShufflingRoles";

export function HeroSection() {
  return (
    <motion.section
      className="snap-section snap-start min-h-[100dvh] flex items-center pt-16 sm:pt-20 select-none relative z-10"
      initial="hidden"
      animate="visible"
      variants={heroVariants}
    >
      <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <motion.div
          className="max-w-3xl text-center sm:text-left"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
        >
          {/* Main Title */}
          <h1 className="mb-2 text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-[--color-primary] drop-shadow-md leading-tight">
            Brian Joseph B. Aratia
          </h1>

          {/* Shuffling Roles */}
          <h2 className="mb-6 sm:mb-8 text-lg sm:text-2xl md:text-3xl font-medium text-[--color-primary]/90 min-h-[40px] flex items-center justify-center sm:justify-start whitespace-normal sm:whitespace-nowrap overflow-hidden">
            <ShufflingRoles />
          </h2>

          {/* Description */}
          <p className="text-base sm:text-lg text-white/60 mb-8 sm:mb-10 leading-relaxed max-w-2xl mx-auto sm:mx-0">
            I'm passionate about technology and creating innovative solutions. Welcome to my portfolio where I showcase my projects and share my journey in the world of Information Technology.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row flex-wrap justify-center sm:justify-start gap-4 sm:gap-6">
            <Link
              to="/projects"
              className="group inline-flex items-center justify-center gap-2 w-full sm:w-auto px-6 py-3 bg-[--color-primary] text-white rounded-xl font-medium hover:brightness-110 transition-all active:scale-95 text-base"
            >
              View My Work
              <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
            </Link>

            <button
              onClick={() => {
                const el = document.getElementById("contact");
                el?.scrollIntoView({ behavior: "smooth" });
              }}
              className="group inline-flex items-center justify-center gap-2 w-full sm:w-auto px-6 py-3 border border-white/10 bg-white/5 backdrop-blur-sm text-white/80 rounded-xl font-medium
                         hover:bg-white/10 hover:border-white/20 hover:text-white
                         transition-all duration-300 ease-in-out
                         active:scale-95 text-base"
            >
              Get In Touch
              <Send size={17} className="opacity-50 group-hover:opacity-100 transition-opacity" />
            </button>
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
}