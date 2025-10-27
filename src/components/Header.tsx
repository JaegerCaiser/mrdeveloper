import React, { useState, useEffect } from "react";

const Header: React.FC = () => {
  const [visible, setVisible] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const about = document.getElementById("about");
      if (about) {
        const rect = about.getBoundingClientRect();
        // Show header when top of About reaches the top of the viewport (or above)
        const shouldShow = rect.top <= 0;
        setVisible(shouldShow);
        setScrolled(shouldShow || window.scrollY > 0);
      } else {
        // Fallback: if no about section, show after small scroll
        const shouldShow = window.scrollY > window.innerHeight * 0.6;
        setVisible(shouldShow);
        setScrolled(shouldShow);
      }
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, []);

  return (
    <header
      className={`header ${visible ? "header--visible" : ""} ${
        scrolled ? "header--scrolled" : ""
      }`}
    >
      <div className="header__container">
        <a href="#hero" className="header__logo">
          BS
        </a>
        <nav className="header__nav" aria-label="Navegação principal">
          <ul>
            <li>
              <a href="#hero">Home</a>
            </li>
            <li>
              <a href="#about">About</a>
            </li>
            <li>
              <a href="#experience">Experience</a>
            </li>
            <li>
              <a href="#writing">Writing</a>
            </li>
            <li>
              <a href="#contact">Contact</a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
