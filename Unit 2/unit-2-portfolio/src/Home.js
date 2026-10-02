
import { Link } from "react-router-dom";
import "./Home.css";

import cert1 from "./assets/certificates/certificate-1.jpg";
import cert16 from "./assets/certificates/infosys(Java).jpg";

function Home() {
  return (
    <div className="home-page">

      {/* HERO SECTION */}
      <section className="home-hero">

        <div className="home-content">

          <span className="welcome-badge">
            Welcome to my portfolio
          </span>

          <h1 className="greeting">Hi, I'm</h1>

          <h1 className="name">Srimathi</h1>

          <h3 className="role">
            Cyber Security Student & Developer
          </h3>

          <p>
            I'm a Computer Science undergraduate specializing in Cyber Security.
            I'm passionate about understanding how systems work under the hood,
            building secure applications, and solving real-world problems
            through technology.
          </p>

          <p>
            My interests span Cyber Security, Web Development, Java, Python,
            React, and UI/UX Design. I enjoy building practical projects while
            continuously improving my technical and problem-solving skills.
          </p>

          {/* STATS */}
          <div className="stats">

            <div className="stat">
              <h4>10+</h4>
              <span>Projects Built</span>
            </div>

            <div className="stat">
              <h4>20+</h4>
              <span>Certificates</span>
            </div>

            <div className="stat">
              <h4>5+</h4>
              <span>Tech Stacks</span>
            </div>

          </div>

          {/* BUTTONS */}
          <div className="buttons">

            <Link to="/projects">
              <button className="btn-primary">
                View Projects →
              </button>
            </Link>

            <Link to="/contact">
              <button className="btn-secondary">
                Contact Me
              </button>
            </Link>

          </div>

          {/* SOCIAL LINKS */}
          <div className="links-row">

            <a
              href="https://github.com/srimathi200821-boop"
              target="_blank"
              rel="noreferrer"
              className="link-chip"
            >
              GitHub
            </a>

            <a
              href="https://www.linkedin.com/in/sri-mathi-90b062387"
              target="_blank"
              rel="noreferrer"
              className="link-chip"
            >
              LinkedIn
            </a>

            <a
              href="mailto:srimathi200821@gmail.com"
              className="link-chip"
            >
              Email
            </a>

          </div>

        </div>

        {/* PROFILE SECTION */}
        <div className="home-profile">

          <div className="profile-glow"></div>

          <div className="profile-circle">
            <div className="profile-placeholder">
              🛡️
            </div>
          </div>

          <div className="floating-card card-one">
            Cyber Security
          </div>

          <div className="floating-card card-two">
            Developer
          </div>

          <div className="floating-card card-three">
            Problem Solver
          </div>

        </div>

      </section>


      {/* FEATURED PROJECTS */}
      <section className="home-section">

        <div className="section-heading">

          <span>MY WORK</span>

          <h2>Featured Projects</h2>

          <p>
            A few projects I've built while learning web development,
            programming, and software development.
          </p>

        </div>


        <div className="home-project-grid">

          {/* PROJECT 1 */}
          <div className="home-project-card">

            <div className="home-project-image">
              <div className="project-placeholder">
                🍽️
                <span>Food Restaurant Website</span>
              </div>
            </div>

            <div className="home-project-content">

              <span className="project-number">01</span>

              <h3>Food Restaurant Website</h3>

              <p>
                A responsive restaurant website displaying menu,
                services, and location details using HTML and CSS.
              </p>

              <div className="mini-tags">
                <span>HTML</span>
                <span>CSS</span>
                <span>Responsive</span>
              </div>

              <a
                href="https://github.com/srimathi200821-boop/Web-Technology/tree/main/Unit-5"
                target="_blank"
                rel="noreferrer"
                className="home-project-link"
              >
                View on GitHub →
              </a>

            </div>

          </div>


          {/* PROJECT 2 */}
          <div className="home-project-card">

            <div className="home-project-image">
              <div className="project-placeholder">
                🏫
                <span>College Website</span>
              </div>
            </div>

            <div className="home-project-content">

              <span className="project-number">02</span>

              <h3>College Website</h3>

              <p>
                A college management website providing information
                about courses, faculty, facilities, events, and contacts.
              </p>

              <div className="mini-tags">
                <span>HTML</span>
                <span>CSS</span>
                <span>Web Design</span>
              </div>

              <a
                href="https://github.com/srimathi200821-boop/College-Management-System"
                target="_blank"
                rel="noreferrer"
                className="home-project-link"
              >
                View on GitHub →
              </a>

            </div>

          </div>

        </div>


        <div className="home-view-more">
          <Link to="/projects">
            View All Projects →
          </Link>
        </div>

      </section>


      {/* FEATURED CERTIFICATES */}
      <section className="home-section certificates-section">

        <div className="section-heading">

          <span>ACHIEVEMENTS</span>

          <h2>Featured Certificates</h2>

          <p>
            Certifications earned through hands-on courses,
            technical learning, and continuous skill development.
          </p>

        </div>


        <div className="home-certificate-grid">

          {/* CERTIFICATE 1 */}
          <div className="home-certificate-card">

            <div className="certificate-image">

              <img
                src={cert1}
                alt="Claude Code in Action"
              />

            </div>

            <div className="certificate-content">

              <span className="certificate-category">
                AI / Claude
              </span>

              <h3>Claude Code in Action</h3>

              <p>
                Certification focused on using Claude Code
                and AI-assisted development workflows.
              </p>

              <Link
                to="/certificates"
                className="certificate-link"
              >
                View Certificate →
              </Link>

            </div>

          </div>


          {/* CERTIFICATE 2 */}
          <div className="home-certificate-card">

            <div className="certificate-image">

              <img
                src={cert16}
                alt="Java Programming Fundamentals"
              />

            </div>

            <div className="certificate-content">

              <span className="certificate-category">
                Java
              </span>

              <h3>Java Programming Fundamentals</h3>

              <p>
                Certification covering fundamental Java programming
                concepts and object-oriented programming.
              </p>

              <Link
                to="/certificates"
                className="certificate-link"
              >
                View Certificate →
              </Link>

            </div>

          </div>

        </div>


        <div className="home-view-more">
          <Link to="/certificates">
            View All Certificates →
          </Link>
        </div>

      </section>


      {/* CTA SECTION */}
      <section className="home-cta">

        <div>

          <span>LET'S CONNECT</span>

          <h2>
            Let's build something
            <br />
            meaningful together.
          </h2>

          <p>
            I'm always interested in learning new technologies,
            building projects, and exploring opportunities.
          </p>

        </div>

        <Link to="/contact">

          <button className="btn-primary">
            Get In Touch →
          </button>

        </Link>

      </section>

    </div>
  );
}

export default Home;
