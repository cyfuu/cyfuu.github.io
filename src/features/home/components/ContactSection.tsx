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
      className="snap-section snap-start min-h-screen border-t border-[--color-border] pt-16 flex items-center select-none"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      variants={sectionVariants} // parent section controls stagger
    >
      <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-16 items-center">

          {/* LEFT */}
          <motion.div className="flex flex-col gap-8" variants={sectionVariants}>
            <motion.h2 className="text-3xl sm:text-4xl md:text-5xl leading-tight select-none" variants={itemVariants}>
              Come say hi!
            </motion.h2>

            <motion.p className="text-[--color-text-secondary] max-w-md select-none" variants={itemVariants}>
              I'm always open to discussing opportunities, collaborations, or just connecting.
            </motion.p>

            {/* Social Buttons */}
            <motion.div className="flex gap-5" variants={sectionVariants}>
              {socialLinks.map((link, i) => (
                <motion.div key={i} variants={itemVariants}>
                  <SocialButton link={link} />
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* RIGHT */}
          <motion.div className="flex flex-col gap-10 text-lg" variants={sectionVariants}>
            {contacts.map(contact => (
              <motion.div key={contact.label} variants={itemVariants}>
                <ContactItem contact={contact} />
              </motion.div>
            ))}
          </motion.div>

        </div>
      </div>
    </motion.section>
  );
}