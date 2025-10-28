import React, { useState, useEffect } from "react";
import "./Header.scss";
import mustacheSvg from "../assets/mustache.svg";

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
      threshold: 0.5,
    };

    const observerNav = new IntersectionObserver(navFadeIn, options);

    // Observe sections
    const heroSection = document.querySelector("#hero");
    const aboutSection = document.querySelector("#about");
    const contactSection = document.querySelector("#contact");

    if (heroSection) observerNav.observe(heroSection);
    if (aboutSection) observerNav.observe(aboutSection);
    if (contactSection) observerNav.observe(contactSection);

    // Show/hide navigation based on scroll position (like in Ben's code)
    const handleScroll = () => {
      // Navigation is always visible
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      observerNav.disconnect();
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <nav className="navigation-bar">
      <a href="#hero" className="navigation-bar__logo">
        <img src={mustacheSvg} alt="Mustache Logo" className="navigation-bar__logo-svg" />
      </a>
      <div className="navigation">
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
          href="#contact"
          id="nav-contact"
          className={`navigation__item ${
            activeSection === "contact" ? "navigation__item--active" : ""
          }`}
        >
          Contact
        </a>
      </div>
    </nav>
  );
};

export default Header;
