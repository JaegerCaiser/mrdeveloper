import React from "react";

export interface ExperienceItem {
  id: string;
  title: string;
  description: React.ReactNode;
  badge: string;
  period?: string;
  company?: string;
  technologies?: string[];
}

export const experienceData: ExperienceItem[] = [
  {
    id: "fullstack-developer",
    title: "Full Stack Developer",
    company: "Tech Company",
    period: "2023 - Present",
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
    technologies: ["React", "TypeScript", "Node.js", "SCSS", "PostgreSQL"],
  },
  {
    id: "frontend-developer",
    title: "Frontend Developer",
    company: "Digital Agency",
    period: "2021 - 2023",
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
    technologies: ["React", "JavaScript", "Redux", "CSS3", "REST APIs"],
  },
  {
    id: "junior-developer",
    title: "Junior Developer",
    company: "Startup",
    period: "2020 - 2021",
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
    technologies: ["HTML5", "CSS3", "JavaScript", "Git", "jQuery"],
  },
];
