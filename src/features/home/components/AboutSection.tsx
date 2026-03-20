import { motion } from "framer-motion";
import { aboutItems } from "../data/aboutItems";
import { skills } from "../data/skills";
import { sectionVariants, itemVariants } from "@shared/constants/animationVariants";

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
          <h2 className="mb-8 sm:mb-10 text-center text-2xl sm:text-3xl md:text-4xl select-none">
            About Me
          </h2>
          <motion.div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8">
            {aboutItems.map((item) => (
              <motion.div
                key={item.title}
                className="group p-5 sm:p-6 rounded-lg border border-gray-200 bg-white hover:shadow-xl hover:scale-105 transition-transform transition-shadow duration-300 ease-in-out select-none"
                variants={itemVariants}
              >
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg bg-gray-100 flex items-center justify-center mb-3 sm:mb-4">
                  <div className="transition-transform duration-300 ease-in-out group-hover:scale-150 group-hover:rotate-12 select-none">
                    <item.icon className="text-black select-none" size={20} />
                  </div>
                </div>
                <h3 className="mb-2 text-lg sm:text-xl text-black select-none">{item.title}</h3>
                <p className="text-gray-700 text-sm sm:text-base select-none">{item.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* Skills */}
        <motion.div variants={sectionVariants}>
          <h2 className="mb-8 sm:mb-10 text-center text-2xl sm:text-3xl md:text-4xl select-none">
            Skills & Technologies
          </h2>
          <motion.div className="flex flex-wrap justify-center gap-2 sm:gap-3">
            {skills.map(skill => (
              <motion.span
                key={skill}
                className="px-3 py-1.5 sm:px-4 sm:py-2 rounded-full border border-gray-300 bg-white
                          text-gray-800 font-normal flex items-center justify-center
                          transition-transform transition-colors duration-300 ease-in-out
                          hover:bg-gray-100 hover:scale-110 hover:shadow-lg cursor-pointer text-xs sm:text-sm select-none"
                variants={itemVariants}
              >
                {skill}
              </motion.span>
            ))}
          </motion.div>
        </motion.div>

      </div>
    </motion.section>
  );
}