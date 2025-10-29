import React, { memo, useMemo } from "react";
import { Helmet } from "react-helmet-async";
import "./Experience.scss";
import { experienceData, ExperienceItem } from "./experienceData";

// Componente memoizado para o item individual
const ExperienceItemComponent = memo<{
  item: ExperienceItem;
  index: number;
}>(({ item, index }) => {
  // Memoizar classes CSS para evitar recálculos
  const itemClasses = useMemo(
    () => `experience__item ${index === 0 ? "experience__item--first" : ""}`,
    [index]
  );

  const dotClasses = useMemo(() => "experience__dot", []);
  const contentClasses = useMemo(() => "experience__content", []);
  const titleClasses = useMemo(() => "experience__title", []);
  const badgeClasses = useMemo(() => "experience__badge", []);
  const descriptionClasses = useMemo(() => "experience__description", []);

  return (
    <div className={itemClasses}>
      <div className={dotClasses} aria-hidden="true" />
      <article className={contentClasses}>
        <h3 className={titleClasses}>{item.title}</h3>
        {item.company && item.period && (
          <div className="experience__meta">
            <span className="experience__company">{item.company}</span>
            <span className="experience__period">{item.period}</span>
          </div>
        )}
        <span className={badgeClasses}>{item.badge}</span>
        <div className={descriptionClasses}>{item.description}</div>
        {item.technologies && item.technologies.length > 0 && (
          <div className="experience__technologies">
            {item.technologies.map((tech, techIndex) => (
              <span
                key={`${item.id}-tech-${techIndex}`}
                className="experience__technology"
              >
                {tech}
              </span>
            ))}
          </div>
        )}
      </article>
    </div>
  );
});

ExperienceItemComponent.displayName = "ExperienceItemComponent";

// Componente principal otimizado
const Experience: React.FC = memo(() => {
  // Memoizar dados para evitar re-renders desnecessários
  const memoizedExperienceData = useMemo(() => experienceData, []);

  return (
    <section
      id="experience"
      className="experience"
      aria-label="Professional Experience Timeline"
      itemScope
      itemType="https://schema.org/ItemList"
    >
      <Helmet>
        <title>Experiência • Matheus Caiser</title>
        <meta
          name="description"
          content="Linha do tempo da carreira de Matheus Caiser, detalhando sua experiência profissional, projetos e tecnologias utilizadas em cada etapa."
        />
      </Helmet>
      <h2 className="experience__heading section-heading">Experience</h2>
      <div
        className="experience__timeline"
        role="list"
        aria-label="Experience timeline"
      >
        {memoizedExperienceData.map((item, index) => (
          <ExperienceItemComponent key={item.id} item={item} index={index} />
        ))}
      </div>
    </section>
  );
});

Experience.displayName = "Experience";

export default Experience;
