import { useState, useEffect, memo } from "react";
import "./Header.scss";
import logoSvg from "../logo.svg";
import LanguageSwitcher from "./LanguageSwitcher";

const Header: React.FC = () => {
  const [activeSection, setActiveSection] = useState("hero");

  useEffect(() => {
    // Navigation items in nav bar
    const navLinks = document.querySelectorAll(".navigation__item");

    // Change highlighted nav link depending on page position
    function navFadeIn(
      entries: IntersectionObserverEntry[],
      _observer: IntersectionObserver
    ) {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          navLinks.forEach((link) => {
            link.classList.remove("navigation__item--active");
          });

          const targetId = entry.target.id;
          const navItem = document.querySelector(`#nav-${targetId}`);
          if (navItem) {
            navItem.classList.add("navigation__item--active");
            setActiveSection(targetId);
          }
        }
      });
    }

    const options = {
      root: null,
      rootMargin: "0px",
      threshold: 0.1,
    };

    const observerNav = new IntersectionObserver(navFadeIn, options);

    // Observe sections
    const heroSection = document.querySelector("#hero");
    const aboutSection = document.querySelector("#about");
    const experienceSection = document.querySelector("#experience");
    const writingSection = document.querySelector("#writing");
    const contactSection = document.querySelector("#contact");

    if (heroSection) observerNav.observe(heroSection);
    if (aboutSection) observerNav.observe(aboutSection);
    if (experienceSection) observerNav.observe(experienceSection);
    if (writingSection) observerNav.observe(writingSection);
    if (contactSection) observerNav.observe(contactSection);

    return () => {
      observerNav.disconnect();
    };
  }, []);

  const navLinks = (
    <>
      <a
        href="#hero"
        id="nav-hero"
        className={`navigation__item ${
          activeSection === "hero" ? "navigation__item--active" : ""
        }`}
      >
        Home
      </a>
      <a
        href="#about"
        id="nav-about"
        className={`navigation__item ${
          activeSection === "about" ? "navigation__item--active" : ""
        }`}
      >
        About
      </a>
      <a
        href="#experience"
        id="nav-experience"
        className={`navigation__item ${
          activeSection === "experience" ? "navigation__item--active" : ""
        }`}
      >
        Experience
      </a>
      <a
        href="#writing"
        id="nav-writing"
        className={`navigation__item ${
          activeSection === "writing" ? "navigation__item--active" : ""
        }`}
      >
        Writing
      </a>
      <a
        href="#contact"
        id="nav-contact"
        className={`navigation__item ${
          activeSection === "contact" ? "navigation__item--active" : ""
        }`}
      >
        Contact
      </a>
    </>
  );

  return (
    <nav className="navigation-bar">
      <a href="#hero" className="navigation-bar__logo">
        <img src={logoSvg} alt="Logo" className="navigation-bar__logo-svg" />
      </a>

      {/* Desktop navigation (hidden on small screens via CSS) */}
      <div className="navigation">{navLinks}</div>

      <div className="navigation-bar__right">
        <LanguageSwitcher />
      </div>
    </nav>
  );
};

export default memo(Header);
