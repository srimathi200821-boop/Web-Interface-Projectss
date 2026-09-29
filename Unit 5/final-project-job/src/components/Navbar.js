import React, { useEffect, useRef, useState } from "react";

const MEMBER_LINKS = [
  { id: "dashboard", label: "Dashboard" },
  { id: "jobs", label: "Jobs" },
  { id: "matching", label: "Smart match" },
  { id: "roadmap", label: "Roadmap" },
  { id: "resume", label: "Resume" },
  { id: "applications", label: "Applications" },
  { id: "saved", label: "Saved", badge: "saved" },
];

const GUEST_LINKS = [
  { id: "home", label: "Home" },
  { id: "jobs", label: "Jobs" },
];

function initials(name) {
  return name.split(/\s+/).filter(Boolean).slice(0, 2).map((part) => part[0].toUpperCase()).join("");
}

function UserMenu({ user, onNavigate, onLogout }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    if (!open) return undefined;

    const onPointerDown = (event) => !ref.current?.contains(event.target) && setOpen(false);
    const onKeyDown = (event) => event.key === "Escape" && setOpen(false);

    document.addEventListener("mousedown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("mousedown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  const go = (page) => {
    setOpen(false);
    onNavigate(page);
  };

  return (
    <div className="user-menu" ref={ref}>
      <button className="user-btn" onClick={() => setOpen((value) => !value)} aria-haspopup="menu" aria-expanded={open}>
        <span className="user-avatar">{initials(user.name)}</span>
        <span className="user-name">{user.name.split(" ")[0]}</span>
      </button>

      {open && (
        <div className="menu" role="menu">
          <div className="menu-head">
            <strong>{user.name}</strong>
            <span className="muted small">{user.email}</span>
          </div>
          <button role="menuitem" onClick={() => go("profile")}>My profile</button>
          <button role="menuitem" onClick={() => go("dashboard")}>Dashboard</button>
          <button role="menuitem" onClick={() => go("notifications")}>Notifications</button>
          <button role="menuitem" className="menu-danger" onClick={() => { setOpen(false); onLogout(); }}>Log out</button>
        </div>
      )}
    </div>
  );
}

export default function Navbar({ page, user, theme, onToggleTheme, onNavigate, onLogout, savedCount, unreadCount }) {
  const links = user ? MEMBER_LINKS : GUEST_LINKS;
  const badges = { saved: savedCount };

  return (
    <header className="navbar">
      <div className="navbar-inner">
        <button className="brand" onClick={() => onNavigate("home")} aria-label="SkillBridge home">
          Skill<span>Bridge</span>
        </button>

        <nav className="nav-links" aria-label="Main">
          {links.map((link) => {
            const count = link.badge ? badges[link.badge] : 0;
            return (
              <button
                key={link.id}
                className={page === link.id ? "nav-link active" : "nav-link"}
                aria-current={page === link.id ? "page" : undefined}
                onClick={() => onNavigate(link.id)}
              >
                {link.label}
                {count > 0 && <span className="nav-count">{count}</span>}
              </button>
            );
          })}
        </nav>

        <div className="nav-auth">
          <button
            className="icon-btn"
            onClick={onToggleTheme}
            aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
            title={theme === "dark" ? "Light mode" : "Dark mode"}
          >
            {theme === "dark" ? "☀" : "☾"}
          </button>

          {user ? (
            <>
              <button className="icon-btn bell" onClick={() => onNavigate("notifications")} aria-label={`Notifications, ${unreadCount} unread`}>
                🔔
                {unreadCount > 0 && <span className="bell-count">{unreadCount}</span>}
              </button>
              <UserMenu user={user} onNavigate={onNavigate} onLogout={onLogout} />
            </>
          ) : (
            <>
              <button className="btn btn-ghost btn-sm" onClick={() => onNavigate("login")}>Log in</button>
              <button className="btn btn-primary btn-sm" onClick={() => onNavigate("register")}>Sign up</button>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
