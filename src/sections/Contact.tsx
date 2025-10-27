import React, { useState } from "react";
import { Github, Mail } from "lucide-react";

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log("Form submitted:", formData);
    alert("Message sent! (Demo only)");
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <section id="contact" className="section contact" aria-label="Contact">
      <h2 className="section__title">Contact</h2>
      <p className="contact__subtitle">
        Have a question or want to work together? Leave your details and I'll
        get back to you as soon as possible.
      </p>
      <form className="contact__form" onSubmit={handleSubmit}>
        <div className="contact__form-row">
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={formData.name}
            onChange={handleChange}
            required
            className="contact__input"
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
            className="contact__input"
          />
        </div>
        <textarea
          name="message"
          placeholder="Your Message"
          value={formData.message}
          onChange={handleChange}
          required
          rows={6}
          className="contact__textarea"
        />
        <button type="submit" className="contact__submit">
          SUBMIT
        </button>
      </form>
      <div className="contact__social">
        <a
          href="https://github.com/"
          target="_blank"
          rel="noreferrer"
          aria-label="GitHub"
        >
          <Github size={24} />
        </a>
        <a href="mailto:email@example.com" aria-label="Email">
          <Mail size={24} />
        </a>
      </div>
      <footer className="footer">
        <p>BEN SCOTT ©{new Date().getFullYear()}</p>
      </footer>
    </section>
  );
};

export default Contact;
