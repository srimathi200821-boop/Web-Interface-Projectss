import { useState } from "react";
import "./Projects.css";

function Projects() {
  const [filter, setFilter] = useState("All");

  const filters = ["All", "Web", "Java", "Python"];

  const filterLabels = {
    All: "All",
    Web: "Web Dev",
    Java: "Java / OOPs",
    Python: "Python",
  };

  return (
    <section id="projects-section">

      {/* HEADER */}
      <div className="projects-header">
        <h2>
          Things I've <span>Built</span>
        </h2>

        <div className="divider"></div>

        <p
          style={{
            color: "black",
            marginBottom: "2rem",
            maxWidth: "560px",
            fontSize: "0.95rem",
          }}
        >
          Real projects from my GitHub — web development, Java OOP units, and
          Python fundamentals, all built hands-on.
        </p>
      </div>

      {/* FILTERS */}
      <div className="proj-filters reveal">
        {filters.map((f) => (
          <button
            key={f}
            className={`filter-btn ${filter === f ? "active" : ""}`}
            onClick={() => setFilter(f)}
          >
            {filterLabels[f]}
          </button>
        ))}
      </div>

      {/* PROJECTS */}
      <div className="projects-grid">

        {/* PROJECT 1 */}
        {(filter === "All" || filter === "Web") && (
          <div className="proj-card has-badge">

            <div className="proj-thumb-placeholder proj-thumb-restaurant">
              <div className="project-placeholder">
                🍽️
                <span>Food Restaurant Website</span>
              </div>
            </div>

            <div className="proj-body">

              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <span className="proj-num">01</span>
                <span className="proj-lang">HTML / CSS</span>
              </div>

              <div className="proj-title">
                Food Restaurant Website
              </div>

              <p className="proj-desc">
                A fully designed restaurant web page displaying menu,
                services, and location details. Built with semantic HTML
                and custom CSS layout.
              </p>

              <div className="proj-tags">
                <span className="proj-tag">HTML</span>
                <span className="proj-tag">CSS</span>
                <span className="proj-tag">Responsive</span>
                <span className="proj-tag">UI Design</span>
              </div>

              <a
                href="https://github.com/srimathi200821-boop/Web-Technology/tree/main/Unit-5"
                target="_blank"
                rel="noreferrer"
                className="proj-link"
              >
                View on GitHub
              </a>

            </div>
          </div>
        )}

        {/* PROJECT 2 */}
        {(filter === "All" || filter === "Web") && (
          <div className="proj-card has-badge">

            <div className="proj-thumb-placeholder proj-thumb-college">
              <div className="project-placeholder">
                <img src="/images/Project1.png" alt="College Website" className="project-image" />
              </div>
            </div>

            <div className="proj-body">

              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <span className="proj-num">02</span>
                <span className="proj-lang">HTML / CSS</span>
              </div>

              <div className="proj-title">
                College Website
              </div>

              <p className="proj-desc">
                A fully designed college management website providing
                information about courses, faculty, facilities, events,
                and contact details.
              </p>

              <div className="proj-tags">
                <span className="proj-tag">HTML</span>
                <span className="proj-tag">CSS</span>
                <span className="proj-tag">Responsive</span>
                <span className="proj-tag">UI Design</span>
              </div>

              <a
                href="https://github.com/srimathi200821-boop/College-Management-System"
                target="_blank"
                rel="noreferrer"
                className="proj-link"
              >
                View on GitHub
              </a>

            </div>
          </div>
        )}

        {/* PROJECT 3 */}
        {(filter === "All" || filter === "Java") && (
          <div className="proj-card">

            <div className="proj-thumb-placeholder proj-thumb-java">
              <div className="project-placeholder">
                ☕
                <span>OOP Foundations</span>
              </div>
            </div>

            <div className="proj-body">

              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <span className="proj-num">03</span>
                <span className="proj-lang">Java</span>
              </div>

              <div className="proj-title">
                OOP Foundations
              </div>

              <p className="proj-desc">
                Introduction to OOP in Java covering classes, objects,
                constructors and method overloading.
              </p>

              <div className="proj-tags">
                <span className="proj-tag">Java</span>
                <span className="proj-tag">Classes & Objects</span>
                <span className="proj-tag">Constructors</span>
              </div>

              <a
                href="https://github.com/srimathi200821-boop/OOPS"
                target="_blank"
                rel="noreferrer"
                className="proj-link"
              >
                View on GitHub
              </a>

            </div>
          </div>
        )}

        {/* PROJECT 4 */}
        {(filter === "All" || filter === "Java") && (
          <div className="proj-card">

            <div className="proj-thumb-placeholder proj-thumb-java">
              <div className="project-placeholder">
                🧬
                <span>Inheritance & Polymorphism</span>
              </div>
            </div>

            <div className="proj-body">

              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <span className="proj-num">04</span>
                <span className="proj-lang">Java</span>
              </div>

              <div className="proj-title">
                Inheritance & Polymorphism
              </div>

              <p className="proj-desc">
                Inheritance hierarchies, method overriding and polymorphism
                in Java.
              </p>

              <div className="proj-tags">
                <span className="proj-tag">Java</span>
                <span className="proj-tag">Inheritance</span>
                <span className="proj-tag">Polymorphism</span>
              </div>

              <a
                href="https://github.com/srimathi200821-boop/OOPS/tree/main/UNIT-3"
                target="_blank"
                rel="noreferrer"
                className="proj-link"
              >
                View on GitHub
              </a>

            </div>
          </div>
        )}

        {/* PROJECT 5 */}
        {(filter === "All" || filter === "Java") && (
          <div className="proj-card">

            <div className="proj-thumb-placeholder proj-thumb-java">
              <div className="project-placeholder">
                🔗
                <span>Interfaces & Abstraction</span>
              </div>
            </div>

            <div className="proj-body">

              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <span className="proj-num">05</span>
                <span className="proj-lang">Java</span>
              </div>

              <div className="proj-title">
                Interfaces & Abstraction
              </div>

              <p className="proj-desc">
                Abstract classes and interfaces in Java with practical
                examples.
              </p>

              <div className="proj-tags">
                <span className="proj-tag">Java</span>
                <span className="proj-tag">Interfaces</span>
                <span className="proj-tag">Abstraction</span>
              </div>

              <a
                href="https://github.com/srimathi200821-boop/OOPS/tree/main/UNIT-3"
                target="_blank"
                rel="noreferrer"
                className="proj-link"
              >
                View on GitHub
              </a>

            </div>
          </div>
        )}

        {/* PROJECT 6 */}
        {(filter === "All" || filter === "Python") && (
          <div className="proj-card">

            <div className="proj-thumb-placeholder proj-thumb-python">
              <div className="project-placeholder">
                🐍
                <span>Python Fundamentals</span>
              </div>
            </div>

            <div className="proj-body">

              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <span className="proj-num">06</span>
                <span className="proj-lang">Python</span>
              </div>

              <div className="proj-title">
                Python Fundamentals
              </div>

              <p className="proj-desc">
                Variables, loops, functions and control flow in Python.
              </p>

              <div className="proj-tags">
                <span className="proj-tag">Python</span>
                <span className="proj-tag">Data Types</span>
                <span className="proj-tag">Control Flow</span>
              </div>

              <a
                href="https://github.com/srimathi200821-boop/PYTHON/tree/main/UNIT-1"
                target="_blank"
                rel="noreferrer"
                className="proj-link"
              >
                View on GitHub
              </a>

            </div>
          </div>
        )}

        {/* PROJECT 7 */}
        {(filter === "All" || filter === "Python") && (
          <div className="proj-card">

            <div className="proj-thumb-placeholder proj-thumb-python">
              <div className="project-placeholder">
                🐍
                <span>Python Advanced Concepts</span>
              </div>
            </div>

            <div className="proj-body">

              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <span className="proj-num">07</span>
                <span className="proj-lang">Python</span>
              </div>

              <div className="proj-title">
                Python Advanced Concepts
              </div>

              <p className="proj-desc">
                Lists, dictionaries, file handling and modules with
                practical exercises.
              </p>

              <div className="proj-tags">
                <span className="proj-tag">Python</span>
                <span className="proj-tag">Data Structures</span>
                <span className="proj-tag">File Handling</span>
              </div>

              <a
                href="https://github.com/srimathi200821-boop/PYTHON/tree/main/UNIT-2"
                target="_blank"
                rel="noreferrer"
                className="proj-link"
              >
                View on GitHub
              </a>

            </div>
          </div>
        )}

      </div>

      {/* ALL REPOSITORIES */}
      <div className="center reveal">
        <a
          href="https://github.com/srimathi200821-boop"
          target="_blank"
          rel="noreferrer"
          className="btn"
        >
          View All Repositories
        </a>
      </div>

    </section>
  );
}

export default Projects;