import React, { useMemo } from "react";
import PageHeader from "../components/PageHeader";
import { JOBS } from "../data/jobs";
import { rankJobs } from "../utils/matching";
import { APPLICATION_STATUSES, statusClass } from "../utils/jobs";

export default function Dashboard({ user, skills, profile, resumeData, applications, savedJobIds, onNavigate }) {
  const checklist = [
    { label: "Add your skills", done: skills.length > 0, page: "matching" },
    { label: "Analyze your resume", done: Boolean(resumeData), page: "resume" },
    { label: "Complete your profile details", done: Boolean(profile.headline && profile.location && profile.preferredRole), page: "profile" },
    { label: "Apply to a job", done: applications.length > 0, page: "jobs" },
    { label: "Save a job", done: savedJobIds.length > 0, page: "jobs" },
  ];

  const completion = Math.round((checklist.filter((item) => item.done).length / checklist.length) * 100);
  const ranked = useMemo(() => rankJobs(JOBS, skills), [skills]);
  const topMatches = ranked.slice(0, 3);

  const skillGaps = useMemo(() => {
    const counts = {};
    ranked.slice(0, 8).forEach((job) => job.missing.forEach((skill) => { counts[skill] = (counts[skill] || 0) + 1; }));
    return Object.entries(counts).sort((a, b) => b[1] - a[1]).slice(0, 6).map(([skill]) => skill);
  }, [ranked]);

  const statusCounts = APPLICATION_STATUSES.map((status) => ({
    status,
    count: applications.filter((item) => item.status === status).length,
  }));
  const maxCount = Math.max(1, ...statusCounts.map((item) => item.count));

  const stats = [
    { label: "Applications", value: applications.length, page: "applications" },
    { label: "Saved jobs", value: savedJobIds.length, page: "saved" },
    { label: "Skills", value: skills.length, page: "matching" },
    { label: "Profile complete", value: `${completion}%`, page: "profile" },
  ];

  return (
    <section className="container section">
      <PageHeader title={`Welcome, ${user.name}`} description={profile.headline || user.email}>
        <button className="btn btn-primary" onClick={() => onNavigate("jobs")}>Find more jobs</button>
      </PageHeader>

      <div className="grid grid-4">
        {stats.map((stat) => (
          <button className="card stat" key={stat.label} onClick={() => onNavigate(stat.page)}>
            <strong className="big-number">{stat.value}</strong>
            <span className="muted">{stat.label}</span>
          </button>
        ))}
      </div>

      <div className="grid grid-2 results">
        <div className="card stack">
          <h2>Complete your profile</h2>
          <div className="progress" role="progressbar" aria-valuenow={completion} aria-valuemin={0} aria-valuemax={100}>
            <span style={{ width: `${completion}%` }} />
          </div>
          <ul className="checklist">
            {checklist.map((item) => (
              <li key={item.label} className={item.done ? "done" : ""}>
                <span aria-hidden="true">{item.done ? "✓" : "○"}</span>
                {item.done ? <span>{item.label}</span> : (
                  <button className="link-btn" onClick={() => onNavigate(item.page)}>{item.label}</button>
                )}
              </li>
            ))}
          </ul>
        </div>

        <div className="card stack">
          <h2>Application pipeline</h2>
          {applications.length === 0 ? (
            <p className="muted">Apply to a job to start tracking your pipeline.</p>
          ) : (
            <div className="bars">
              {statusCounts.map(({ status, count }) => (
                <div className="bar-row" key={status}>
                  <span className="bar-label">{status}</span>
                  <div className="bar-track"><span className={`bar-fill bar-${status.toLowerCase().replace(/\s+/g, "-")}`} style={{ width: `${(count / maxCount) * 100}%` }} /></div>
                  <span className="bar-count">{count}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="grid grid-2 results">
        <div className="card stack">
          <h2>Top matches</h2>
          {skills.length === 0 ? (
            <p className="muted">Add your skills to see personalised matches.</p>
          ) : (
            topMatches.map((job) => (
              <div className="mini-row" key={job.id}>
                <div>
                  <strong>{job.title}</strong>
                  <p className="muted small">{job.company} · {job.location}</p>
                </div>
                <strong>{job.score}%</strong>
              </div>
            ))
          )}
        </div>

        <div className="card stack">
          <h2>Skills to learn next</h2>
          {skills.length === 0 ? (
            <p className="muted">Your skill gaps will appear here once you add skills.</p>
          ) : skillGaps.length === 0 ? (
            <p className="muted">You cover the skills for your top matches. Time to apply.</p>
          ) : (
            <>
              <p className="muted small">Most often missing across your best-matching roles.</p>
              <div className="chip-row">{skillGaps.map((skill) => <span className="chip chip-missing" key={skill}>{skill}</span>)}</div>
              <div className="button-row">
                <button className="btn btn-secondary btn-sm" onClick={() => onNavigate("roadmap")}>Open roadmap</button>
              </div>
            </>
          )}
        </div>
      </div>

      <div className="card stack">
        <h2>Recent applications</h2>
        {applications.length === 0 ? (
          <p className="muted">You have not applied to any jobs yet.</p>
        ) : (
          applications.slice(0, 3).map((item) => (
            <div className="mini-row" key={item.jobId}>
              <div>
                <strong>{item.title}</strong>
                <p className="muted small">{item.company}</p>
              </div>
              <span className={statusClass(item.status)}>{item.status}</span>
            </div>
          ))
        )}
      </div>
    </section>
  );
}
