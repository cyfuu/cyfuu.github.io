import { motion } from "framer-motion";
import { formFieldVariants } from "../../constants/animationVariants";

interface InputFieldProps {
  name: string;
  type: string;
  placeholder: string;
  value: string;
  error?: boolean;
  onChange: (name: string, value: string) => void;
  isTextarea?: boolean;
}

export function InputField({
  name,
  type,
  placeholder,
  value,
  error,
  onChange,
  isTextarea = false,
}: InputFieldProps) {
  return (
    <motion.div className="relative" variants={formFieldVariants}>
      {isTextarea ? (
        <motion.textarea
          name={name}
          rows={4}
          value={value}
          onChange={e => onChange(name, e.target.value)}
          placeholder={placeholder}
          className={`w-full px-4 py-2.5 rounded-lg border bg-white text-gray-900 placeholder-gray-400
            focus:outline-none focus:ring-2 focus:ring-black focus:border-black
            resize-none transition-all text-base
            ${error ? "border-red-500" : "border-gray-300"}`}
          whileHover={{ scale: 1.02 }}
        />
      ) : (
        <motion.input
          type={type}
          name={name}
          value={value}
          onChange={e => onChange(name, e.target.value)}
          placeholder={placeholder}
          className={`w-full px-4 py-2.5 rounded-lg border bg-white text-gray-900 placeholder-gray-400
            focus:outline-none focus:ring-2 focus:ring-black focus:border-black
            transition-all text-base
            ${error ? "border-red-500" : "border-gray-300"}`}
          whileHover={{ scale: 1.02 }}
        />
      )}
    </motion.div>
  );
}