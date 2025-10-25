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
  const [currentScroll, setCurrentScroll] = useState<number>(0);
  const ticking = useRef<boolean>(false);

  // Otimização: usa requestAnimationFrame para throttle
  const handleScroll = useCallback(() => {
    if (!ticking.current) {
      window.requestAnimationFrame(() => {
        const currentScrollY = window.scrollY;
        setCurrentScroll(currentScrollY);
        setIsVisible(currentScrollY < 100);

        // Calcula o progresso do scroll - primeira animação (0-400px)
        const progress = Math.min(currentScrollY / 400, 1);
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
   * Fase 2: Após a seção "Sobre", a imagem continua subindo (simulando scroll natural)
   *
   * ✅ Testado com testes unitários (Header.test.tsx)
   * ⚡ Otimizado com useMemo para evitar recálculos desnecessários
   */
  const imageStyles = useMemo(() => {
    // Fase 1: Animação inicial (0-400px)
    const imageScale = 1 + scrollProgress * 0.8; // 1x -> 1.8x
    const borderRadius = 50 - scrollProgress * 30; // 50% -> 20%

    // Calcula a posição da imagem
    // Vai de 50% (centro) até 8% (com margem de ~1cm da borda)
    const imageLeft = 50 - scrollProgress * 42; // 50% -> 8%

    // Posição vertical: começa em 22%, vai até 15% (na animação inicial)
    let imageTop = 22 - scrollProgress * 7; // 22% -> 15%

    // Fase 2: Após a animação inicial (scrollY > 900px), continua subindo
    // Isso faz a imagem "rolar" junto com a página naturalmente
    if (currentScroll > 900) {
      const extraScroll = currentScroll - 900;
      // Sobe 1px a cada 10px de scroll (velocidade natural)
      const extraMovement = (extraScroll / window.innerHeight) * 100;
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
  }, [scrollProgress, currentScroll]); // Using imported motion variants from common components

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
            animate={
              isImageFixed
                ? {}
                : {
                    y: [-3, 3, -3],
                  }
            }
            transition={
              isImageFixed
                ? {}
                : {
                    duration: 5,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }
            }
          />

          <motion.div
            className="header__profile-glow"
            animate={{
              opacity: [0.4, 0.7, 0.4],
              scale: [1, 1.08, 1],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </motion.div>

        <motion.div className="header__text" variants={itemVariants}>
          <motion.div
            className="header__greeting"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5, ease: "easeOut" }}
          >
            <span className="header__greeting-text">Olá, eu sou</span>
          </motion.div>

          <motion.h1
            className="header__title"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5, ease: "easeOut" }}
          >
            <GradientText>Matheus Henrique</GradientText>
            <br />
            <span className="header__title-surname">Caiser</span>
          </motion.h1>

          <motion.p
            className="header__subtitle"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5, ease: "easeOut" }}
          >
            <span className="typing-text">Desenvolvedor Full-Stack</span>
          </motion.p>

          <motion.p
            className="header__description"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.5, ease: "easeOut" }}
          >
            Transformando ideias em soluções digitais inovadoras através de
            código elegante e design intuitivo
          </motion.p>

          <motion.div
            className="header__cta"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.5, ease: "easeOut" }}
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
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
          repeatType: "loop",
        }}
        style={{
          opacity: isVisible ? 1 : 0,
          pointerEvents: isVisible ? "auto" : "none",
        }}
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
