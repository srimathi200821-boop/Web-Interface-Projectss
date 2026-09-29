import React from "react";

export default function Footer({ onNavigate }) {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <div>
          <p className="footer-brand">SkillBridge</p>
          <p className="footer-tagline">Connecting skills with opportunities.</p>
        </div>

        <div className="footer-links">
          <button onClick={() => onNavigate("jobs")}>Browse jobs</button>
          <button onClick={() => onNavigate("matching")}>Smart match</button>
          <button onClick={() => onNavigate("resume")}>Resume analyzer</button>
        </div>
      </div>

      <p className="footer-bottom">© {new Date().getFullYear()} SkillBridge. All rights reserved.</p>
    </footer>
  );
}
