import { motion } from "framer-motion";
import { sectionVariants, itemVariants } from "@shared/constants/animationVariants";
import { MapPin } from "lucide-react";
import { ContactForm } from "./ContactForm";
import { SocialButton } from "./SocialButton";
import { profile } from "../data/profile";
import { socialLinks } from "../data/socials";

export function ContactSection() {
  return (
    <motion.section
      id="contact"
      className="snap-section snap-start min-h-[100dvh] pt-16 flex items-center select-none relative z-10"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      variants={sectionVariants}
    >
      <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="grid md:grid-cols-2 gap-10 sm:gap-8 md:gap-12 lg:gap-24 items-start">
          
          {/* LEFT: Branding */}
          <div className="flex flex-col gap-8 md:gap-10">
            <motion.div className="flex flex-col gap-4 md:gap-6" variants={sectionVariants}>
              <motion.h2 
                className="text-3xl sm:text-5xl md:text-6xl font-bold leading-[1.1] tracking-tight text-white" 
                variants={itemVariants}
              >
                Let's build <br /> 
                something great.
              </motion.h2>

              <motion.p 
                className="text-white/90 text-base sm:text-lg max-w-md leading-relaxed" 
                variants={itemVariants}
              >
                I'm currently looking for new opportunities and collaborations. 
                Even if you just want to say hi, send a message and it goes straight to my inbox.
              </motion.p>
            </motion.div>

            {/* Social Buttons */}
            <motion.div 
              className="flex flex-wrap gap-3 sm:gap-4"
              variants= {sectionVariants}
            >
              {socialLinks.map((link, i) => (
                <motion.div 
                  key={i}
                  variants={itemVariants}
                >
                  <SocialButton link={link} />
                </motion.div>
              ))}
            </motion.div>

            <motion.p
              className="flex items-center gap-2 text-white/70"
              variants={itemVariants}
            >
              <MapPin size={18} aria-hidden="true" />
              Based in {profile.location}
            </motion.p>
          </div>

          {/* RIGHT: Contact form */}
          <motion.div className="min-w-0" variants={itemVariants}>
            <ContactForm />
          </motion.div>

        </div>
      </div>
    </motion.section>
  );
}