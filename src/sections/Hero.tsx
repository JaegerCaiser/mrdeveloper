import { ArrowRight, Download } from "lucide-react";
import { Helmet } from "react-helmet-async";
import "./Hero.scss";

const Hero: React.FC = () => {
  return (
    <section id="hero" className="hero" aria-label="Introdução">
      <Helmet>
        <title>Matheus Caiser • Desenvolvedor Full Stack</title>
        <meta
          name="description"
          content="Portfólio de Matheus Caiser, desenvolvedor web Full Stack especialista em criar soluções modernas e performáticas com React, Node.js, TypeScript e outras tecnologias de ponta."
        />
      </Helmet>
      <div className="hero__content">
        <div className="hero__inner">
          <h1 className="hero__title">
            <span className="hero__line-1">
              Hello, I&apos;m <span>Matheus</span>.
            </span>
            <span className="hero__line-2">
              I&apos;m a full stack web developer.
            </span>
          </h1>
          <div className="hero__cta-group">
            <a href="#about" className="hero__cta hero__cta--primary">
              View my work
              <ArrowRight size={20} />
            </a>
            <a
              href="/Matheus Caiser CV.pdf"
              className="hero__cta hero__cta--secondary"
              download
            >
              Download CV
              <Download size={20} />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
