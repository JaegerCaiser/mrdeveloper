import React from "react";

type ExperienceItem = {
  company: string;
  role: string;
  period: string;
  description: string;
};

const items: ExperienceItem[] = [
  {
    company: "Empresa Exemplo A",
    role: "Desenvolvedor Front-end",
    period: "2023 — Presente",
    description:
      "Desenvolvimento de interfaces em React/TypeScript, colaboração com design e back-end, foco em acessibilidade e performance.",
  },
  {
    company: "Empresa Exemplo B",
    role: "Engenheiro de Software",
    period: "2021 — 2023",
    description:
      "Construção de aplicações web, criação de componentes reutilizáveis e integração com APIs rest e GraphQL.",
  },
];

const Experience: React.FC = () => {
  return (
    <section
      id="experience"
      className="section experience"
      aria-label="Experiência"
    >
      <h3 className="section__title">Experiência</h3>
      <ol className="experience__timeline">
        {items.map((item) => (
          <li key={item.company} className="experience__item">
            <div className="experience__header">
              <h4 className="experience__role">{item.role}</h4>
              <span className="experience__company">{item.company}</span>
              <time className="experience__period">{item.period}</time>
            </div>
            <p className="experience__desc">{item.description}</p>
          </li>
        ))}
      </ol>
    </section>
  );
};

export default Experience;
