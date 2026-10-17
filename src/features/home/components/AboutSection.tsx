import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { aboutItems } from "../data/aboutItems";
import { sectionVariants, itemVariants } from "@shared/constants/animationVariants";

import LogoLoop from "@shared/components/LogoLoop";
import { techLogos } from "../data/techLogos";

export function AboutSection() {
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  useEffect(() => {
    const checkTouch = () => {
      setIsTouchDevice(window.matchMedia("(pointer: coarse)").matches);
    };
    
    checkTouch();
    
    window.addEventListener("resize", checkTouch);
    return () => window.removeEventListener("resize", checkTouch);
  }, []);

  return (
    <motion.section
      className="snap-section snap-start min-h-[100dvh] flex flex-col pt-16 sm:pt-20 select-none relative z-10"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      variants={sectionVariants}
    >
      <div className="flex-1 w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">

        {/* About Me */}
        <motion.div variants={itemVariants} className="mb-6 sm:mb-12">
          <h2 className="mt-2 sm:mt-4 text-2xl sm:text-3xl md:text-4xl font-bold text-white">
            Who I Am
          </h2>
        </motion.div>
        
        <motion.div 
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-8"
          variants={{
            visible: { transition: { staggerChildren: 0.15 } }
          }}
        >
          {aboutItems.map((item) => (
            <motion.div
              key={item.title}
              variants={itemVariants}
              className="group relative overflow-hidden p-5 sm:p-8 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md
                        hover:bg-white/10 transition-colors duration-700 ease-out shadow-lg"
            >
              {/* The icon is the card's background: oversized, faint, and cropped by the card edge */}
              <item.icon
                aria-hidden="true"
                strokeWidth={1}
                className="pointer-events-none absolute -right-10 -bottom-12 h-56 w-56 sm:h-64 sm:w-64 -rotate-12 text-primary opacity-[0.16] transition-all duration-700 ease-out group-hover:opacity-[0.28] group-hover:-rotate-6"
              />

              <div className="relative">
                <h3 className="mb-2 sm:mb-3 text-lg sm:text-xl font-semibold text-white">
                  {item.title}
                </h3>
                <p className="text-white/90 text-sm sm:text-base leading-relaxed">
                  {item.description}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Skills */}
        <motion.div variants={sectionVariants} className="mt-8 sm:mt-12">
          <h2 className="mb-2 sm:mb-6 text-center text-lg sm:text-xl md:text-2xl uppercase tracking-[0.2em] text-white/70 font-medium">
            Core Stack
          </h2>

          <motion.div
            className="relative w-full flex items-center overflow-hidden py-4"
            variants={itemVariants}
          >
            <LogoLoop
              logos={techLogos}
              speed={40}
              direction="left"
              logoHeight={32}
              gap={80}
              pauseOnHover={!isTouchDevice}
              scaleOnHover={!isTouchDevice}
              ariaLabel="Skills and technologies"
            />
          </motion.div>
        </motion.div>

      </div>
    </motion.section>
  );
}