import React, { useMemo, useState } from "react";
import PageHeader from "../components/PageHeader";
import JobGrid from "../components/JobGrid";
import EmptyState from "../components/EmptyState";
import { ALL_SKILLS, JOBS } from "../data/jobs";
import { rankJobs } from "../utils/matching";

export default function SmartMatching({ savedSkills, onSaveSkills, onNavigate, ...jobProps }) {
  const [selected, setSelected] = useState(savedSkills);
  const [search, setSearch] = useState("");

  const toggleSkill = (skill) =>
    setSelected((previous) =>
      previous.includes(skill) ? previous.filter((item) => item !== skill) : [...previous, skill]
    );

  const results = useMemo(() => {
    const query = search.trim().toLowerCase();

    return rankJobs(JOBS, selected).filter(
      (job) => job.title.toLowerCase().includes(query) || job.company.toLowerCase().includes(query)
    );
  }, [selected, search]);

  const hasChanges =
    selected.length !== savedSkills.length || selected.some((skill) => !savedSkills.includes(skill));

  return (
    <section className="container section">
      <PageHeader
        title="Smart matching"
        description="Select the skills you have and see how well you fit every open role."
      />

      <div className="card stack">
        <div>
          <h2>Your skills</h2>
          <p className="muted">{selected.length} selected</p>
        </div>

        <div className="chip-row">
          {ALL_SKILLS.map((skill) => {
            const isSelected = selected.includes(skill);
            return (
              <button
                key={skill}
                className={isSelected ? "chip chip-toggle selected" : "chip chip-toggle"}
                aria-pressed={isSelected}
                onClick={() => toggleSkill(skill)}
              >
                {skill}
              </button>
            );
          })}
        </div>

        <div className="button-row">
          <button className="btn btn-primary" onClick={() => onSaveSkills(selected)} disabled={!hasChanges}>
            Save skills
          </button>
          <button className="btn btn-secondary" onClick={() => onNavigate("roadmap")}>
            Build career roadmap
          </button>
        </div>
      </div>

      <div className="result-bar spaced">
        <h2>Matches for you <span className="muted">({results.length})</span></h2>
        <input
          className="input input-inline"
          type="search"
          placeholder="Filter by title or company"
          aria-label="Filter matches"
          value={search}
          onChange={(event) => setSearch(event.target.value)}
        />
      </div>

      {selected.length === 0 && (
        <p className="notice">Select at least one skill to see meaningful match scores.</p>
      )}

      {results.length === 0 ? (
        <EmptyState title="No roles found" message="Try a different title or company." />
      ) : (
        <JobGrid jobs={results} showScore {...jobProps} />
      )}
    </section>
  );
}
