import { motion } from "framer-motion";
import { formFields } from "../data/formFields";
import { useContactForm } from "../hooks/useContactForm";
import { InputField } from "@shared/components/InputField";
import { containerVariants, formFieldVariants, itemVariants } from "@shared/constants/animationVariants";

export function ContactForm() {
  const { form, errors, handleChange, handleSubmit } = useContactForm();

  return (
    <motion.div
      className="p-6 sm:p-8 rounded-xl border border-gray-200 bg-white shadow-sm hover:shadow-md transition-all
                 w-[100%] lg:w-[450px]"
      variants={containerVariants}
    >
      <motion.h2
        className="mb-4 text-lg sm:text-xl font-medium text-gray-900"
        variants={itemVariants}
      >
        Send a Message
      </motion.h2>

      <motion.form
        className="space-y-4"
        variants={containerVariants}
        onSubmit={e => { e.preventDefault(); handleSubmit(console.log); }}
        noValidate
      >
        {formFields.map(field => (
          <InputField
            key={field.name}
            name={field.name}
            type={field.type}
            placeholder={field.placeholder}
            value={form[field.name]}
            error={!!errors[field.name]}
            onChange={handleChange}
          />
        ))}

        <InputField
          name="message"
          placeholder="Your message..."
          value={form.message}
          error={!!errors.message}
          onChange={handleChange}
          isTextarea
          type="text"
        />

        <motion.button
          type="submit"
          className="w-full px-4 py-3 bg-black text-white font-normal border-2 border-black rounded-lg
                     hover:shadow-xl hover:scale-105 transition-transform transition-colors duration-300 ease-in-out
                     will-change-transform text-base"
          variants={formFieldVariants}
          whileHover={{ scale: 1.03, y: -2 }}
        >
          Send Message
        </motion.button>
      </motion.form>
    </motion.div>
  );
}