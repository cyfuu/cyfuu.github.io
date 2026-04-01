import { motion } from "framer-motion";
import { aboutItems } from "../data/aboutItems";
import { sectionVariants, itemVariants } from "@shared/constants/animationVariants";

import LogoLoop from "@shared/components/LogoLoop";
import { techLogos } from "../data/techLogos";

export function AboutSection() {
  return (
    <motion.section
      className="snap-section snap-start min-h-[100dvh] flex flex-col border-t border-white/5 pt-16 sm:pt-20 select-none relative z-10"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      variants={sectionVariants}
    >
      <div className="flex-1 w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">

        {/* About Me */}
        <motion.div variants={itemVariants} className="mb-8 sm:mb-12">
          <h2 className="mt-2 sm:mt-4 text-2xl sm:text-3xl md:text-4xl font-bold text-white">
            Who I Am
          </h2>
        </motion.div>
        
        <motion.div 
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 sm:gap-8"
          variants={{
            visible: {
              transition: {
                staggerChildren: 0.15,
              }
            }
          }}
        >
          {aboutItems.map((item) => (
            <motion.div
              key={item.title}
              variants={itemVariants}
              className="group p-5 sm:p-8 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md 
                        hover:bg-white/10 hover:border-[--color-primary]/40 
                        transition-all duration-700 ease-out shadow-lg"
            >
              {/* Icon Container */}
                <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-[--color-primary]/10 flex items-center justify-center mb-4 sm:mb-5 border border-white/5">
                  <div className="transition duration-300 ease-in-out group-hover:scale-125 group-hover:rotate-6">
                    <item.icon className="text-[--color-primary] w-5 h-5 sm:w-6 sm:h-6" />
                  </div>
                </div>

                <h3 className="mb-2 sm:mb-3 text-lg sm:text-xl font-semibold text-white">
                  {item.title}
                </h3>
                <p className="text-white/60 text-sm sm:text-base leading-relaxed">
                  {item.description}
                </p>
            </motion.div>
          ))}
        </motion.div>

        {/* Skills */}
        <motion.div variants={sectionVariants} className="mt-10 sm:mt-12">
          <h2 className="mb-8 sm:mb-16 text-center text-lg sm:text-xl md:text-2xl uppercase tracking-[0.2em] text-white/30 font-medium">
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
              pauseOnHover
              scaleOnHover
              ariaLabel="Skills and technologies"
            />
          </motion.div>
        </motion.div>

      </div>
    </motion.section>
  );
}