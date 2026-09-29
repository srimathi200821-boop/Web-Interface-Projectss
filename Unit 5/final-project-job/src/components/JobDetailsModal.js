import React, { useEffect, useRef } from "react";
import CompanyAvatar from "./CompanyAvatar";
import { JOBS } from "../data/jobs";
import { calculateMatch, matchTone } from "../utils/matching";
import { similarJobs } from "../utils/jobs";

export default function JobDetailsModal({
  job,
  skills,
  applied,
  saved,
  onApply,
  onToggleSave,
  onViewJob,
  onClose,
}) {
  const closeButton = useRef(null);
  const onCloseRef = useRef(onClose);

  onCloseRef.current = onClose;

  const details = calculateMatch(job, skills);
  const related = similarJobs(job, JOBS);

  // Runs once on open, so re-renders never steal focus.
  useEffect(() => {
    closeButton.current?.focus();

    const previousOverflow =
      document.body.style.overflow;

    document.body.style.overflow = "hidden";

    const onKeyDown = (event) => {
      if (event.key === "Escape") {
        onCloseRef.current();
      }
    };

    window.addEventListener(
      "keydown",
      onKeyDown
    );

    return () => {
      document.body.style.overflow =
        previousOverflow;

      window.removeEventListener(
        "keydown",
        onKeyDown
      );
    };
  }, []);

  return (
    <div
      className="modal-backdrop"
      onMouseDown={(event) =>
        event.target === event.currentTarget &&
        onClose()
      }
    >
      <div
        className="modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="job-modal-title"
      >

        {/* ================= HEADER ================= */}

        <header className="modal-header">
          <div className="job-identity">

            <CompanyAvatar
              name={job.company}
              size={52}
            />

            <div>
              <h2 id="job-modal-title">
                {job.title}
              </h2>

              <p className="job-company">
                {job.company}
              </p>
            </div>

          </div>

          <button
            ref={closeButton}
            className="icon-btn icon-btn-plain"
            onClick={onClose}
            aria-label="Close details"
          >
            ✕
          </button>
        </header>


        {/* ================= BASIC JOB DETAILS ================= */}

        <dl className="detail-grid">

          <div>
            <dt>Location</dt>
            <dd>{job.location}</dd>
          </div>

          <div>
            <dt>Salary</dt>
            <dd>{job.salary}</dd>
          </div>

          <div>
            <dt>Experience</dt>
            <dd>{job.experience}</dd>
          </div>

          <div>
            <dt>Job type</dt>
            <dd>{job.type}</dd>
          </div>

        </dl>


        {/* =====================================================
            EXACT JOB LOCATION
           ===================================================== */}

        <section className="exact-location-card">

          <div className="location-header">

            <div className="location-icon">
              📍
            </div>

            <div>
              <span className="location-label">
                EXACT JOB LOCATION
              </span>

              <h3>
                {job.branch || job.location}
              </h3>
            </div>

          </div>


          <div className="location-details">

            {/* Branch */}

            <div className="location-row">

              <span className="location-symbol">
                🏢
              </span>

              <div>
                <strong>
                  Branch
                </strong>

                <p>
                  {job.branch ||
                    "Company Branch"}
                </p>
              </div>

            </div>


            {/* Exact Address */}

            <div className="location-row">

              <span className="location-symbol">
                📍
              </span>

              <div>
                <strong>
                  Exact Address
                </strong>

                <p>
                  {job.address ||
                    job.location}
                </p>
              </div>

            </div>


            {/* Landmark */}

            {job.landmark && (
              <div className="location-row">

                <span className="location-symbol">
                  🧭
                </span>

                <div>
                  <strong>
                    Landmark
                  </strong>

                  <p>
                    {job.landmark}
                  </p>
                </div>

              </div>
            )}

          </div>


          {/* Open Google Maps */}

          {job.mapsUrl && (
            <a
              href={job.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="get-directions-btn"
            >
              📍 Open Exact Location
            </a>
          )}

        </section>


        {/* ================= ABOUT ROLE ================= */}

        <section className="stack">

          <h3>
            About the role
          </h3>

          <p>
            {job.description}
          </p>

        </section>


        {/* ================= SKILLS ================= */}

        <section className="stack">

          <h3>
            Skills required
          </h3>

          <div className="chip-row">

            {details.matched.map(
              (skill) => (
                <span
                  className="chip chip-match"
                  key={skill}
                >
                  ✓ {skill}
                </span>
              )
            )}

            {details.missing.map(
              (skill) => (
                <span
                  className="chip chip-missing"
                  key={skill}
                >
                  {skill}
                </span>
              )
            )}

          </div>


          {skills.length > 0 ? (

            <div>

              <p>

                Your match:{" "}

                <strong
                  className={`match-text match-text-${matchTone(
                    details.score
                  )}`}
                >
                  {details.score}%
                </strong>

                {details.missing.length >
                  0 && (
                  <span className="muted">
                    {" "}
                    · Missing{" "}
                    {details.missing.join(
                      ", "
                    )}
                  </span>
                )}

              </p>


              <div className="progress">

                <span
                  style={{
                    width: `${details.score}%`,
                  }}
                />

              </div>

            </div>

          ) : (

            <p className="muted small">
              Add your skills in Smart match
              to see how well you fit this
              role.
            </p>

          )}

        </section>


        {/* ================= SIMILAR JOBS ================= */}

        {related.length > 0 && (

          <section className="stack">

            <h3>
              Similar jobs
            </h3>


            {related.map((item) => (

              <button
                className="mini-row mini-row-btn"
                key={item.id}
                onClick={() =>
                  onViewJob(item)
                }
              >

                <span>

                  <strong>
                    {item.title}
                  </strong>

                  <span className="muted small">
                    {" "}
                    · {item.company},{" "}
                    {item.city}
                  </span>

                </span>


                <span className="muted small">
                  {item.salary}
                </span>

              </button>

            ))}

          </section>

        )}


        {/* ================= FOOTER ================= */}

        <footer className="modal-footer">

          <button
            className={
              saved
                ? "btn btn-secondary is-active"
                : "btn btn-ghost"
            }
            onClick={() =>
              onToggleSave(job)
            }
          >
            {saved
              ? "Saved"
              : "Save job"}
          </button>


          <button
            className={
              applied
                ? "btn btn-done"
                : "btn btn-primary"
            }
            onClick={() =>
              onApply(job)
            }
            disabled={applied}
          >
            {applied
              ? "Applied"
              : "Apply now"}
          </button>

        </footer>

      </div>
    </div>
  );
}