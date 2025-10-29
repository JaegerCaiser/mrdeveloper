import { ArrowRight, Download } from "lucide-react";
import AnimatedBackground from "../components/AnimatedBackground";
import "./Hero.scss";

const Hero: React.FC = () => {
  return (
    <section id="hero" className="hero" aria-label="Introdução">
      <AnimatedBackground />
      <div className="hero__content">
        <div className="hero__inner">
          <div className="hero__title">
            <div className="hero__line-1">
              Hello, I&apos;m <span>Matheus</span>.
            </div>
            <div className="hero__line-2">
              I&apos;m a full stack web developer.
            </div>
          </div>
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
