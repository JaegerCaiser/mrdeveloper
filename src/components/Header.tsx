import { useState, useEffect, useMemo, useCallback, useRef } from "react";
import { motion } from "framer-motion";
import { Code, ChevronDown } from "lucide-react";
import { GradientText, Button, SocialLinks } from "./common";
import MustacheIcon from "./common/MustacheIcon";
import "../styles/Header.scss";
import profileImage from "../assets/profile.png";

function Header() {
  const [isVisible, setIsVisible] = useState<boolean>(true);
  const [scrollProgress, setScrollProgress] = useState<number>(() => {
    if (typeof window !== "undefined") {
      return Math.min(window.scrollY / 400, 1);
    }
    return 0;
  });
  const [currentScroll, setCurrentScroll] = useState<number>(() => {
    if (typeof window !== "undefined") {
      return window.scrollY;
    }
    return 0;
  });
  const ticking = useRef<boolean>(false);

  const handleScroll = useCallback(() => {
    if (!ticking.current) {
      window.requestAnimationFrame(() => {
        const currentScrollY = window.scrollY;
        setCurrentScroll(currentScrollY);
        setIsVisible(currentScrollY < 100);
        setScrollProgress(Math.min(currentScrollY / 400, 1));
        ticking.current = false;
      });
      ticking.current = true;
    }
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  const scrollToNext = useCallback(() => {
    const aboutSection = document.getElementById("about");
    aboutSection?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  const scrollToTop = useCallback(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const imageStyles = useMemo(() => {
    const imageScale = 1 + scrollProgress * 0.8;
    const borderRadius = 50 - scrollProgress * 30;
    const borderWidth = 3 - scrollProgress * 3;
    const borderOpacity = 1 - scrollProgress;
    const imageLeft = 50 - scrollProgress * 42;

    let imageTop = 33 - scrollProgress * 7;

    if (currentScroll > 400 && currentScroll <= 800) {
      const extraScroll = currentScroll - 400;
      const extraMovement = (extraScroll / window.innerHeight) * 7;
      imageTop = 26 - extraMovement;
    } else if (currentScroll > 800) {
      const scrollUntil800 = 400;
      const movement800 = (scrollUntil800 / window.innerHeight) * 7;
      const positionAt800 = 26 - movement800;
      const extraScroll = currentScroll - 800;
      const extraMovement = (extraScroll / window.innerHeight) * 100;
      imageTop = positionAt800 - extraMovement;
    }

    const translateX = -50 + scrollProgress * 50;
    const translateY = -50 + scrollProgress * 50;
    const shadowSize1 = 40 * borderOpacity;
    const shadowOpacity1 = 0.3 * borderOpacity;
    const shadowSize2 = 80 * borderOpacity;
    const shadowOpacity2 = 0.15 * borderOpacity;

    return {
      imageScale,
      borderRadius,
      borderWidth,
      borderOpacity,
      imageLeft,
      imageTop,
      translateX,
      translateY,
      shadowSize1,
      shadowOpacity1,
      shadowSize2,
      shadowOpacity2,
    };
  }, [scrollProgress, currentScroll]);

  const profileStyles = useMemo(
    () => ({
      left: scrollProgress === 0 ? "50%" : `${imageStyles.imageLeft}%`,
      top: scrollProgress === 0 ? "33%" : `${imageStyles.imageTop}%`,
      transform: `translate(${imageStyles.translateX}%, ${imageStyles.translateY}%) scale(${imageStyles.imageScale}) translateZ(0)`,
    }),
    [scrollProgress, imageStyles]
  );

  const imageStylesMemo = useMemo(
    () => ({
      borderRadius: `${imageStyles.borderRadius}%`,
      borderWidth: `${imageStyles.borderWidth}px`,
      borderColor: `rgba(255, 255, 255, ${imageStyles.borderOpacity * 0.2})`,
      boxShadow: `0 0 ${imageStyles.shadowSize1}px rgba(102, 126, 234, ${imageStyles.shadowOpacity1}), 0 0 ${imageStyles.shadowSize2}px rgba(245, 87, 108, ${imageStyles.shadowOpacity2})`,
    }),
    [imageStyles]
  );

  const glowStyles = useMemo(
    () => ({
      opacity: imageStyles.borderOpacity * 0.7,
    }),
    [imageStyles.borderOpacity]
  );

  const scrollIndicatorStyles = useMemo(
    () => ({
      opacity: isVisible ? 1 : 0,
      pointerEvents: isVisible ? ("auto" as const) : ("none" as const),
    }),
    [isVisible]
  );

  return (
    <header className="header">
      <div className="header__background">
        <div className="header__gradient"></div>
        <div className="header__particles"></div>
      </div>

      <nav className="header__nav glass">
        <motion.div
          className="header__nav-brand"
          onClick={scrollToTop}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <MustacheIcon className="header__nav-icon" size={90} />
          <span className="header__brand-text">
            <span className="brand-mr">MR.</span>
            <span className="brand-developer">DEVELOPER</span>
          </span>
        </motion.div>

        <div className="header__nav-links">
          <motion.a href="#about" whileHover={{ y: -2 }} whileTap={{ y: 0 }}>
            Sobre
          </motion.a>
          <motion.a href="#projects" whileHover={{ y: -2 }} whileTap={{ y: 0 }}>
            Projetos
          </motion.a>
          <motion.a href="#contact" whileHover={{ y: -2 }} whileTap={{ y: 0 }}>
            Contato
          </motion.a>
        </div>
      </nav>

      <div className="header__content">
        <motion.div
          className="header__profile header__profile--fixed"
          style={profileStyles}
        >
          <motion.img
            src={profileImage}
            alt="Matheus Henrique Caiser"
            className="header__image"
            style={imageStylesMemo}
          />

          <motion.div className="header__profile-glow" style={glowStyles} />
        </motion.div>

        <div className="header__text">
          <div className="header__greeting">
            <span className="header__greeting-text">Olá, eu sou</span>
          </div>

          <h1 className="header__title">
            <GradientText>Matheus Henrique</GradientText>
            <br />
            <span className="header__title-surname">Caiser</span>
          </h1>

          <p className="header__subtitle">
            <span className="typing-text">Desenvolvedor Full-Stack</span>
          </p>

          <p className="header__description">
            Transformando ideias em soluções digitais inovadoras através de
            código elegante e design intuitivo
          </p>

          <div className="header__cta">
            <Button variant="primary" onClick={scrollToNext} icon={<Code />}>
              Conheça meu trabalho
            </Button>

            <SocialLinks
              links={[
                {
                  type: "github",
                  url: "https://github.com/JaegerCaiser",
                  label: "GitHub",
                },
                {
                  type: "linkedin",
                  url: "https://linkedin.com/in/matheus-caiser",
                  label: "LinkedIn",
                },
                {
                  type: "email",
                  url: "mailto:matheus@example.com",
                  label: "E-mail",
                },
              ]}
              variant="default"
              size="medium"
            />
          </div>
        </div>
      </div>

      <motion.div
        className="header__scroll-indicator"
        onClick={scrollToNext}
        style={scrollIndicatorStyles}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
        <span>Role para baixo</span>
        <ChevronDown />
      </motion.div>
    </header>
  );
}

export default Header;
