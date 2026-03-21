import { motion } from "framer-motion";
import { aboutItems } from "../data/aboutItems";
import { sectionVariants, itemVariants } from "@shared/constants/animationVariants";

import LogoLoop from "@shared/components/LogoLoop";
import { techLogos } from "../data/techLogos";

export function AboutSection() {
  return (
    <motion.section
      className="snap-section snap-start min-h-screen flex flex-col border-t border-[--color-border] pt-16 select-none"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      variants={sectionVariants}
    >
      <div className="flex-1 w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-12">

        {/* About Me */}
        <motion.div className="mb-12 sm:mb-16" variants={sectionVariants}>
          <h2 className="mb-8 sm:mb-10 text-center text-2xl sm:text-3xl md:text-4xl">
            About Me
          </h2>

          <motion.div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8">
            {aboutItems.map((item) => (
              <motion.div
                key={item.title}
                className="group p-5 sm:p-6 rounded-lg border border-gray-200 bg-white hover:shadow-xl hover:scale-105 transition duration-300 ease-in-out"
                variants={itemVariants}
              >
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg bg-gray-100 flex items-center justify-center mb-3 sm:mb-4">
                  <div className="transition duration-300 ease-in-out group-hover:scale-150 group-hover:rotate-12">
                    <item.icon className="text-black" size={20} />
                  </div>
                </div>

                <h3 className="mb-2 text-lg sm:text-xl text-black">{item.title}</h3>
                <p className="text-gray-700 text-sm sm:text-base">{item.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* Skills */}
        <motion.div variants={sectionVariants}>
          <h2 className="mb-8 sm:mb-10 text-center text-2xl sm:text-3xl md:text-4xl">
            Skills & Technologies
          </h2>

          {/* Logo Loop Container */}
          <motion.div
            className="relative w-full h-[120px] sm:h-[140px] md:h-[160px]"
            variants={itemVariants}
          >
            <LogoLoop
              logos={techLogos}
              speed={80}
              direction="left"
              logoHeight={48}
              gap={48}
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