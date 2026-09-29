import React, { useMemo, useState } from "react";
import PageHeader from "../components/PageHeader";

const TRACKS = {
  "Software Engineer": ["Java", "Data Structures", "SQL", "Git", "Spring Boot", "REST APIs", "Testing", "System Design"],
  "Frontend Developer": ["HTML", "CSS", "JavaScript", "React", "Git", "REST APIs", "Testing", "Accessibility"],
  "Data Scientist": ["Python", "SQL", "Pandas", "NumPy", "Statistics", "Machine Learning", "Model Evaluation", "Projects"],
  "Cybersecurity Analyst": ["Networking", "Linux", "Python", "Cybersecurity", "SIEM", "Threat Detection", "Incident Response", "Security Projects"],
  "Cloud Engineer": ["Linux", "Networking", "AWS", "Azure", "Git", "Docker", "Kubernetes", "Cloud Projects"],
};

function stageFor(index) {
  if (index < 2) return "Foundation";
  if (index < 5) return "Core skill";
  return "Job ready";
}

export default function CareerRoadmap({ skills, completed, onToggleSkill, onNavigate }) {
  const [target, setTarget] = useState("Software Engineer");

  const track = TRACKS[target];
  const owned = useMemo(() => skills.map((skill) => skill.toLowerCase()), [skills]);

  const isDetected = (skill) => owned.includes(skill.toLowerCase());
  const isDone = (skill) => isDetected(skill) || completed.includes(skill);

  const doneCount = track.filter(isDone).length;
  const progress = Math.round((doneCount / track.length) * 100);
  const nextSkills = track.filter((skill) => !isDone(skill)).slice(0, 5);

  return (
    <section className="container section">
      <PageHeader
        title="Career roadmap"
        description="Choose a target role and turn missing skills into a practical checklist."
      />

      <div className="card roadmap-summary">
        <label className="field">
          <span>Target role</span>
          <select className="input" value={target} onChange={(event) => setTarget(event.target.value)}>
            {Object.keys(TRACKS).map((role) => (
              <option key={role} value={role}>{role}</option>
            ))}
          </select>
        </label>

        <div className="grow">
          <p>
            <strong className="big-number">{progress}%</strong>{" "}
            <span className="muted">ready for {target} roles</span>
          </p>
          <div className="progress" role="progressbar" aria-valuenow={progress} aria-valuemin={0} aria-valuemax={100}>
            <span style={{ width: `${progress}%` }} />
          </div>
        </div>
      </div>

      <ol className="roadmap">
        {track.map((skill, index) => {
          const done = isDone(skill);
          const detected = isDetected(skill);

          return (
            <li className={done ? "road-step done" : "road-step"} key={skill}>
              <span className="step-marker" aria-hidden="true">{done ? "✓" : index + 1}</span>

              <div className="road-content">
                <p className="muted small">{stageFor(index)}</p>
                <h3>{skill}</h3>
                <p className="muted">
                  {detected
                    ? "Already in your skill profile."
                    : done
                    ? "Marked as completed by you."
                    : `Add ${skill} to be more competitive for ${target} roles.`}
                </p>
              </div>

              {!detected && (
                <button
                  className={done ? "btn btn-done btn-sm" : "btn btn-ghost btn-sm"}
                  onClick={() => onToggleSkill(skill)}
                >
                  {done ? "Completed" : "Mark done"}
                </button>
              )}
            </li>
          );
        })}
      </ol>

      <div className="card stack">
        <h2>Next skills to learn</h2>
        {nextSkills.length === 0 ? (
          <p className="muted">You have covered every skill on this roadmap. Time to apply.</p>
        ) : (
          <div className="chip-row">
            {nextSkills.map((skill) => (
              <span className="chip chip-missing" key={skill}>{skill}</span>
            ))}
          </div>
        )}
        <div className="button-row">
          <button className="btn btn-primary" onClick={() => onNavigate("matching")}>
            Find jobs for my skills
          </button>
        </div>
      </div>
    </section>
  );
}
