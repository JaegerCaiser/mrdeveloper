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
    id: "frontend-dev-dbc-unicred",
    title: "Front-end Developer",
    company: "DBC Company (Unicred)",
    period: "January 2023 - Present",
    description: (
      <ul>
        <li>
          Working as front-end developer building products for Unicred&apos;s
          internet banking cooperative
        </li>
        <li>
          Serving as the team&apos;s technical reference, helping other
          developers improve their skills
        </li>
        <li>
          Building products using React with Single Page Application (SPA)
          architecture
        </li>
        <li>Each menu item is an individual project within the application</li>
      </ul>
    ),
    badge: "Current Position",
    technologies: [
      "React",
      "TypeScript",
      "JavaScript",
      "SPA",
      "Internet Banking",
    ],
  },
  {
    id: "software-engineer-tc-tradersclub",
    title: "Software Engineer",
    company: "TC Tradersclub",
    period: "July 2021 - November 2022",
    description: (
      <ul>
        <li>
          Contributing to all product phases from design to deployment and
          monitoring
        </li>
        <li>
          Building scalable web applications with React and mobile apps with
          React Native
        </li>
        <li>Developing and maintaining backend services using Golang</li>
        <li>Working in a full-stack development environment</li>
      </ul>
    ),
    badge: "Previous Role",
    technologies: [
      "React",
      "React Native",
      "Golang",
      "Web Development",
      "Mobile Development",
    ],
  },
  {
    id: "fullstack-developer-qualirede",
    title: "Full Stack Developer",
    company: "Qualirede",
    period: "March 2020 - July 2021",
    description: (
      <ul>
        <li>
          Building healthcare application for the government of Bahia-Brazil to
          control beneficiary appointments
        </li>
        <li>
          Developing reliable and scalable web applications with Angular,
          Golang, and TypeScript
        </li>
        <li>
          Working with Docker, Node.js, Oracle, MongoDB, and Git for version
          control
        </li>
        <li>Contributing to government healthcare technology solutions</li>
      </ul>
    ),
    badge: "Healthcare Tech",
    technologies: [
      "Angular",
      "Golang",
      "TypeScript",
      "Docker",
      "Node.js",
      "Oracle",
      "MongoDB",
    ],
  },
  {
    id: "software-developer-stairs",
    title: "Software Developer",
    company: "Stairs Creative Studio",
    period: "May 2019 - March 2020",
    description: (
      <ul>
        <li>
          Designing and building API that serves a mobile app focused on health
          systems
        </li>
        <li>
          Working as backend developer for both providers and customers
          platforms
        </li>
        <li>
          Building with Golang, AWS services (API Gateway, Lambda), MongoDB, and
          Git
        </li>
        <li>Developing serverless architecture solutions</li>
      </ul>
    ),
    badge: "Backend Focus",
    technologies: ["Golang", "AWS", "API Gateway", "Lambda", "MongoDB", "Git"],
  },
  {
    id: "fullstack-developer-4effect",
    title: "Full Stack Developer",
    company: "4Effect Technology",
    period: "October 2017 - May 2019",
    description: (
      <ul>
        <li>
          Working on diverse projects for health providers as full stack
          developer
        </li>
        <li>
          Building microservices applications using Java with Spring framework
        </li>
        <li>
          Developing frontend components with Angular and working with SQL
          databases
        </li>
        <li>Using Git for version control and collaborative development</li>
      </ul>
    ),
    badge: "Microservices",
    technologies: [
      "Java",
      "Spring Framework",
      "Angular",
      "SQL",
      "Git",
      "Microservices",
    ],
  },
];
