import React from "react";
import { useContactForm } from "../hooks";
import "./Contact.scss";

const Contact: React.FC = () => {
  const {
    formData,
    errors,
    isSending,
    statusMessage,
    handleInputChange,
    handleSubmit,
  } = useContactForm();

  return (
    <section id="contact" className="contact" aria-label="Contact">
      <title>Contato • Matheus Caiser</title>
      <meta
        name="description"
        content="Entre em contato com Matheus Caiser para discutir projetos, oportunidades de trabalho ou para tirar dúvidas. Envie uma mensagem através do formulário de contato."
      />
      <h2 className="contact__heading section-heading">Contact</h2>
      <p className="contact__text">
        Have a question or want to work together? Leave your details and
        I&apos;ll get back to you as soon as possible.
      </p>
      <form className="contact__form" onSubmit={handleSubmit} noValidate>
        {statusMessage && (
          <div
            className={`contact__status contact__status--${statusMessage.type}`}
          >
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
              <div className="form-error__email">
                Please enter a valid email.
              </div>
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
