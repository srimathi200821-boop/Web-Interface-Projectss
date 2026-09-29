import React from "react";
import PageHeader from "../components/PageHeader";
import JobGrid from "../components/JobGrid";
import EmptyState from "../components/EmptyState";
import { JOBS } from "../data/jobs";

export default function SavedJobs({ onNavigate, ...jobProps }) {
  const savedJobs = JOBS.filter((job) => jobProps.savedJobIds.includes(job.id));

  return (
    <section className="container section">
      <PageHeader title="Saved jobs" description="Your shortlist of opportunities to come back to." />

      {savedJobs.length === 0 ? (
        <EmptyState
          title="No saved jobs yet"
          message="Select Save on any job to add it to your shortlist."
          actionLabel="Browse jobs"
          onAction={() => onNavigate("jobs")}
        />
      ) : (
        <JobGrid jobs={savedJobs} {...jobProps} />
      )}
    </section>
  );
}
