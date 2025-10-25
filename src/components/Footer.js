
import { motion } from 'framer-motion';
import { Heart, Code, Coffee, ArrowUp } from 'lucide-react';
import '../styles/Footer.css';

function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const currentYear = new Date().getFullYear();

  return (
    <motion.footer 
      className="footer"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
    >
      <div className="footer__container">
        <div className="footer__content">
          <motion.div 
            className="footer__brand"
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <div className="footer__logo">
              <Code className="footer__logo-icon" />
              <span>MR.DEVELOPER</span>
            </div>
            <p className="footer__description">
              Desenvolvendo o futuro, uma linha de código por vez.
            </p>
          </motion.div>

          <motion.div 
            className="footer__links"
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <div className="footer__column">
              <h4>Navegação</h4>
              <ul>
                <li><a href="#about">Sobre</a></li>
                <li><a href="#projects">Projetos</a></li>
                <li><a href="#contact">Contato</a></li>
              </ul>
            </div>
            <div className="footer__column">
              <h4>Projetos</h4>
              <ul>
                <li><a href="#projects">E-Commerce Platform</a></li>
                <li><a href="#projects">Task Management</a></li>
                <li><a href="#projects">API Gateway</a></li>
              </ul>
            </div>
            <div className="footer__column">
              <h4>Conecte-se</h4>
              <ul>
                <li><a href="https://github.com/JaegerCaiser">GitHub</a></li>
                <li><a href="https://linkedin.com/in/matheus-caiser">LinkedIn</a></li>
                <li><a href="mailto:matheus@example.com">Email</a></li>
              </ul>
            </div>
          </motion.div>
        </div>

        <motion.div 
          className="footer__bottom"
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <div className="footer__copyright">
            <p>
              &copy; {currentYear} Matheus Henrique Caiser. Feito com{' '}
              <motion.span
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 1, repeat: Infinity }}
                className="heart-icon"
              >
                <Heart />
              </motion.span>{' '}
              e muito{' '}
              <motion.span
                animate={{ rotate: [0, 15, -15, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="coffee-icon"
              >
                <Coffee />
              </motion.span>
            </p>
          </div>

          <motion.button
            className="scroll-top"
            onClick={scrollToTop}
            whileHover={{ scale: 1.1, y: -2 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, scale: 0 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            viewport={{ once: true }}
          >
            <ArrowUp />
          </motion.button>
        </motion.div>
      </div>

      <div className="footer__background">
        <div className="footer__gradient"></div>
        <div className="footer__particles"></div>
      </div>
    </motion.footer>
  );
}

export default Footer;