import React from "react";
import "./Experience.scss";

interface ExperienceItem {
  title: string;
  description: React.ReactNode;
  badge: string;
}

const Experience: React.FC = () => {
  return (
    <section id="experience" className="experience" aria-label="Experience">
      <h2 className="experience__heading section-heading">Experience</h2>
      <div className="experience__timeline">
        {experience.map((item, index) => (
          <div key={`experience-${index}`} className="experience__item">
            <div className="experience__connector">
              <div className="experience__dot"></div>
            </div>
            <div className="experience__content">
              <h3 className="experience__title">{item.title}</h3>
              <span className="experience__badge">{item.badge}</span>
              <div className="experience__description">{item.description}</div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

const experience: ExperienceItem[] = [
  {
    title: "Full Stack Developer",
    description: (
      <ul>
        <li>
          Developed modern web applications using React, TypeScript, and Node.js
        </li>
        <li>
          Implemented responsive designs with SCSS and component-based
          architecture
        </li>
        <li>
          Collaborated with cross-functional teams to deliver high-quality
          software solutions
        </li>
        <li>Optimized application performance and user experience</li>
      </ul>
    ),
    badge: "Current Position",
  },
  {
    title: "Frontend Developer",
    description: (
      <ul>
        <li>
          Built interactive user interfaces with React and modern JavaScript
        </li>
        <li>Integrated RESTful APIs and managed application state</li>
        <li>
          Implemented accessibility standards and responsive design principles
        </li>
        <li>Participated in code reviews and mentored junior developers</li>
      </ul>
    ),
    badge: "Previous Role",
  },
  {
    title: "Junior Developer",
    description: (
      <ul>
        <li>Developed web applications using HTML, CSS, and JavaScript</li>
        <li>
          Learned modern development practices and version control with Git
        </li>
        <li>
          Contributed to open-source projects and personal portfolio development
        </li>
        <li>Gained experience with various frameworks and libraries</li>
      </ul>
    ),
    badge: "Entry Level",
  },
];

export default Experience;
