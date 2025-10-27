import React from "react";
import avatar from "../assets/profile.png";

const skills = [
  "HTML",
  "REACT",
  "EXPRESS.JS",
  "JAVASCRIPT",
  "CSS",
  "MONGODB",
  "GIT",
  "SASS",
  "NEXT.JS",
  "NODE.JS",
];

const About: React.FC = () => {
  return (
    <section id="about" className="section about" aria-label="About">
      <h2 className="section__title">About</h2>
      <div className="about__content">
        <div className="about__image-wrapper">
          <img src={avatar} alt="Profile" className="about__image" />
        </div>
        <div className="about__text">
          <p>
            Fully committed to the philosophy of life-long learning, I'm a full
            stack developer with a deep passion for JavaScript, React and all
            things web development. The unique combination of creativity, logic,
            technology and never running out of new things to discover, drives
            my excitement and passion for web development.
          </p>
          <p>
            When I'm not at my computer I like to spend my time reading, keeping
            fit and playing guitar.
          </p>
          <div className="about__skills">
            {skills.map((skill) => (
              <span key={skill} className="about__skill">
                {skill}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
