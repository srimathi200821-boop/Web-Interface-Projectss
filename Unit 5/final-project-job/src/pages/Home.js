import React from "react";
import JobGrid from "../components/JobGrid";
import { COMPANIES, CITIES, JOBS } from "../data/jobs";

const STATS = [
  { value: JOBS.length, label: "Open roles" },
  { value: COMPANIES.length, label: "Hiring companies" },
  { value: CITIES.length - 1, label: "Cities across India" },
];

const STEPS = [
  { title: "Add your skills", text: "Pick your skills or paste your resume." },
  { title: "See your matches", text: "Every job shows a match score and the skills you are missing." },
  { title: "Apply and track", text: "Apply in one click and follow each application to an offer." },
];

const FEATURES = [
  { title: "Search that understands skills", text: "Find jobs by title, company, city or the skills you already have." },
  { title: "Smart matching", text: "See a match percentage for every role and exactly which skills are missing." },
  { title: "Resume analyzer", text: "Paste your resume to extract skills and get concrete suggestions." },
  { title: "Career roadmap", text: "Pick a target role and follow a step-by-step learning checklist." },
  { title: "One-click apply", text: "Apply and save jobs, then track every application in one place." },
  { title: "Status alerts", text: "Get notified when an application moves forward." },
];

export default function Home({ jobs, onNavigate, ...jobProps }) {
  return (
    <>
      <section className="hero">
        <div className="hero-inner">
          <h1>Find the job your skills already qualify you for.</h1>
          <p>
            SkillBridge matches your skills to open roles across India, shows what you are
            missing, and builds a plan to close the gap.
          </p>
          <div className="button-row center-row">
            <button className="btn btn-primary" onClick={() => onNavigate("jobs")}>
              Browse jobs
            </button>
            <button className="btn btn-secondary" onClick={() => onNavigate("matching")}>
              Match my skills
            </button>
          </div>

          <dl className="hero-stats">
            {STATS.map((stat) => (
              <div key={stat.label}>
                <dt>{stat.label}</dt>
                <dd>{stat.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section className="container section">
        <h2 className="section-title">How it works</h2>
        <ol className="grid grid-3 steps">
          {STEPS.map((step, index) => (
            <li className="card" key={step.title}>
              <span className="step-marker" aria-hidden="true">{index + 1}</span>
              <h3>{step.title}</h3>
              <p className="muted">{step.text}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="container section">
        <h2 className="section-title">Everything you need to get hired</h2>
        <div className="grid grid-3">
          {FEATURES.map((feature) => (
            <div className="card" key={feature.title}>
              <h3>{feature.title}</h3>
              <p className="muted">{feature.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="container section">
        <h2 className="section-title">Featured jobs</h2>
        <JobGrid jobs={jobs} {...jobProps} />
        <div className="center-row section-action">
          <button className="btn btn-secondary" onClick={() => onNavigate("jobs")}>
            View all jobs
          </button>
        </div>
      </section>
    </>
  );
}
