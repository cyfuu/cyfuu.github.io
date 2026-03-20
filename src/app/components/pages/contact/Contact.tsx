import { motion } from "framer-motion";
import { containerVariants, itemVariants } from "../../../constants/animationVariants";

import { ContactHeader } from "./ContactHeader";
import { ContactInfo } from "./ContactInfo";
import { ContactForm } from "./ContactForm";

export function Contact() {
  return (
    <motion.section
      className="snap-section snap-start min-h-screen md:snap-always flex flex-col pt-16 select-none"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      variants={containerVariants}
    >
      <div className="flex-1 w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 flex flex-col justify-center">

        <ContactHeader />

        <div className="flex justify-center">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10 items-center">

            <ContactInfo />

            <ContactForm />

          </div>
        </div>
      </div>
    </motion.section>
  );
}