import React, { useState } from "react";

const MIN_PASSWORD_LENGTH = 6;

export default function Register({ onRegister, onNavigate }) {
  const [form, setForm] = useState({ name: "", email: "", password: "", confirmPassword: "" });
  const [error, setError] = useState("");

  const update = (field) => (event) => setForm((previous) => ({ ...previous, [field]: event.target.value }));

  const handleSubmit = (event) => {
    event.preventDefault();
    const { name, email, password, confirmPassword } = form;

    if (!name.trim() || !email.trim() || !password || !confirmPassword) {
      return setError("Fill in all fields.");
    }
    if (password.length < MIN_PASSWORD_LENGTH) {
      return setError(`Password must be at least ${MIN_PASSWORD_LENGTH} characters.`);
    }
    if (password !== confirmPassword) {
      return setError("Passwords do not match.");
    }

    const result = onRegister({ name, email, password });
    if (!result.ok) setError(result.error);
  };

  return (
    <section className="auth-page">
      <div className="card auth-card">
        <h1>Create your account</h1>
        <p className="muted">Join SkillBridge and get jobs matched to your skills.</p>

        <form className="stack" onSubmit={handleSubmit} noValidate>
          <label className="field">
            <span>Full name</span>
            <input className="input" type="text" autoComplete="name" placeholder="Your full name"
              value={form.name} onChange={update("name")} />
          </label>

          <label className="field">
            <span>Email</span>
            <input className="input" type="email" autoComplete="email" placeholder="you@example.com"
              value={form.email} onChange={update("email")} />
          </label>

          <label className="field">
            <span>Password</span>
            <input className="input" type="password" autoComplete="new-password" placeholder={`At least ${MIN_PASSWORD_LENGTH} characters`}
              value={form.password} onChange={update("password")} />
          </label>

          <label className="field">
            <span>Confirm password</span>
            <input className="input" type="password" autoComplete="new-password" placeholder="Re-enter your password"
              value={form.confirmPassword} onChange={update("confirmPassword")} />
          </label>

          {error && <p className="form-error" role="alert">{error}</p>}

          <button className="btn btn-primary btn-block" type="submit">Create account</button>
        </form>

        <p className="auth-switch muted">
          Already have an account?{" "}
          <button className="link-btn" onClick={() => onNavigate("login")}>Log in</button>
        </p>
      </div>
    </section>
  );
}
