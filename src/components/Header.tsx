import { useState, useEffect, useMemo, useCallback, useRef } from "react";
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
import "../styles/Header.scss";
import profileImage from "../assets/profile.png";

function Header() {
  const [isVisible, setIsVisible] = useState<boolean>(true);
  const [scrollProgress, setScrollProgress] = useState<number>(0);
  const [isImageFixed, setIsImageFixed] = useState<boolean>(false);
  const ticking = useRef<boolean>(false);

  // Otimização: usa requestAnimationFrame para throttle
  const handleScroll = useCallback(() => {
    if (!ticking.current) {
      window.requestAnimationFrame(() => {
        const scrollY = window.scrollY;
        setIsVisible(scrollY < 100);

        // Calcula o progresso do scroll - agora continua além de 400px
        // Primeira fase: 0-400px (animação de scale e movimento)
        // Segunda fase: 400px+ (continua subindo com o scroll)
        const progress = Math.min(scrollY / 400, 1);
        setScrollProgress(progress);

        // A imagem sempre fica fixa após iniciar a transição
        setIsImageFixed(progress >= 0.2);

        ticking.current = false;
      });
      ticking.current = true;
    }
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  const scrollToNext = () => {
    const aboutSection = document.getElementById("about");
    aboutSection?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  /**
   * Cálculos de animação da imagem de perfil baseados no scroll
   *
   * Fase 1 (0-400px): Animação de scale, movimento e border-radius
   * Fase 2 (400px+): A imagem continua subindo com o scroll (position: absolute)
   *
   * ✅ Testado com testes unitários (Header.test.tsx)
   * ⚡ Otimizado com useMemo para evitar recálculos desnecessários
   */
  const imageStyles = useMemo(() => {
    const scrollY = window.scrollY;

    // Fase 1: Animação inicial (0-400px)
    const imageScale = 1 + scrollProgress * 0.8; // 1x -> 1.8x
    const borderRadius = 50 - scrollProgress * 30; // 50% -> 20%

    // Calcula a posição da imagem
    const imageLeft = 50 - scrollProgress * 45; // 50% -> 5%

    // Fase 2: Após 400px, a imagem continua subindo
    // Começa em 22% e vai subindo gradualmente
    let imageTop = 22 - scrollProgress * 7; // 22% -> 15%

    // Quando scrollY > 400px, continua subindo
    if (scrollY > 400) {
      // A cada 100px de scroll, sobe mais 5%
      const extraScroll = scrollY - 400;
      const extraMovement = (extraScroll / 100) * 5;
      imageTop = 15 - extraMovement;
    }

    // Transform para centralizar e depois mover
    const translateX = -50 + scrollProgress * 50; // -50% -> 0%
    const translateY = -50 + scrollProgress * 50; // -50% -> 0%

    return {
      imageScale,
      borderRadius,
      imageLeft,
      imageTop,
      translateX,
      translateY,
    };
  }, [scrollProgress]);

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
          variants={itemVariants}
          whileHover={{ scale: 1.02 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
          style={{
            scale: imageStyles.imageScale,
            left: `${imageStyles.imageLeft}%`,
            top: `${imageStyles.imageTop}%`,
            x: `${imageStyles.translateX}%`,
            y: `${imageStyles.translateY}%`,
          }}
        >
          <motion.img
            src={profileImage}
            alt="Matheus Henrique Caiser"
            className="header__image"
            style={{
              borderRadius: `${imageStyles.borderRadius}%`,
            }}
            animate={{
              y: isImageFixed ? 0 : [-3, 3, -3],
              transition: {
                duration: 5,
                repeat: isImageFixed ? 0 : Infinity,
                ease: "easeInOut",
              },
            }}
          />

          <motion.div
            className="header__profile-glow"
            animate={{
              opacity: [0.4, 0.7, 0.4],
              scale: [1, 1.08, 1],
              transition: {
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
              },
            }}
          />
        </motion.div>

        <motion.div className="header__text" variants={itemVariants}>
          <motion.div
            className="header__greeting"
            variants={itemVariants}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <span className="header__greeting-text">Olá, eu sou</span>
          </motion.div>

          <motion.h1
            className="header__title"
            variants={itemVariants}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <GradientText>Matheus Henrique</GradientText>
            <br />
            <span className="header__title-surname">Caiser</span>
          </motion.h1>

          <motion.p
            className="header__subtitle"
            variants={itemVariants}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <span className="typing-text">Desenvolvedor Full-Stack</span>
          </motion.p>

          <motion.p
            className="header__description"
            variants={itemVariants}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            Transformando ideias em soluções digitais inovadoras através de
            código elegante e design intuitivo
          </motion.p>

          <motion.div
            className="header__cta"
            variants={itemVariants}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
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
        onClick={scrollToNext}
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        style={{ opacity: isVisible ? 1 : 0 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
        <span>Role para baixo</span>
        <ChevronDown />
      </motion.div>
    </motion.header>
  );
}

export default Header;
