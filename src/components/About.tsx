import { motion } from "framer-motion";
import { Code, Zap, Heart, Target, Award, Coffee } from "lucide-react";
import { GradientText } from "./common";
import "../styles/About.css";

function About() {
  const containerVariants: any = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants: any = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: "easeOut",
      },
    },
  };

  const skills = [
    { name: "JavaScript/TypeScript", level: 95, color: "#f7df1e" },
    { name: "React & Next.js", level: 92, color: "#61dafb" },
    { name: "Node.js & Express", level: 88, color: "#68a063" },
    { name: "Python & Django", level: 85, color: "#3776ab" },
    { name: "Database & SQL", level: 80, color: "#336791" },
    { name: "DevOps & AWS", level: 75, color: "#ff9900" },
  ];

  const qualities = [
    {
      icon: Code,
      title: "Código Limpo",
      description:
        "Escrevo código legível, maintível e seguindo as melhores práticas da indústria.",
    },
    {
      icon: Zap,
      title: "Performance",
      description:
        "Foco em otimização e performance para entregar experiências rápidas e fluidas.",
    },
    {
      icon: Heart,
      title: "Paixão",
      description:
        "Apaixonado por tecnologia e sempre em busca de aprender algo novo.",
    },
    {
      icon: Target,
      title: "Resultados",
      description:
        "Focado em entregar soluções que agregam valor real ao negócio.",
    },
  ];

  return (
    <motion.section
      id="about"
      className="about"
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
    >
      <div className="about__container">
        <motion.div className="about__header" variants={itemVariants}>
          <span className="section-label">Conheça-me melhor</span>
          <h2 className="section-title">
            Sobre <GradientText>Mim</GradientText>
          </h2>
          <p className="section-subtitle">
            Desenvolvedor apaixonado por criar experiências digitais
            extraordinárias
          </p>
        </motion.div>

        <div className="about__content">
          <motion.div className="about__story" variants={itemVariants}>
            <div className="about__story-content glass">
              <h3>Minha História</h3>
              <p>
                Sou <strong>Matheus Henrique Caiser</strong>, um desenvolvedor
                Full-Stack apaixonado por tecnologia e inovação. Com anos de
                experiência em desenvolvimento web, tenho me especializado em
                criar soluções elegantes e funcionais que fazem a diferença na
                vida das pessoas.
              </p>
              <p>
                Minha jornada começou com curiosidade sobre como as coisas
                funcionam por trás das telas. Hoje, transformo ideias em
                realidade digital, sempre buscando a excelência técnica e a
                melhor experiência do usuário.
              </p>

              <div className="about__stats">
                <div className="stat">
                  <div className="stat__number">
                    <Award className="stat__icon" />
                    <span>50+</span>
                  </div>
                  <span className="stat__label">Projetos Concluídos</span>
                </div>
                <div className="stat">
                  <div className="stat__number">
                    <Coffee className="stat__icon" />
                    <span>1000+</span>
                  </div>
                  <span className="stat__label">Xícaras de Café</span>
                </div>
                <div className="stat">
                  <div className="stat__number">
                    <Code className="stat__icon" />
                    <span>3+</span>
                  </div>
                  <span className="stat__label">Anos de Experiência</span>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div className="about__skills" variants={itemVariants}>
            <h3>Habilidades Técnicas</h3>
            <div className="skills-grid">
              {skills.map((skill, index) => (
                <motion.div
                  key={skill.name}
                  className="skill-item"
                  initial={{ width: 0 }}
                  whileInView={{ width: "100%" }}
                  transition={{ duration: 1, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <div className="skill-info">
                    <span className="skill-name">{skill.name}</span>
                    <span className="skill-percentage">{skill.level}%</span>
                  </div>
                  <div className="skill-bar">
                    <motion.div
                      className="skill-progress"
                      style={{ backgroundColor: skill.color }}
                      initial={{ width: 0 }}
                      whileInView={{ width: `${skill.level}%` }}
                      transition={{ duration: 1.5, delay: index * 0.1 }}
                      viewport={{ once: true }}
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        <motion.div className="about__qualities" variants={itemVariants}>
          <h3>O que me define</h3>
          <div className="qualities-grid">
            {qualities.map((quality, index) => (
              <motion.div
                key={quality.title}
                className="quality-card glass"
                whileHover={{
                  y: -10,
                  scale: 1.05,
                  transition: { duration: 0.3 },
                }}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{
                  opacity: 1,
                  y: 0,
                  transition: { duration: 0.6, delay: index * 0.1 },
                }}
                viewport={{ once: true }}
              >
                <div className="quality-icon">
                  <quality.icon />
                </div>
                <h4>{quality.title}</h4>
                <p>{quality.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
}

export default About;
