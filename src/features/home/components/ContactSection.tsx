import { motion } from "framer-motion";
import { sectionVariants, itemVariants } from "@shared/constants/animationVariants";
import { ContactItem } from "./ContactItem";
import { SocialButton } from "./SocialButton";
import { contacts } from "../data/contacts";
import { socialLinks } from "../data/socials";

export function ContactSection() {
  return (
    <motion.section
      id="contact"
      className="snap-section snap-start min-h-screen pt-16 flex items-center select-none relative z-10"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      variants={sectionVariants}
    >
      <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-2 gap-12 lg:gap-24 items-start">
          
          {/* LEFT: Branding */}
          <div className="flex flex-col gap-10">
            <motion.div className="flex flex-col gap-6" variants={sectionVariants}>
              <motion.h2 
                className="text-4xl sm:text-5xl md:text-6xl font-bold leading-[1.1] tracking-tight text-white" 
                variants={itemVariants}
              >
                Let's build <br /> 
                <span className="text-white/40">something great.</span>
              </motion.h2>

              <motion.p className="text-white/60 text-lg max-w-md leading-relaxed" variants={itemVariants}>
                I'm currently looking for new opportunities and collaborations. 
                Even if you just want to say hi, my inbox is always open.
              </motion.p>
            </motion.div>

            {/* Social Buttons */}
            <div className="flex gap-4">
              {socialLinks.map((link, i) => (
                <div key={i}>
                  <SocialButton link={link} />
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT: Contact Containers */}
          <motion.div 
            className="flex flex-col gap-2"
            variants={sectionVariants}
          >
            {contacts.map(contact => (
              <motion.div 
                key={contact.label} 
                variants={itemVariants} 
              >
                <ContactItem contact={contact} />
              </motion.div>
            ))}
          </motion.div>

        </div>
      </div>
    </motion.section>
  );
}