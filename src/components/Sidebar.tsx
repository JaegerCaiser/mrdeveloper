import React from "react";
import { Github, Linkedin, Mail } from "lucide-react";

const Sidebar: React.FC = () => {
  return (
    <aside className="sidebar" aria-label="Navegação principal">
      <div className="sidebar__inner">
        <header className="sidebar__header">
          <h1 className="sidebar__title">
            <a href="#intro">Seu Nome</a>
          </h1>
          <p className="sidebar__subtitle">Desenvolvedor de Software</p>
          <p className="sidebar__location">Baseado em Brasil</p>
        </header>

        <nav className="sidebar__nav" aria-label="Seções">
          <ul>
            <li>
              <a href="#intro">Início</a>
            </li>
            <li>
              <a href="#about">Sobre</a>
            </li>
            <li>
              <a href="#experience">Experiência</a>
            </li>
            <li>
              <a href="#writing">Escritos</a>
            </li>
            <li>
              <a href="#contact">Contato</a>
            </li>
          </ul>
        </nav>

        <footer className="sidebar__footer">
          <ul className="sidebar__social" aria-label="Redes sociais">
            <li>
              <a
                href="https://github.com/"
                target="_blank"
                rel="noreferrer"
                aria-label="GitHub"
              >
                <Github size={18} />
              </a>
            </li>
            <li>
              <a
                href="https://www.linkedin.com/"
                target="_blank"
                rel="noreferrer"
                aria-label="LinkedIn"
              >
                <Linkedin size={18} />
              </a>
            </li>
            <li>
              <a href="mailto:email@exemplo.com" aria-label="E-mail">
                <Mail size={18} />
              </a>
            </li>
          </ul>
        </footer>
      </div>
    </aside>
  );
};

export default Sidebar;
