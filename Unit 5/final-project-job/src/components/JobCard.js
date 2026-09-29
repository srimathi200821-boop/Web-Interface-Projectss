import React from "react";
import CompanyAvatar from "./CompanyAvatar";
import { matchTone } from "../utils/matching";

function postedLabel(days) {
  if (days === 0) return "Posted today";
  if (days === 1) return "Posted 1 day ago";
  return `Posted ${days} days ago`;
}

export default function JobCard({ job, applied, saved, onApply, onToggleSave, onView, score }) {
  return (
    <article className="job-card">
      <header className="job-card-top">
        <div className="job-identity">
          <CompanyAvatar name={job.company} />
          <div>
            <h3>
              <button className="job-title-btn" onClick={() => onView(job)}>{job.title}</button>
            </h3>
            <p className="job-company">{job.company}</p>
          </div>
        </div>

        {typeof score === "number" ? (
          <span className={`match match-${matchTone(score)}`}>{score}% match</span>
        ) : (
          <span className="badge">{job.type}</span>
        )}
      </header>

      <ul className="job-meta">
        <li>{job.location}</li>
        <li>{job.salary} · {job.experience}</li>
        <li>{postedLabel(job.postedDaysAgo)}</li>
      </ul>

      <div className="chip-row">
        {job.skills.map((skill) => (
          <span className={job.matched?.includes(skill) ? "chip chip-match" : "chip"} key={skill}>
            {skill}
          </span>
        ))}
      </div>

      <footer className="job-card-footer">
        <button className="btn btn-ghost btn-sm" onClick={() => onView(job)}>Details</button>

        <div className="button-row">
          <button
            className={saved ? "btn btn-secondary btn-sm is-active" : "btn btn-ghost btn-sm"}
            onClick={() => onToggleSave(job)}
            aria-pressed={saved}
          >
            {saved ? "Saved" : "Save"}
          </button>

          <button
            className={applied ? "btn btn-done btn-sm" : "btn btn-primary btn-sm"}
            onClick={() => onApply(job)}
            disabled={applied}
          >
            {applied ? "Applied" : "Apply now"}
          </button>
        </div>
      </footer>
    </article>
  );
}
