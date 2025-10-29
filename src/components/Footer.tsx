import { SiGithub, SiGmail } from "@icons-pack/react-simple-icons";
import { ChevronUp } from "lucide-react";
import "./Footer.scss";

const CURRENT_YEAR = new Date().getFullYear();

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
            <SiGithub size={24} />
          </div>
        </a>
        <a href="mailto:matheus.caiser@gmail.com">
          <div className="socials__email">
            <SiGmail size={24} />
          </div>
        </a>
      </div>
      <p className="copyright">MATHEUS CAISER ©{CURRENT_YEAR}</p>
    </footer>
  );
};

export default Footer;
