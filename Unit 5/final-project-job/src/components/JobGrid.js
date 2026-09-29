import React from "react";
import JobCard from "./JobCard";

/** Renders a list of jobs and derives the applied / saved state for each card. */
export default function JobGrid({ jobs, applications, savedJobIds, onApply, onToggleSave, onViewJob, showScore }) {
  const appliedIds = new Set(applications.map((item) => item.jobId));

  return (
    <div className="grid grid-3">
      {jobs.map((job) => (
        <JobCard
          key={job.id}
          job={job}
          score={showScore ? job.score : undefined}
          applied={appliedIds.has(job.id)}
          saved={savedJobIds.includes(job.id)}
          onApply={onApply}
          onToggleSave={onToggleSave}
          onView={onViewJob}
        />
      ))}
    </div>
  );
}
