import React, { useState } from "react";
import PageHeader from "../components/PageHeader";

const FIELDS = [
  { name: "headline", label: "Professional headline", placeholder: "e.g. Final-year CSE student | React developer" },
  { name: "preferredRole", label: "Preferred role", placeholder: "e.g. Frontend Developer" },
  { name: "location", label: "Current location", placeholder: "e.g. Chennai, Tamil Nadu" },
  { name: "phone", label: "Phone", placeholder: "e.g. +91 98765 43210", type: "tel" },
  { name: "expectedSalary", label: "Expected salary (LPA)", placeholder: "e.g. 6" },
  { name: "linkedin", label: "LinkedIn URL", placeholder: "https://linkedin.com/in/your-name", type: "url" },
];

export default function Profile({ user, profile, skills, onSave, onNavigate }) {
  const [form, setForm] = useState(profile);
  const [error, setError] = useState("");

  const update = (name) => (event) => setForm((previous) => ({ ...previous, [name]: event.target.value }));
  const dirty = JSON.stringify(form) !== JSON.stringify(profile);
  const filled = Object.values(form).filter((value) => value.trim()).length;
  const completion = Math.round((filled / Object.keys(form).length) * 100);

  const handleSubmit = (event) => {
    event.preventDefault();

    if (form.linkedin.trim() && !/^https?:\/\//i.test(form.linkedin.trim())) {
      return setError("LinkedIn URL must start with http:// or https://");
    }
    if (form.expectedSalary.trim() && Number.isNaN(Number(form.expectedSalary))) {
      return setError("Expected salary must be a number.");
    }

    setError("");
    onSave(form);
  };

  return (
    <section className="container section">
      <PageHeader title="My profile" description="Keep your details up to date so your applications look complete." />

      <div className="grid grid-profile">
        <form className="card stack" onSubmit={handleSubmit} noValidate>
          <div className="form-grid">
            {FIELDS.map((field) => (
              <label className="field" key={field.name}>
                <span>{field.label}</span>
                <input
                  className="input"
                  type={field.type || "text"}
                  placeholder={field.placeholder}
                  value={form[field.name]}
                  onChange={update(field.name)}
                />
              </label>
            ))}
          </div>

          <label className="field">
            <span>About you</span>
            <textarea
              className="input textarea textarea-sm"
              placeholder="Write two or three lines about your background and goals."
              value={form.bio}
              onChange={update("bio")}
            />
          </label>

          {error && <p className="form-error" role="alert">{error}</p>}

          <div className="button-row">
            <button className="btn btn-primary" type="submit" disabled={!dirty}>Save profile</button>
            <button className="btn btn-ghost" type="button" onClick={() => setForm(profile)} disabled={!dirty}>Discard changes</button>
          </div>
        </form>

        <aside className="stack">
          <div className="card stack">
            <h2>{user.name}</h2>
            <p className="muted">{user.email}</p>
            <div>
              <p><strong>{completion}%</strong> <span className="muted">profile details filled</span></p>
              <div className="progress"><span style={{ width: `${completion}%` }} /></div>
            </div>
          </div>

          <div className="card stack">
            <h2>Your skills</h2>
            {skills.length === 0 ? (
              <p className="muted">No skills added yet.</p>
            ) : (
              <div className="chip-row">{skills.map((skill) => <span className="chip chip-match" key={skill}>{skill}</span>)}</div>
            )}
            <div className="button-row">
              <button className="btn btn-secondary btn-sm" onClick={() => onNavigate("matching")}>Edit skills</button>
              <button className="btn btn-ghost btn-sm" onClick={() => onNavigate("resume")}>Analyze resume</button>
            </div>
          </div>
        </aside>
      </div>
    </section>
  );
}
