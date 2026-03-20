import { useState } from "react";
import { formFields } from "../data/formFields";

export type FormState = { [key: string]: string; message: string };
export type FormErrors = { [key: string]: string };

export function useContactForm() {
  const initialState = formFields.reduce((acc, field) => {
    acc[field.name] = "";
    return acc;
  }, {} as FormState);

  const [form, setForm] = useState<FormState>({ ...initialState, message: "" });
  const [errors, setErrors] = useState<FormErrors>({});

  const validate = () => {
    const newErrors: FormErrors = {};
    formFields.forEach((field) => {
      const value = form[field.name]?.trim();
      if (!value) newErrors[field.name] = "Required";
      if (field.type === "email" && value) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) newErrors[field.name] = "Invalid email";
      }
    });
    if (!form.message.trim()) newErrors.message = "Required";
    return newErrors;
  };

  const handleChange = (name: string, value: string) => {
    setForm(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => {
        const copy = { ...prev };
        delete copy[name];
        return copy;
      });
    }
  };

  const handleSubmit = (onSuccess: (form: FormState) => void) => {
    const validationErrors = validate();
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) return false;

    onSuccess(form);
    setForm({ ...initialState, message: "" });
    return true;
  };

  return { form, errors, handleChange, handleSubmit };
}