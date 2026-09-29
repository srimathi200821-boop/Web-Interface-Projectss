import React, { useState } from "react";

export default function Login({ onLogin, onNavigate }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!email.trim() || !password) {
      setError("Enter your email and password.");
      return;
    }

    const result = onLogin({ email, password });
    if (!result.ok) setError(result.error);
  };

  return (
    <section className="auth-page">
      <div className="card auth-card">
        <h1>Welcome back</h1>
        <p className="muted">Log in to manage your applications.</p>

        <form className="stack" onSubmit={handleSubmit} noValidate>
          <label className="field">
            <span>Email</span>
            <input className="input" type="email" autoComplete="email" placeholder="you@example.com"
              value={email} onChange={(event) => setEmail(event.target.value)} />
          </label>

          <label className="field">
            <span>Password</span>
            <input className="input" type="password" autoComplete="current-password" placeholder="Your password"
              value={password} onChange={(event) => setPassword(event.target.value)} />
          </label>

          {error && <p className="form-error" role="alert">{error}</p>}

          <button className="btn btn-primary btn-block" type="submit">Log in</button>
        </form>

        <p className="auth-switch muted">
          New to SkillBridge?{" "}
          <button className="link-btn" onClick={() => onNavigate("register")}>Create an account</button>
        </p>
      </div>
    </section>
  );
}
