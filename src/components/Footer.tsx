import { Github, Mail, ChevronUp } from "lucide-react";
import "./Footer.scss";

const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <a href="#hero">
        <div className="return-home">
          <ChevronUp size={24} />
        </div>
      </a>
      <div className="socials">
        <a
          href="https://github.com/JaegerCaiser"
          target="_blank"
          rel="noreferrer"
        >
          <div className="socials__github">
            <Github size={24} />
          </div>
        </a>
        <a href="mailto:matheus.caiser@gmail.com">
          <div className="socials__email">
            <Mail size={24} />
          </div>
        </a>
      </div>
      <p className="copyright">MATHEUS CAISER ©{new Date().getFullYear()}</p>
    </footer>
  );
};

export default Footer;
