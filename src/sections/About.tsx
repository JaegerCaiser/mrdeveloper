import "./About.scss";
import profileImage from "../assets/profile.png";

const About: React.FC = () => {
  return (
    <section id="about" className="about" aria-label="About">
      <h2 className="about__heading section-heading">About</h2>
      <div className="about__content">
        <div className="profile profile__fade-in">
          <div className="profile__picture">
            <img
              src={profileImage}
              alt="Profile picture"
              className="profile__image"
            />
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
