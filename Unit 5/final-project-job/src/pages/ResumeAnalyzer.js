import React, { useMemo, useState } from "react";
import PageHeader from "../components/PageHeader";
import { ALL_SKILLS, JOBS } from "../data/jobs";
import { containsSkill, rankJobs } from "../utils/matching";

const SECTION_KEYWORDS = ["education", "experience", "project", "skill", "certification", "certificate"];

function analyzeResume(text) {
  const skills = ALL_SKILLS.filter((skill) => containsSkill(text, skill));
  const wordCount = text.trim().split(/\s+/).filter(Boolean).length;
  const lower = text.toLowerCase();
  const sectionHits = SECTION_KEYWORDS.filter((keyword) => lower.includes(keyword)).length;

  const rawScore = skills.length * 7 + sectionHits * 5 + (wordCount > 80 ? 12 : 4);
  const score = Math.min(98, Math.max(42, rawScore));

  return {
    skills,
    wordCount,
    sectionHits,
    score,
    bestJobs: rankJobs(JOBS, skills).slice(0, 3),
  };
}

function buildTips(result, text) {
  const tips = [];
  if (result.skills.length < 5) tips.push("Add more technical skills that you can demonstrate.");
  if (!/project/i.test(text)) tips.push("Add one or two projects with the technologies used and measurable outcomes.");
  if (!/experience|intern/i.test(text)) tips.push("Add internship, freelance or volunteer experience if you have any.");
  if (!/certificat/i.test(text)) tips.push("Include relevant certifications and workshops.");
  if (!/achievement|hackathon|award/i.test(text)) tips.push("Add achievements, hackathons or competition results.");

  return tips.length
    ? tips
    : ["Your resume covers the main sections. Keep achievements measurable and concise."];
}

export default function ResumeAnalyzer({ resumeData, onSaveResume, onNavigate }) {
  const [resumeText, setResumeText] = useState(resumeData?.rawText ?? "");
  const [fileName, setFileName] = useState(resumeData?.fileName ?? "");
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  const tips = useMemo(() => (result ? buildTips(result, resumeText) : []), [result, resumeText]);

  const handleFile = (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setFileName(file.name);

    if (file.name.toLowerCase().endsWith(".txt")) {
      const reader = new FileReader();
      reader.onload = () => setResumeText(String(reader.result));
      reader.readAsText(file);
    } else {
      setError("Only .txt files can be read here. Please paste the text of your resume below.");
    }
  };

  const analyze = () => {
    if (!resumeText.trim()) {
      setError("Paste your resume text first.");
      return;
    }

    setError("");
    const analysis = analyzeResume(resumeText);
    setResult(analysis);
    onSaveResume({
      fileName: fileName || "Pasted resume",
      skills: analysis.skills,
      rawText: resumeText,
      analyzedAt: new Date().toISOString(),
    });
  };

  return (
    <section className="container section">
      <PageHeader
        title="Resume analyzer"
        description="Paste your resume to extract skills, check readiness and see the jobs you fit best."
      />

      <div className="grid grid-2">
        <div className="card stack">
          <h2>Your resume</h2>

          <label className="field">
            <span>Resume text</span>
            <textarea
              className="input textarea"
              value={resumeText}
              onChange={(event) => setResumeText(event.target.value)}
              placeholder={"B.E. Computer Science\nPython, Java, React, SQL\nProjects: Student Dashboard\nCertifications: Azure"}
            />
          </label>

          <div className="file-row">
            <label className="btn btn-ghost btn-sm">
              Upload .txt file
              <input type="file" accept=".txt" onChange={handleFile} hidden />
            </label>
            {fileName && <span className="muted small">{fileName}</span>}
          </div>

          {error && <p className="form-error" role="alert">{error}</p>}

          <div className="button-row">
            <button className="btn btn-primary" onClick={analyze}>Analyze resume</button>
          </div>
          <p className="muted small">Analysis runs entirely in your browser. Nothing is uploaded.</p>
        </div>

        <div className="card stack">
          <h2>Resume snapshot</h2>
          <p>
            <strong className="big-number">{result ? `${result.score}%` : "—"}</strong>{" "}
            <span className="muted">readiness</span>
          </p>

          <dl className="metrics">
            <div><dt>Detected skills</dt><dd>{result?.skills.length ?? 0}</dd></div>
            <div><dt>Sections found</dt><dd>{result?.sectionHits ?? 0}</dd></div>
            <div><dt>Word count</dt><dd>{result?.wordCount ?? 0}</dd></div>
          </dl>

          <div className="button-row">
            <button className="btn btn-secondary" onClick={() => onNavigate("dashboard")}>
              Open dashboard
            </button>
          </div>
        </div>
      </div>

      {result && (
        <div className="grid grid-3 results">
          <div className="card stack">
            <h2>Extracted skills</h2>
            {result.skills.length === 0 ? (
              <p className="muted">No known skills detected. Try listing them by name.</p>
            ) : (
              <div className="chip-row">
                {result.skills.map((skill) => (
                  <span className="chip chip-match" key={skill}>{skill}</span>
                ))}
              </div>
            )}
          </div>

          <div className="card stack">
            <h2>Suggestions</h2>
            <ul className="clean-list">
              {tips.map((tip) => <li key={tip}>{tip}</li>)}
            </ul>
          </div>

          <div className="card stack">
            <h2>Best job matches</h2>
            {result.bestJobs.map((job) => (
              <div className="mini-row" key={job.id}>
                <div>
                  <strong>{job.title}</strong>
                  <p className="muted small">{job.company} · {job.location}</p>
                </div>
                <strong>{job.score}%</strong>
              </div>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
