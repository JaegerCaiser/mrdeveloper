import { useState } from "react";
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

  const emailRegex =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (errors[name as keyof typeof errors]) {
      setErrors((prev) => ({ ...prev, [name]: false }));
    }
  };

  const validateForm = () => {
    const newErrors = {
      name: !formData.name.trim(),
      email: !formData.email.trim() || !emailRegex.test(formData.email),
      message: !formData.message.trim(),
    };
    setErrors(newErrors);
    return !Object.values(newErrors).some(Boolean);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (validateForm()) {
      e.currentTarget.submit();
    }
  };

  return (
    <section id="contact" className="contact" aria-label="Contact">
      <h2 className="contact__heading section-heading">Contact</h2>
      <p className="contact__text">
        Have a question or want to work together? Leave your details and
        I&apos;ll get back to you as soon as possible.
      </p>
      <form
        className="contact__form"
        action="https://formspree.io/f/xdoprgpv"
        method="POST"
        onSubmit={handleSubmit}
      >
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
              <div className="form-error__email">
                Please enter a valid email.
              </div>
            )}
            {errors.message && (
              <div className="form-error__msg">Please enter a message.</div>
            )}
          </div>
          <button type="submit" className="contact__form-submit">
            Submit
          </button>
        </div>
      </form>
    </section>
  );
};

export default Contact;
