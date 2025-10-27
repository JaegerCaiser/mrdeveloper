import React from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

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
          <h1 className="hero__title">
            Hello, I&apos;m <span className="hero__name">Ben</span>.
            <br />
            I&apos;m a full stack web developer.
          </h1>
          <a href="#about" className="hero__cta">
            View my work
            <ArrowRight size={20} />
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
