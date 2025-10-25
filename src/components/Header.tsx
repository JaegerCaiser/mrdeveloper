import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Code, ChevronDown } from "lucide-react";
import {
  containerVariants,
  itemVariants,
  GradientText,
  Button,
  SocialLinks,
} from "./common";
import MustacheIcon from "./common/MustacheIcon";
import "../styles/Header.css";
import profileImage from "../assets/profile.png";

function Header() {
  const [isVisible, setIsVisible] = useState<boolean>(true);

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY < 100);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToNext = () => {
    const aboutSection = document.getElementById("about");
    aboutSection?.scrollIntoView({ behavior: "smooth" });
  };

  // Using imported motion variants from common components

  return (
    <motion.header
      className="header"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="header__background">
        <div className="header__gradient"></div>
        <div className="header__particles"></div>
      </div>

      <nav className="header__nav glass">
        <motion.div
          className="header__nav-brand"
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
        <motion.div className="header__profile" variants={itemVariants}>
          <motion.img
            src={profileImage}
            alt="Matheus Henrique Caiser"
            className="header__image"
            animate={{
              y: [-5, 5, -5],
              transition: {
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
              },
            }}
            whileHover={{
              scale: 1.05,
              transition: { duration: 0.3 },
            }}
          />

          <motion.div
            className="header__profile-glow"
            animate={{
              opacity: [0.3, 0.6, 0.3],
              scale: [1, 1.05, 1],
              transition: { duration: 3, repeat: Infinity, ease: "easeInOut" },
            }}
          />
        </motion.div>

        <motion.div className="header__text" variants={itemVariants}>
          <motion.div className="header__greeting" variants={itemVariants}>
            <span className="header__greeting-text">Olá, eu sou</span>
          </motion.div>

          <motion.h1 className="header__title" variants={itemVariants}>
            <GradientText>Matheus Henrique</GradientText>
            <br />
            <span className="header__title-surname">Caiser</span>
          </motion.h1>

          <motion.p className="header__subtitle" variants={itemVariants}>
            <span className="typing-text">Desenvolvedor Full-Stack</span>
          </motion.p>

          <motion.p className="header__description" variants={itemVariants}>
            Criando experiências digitais incríveis com código limpo e design
            elegante
          </motion.p>

          <motion.div className="header__cta" variants={itemVariants}>
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
          </motion.div>
        </motion.div>
      </div>

      <motion.div
        className="header__scroll-indicator"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        style={{ opacity: isVisible ? 1 : 0 }}
      >
        <span>Role para baixo</span>
        <ChevronDown />
      </motion.div>
    </motion.header>
  );
}

export default Header;
