import React from "react";
import "./About.scss";

const About: React.FC = () => {
  return (
    <section id="about" className="about" aria-label="About">
      <h2 className="about__heading section-heading">About</h2>
      <div className="about__content">
        <div className="profile profile__fade-in">
          <div className="profile__picture">
            <svg
              version="1.1"
              id="Capa_1"
              xmlns="http://www.w3.org/2000/svg"
              xmlnsXlink="http://www.w3.org/1999/xlink"
              x="0px"
              y="0px"
              viewBox="0 0 482.9 482.9"
              xmlSpace="preserve"
              height="100%"
              stroke="#1a1a1a"
              strokeWidth="16"
            >
              <g>
                <path
                  fill="url(#gradient-1)"
                  d="M239.7,260.2c0.5,0,1,0,1.6,0c0.2,0,0.4,0,0.6,0c0.3,0,0.7,0,1,0c29.3-0.5,53-10.8,70.5-30.5c38.5-43.4,32.1-117.8,31.4-124.9c-2.5-53.3-27.7-78.8-48.5-90.7C280.8,5.2,262.7,0.4,242.5,0h-0.7c-0.1,0-0.3,0-0.4,0h-0.6c-11.1,0-32.9,1.8-53.8,13.7c-21,11.9-46.6,37.4-49.1,91.1c-0.7,7.1-7.1,81.5,31.4,124.9C186.7,249.4,210.4,259.7,239.7,260.2zM164.6,107.3c0-0.3,0.1-0.6,0.1-0.8c3.3-71.7,54.2-79.4,76-79.4h0.4c0.2,0,0.5,0,0.8,0c27,0.6,72.9,11.6,76,79.4c0,0.3,0,0.6,0.1,0.8c0.1,0.7,7.1,68.7-24.7,104.5c-12.6,14.2-29.4,21.2-51.5,21.4c-0.2,0-0.3,0-0.5,0l0,0c-0.2,0-0.3,0-0.5,0c-22-0.2-38.9-7.2-51.4-21.4C157.7,176.2,164.5,107.9,164.6,107.3z"
                />
                <path
                  fill="url(#gradient-2)"
                  d="M446.8,383.6c0-0.1,0-0.2,0-0.3c0-0.8-0.1-1.6-0.1-2.5c-0.6-19.8-1.9-66.1-45.3-80.9c-0.3-0.1-0.7-0.2-1-0.3c-45.1-11.5-82.6-37.5-83-37.8c-6.1-4.3-14.5-2.8-18.8,3.3c-4.3,6.1-2.8,14.5,3.3,18.8c1.7,1.2,41.5,28.9,91.3,41.7c23.3,8.3,25.9,33.2,26.6,56c0,0.9,0,1.7,0.1,2.5c0.1,9-0.5,22.9-2.1,30.9c-16.2,9.2-79.7,41-176.3,41c-96.2,0-160.1-31.9-176.4-41.1c-1.6-8-2.3-21.9-2.1-30.9c0-0.8,0.1-1.6,0.1-2.5c0.7-22.8,3.3-47.7,26.6-56c49.8-12.8,89.6-40.6,91.3-41.7c6.1-4.3,7.6-12.7,3.3-18.8c-4.3-6.1-12.7-7.6-18.8-3.3c-0.4,0.3-37.7,26.3-83,37.8c-0.4,0.1-0.7,0.2-1,0.3c-43.4,14.9-44.7,61.2-45.3,80.9c0,0.9,0,1.7-0.1,2.5c0,0.1,0,0.2,0,0.3c-0.1,5.2-0.2,31.9,5.1,45.3c1,2.6,2.8,4.8,5.2,6.3c3,2,74.9,47.8,195.2,47.8s192.2-45.9,195.2-47.8c2.3-1.5,4.2-3.7,5.2-6.3C447,415.5,446.9,388.8,446.8,383.6z"
                />
              </g>
              <defs>
                <linearGradient id="gradient-1" x1="0" y1="0" x2="80%" y2="80%">
                  <stop stopColor="#51a2e9" offset="0%" />
                  <stop stopColor="#a860e6" offset="100%" />
                </linearGradient>
                <linearGradient
                  id="gradient-2"
                  x1="20%"
                  y1="20%"
                  x2="100%"
                  y2="100%"
                >
                  <stop stopColor="#a860e6" offset="0%" />
                  <stop stopColor="#ff4d5a" offset="100%" />
                </linearGradient>
              </defs>
            </svg>
          </div>
          <p className="profile__blurb">
            Fully committed to the philosophy of life-long learning, I&apos;m a
            full stack developer with a deep passion for JavaScript, React and
            all things web development. The unique combination of creativity,
            logic, technology and never running out of new things to discover,
            drives my excitement and passion for web development.
            <br />
            <br />
            When I&apos;m not at my computer I like to spend my time reading,
            keeping fit and playing guitar.
          </p>
        </div>
        <div className="skills">
          <div className="skills__row">
            <div className="skills__item skills__item--html fade-in animation-delay-1">
              <img
                src="https://benscott.dev/imgs/html.6aa56206be02cf6404844871df1d2da6.png"
                alt="HTML"
              />
              <div className="skills__item-name">HTML</div>
            </div>
            <div className="skills__item skills__item--react fade-in animation-delay-2">
              <img
                src="https://benscott.dev/imgs/react.cb15bfce2a9004ce61c5f79f805b067b.png"
                alt="React"
              />
              <div className="skills__item-name">REACT</div>
            </div>
            <div className="skills__item skills__item--npm fade-in animation-delay-3">
              <img
                src="https://benscott.dev/imgs/express.1eca086d2a78b4be3dd1f0a47b84b618.png"
                alt="Express.js"
              />
              <div className="skills__item-name">EXPRESS.JS</div>
            </div>
          </div>
          <div className="skills__row">
            <div className="skills__item skills__item--js fade-in animation-delay-4">
              <img
                src="https://benscott.dev/imgs/js.f8a28e905c78dadb79434b7ceebd52a0.png"
                alt="JavaScript"
              />
              <div className="skills__item-name">JAVASCRIPT</div>
            </div>
            <div className="skills__item skills__item--css fade-in animation-delay-5">
              <img
                src="https://benscott.dev/imgs/css.0ce0f0a2b4c4aa34b64c40e5278af3d1.png"
                alt="CSS"
              />
              <div className="skills__item-name">CSS</div>
            </div>
            <div className="skills__item skills__item--python fade-in animation-delay-1">
              <img
                src="https://benscott.dev/imgs/mongo.41ae1969f341d30268a13d57846efcc6.png"
                alt="MongoDB"
              />
              <div className="skills__item-name">MONGODB</div>
            </div>
            <div className="skills__item skills__item--git fade-in animation-delay-2">
              <img
                src="https://benscott.dev/imgs/git.3092b5991e8accb9e7c36817c048a8d5.png"
                alt="Git"
              />
              <div className="skills__item-name">GIT</div>
            </div>
          </div>
          <div className="skills__row">
            <div className="skills__item skills__item--sass fade-in animation-delay-3">
              <img
                src="https://benscott.dev/imgs/sass.3706567f8b353c748df3850c1aabca46.png"
                alt="Sass"
              />
              <div className="skills__item-name">SASS</div>
            </div>
            <div className="skills__item skills__item--webpack fade-in animation-delay-4">
              <img
                src="https://benscott.dev/imgs/nextjs.ff373e2ef4f7fdf152425a8c5c30816c.png"
                alt="Next.js"
              />
              <div className="skills__item-name">NEXT.JS</div>
            </div>
            <div className="skills__item skills__item--r fade-in animation-delay-5">
              <img
                src="https://benscott.dev/imgs/node.94a06c4b9dd29e984501e6407e77a918.png"
                alt="Node.js"
              />
              <div className="skills__item-name">NODE.JS</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
