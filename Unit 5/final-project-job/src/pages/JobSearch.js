import React, { useEffect, useMemo, useState } from "react";
import PageHeader from "../components/PageHeader";
import JobGrid from "../components/JobGrid";
import EmptyState from "../components/EmptyState";
import { CITIES, JOB_TYPES } from "../data/jobs";
import { rankJobs } from "../utils/matching";
import { MIN_SALARY_OPTIONS, SORT_OPTIONS, salaryRange, sortJobs } from "../utils/jobs";

const ALL = "All";
const PAGE_SIZE = 9;

export default function JobSearch({ jobs, skills, ...jobProps }) {
  const [search, setSearch] = useState("");
  const [city, setCity] = useState(ALL);
  const [type, setType] = useState(ALL);
  const [experience, setExperience] = useState(ALL);
  const [minSalary, setMinSalary] = useState(0);
  const [sort, setSort] = useState("newest");
  const [visible, setVisible] = useState(PAGE_SIZE);

  const experienceOptions = useMemo(() => Array.from(new Set(jobs.map((job) => job.experience))), [jobs]);
  const hasSkills = skills.length > 0;
  const sortOptions = hasSkills ? SORT_OPTIONS : SORT_OPTIONS.filter((option) => option.id !== "match");

  useEffect(() => setVisible(PAGE_SIZE), [search, city, type, experience, minSalary, sort]);

  const results = useMemo(() => {
    const query = search.trim().toLowerCase();
    const base = hasSkills ? rankJobs(jobs, skills) : jobs;

    const filtered = base.filter((job) => {
      const haystack = [job.title, job.company, job.location, ...job.skills].join(" ").toLowerCase();

      return (
        haystack.includes(query) &&
        (city === ALL || job.city === city) &&
        (type === ALL || job.type === type) &&
        (experience === ALL || job.experience === experience) &&
        salaryRange(job).min >= minSalary
      );
    });

    return sortJobs(filtered, sort);
  }, [jobs, skills, hasSkills, search, city, type, experience, minSalary, sort]);

  const hasFilters = search || city !== ALL || type !== ALL || experience !== ALL || minSalary > 0;

  const clearFilters = () => {
    setSearch("");
    setCity(ALL);
    setType(ALL);
    setExperience(ALL);
    setMinSalary(0);
  };

  return (
    <section className="container section">
      <PageHeader
        title="Find your next job"
        description="Search by title, company, city or skill. Open a job to see the full details."
      />

      <div className="card filter-card">
        <input
          className="input filter-search"
          type="search"
          placeholder="Search jobs, companies or skills"
          aria-label="Search jobs"
          value={search}
          onChange={(event) => setSearch(event.target.value)}
        />

        <select className="input" aria-label="Location" value={city} onChange={(event) => setCity(event.target.value)}>
          <option value={ALL}>All locations</option>
          {CITIES.map((item) => <option key={item} value={item}>{item}</option>)}
        </select>

        <select className="input" aria-label="Job type" value={type} onChange={(event) => setType(event.target.value)}>
          <option value={ALL}>All job types</option>
          {JOB_TYPES.map((item) => <option key={item} value={item}>{item}</option>)}
        </select>

        <select className="input" aria-label="Experience" value={experience} onChange={(event) => setExperience(event.target.value)}>
          <option value={ALL}>Any experience</option>
          {experienceOptions.map((item) => <option key={item} value={item}>{item}</option>)}
        </select>

        <select className="input" aria-label="Minimum salary" value={minSalary} onChange={(event) => setMinSalary(Number(event.target.value))}>
          <option value={0}>Any salary</option>
          {MIN_SALARY_OPTIONS.map((item) => <option key={item} value={item}>{item}+ LPA</option>)}
        </select>
      </div>

      <div className="result-bar">
        <p className="muted">
          {results.length} job{results.length === 1 ? "" : "s"} found
          {hasFilters && <> · <button className="link-btn" onClick={clearFilters}>Clear filters</button></>}
        </p>

        <label className="sort-control">
          <span className="muted small">Sort by</span>
          <select className="input input-inline" value={sort} onChange={(event) => setSort(event.target.value)}>
            {sortOptions.map((option) => <option key={option.id} value={option.id}>{option.label}</option>)}
          </select>
        </label>
      </div>

      {results.length === 0 ? (
        <EmptyState
          title="No jobs match your search"
          message="Try a different keyword or clear your filters."
          actionLabel="Clear filters"
          onAction={clearFilters}
        />
      ) : (
        <>
          <JobGrid jobs={results.slice(0, visible)} showScore={hasSkills && sort === "match"} {...jobProps} />

          {visible < results.length && (
            <div className="center-row section-action">
              <button className="btn btn-secondary" onClick={() => setVisible((count) => count + PAGE_SIZE)}>
                Show more ({results.length - visible} remaining)
              </button>
            </div>
          )}
        </>
      )}
    </section>
  );
}
