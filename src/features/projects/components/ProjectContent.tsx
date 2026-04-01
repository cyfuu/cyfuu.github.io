import { motion } from "framer-motion";
import { Github, ExternalLink, Code2 } from "lucide-react";
import { itemVariants } from "@shared/constants/animationVariants";
import { projects } from "../data/projects";

export function ProjectContent() {
  return (
    <motion.div 
      className="flex flex-col gap-8 w-full max-w-4xl mx-auto" 
      variants={itemVariants}
    >
      {projects.map((project, index) => (
        <motion.div
          key={index}
          variants={itemVariants}
          className="group relative w-full bg-[#111] border border-white/10 rounded-2xl overflow-hidden hover:border-[--color-primary]/50 transition-colors duration-500 md:h-[250px]"
        >
          <div className="grid grid-cols-1 md:grid-cols-[300px_1fr] h-full">
            
            <div className="h-[200px] md:h-full w-full md:w-[300px] bg-gradient-to-br from-[--color-primary] to-purple-900/20 flex items-center justify-center border-b md:border-b-0 md:border-r border-white/10 p-8 overflow-hidden">
              {project.image ? (
                <img 
                  src={project.image} 
                  alt={project.title} 
                  className="w-full h-full object-contain drop-shadow-2xl group-hover:scale-110 transition-transform duration-500" 
                />
              ) : (
                <Code2 size={48} className="text-white/20 group-hover:scale-110 group-hover:text-[--color-primary] transition-all duration-500" />
              )}
            </div>

            {/* Project Info */}
            <div className="p-6 md:p-8 flex flex-col h-full bg-[#111] z-10">
              <div className="flex justify-between items-start mb-1">
                <div>
                  <h3 className="text-xl sm:text-2xl font-medium text-white leading-tight">
                    {project.title}
                  </h3>
                  <span className="text-white/40 text-xs sm:text-sm font-medium tracking-wide uppercase opacity-80">
                    {project.subtitle}
                  </span>
                </div>

                <div className="flex gap-4 text-white/50 pt-1">
                  <motion.a 
                    href={project.link} 
                    target="_blank" 
                    rel="noreferrer" 
                    className="hover:text-[--color-primary] transition-colors p-1"
                    whileHover={{ y: -3, scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <Github size={20} />
                  </motion.a>

                  <motion.a 
                    href={project.live} 
                    target="_blank" 
                    rel="noreferrer" 
                    className="hover:text-[--color-primary] transition-colors p-1"
                    whileHover={{ y: -3, scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <ExternalLink size={20} />
                  </motion.a>
                </div>
              </div>

              <p className="text-gray-400 text-sm sm:text-base mt-3 mb-4 leading-relaxed md:line-clamp-2">
                {project.description}
              </p>

              <div className="flex flex-wrap gap-2 mt-auto">
                {project.tech.map((t) => (
                  <span key={t} className="text-[10px] uppercase tracking-wider font-bold px-2 py-1 rounded-md bg-white/5 border border-white/10 text-gray-300">
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
}