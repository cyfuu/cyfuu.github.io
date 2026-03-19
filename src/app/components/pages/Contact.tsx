import { Mail, Phone, MapPin, Github, Linkedin, Facebook } from "lucide-react";
import { motion, Variants } from "framer-motion";
import { contactItems } from "../../constants/contactItems";
import { socialItems } from "../../constants/socialItems";
import { formFields } from "../../constants/formFields";
import { containerVariants, itemVariants, formFieldVariants } from "../../constants/animationVariants";

export function Contact() {
  return (
    <motion.section
      className="snap-section snap-start min-h-screen md:snap-always flex flex-col pt-16 select-none"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      variants={containerVariants}
    >
      <div className="flex-1 w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 flex flex-col justify-center select-none">

        {/* Header */}
        <motion.div className="mb-4 text-center" variants={itemVariants}>
          <h1 className="mb-2 text-3xl sm:text-4xl md:text-5xl select-none">Get In Touch</h1>
          <p className="text-sm sm:text-base text-[--color-text-secondary] max-w-xl mx-auto mb-6 select-none">
            I'm always open to discussing opportunities, collaborations, or just connecting.
          </p>
        </motion.div>

        {/* Content Grid */}
        <div className="flex justify-center">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10 items-center select-none">

            {/* Contact Information */}
            <motion.div className="flex flex-col justify-center space-y-5" variants={containerVariants}>
              <motion.h2 className="mb-3 text-2xl sm:text-3xl select-none" variants={itemVariants}>
                Contact Information
              </motion.h2>

              {contactItems.map((contact, i) => (
                <motion.div
                  key={contact.title}
                  className="flex items-start gap-4 cursor-default select-none"
                  variants={itemVariants}
                  transition={{ delay: i * 0.1 }}
                  whileHover={{ scale: 1.05, y: -3 }}
                >
                  <div className="w-14 h-14 rounded-lg bg-[--color-primary]/10 flex items-center justify-center select-none">
                    <contact.icon className="text-[--color-primary] select-none" size={26} />
                  </div>
                  <div className="min-w-0 select-none">
                    <h3 className="text-base sm:text-lg select-none">{contact.title}</h3>
                    <span className="text-[--color-text-secondary] text-base cursor-default select-none">
                      {contact.value}
                    </span>
                  </div>
                </motion.div>
              ))}

              {/* Social Media */}
              <motion.div className="mt-6" variants={containerVariants}>
                <motion.h2 className="mb-3 text-2xl sm:text-3xl select-none" variants={itemVariants}>
                  Connect
                </motion.h2>
                <div className="flex gap-4">
                  {socialItems.map((social, i) => (
                    <motion.a
                      key={social.link}
                      href={social.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-14 h-14 rounded-lg border border-gray-300 bg-white text-black
                                flex items-center justify-center
                                transition-transform transition-colors duration-300 ease-in-out
                                will-change-transform select-none"
                      variants={itemVariants}
                      transition={{ delay: i * 0.1 }}
                      whileHover={{ scale: 1.1, y: -2, boxShadow: "0px 8px 20px rgba(0,0,0,0.15)" }}
                    >
                      <social.icon size={26} className="select-none" />
                    </motion.a>
                  ))}
                </div>
              </motion.div>
            </motion.div>

            {/* Contact Form */}
            <motion.div
              className="p-6 sm:p-8 rounded-xl border border-gray-200 bg-white shadow-sm hover:shadow-md transition-all h-fit max-w-md mx-auto lg:mx-0"
              variants={containerVariants}
            >
              <motion.h2 className="mb-4 text-lg sm:text-xl font-medium text-gray-900 select-none" variants={itemVariants}>
                Send a Message
              </motion.h2>

              <motion.form className="space-y-4 select-none" variants={containerVariants}>
                {formFields.map((field, i) => (
                  <motion.input
                    key={field.name}
                    type={field.type}
                    name={field.name}
                    placeholder={field.placeholder}
                    className="w-full px-4 py-2.5 rounded-lg border border-gray-300 bg-white text-gray-900 placeholder-gray-400
                               focus:outline-none focus:ring-2 focus:ring-black focus:border-black
                               transition-all text-base select-none"
                    variants={formFieldVariants}
                    transition={{ delay: i * 0.1 }}
                    whileHover={{ scale: 1.02 }}
                  />
                ))}

                <motion.textarea
                  name="message"
                  rows={4}
                  placeholder="Your message..."
                  className="w-full px-4 py-2.5 rounded-lg border border-gray-300 bg-white text-gray-900 placeholder-gray-400
                             focus:outline-none focus:ring-2 focus:ring-black focus:border-black
                             resize-none transition-all text-base select-none"
                  variants={formFieldVariants}
                  transition={{ delay: 0.3 }}
                  whileHover={{ scale: 1.02 }}
                />

                <motion.button
                  type="submit"
                  className="w-full px-4 py-3 bg-black text-white font-normal border-2 border-black rounded-lg
                             hover:shadow-xl hover:scale-105 transition-transform transition-colors duration-300 ease-in-out
                             will-change-transform text-base select-none"
                  variants={formFieldVariants}
                  transition={{ delay: 0.4 }}
                  whileHover={{ scale: 1.03, y: -2 }}
                >
                  Send Message
                </motion.button>
              </motion.form>
            </motion.div>
          </div>
        </div>
      </div>
    </motion.section>
  );
}