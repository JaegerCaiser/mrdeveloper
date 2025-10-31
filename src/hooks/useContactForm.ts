// src/hooks/useContactForm.ts

import { useState, useCallback } from "react";
import { contactService, ContactFormData } from "../services";

interface ContactFormErrors {
  name: boolean;
  email: boolean;
  message: boolean;
}

interface ContactStatusMessage {
  type: "success" | "error";
  text: string;
}

interface UseContactFormReturn {
  formData: ContactFormData;
  errors: ContactFormErrors;
  isSending: boolean;
  statusMessage: ContactStatusMessage | null;
  handleInputChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => Promise<void>;
  resetForm: () => void;
  clearStatusMessage: () => void;
}

export const useContactForm = (): UseContactFormReturn => {
  const [formData, setFormData] = useState<ContactFormData>({
    name: "",
    email: "",
    message: "",
  });

  const [errors, setErrors] = useState<ContactFormErrors>({
    name: false,
    email: false,
    message: false,
  });

  const [isSending, setIsSending] = useState(false);
  const [statusMessage, setStatusMessage] =
    useState<ContactStatusMessage | null>(null);

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { name, value } = e.target;
      const fieldName = name === "_replyto" ? "email" : name;

      setFormData((prev) => ({ ...prev, [fieldName]: value }));

      // Clear error when user starts typing
      if (errors[fieldName as keyof ContactFormErrors]) {
        setErrors((prev) => ({ ...prev, [fieldName]: false }));
      }
    },
    [errors]
  );

  const resetForm = useCallback(() => {
    setFormData({ name: "", email: "", message: "" });
    setErrors({ name: false, email: false, message: false });
  }, []);

  const clearStatusMessage = useCallback(() => {
    setStatusMessage(null);
  }, []);

  const handleSubmit = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      clearStatusMessage();

      // Validate form using service
      const validation = contactService.validateFormData(formData);
      if (!validation.isValid) {
        setErrors({
          name: !!validation.errors.name,
          email: !!validation.errors.email,
          message: !!validation.errors.message,
        });
        return;
      }

      try {
        setIsSending(true);

        // Send form using service
        const response = await contactService.sendContactForm(formData);

        if (response.success) {
          setStatusMessage({
            type: "success",
            text: "Message sent — I will reply shortly.",
          });
          resetForm();
        } else {
          setStatusMessage({ type: "error", text: response.message });
        }
      } catch (err) {
        console.error("Contact form send error:", err);
        setStatusMessage({
          type: "error",
          text: "Could not send via web service. Opening your mail client as fallback.",
        });

        // Open mailto as fallback (user will send manually)
        const subject = encodeURIComponent(
          `Contact from portfolio: ${formData.name}`
        );
        const body = encodeURIComponent(
          `Name: ${formData.name}%0AEmail: ${formData.email}%0A%0A${formData.message}`
        );
        window.location.href = `mailto:matheus.caiser@gmail.com?subject=${subject}&body=${body}`;
      } finally {
        setIsSending(false);
      }
    },
    [formData, clearStatusMessage, resetForm]
  );

  return {
    formData,
    errors,
    isSending,
    statusMessage,
    handleInputChange,
    handleSubmit,
    resetForm,
    clearStatusMessage,
  };
};
