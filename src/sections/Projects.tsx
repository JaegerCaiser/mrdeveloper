import React from "react";
import "./Projects.scss";

type ProjectItem = {
  title: string;
  description: string;
  liveUrl: string;
  githubUrl: string;
  image: string;
  technologies: string[];
};

const projects: ProjectItem[] = [
  {
    title: "LifeInvader Social Media App",
    description:
      "Full stack social media application built with React, Node.js, Express.js, MongoDB, Socket.io and AWS S3.",
    liveUrl: "https://lifeinvadersocial.herokuapp.com/",
    githubUrl: "https://github.com/bscottnz/life-invader-frontend",
    image:
      "https://benscott.dev/imgs/lifeinvader.c25acb0a33904bc4e90c656d87c651cc.png",
    technologies: [
      "React",
      "Node.js",
      "Express.js",
      "MongoDB",
      "Socket.io",
      "AWS S3",
    ],
  },
  {
    title: "Chakra Chat Messaging App",
    description:
      "Instant messaging application built with Next.JS, Firebase and Chakra UI.",
    liveUrl: "https://nextjs-chakra-chatapp-qnhb6dq42-bscottnz.vercel.app/",
    githubUrl: "https://github.com/bscottnz/nextjs-chakra-chatapp",
    image:
      "https://benscott.dev/imgs/chatapp.d9f2104f9e2c15a0bcbba042541ca178.png",
    technologies: ["Next.JS", "Firebase", "Chakra UI"],
  },
  {
    title: "Retro-Sketch Pixel Sketch App",
    description: "Create pixel art with a variety of drawing tools.",
    liveUrl: "https://bscottnz.github.io/esketch/",
    githubUrl: "https://github.com/bscottnz/esketch",
    image:
      "https://benscott.dev/imgs/retro.d5a0a58727affa92cb80fdfa78a07a26.png",
    technologies: ["JavaScript", "HTML5 Canvas", "CSS"],
  },
  {
    title: "// TO-DO Productivity App",
    description: "Keep track of tasks with custom project folders and notes.",
    liveUrl: "https://bscottnz.github.io/todo/",
    githubUrl: "https://github.com/bscottnz/todo",
    image:
      "https://benscott.dev/imgs/todo.af05ff37bdc5302d22530d5631e136cd.png",
    technologies: ["JavaScript", "HTML", "CSS"],
  },
];

const Projects: React.FC = () => {
  return (
    <section id="projects" className="projects" aria-label="Projects">
      <h2 className="projects__heading section-heading">Projects</h2>
      <div className="projects__container">
        {projects.map((project, index) => (
          <div
            key={project.title}
            className={`project ${
              index % 2 === 0 ? "project-left" : "project-right"
            }`}
          >
            {index % 2 === 0 ? (
              <>
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <div className="project__image-container">
                    <div className="project__image">
                      <img src={project.image} alt={project.title} />
                    </div>
                  </div>
                </a>
                <div className="project__info">
                  <h3 className="project__title">
                    {project.title.split(" ").map((word, index, arr) => (
                      <React.Fragment key={index}>
                        {word}
                        {index === 0 && arr.length > 2 && <br />}
                        {index === arr.length - 2 && arr.length > 2 && " "}
                      </React.Fragment>
                    ))}
                  </h3>
                  <p className="project__description">{project.description}</p>
                  <div className="project__links">
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <div className="project__live">Live app</div>
                    </a>
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <div className="project__live">Learn more</div>
                    </a>
                  </div>
                </div>
              </>
            ) : (
              <>
                <div className="project__info">
                  <h3 className="project__title">
                    {project.title.split(" ").map((word, index, arr) => (
                      <React.Fragment key={index}>
                        {word}
                        {index === 0 && arr.length > 2 && <br />}
                        {index === arr.length - 2 && arr.length > 2 && " "}
                      </React.Fragment>
                    ))}
                  </h3>
                  <p className="project__description">{project.description}</p>
                  <div className="project__links">
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <div className="project__live">Live app</div>
                    </a>
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <div className="project__live">Learn more</div>
                    </a>
                  </div>
                </div>
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <div className="project__image-container">
                    <div className="project__image">
                      <img src={project.image} alt={project.title} />
                    </div>
                  </div>
                </a>
              </>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};

export default Projects;
