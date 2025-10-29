import { useState, useCallback, useMemo } from "react";
import { Helmet } from "react-helmet-async";
import "./Contact.scss";

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [errors, setErrors] = useState({
    name: false,
    email: false,
    message: false,
  });

  const emailRegex = useMemo(
    () =>
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    []
  );

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { name, value } = e.target;
      const fieldName = name === "_replyto" ? "email" : name;
      setFormData((prev) => ({ ...prev, [fieldName]: value }));
      // Clear error when user starts typing
      if (errors[fieldName as keyof typeof errors]) {
        setErrors((prev) => ({ ...prev, [fieldName]: false }));
      }
    },
    [errors]
  );

  const validateForm = useCallback(() => {
    const newErrors = {
      name: !formData.name.trim(),
      email: !formData.email.trim() || !emailRegex.test(formData.email),
      message: !formData.message.trim(),
    };
    setErrors(newErrors);
    return !Object.values(newErrors).some(Boolean);
  }, [formData, emailRegex]);

  const [isSending, setIsSending] = useState(false);
  const [statusMessage, setStatusMessage] = useState<null | { type: "success" | "error"; text: string }>(
    null
  );

  const handleSubmit = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      setStatusMessage(null);
      if (!validateForm()) return;

      // Try sending via FormSubmit (AJAX endpoint). This forwards to the provided email.
      // If blocked or not configured, fallback will open the user's mail client.
      const endpoint = `https://formsubmit.co/ajax/matheus.caiser@gmail.com`;

      const payload = {
        name: formData.name,
        email: formData.email,
        message: formData.message,
      };

      try {
        setIsSending(true);
        const res = await fetch(endpoint, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify(payload),
        });

        if (!res.ok) {
          const text = await res.text();
          throw new Error(text || "Failed to send message");
        }

        const data = await res.json();
        if (data.success === "true" || data.success === true || res.status === 200) {
          setStatusMessage({ type: "success", text: "Message sent — I will reply shortly." });
          setFormData({ name: "", email: "", message: "" });
        } else {
          // Some providers return different shapes — treat as success if status OK
          setStatusMessage({ type: "success", text: "Message sent — I will reply shortly." });
          setFormData({ name: "", email: "", message: "" });
        }
      } catch (err) {
        console.error("Contact form send error:", err);
        // Fallback: open user's mail client with prefilled fields
        setStatusMessage({
          type: "error",
          text: "Could not send via web service. Opening your mail client as fallback.",
        });

        // Open mailto as fallback (user will send manually)
        const subject = encodeURIComponent(`Contact from portfolio: ${formData.name}`);
        const body = encodeURIComponent(`Name: ${formData.name}%0AEmail: ${formData.email}%0A%0A${formData.message}`);
        window.location.href = `mailto:matheus.caiser@gmail.com?subject=${subject}&body=${body}`;
      } finally {
        setIsSending(false);
      }
    },
    [formData, validateForm]
  );

  return (
    <section id="contact" className="contact" aria-label="Contact">
      <Helmet>
        <title>Contato • Matheus Caiser</title>
        <meta
          name="description"
          content="Entre em contato com Matheus Caiser para discutir projetos, oportunidades de trabalho ou para tirar dúvidas. Envie uma mensagem através do formulário de contato."
        />
      </Helmet>
      <h2 className="contact__heading section-heading">Contact</h2>
      <p className="contact__text">
        Have a question or want to work together? Leave your details and
        I&apos;ll get back to you as soon as possible.
      </p>
      <form className="contact__form" onSubmit={handleSubmit} noValidate>
        {statusMessage && (
          <div
            className={`contact__status contact__status--${statusMessage.type}`}>
            {statusMessage.text}
          </div>
        )}
        <input
          type="text"
          name="name"
          placeholder="Name"
          className={`contact__form-name ${errors.name ? "input-error" : ""}`}
          value={formData.name}
          onChange={handleInputChange}
        />
        <input
          type="email"
          name="_replyto"
          placeholder="Email"
          className={`contact__form-email ${errors.email ? "input-error" : ""}`}
          value={formData.email}
          onChange={handleInputChange}
        />
        <textarea
          name="message"
          placeholder="Message"
          className={`contact__form-message ${
            errors.message ? "input-error" : ""
          }`}
          value={formData.message}
          onChange={handleInputChange}
        />
          <div className="contact__form-error-submit">
          <div className="form-error">
            {errors.name && (
              <div className="form-error__name">Please enter your name.</div>
            )}
            {errors.email && (
              <div className="form-error__email">Please enter a valid email.</div>
            )}
            {errors.message && (
              <div className="form-error__msg">Please enter a message.</div>
            )}
          </div>
          <button
            type="submit"
            className="contact__form-submit"
            disabled={isSending}
          >
            {isSending ? "Sending..." : "Submit"}
          </button>
        </div>
      </form>
    </section>
  );
};

export default Contact;
