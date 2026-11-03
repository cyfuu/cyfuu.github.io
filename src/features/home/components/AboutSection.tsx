import { useState, useEffect } from "react";
import { Plus } from "lucide-react";
import { motion } from "framer-motion";
import { aboutItems } from "../data/aboutItems";
import { sectionVariants, itemVariants } from "@shared/constants/animationVariants";

import LogoLoop from "@shared/components/LogoLoop";
import { techLogos } from "../data/techLogos";

export function AboutSection() {
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  // Touch screens have no hover, so a tap opens a card instead.
  const [openIndex, setOpenIndex] = useState<number | null>(null);

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
          {aboutItems.map((item, i) => (
            <motion.div
              key={item.title}
              variants={itemVariants}
              tabIndex={0}
              data-open={openIndex === i}
              onClick={() => {
                if (isTouchDevice) setOpenIndex(openIndex === i ? null : i);
              }}
              className="group relative flex h-40 sm:h-52 flex-col justify-end overflow-hidden p-5 sm:p-6 rounded-2xl
                        border border-white/10 bg-white/5 backdrop-blur-md shadow-lg cursor-default
                        hover:bg-white/10 data-[open=true]:bg-white/10 transition-colors duration-700 ease-out
                        focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
            >
              {/* The icon is the card's background: oversized, faint, and cropped by the card edge */}
              <item.icon
                aria-hidden="true"
                strokeWidth={1}
                className="pointer-events-none absolute -right-10 -bottom-12 h-56 w-56 sm:h-64 sm:w-64 -rotate-12 text-primary opacity-[0.16]
                          transition-all duration-700 ease-out
                          group-hover:opacity-[0.28] group-hover:-rotate-6
                          group-focus-visible:opacity-[0.28]
                          group-data-[open=true]:opacity-[0.28] group-data-[open=true]:-rotate-6
                          motion-reduce:transition-none"
              />

              {/* Title sits at the bottom; the description opens beneath it and pushes the title up */}
              <div className="relative">
                <div className="flex items-center justify-between gap-3">
                  <h3 className="text-lg sm:text-xl font-semibold text-white">{item.title}</h3>
                  <Plus
                    aria-hidden="true"
                    size={20}
                    className="shrink-0 text-white/60 transition-all duration-500
                              group-hover:rotate-45 group-focus-visible:rotate-45 
                              group-data-[open=true]:rotate-45 motion-reduce:transition-none"
                  />
                </div>

                <div
                  className="grid grid-rows-[0fr] opacity-0 transition-[grid-template-rows,opacity] duration-500 ease-out
                            group-hover:grid-rows-[1fr] group-hover:opacity-100
                            group-focus-visible:grid-rows-[1fr] group-focus-visible:opacity-100
                            group-data-[open=true]:grid-rows-[1fr] group-data-[open=true]:opacity-100
                            motion-reduce:transition-none"
                >
                  <p className="min-h-0 overflow-hidden pt-2 text-white/90 text-sm lg:text-base leading-relaxed">
                    {item.description}
                  </p>
                </div>
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