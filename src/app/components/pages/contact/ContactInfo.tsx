import { motion } from "framer-motion";
import { contactItems } from "../../../constants/contactItems";
import { containerVariants, itemVariants } from "../../../constants/animationVariants";
import { ContactSocials } from "./ContactSocials";

export function ContactInfo() {
  return (
    <motion.div
      className="flex flex-col justify-center space-y-5"
      variants={containerVariants}
    >
      <motion.h2 className="mb-3 text-2xl sm:text-3xl" variants={itemVariants}>
        Contact Information
      </motion.h2>

      {contactItems.map((contact) => (
        <motion.div
          key={contact.title}
          className="flex items-start gap-4 cursor-default"
          variants={itemVariants}
          whileHover={{ scale: 1.05, y: -3 }}
        >
          <div className="w-14 h-14 rounded-lg bg-[--color-primary]/10 flex items-center justify-center">
            <contact.icon className="text-[--color-primary]" size={26} />
          </div>

          <div className="min-w-0">
            <h3 className="text-base sm:text-lg">{contact.title}</h3>
            <span className="text-[--color-text-secondary] text-base">
              {contact.value}
            </span>
          </div>
        </motion.div>
      ))}

      <ContactSocials />
    </motion.div>
  );
}