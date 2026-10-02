import "./About.css";

function About() {
  return (
    <section id="about">
      <div className="reveal">
        <h2 className="section-title">
          Who I <span>Am</span>
        </h2>

        <div className="divider"></div>
      </div>

      <div className="about-layout">
        <div className="about-bio reveal">
          <p>
            I'm <strong>Srimathi</strong>, a B.E. student specialising in
            <strong> Computer Science & Engineering (Cyber Security)</strong> at
            Prince Dr. K. Vasudevan College of Engineering and Technology,
            Chennai.
          </p>

          <p>
            My first year introduced me to a strong cross-section of the
            discipline—from <strong>object-oriented programming in Java</strong>,
            <strong> Python fundamentals</strong>,
            <strong> web technologies</strong>, and
            <strong> UI/UX design principles</strong>. I enjoy translating theory
            into working code and writing clean, well-structured solutions.
          </p>

          <p>
            My long-term goal is to bridge software engineering and
            cybersecurity—designing systems that are not only functional but
            inherently secure from the ground up.
          </p>

          <div className="about-highlight">
            &gt;_ Currently in 2nd Year | Open to Internships & Collaborations
          </div>
        </div>

        <div className="about-details reveal">
          <div className="detail-row">
            <div className="detail-card">
              <div className="dc-label">Degree</div>
              <div className="dc-value">B.E. CSE — Cyber Security</div>
            </div>

            <div className="detail-card">
              <div className="dc-label">Current Year</div>
              <div className="dc-value">2nd Year</div>
            </div>
          </div>

          <div className="detail-card wide">
            <div className="dc-label">Institution</div>
            <div className="dc-value">
              Prince Dr. K. Vasudevan College of Engineering & Technology
            </div>
          </div>

          <div className="detail-card wide">
            <div className="dc-label">Location</div>
            <div className="dc-value">Chennai, Tamil Nadu, India</div>
          </div>

          <div className="subjects-strip">
            <div className="dc-label">Subjects Studied · 1st Year</div>

            <div className="subject-pills">
              <span className="subject-pill">Java</span>
              <span className="subject-pill">OOP Concepts</span>
              <span className="subject-pill">Python</span>
              <span className="subject-pill">Web Technologies</span>
              <span className="subject-pill">UI / UX Design</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default About;