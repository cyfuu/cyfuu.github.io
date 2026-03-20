import { motion } from "framer-motion";
import { socialItems } from "../data/socialItems";
import { containerVariants, itemVariants } from "@shared/constants/animationVariants";

export function ContactSocials() {
  return (
    <motion.div className="mt-6" variants={containerVariants}>
      <motion.h2 className="mb-3 text-2xl sm:text-3xl" variants={itemVariants}>
        Connect
      </motion.h2>

      <div className="flex gap-4">
        {socialItems.map((social) => (
          <motion.a
            key={social.link}
            href={social.link}
            target="_blank"
            rel="noopener noreferrer"
            className="w-14 h-14 rounded-lg border border-gray-300 bg-white text-black flex items-center justify-center"
            variants={itemVariants}
            whileHover={{
              scale: 1.1,
              y: -2,
              boxShadow: "0px 8px 20px rgba(0,0,0,0.15)",
              transition: { type: "spring", stiffness: 300, damping: 20 },
            }}
          >
            <social.icon size={26} />
          </motion.a>
        ))}
      </div>
    </motion.div>
  );
}