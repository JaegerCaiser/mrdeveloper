import React from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import "./Hero.scss";

const Hero: React.FC = () => {
  return (
    <section id="hero" className="hero" aria-label="Introdução">
      <div className="hero__content">
        <motion.div
          className="hero__inner"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <div className="hero__title">
            <div className="hero__line-1">
              Hello, I&apos;m <span>Matheus</span>.
            </div>
            <div className="hero__line-2">
              I&apos;m a full stack web developer.
            </div>
          </div>
          <a href="#projects" className="hero__cta">
            View my work
            <ArrowRight size={20} />
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
