import React, { useEffect } from "react";
import "./Contact.scss";

const Contact: React.FC = () => {
  useEffect(() => {
    const formSubmitBtn = document.querySelector(
      "#form-submit"
    ) as HTMLButtonElement;
    const unameInput = document.querySelector(
      ".contact__form-name"
    ) as HTMLInputElement;
    const emailInput = document.querySelector(
      ".contact__form-email"
    ) as HTMLInputElement;
    const msgInput = document.querySelector(
      ".contact__form-message"
    ) as HTMLTextAreaElement;
    const unameError = document.querySelector(
      ".form-error__name"
    ) as HTMLElement;
    const emailError = document.querySelector(
      ".form-error__email"
    ) as HTMLElement;
    const msgError = document.querySelector(".form-error__msg") as HTMLElement;

    const re =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    const handleFormSubmit = () => {
      const uname = unameInput.value;
      const email = emailInput.value;
      const msg = msgInput.value;

      let validUname = false;
      let validEmail = false;
      let validMsg = false;

      // Validate name
      if (!uname) {
        validUname = false;
        unameInput.classList.add("input-error");
        unameError.style.display = "block";
      } else {
        validUname = true;
        unameInput.classList.remove("input-error");
        unameError.style.display = "none";
      }

      // Validate email
      if (!email || !re.test(email)) {
        validEmail = false;
        emailInput.classList.add("input-error");
        emailError.style.display = "block";
      } else {
        validEmail = true;
        emailInput.classList.remove("input-error");
        emailError.style.display = "none";
      }

      // Validate message
      if (!msg) {
        validMsg = false;
        msgInput.classList.add("input-error");
        msgError.style.display = "block";
      } else {
        validMsg = true;
        msgInput.classList.remove("input-error");
        msgError.style.display = "none";
      }

      // If all valid, submit form
      if (validUname && validEmail && validMsg) {
        const form = document.querySelector(
          ".contact__form"
        ) as HTMLFormElement;
        form.submit();
      }
    };

    formSubmitBtn.addEventListener("click", handleFormSubmit);

    return () => {
      formSubmitBtn.removeEventListener("click", handleFormSubmit);
    };
  }, []);

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
      >
        <input
          type="text"
          name="name"
          placeholder="Name"
          className="contact__form-name"
        />
        <input
          type="email"
          name="_replyto"
          placeholder="Email"
          className="contact__form-email"
        />
        <textarea
          name="message"
          placeholder="Message"
          className="contact__form-message"
        />
        <div className="contact__form-error-submit">
          <div className="form-error">
            <div className="form-error__name">Please enter your name.</div>
            <div className="form-error__email">Please enter a valid email.</div>
            <div className="form-error__msg">Please enter a message.</div>
          </div>
          <button
            type="button"
            className="contact__form-submit"
            id="form-submit"
          >
            Submit
          </button>
        </div>
      </form>
    </section>
  );
};

export default Contact;
