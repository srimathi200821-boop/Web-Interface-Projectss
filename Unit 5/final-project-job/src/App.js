import React, { useCallback, useEffect, useRef, useState } from "react";
import "./App.css";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Toast from "./components/Toast";

import Home from "./pages/Home";
import JobSearch from "./pages/JobSearch";
import SmartMatching from "./pages/SmartMatching";
import CareerRoadmap from "./pages/CareerRoadmap";
import ResumeAnalyzer from "./pages/ResumeAnalyzer";
import Applications from "./pages/Applications";
import SavedJobs from "./pages/SavedJobs";
import Notifications from "./pages/Notifications";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import JobDetailsModal from "./components/JobDetailsModal";
import Login from "./pages/Login";
import Register from "./pages/Register";

import { JOBS } from "./data/jobs";
import usePersistentState from "./hooks/usePersistentState";
import { fireNotification } from "./utils/notifications";

const PROTECTED_PAGES = new Set([
  "dashboard",
  "matching",
  "roadmap",
  "resume",
  "applications",
  "saved",
  "notifications",
  "profile",
]);

const EMPTY_PROFILE = {
  headline: "",
  location: "",
  phone: "",
  preferredRole: "",
  expectedSalary: "",
  linkedin: "",
  bio: "",
};

const STATUS_UPDATE_DELAY_MS = 20000;

function Workspace({
  user,
  theme,
  onToggleTheme,
  onLogin,
  onRegister,
  onLogout,
}) {
  const userKey = user?.email ?? "guest";

  const [page, setPage] = useState(user ? "dashboard" : "home");

  const [applications, setApplications] = usePersistentState(
    `sb:${userKey}:applications`,
    []
  );

  const [savedJobIds, setSavedJobIds] = usePersistentState(
    `sb:${userKey}:saved`,
    []
  );

  const [skills, setSkills] = usePersistentState(
    `sb:${userKey}:skills`,
    []
  );

  const [resumeData, setResumeData] = usePersistentState(
    `sb:${userKey}:resume`,
    null
  );

  const [roadmapDone, setRoadmapDone] = usePersistentState(
    `sb:${userKey}:roadmap`,
    []
  );

  const [notifications, setNotifications] = usePersistentState(
    `sb:${userKey}:notifications`,
    []
  );

  const [profile, setProfile] = usePersistentState(
    `sb:${userKey}:profile`,
    EMPTY_PROFILE
  );

  const [viewJobId, setViewJobId] = useState(null);

  /* ===== Applicant Details ===== */

  const [applicantJobId, setApplicantJobId] = useState(null);

  const [applicantForm, setApplicantForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    location: "",
    preferredRole: "",
    linkedin: "",
    resumeStatus: "",
    note: "",
  });

  const [toast, setToast] = useState(null);

  const toastTimer = useRef(null);
  const statusTimers = useRef([]);

  useEffect(() => {
    const timers = statusTimers.current;

    return () => {
      clearTimeout(toastTimer.current);
      timers.forEach(clearTimeout);
    };
  }, []);

  const showToast = useCallback((message, type = "info") => {
    clearTimeout(toastTimer.current);

    setToast({
      message,
      type,
    });

    toastTimer.current = setTimeout(() => {
      setToast(null);
    }, 3200);
  }, []);

  const notify = useCallback(
    (title, body) => {
      const notification = fireNotification(title, body);

      setNotifications((previous) =>
        [notification, ...previous].slice(0, 50)
      );
    },
    [setNotifications]
  );

  const navigate = useCallback(
    (nextPage) => {
      let target = nextPage;

      if (PROTECTED_PAGES.has(nextPage) && !user) {
        showToast("Log in to continue.");
        target = "login";
      }

      setViewJobId(null);
      setApplicantJobId(null);

      setPage(target);

      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    },
    [user, showToast]
  );

  const requireLogin = (message) => {
    showToast(message);
    setPage("login");
  };

  /* =====================================================
     APPLY NOW
     ===================================================== */

  const openApplicantForm = (job) => {
    if (!user) {
      return requireLogin("Log in to apply for jobs.");
    }

    const alreadyApplied = applications.some(
      (item) => item.jobId === job.id
    );

    if (alreadyApplied) {
      return showToast("You have already applied to this job.");
    }

    setViewJobId(null);

    setApplicantForm({
      fullName: user.name || "",
      email: user.email || "",
      phone: profile.phone || "",
      location: profile.location || job.location || "",
      preferredRole: profile.preferredRole || job.title || "",
      linkedin: profile.linkedin || "",
      resumeStatus: resumeData ? "Resume analyzed" : "Resume not uploaded",
      note: "",
    });

    setApplicantJobId(job.id);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const closeApplicantForm = () => {
    setApplicantJobId(null);
  };

  const handleApplicantChange = (event) => {
    const { name, value } = event.target;

    setApplicantForm((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  /* =====================================================
     APPLICATION READINESS
     ===================================================== */

  const getReadinessScore = () => {
    const fields = [
      applicantForm.fullName,
      applicantForm.email,
      applicantForm.phone,
      applicantForm.location,
      applicantForm.preferredRole,
      applicantForm.linkedin,
      resumeData,
    ];

    const completed = fields.filter(Boolean).length;

    return Math.round((completed / fields.length) * 100);
  };

  /* =====================================================
     SUBMIT APPLICATION
     ===================================================== */

  const submitApplication = (event) => {
    event.preventDefault();

    const job = JOBS.find((item) => item.id === applicantJobId);

    if (!job) {
      return;
    }

    if (!applicantForm.fullName.trim()) {
      return showToast("Please enter your full name.");
    }

    if (!applicantForm.email.trim()) {
      return showToast("Please enter your email.");
    }

    if (!applicantForm.phone.trim()) {
      return showToast("Please enter your phone number.");
    }

    if (!applicantForm.location.trim()) {
      return showToast("Please enter your location.");
    }

    const readinessScore = getReadinessScore();

    const application = {
      jobId: job.id,
      title: job.title,
      company: job.company,
      location: job.location,
      status: "Applied",
      appliedDate: new Date().toISOString(),

      /* Applicant information */
      applicant: {
        fullName: applicantForm.fullName.trim(),
        email: applicantForm.email.trim(),
        phone: applicantForm.phone.trim(),
        location: applicantForm.location.trim(),
        preferredRole: applicantForm.preferredRole.trim(),
        linkedin: applicantForm.linkedin.trim(),
        resumeStatus: applicantForm.resumeStatus,
        note: applicantForm.note.trim(),
        readinessScore,
      },
    };

    setApplications((previous) => [
      application,
      ...previous,
    ]);

    notify(
      "Application submitted",
      `You applied to ${job.title} at ${job.company}.`
    );

    showToast(
      `Application submitted to ${job.company}.`,
      "success"
    );

    setApplicantJobId(null);

    /*
      Demo feature:
      after 20 seconds application automatically
      changes from Applied → Under review.
    */

    const timer = setTimeout(() => {
      setApplications((previous) =>
        previous.map((item) =>
          item.jobId === job.id &&
          item.status === "Applied"
            ? {
                ...item,
                status: "Under review",
              }
            : item
        )
      );

      notify(
        "Application update",
        `${job.company} is reviewing your application for ${job.title}.`
      );
    }, STATUS_UPDATE_DELAY_MS);

    statusTimers.current.push(timer);
  };

  /* =====================================================
     SAVE JOB
     ===================================================== */

  const toggleSaveJob = (job) => {
    if (!user) {
      return requireLogin("Log in to save jobs.");
    }

    setSavedJobIds((previous) =>
      previous.includes(job.id)
        ? previous.filter((id) => id !== job.id)
        : [...previous, job.id]
    );
  };

  /* =====================================================
     APPLICATION STATUS
     ===================================================== */

  const updateApplicationStatus = (jobId, status) => {
    const target = applications.find(
      (item) => item.jobId === jobId
    );

    if (!target || target.status === status) {
      return;
    }

    setApplications((previous) =>
      previous.map((item) =>
        item.jobId === jobId
          ? {
              ...item,
              status,
            }
          : item
      )
    );

    notify(
      "Status updated",
      `${target.title} at ${target.company} is now "${status}".`
    );

    showToast(
      `Status changed to ${status}.`,
      "success"
    );
  };

  const withdrawApplication = (jobId) => {
    setApplications((previous) =>
      previous.filter((item) => item.jobId !== jobId)
    );

    showToast("Application withdrawn.");
  };

  /* =====================================================
     PROFILE
     ===================================================== */

  const saveProfile = (nextProfile) => {
    setProfile(nextProfile);

    showToast(
      "Profile saved.",
      "success"
    );
  };

  const saveSkills = (nextSkills) => {
    setSkills(nextSkills);

    showToast(
      "Skill profile saved.",
      "success"
    );
  };

  const saveResume = (data) => {
    setResumeData(data);

    setSkills((previous) =>
      Array.from(
        new Set([
          ...previous,
          ...data.skills,
        ])
      )
    );
  };

  const toggleRoadmapSkill = (skill) => {
    setRoadmapDone((previous) =>
      previous.includes(skill)
        ? previous.filter((item) => item !== skill)
        : [...previous, skill]
    );
  };

  /* =====================================================
     NOTIFICATIONS
     ===================================================== */

  const markAllRead = () =>
    setNotifications((previous) =>
      previous.map((item) => ({
        ...item,
        read: true,
      }))
    );

  const clearNotifications = () =>
    setNotifications([]);

  /* =====================================================
     JOB CARD PROPS
     ===================================================== */

  const jobCardProps = {
    applications,
    savedJobIds,
    onApply: openApplicantForm,
    onToggleSave: toggleSaveJob,
    onViewJob: (job) =>
      setViewJobId(job.id),
    skills,
  };

  const viewJob =
    JOBS.find(
      (job) => job.id === viewJobId
    ) ?? null;

  const applicantJob =
    JOBS.find(
      (job) => job.id === applicantJobId
    ) ?? null;

  const unreadCount =
    notifications.filter(
      (item) => !item.read
    ).length;

  /* =====================================================
     PAGE RENDER
     ===================================================== */

  const renderPage = () => {
    switch (page) {
      case "jobs":
        return (
          <JobSearch
            jobs={JOBS}
            {...jobCardProps}
          />
        );

      case "matching":
        return (
          <SmartMatching
            savedSkills={skills}
            onSaveSkills={saveSkills}
            onNavigate={navigate}
            {...jobCardProps}
          />
        );

      case "roadmap":
        return (
          <CareerRoadmap
            skills={skills}
            completed={roadmapDone}
            onToggleSkill={toggleRoadmapSkill}
            onNavigate={navigate}
          />
        );

      case "resume":
        return (
          <ResumeAnalyzer
            resumeData={resumeData}
            onSaveResume={saveResume}
            onNavigate={navigate}
          />
        );

      case "applications":
        return (
          <Applications
            applications={applications}
            onUpdateStatus={updateApplicationStatus}
            onWithdraw={withdrawApplication}
            onNavigate={navigate}
          />
        );

      case "saved":
        return (
          <SavedJobs
            onNavigate={navigate}
            {...jobCardProps}
          />
        );

      case "notifications":
        return (
          <Notifications
            notifications={notifications}
            onMarkAllRead={markAllRead}
            onClear={clearNotifications}
          />
        );

      case "dashboard":
        return (
          <Dashboard
            user={user}
            skills={skills}
            profile={profile}
            resumeData={resumeData}
            applications={applications}
            savedJobIds={savedJobIds}
            onNavigate={navigate}
          />
        );

      case "profile":
        return (
          <Profile
            user={user}
            profile={profile}
            skills={skills}
            onSave={saveProfile}
            onNavigate={navigate}
          />
        );

      case "login":
        return (
          <Login
            onLogin={onLogin}
            onNavigate={navigate}
          />
        );

      case "register":
        return (
          <Register
            onRegister={onRegister}
            onNavigate={navigate}
          />
        );

      default:
        return (
          <Home
            jobs={JOBS.slice(0, 6)}
            onNavigate={navigate}
            {...jobCardProps}
          />
        );
    }
  };

  /* =====================================================
     RETURN
     ===================================================== */

  return (
    <div className="app">
      <Navbar
        page={page}
        user={user}
        theme={theme}
        onToggleTheme={onToggleTheme}
        onNavigate={navigate}
        onLogout={onLogout}
        savedCount={savedJobIds.length}
        unreadCount={unreadCount}
      />

      <main className="main">
        {renderPage()}
      </main>

      <Footer
        onNavigate={navigate}
      />

      {/* =================================================
          JOB DETAILS MODAL
         ================================================= */}

      {viewJob && (
        <JobDetailsModal
          job={viewJob}
          skills={skills}
          applied={applications.some(
            (item) =>
              item.jobId === viewJob.id
          )}
          saved={savedJobIds.includes(
            viewJob.id
          )}
          onApply={openApplicantForm}
          onToggleSave={toggleSaveJob}
          onViewJob={(job) =>
            setViewJobId(job.id)
          }
          onClose={() =>
            setViewJobId(null)
          }
        />
      )}

      {/* =================================================
          APPLICANT DETAILS MODAL
         ================================================= */}

      {applicantJob && (
        <div
          className="modal-backdrop applicant-backdrop"
          onMouseDown={(event) => {
            if (
              event.target ===
              event.currentTarget
            ) {
              closeApplicantForm();
            }
          }}
        >
          <form
            className="modal applicant-modal"
            onSubmit={submitApplication}
          >
            <div className="modal-header">
              <div>
                <div className="smart-apply-label">
                  SMART APPLY
                </div>

                <h2>
                  Applicant Details
                </h2>

                <p className="muted">
                  {applicantJob.title}
                  {" • "}
                  {applicantJob.company}
                </p>
              </div>

              <button
                type="button"
                className="icon-btn icon-btn-plain"
                onClick={
                  closeApplicantForm
                }
                aria-label="Close"
              >
                ×
              </button>
            </div>

            {/* Job summary */}

            <div className="applicant-job-card">
              <div className="applicant-job-info">
                <div className="avatar applicant-avatar">
                  {applicantJob.company
                    ?.charAt(0)
                    ?.toUpperCase()}
                </div>

                <div>
                  <strong>
                    {applicantJob.title}
                  </strong>

                  <span>
                    {applicantJob.company}
                  </span>

                  <span>
                    {applicantJob.location}
                  </span>
                </div>
              </div>

              <div className="applicant-job-tag">
                Applying
              </div>
            </div>

            {/* Readiness */}

            <div className="readiness-card">
              <div className="readiness-top">
                <div>
                  <strong>
                    Application Readiness
                  </strong>

                  <p>
                    Complete your information
                    before submitting.
                  </p>
                </div>

                <strong className="readiness-score">
                  {getReadinessScore()}%
                </strong>
              </div>

              <div className="readiness-track">
                <span
                  style={{
                    width: `${getReadinessScore()}%`,
                  }}
                />
              </div>

              <small>
                Your profile, resume and
                contact details are used to
                prepare the application.
              </small>
            </div>

            {/* Applicant fields */}

            <div className="applicant-section">
              <div className="applicant-section-title">
                <span>
                  01
                </span>

                <div>
                  <h3>
                    Personal Information
                  </h3>

                  <p>
                    Make sure your details
                    are correct.
                  </p>
                </div>
              </div>

              <div className="form-grid applicant-form-grid">
                <label className="field">
                  <span>
                    Full Name *
                  </span>

                  <input
                    className="input"
                    name="fullName"
                    value={
                      applicantForm.fullName
                    }
                    onChange={
                      handleApplicantChange
                    }
                    placeholder="Enter your full name"
                  />
                </label>

                <label className="field">
                  <span>
                    Email *
                  </span>

                  <input
                    className="input"
                    type="email"
                    name="email"
                    value={
                      applicantForm.email
                    }
                    onChange={
                      handleApplicantChange
                    }
                    placeholder="Enter your email"
                  />
                </label>

                <label className="field">
                  <span>
                    Phone Number *
                  </span>

                  <input
                    className="input"
                    type="tel"
                    name="phone"
                    value={
                      applicantForm.phone
                    }
                    onChange={
                      handleApplicantChange
                    }
                    placeholder="+91 XXXXX XXXXX"
                  />
                </label>

                <label className="field">
                  <span>
                    Location *
                  </span>

                  <input
                    className="input"
                    name="location"
                    value={
                      applicantForm.location
                    }
                    onChange={
                      handleApplicantChange
                    }
                    placeholder="City, State"
                  />
                </label>

                <label className="field">
                  <span>
                    Preferred Role
                  </span>

                  <input
                    className="input"
                    name="preferredRole"
                    value={
                      applicantForm.preferredRole
                    }
                    onChange={
                      handleApplicantChange
                    }
                    placeholder="Frontend Developer"
                  />
                </label>

                <label className="field">
                  <span>
                    LinkedIn Profile
                  </span>

                  <input
                    className="input"
                    name="linkedin"
                    value={
                      applicantForm.linkedin
                    }
                    onChange={
                      handleApplicantChange
                    }
                    placeholder="https://linkedin.com/in/..."
                  />
                </label>
              </div>
            </div>

            {/* Career details */}

            <div className="applicant-section">
              <div className="applicant-section-title">
                <span>
                  02
                </span>

                <div>
                  <h3>
                    Career Details
                  </h3>

                  <p>
                    Give the recruiter useful
                    information.
                  </p>
                </div>
              </div>

              <div className="applicant-info-grid">
                <div className="applicant-info-item">
                  <span>
                    Resume
                  </span>

                  <strong>
                    {resumeData
                      ? "✓ Resume analyzed"
                      : "○ Resume not uploaded"}
                  </strong>
                </div>

                <div className="applicant-info-item">
                  <span>
                    Skills
                  </span>

                  <strong>
                    {skills.length > 0
                      ? `${skills.length} skills added`
                      : "No skills added"}
                  </strong>
                </div>

                <div className="applicant-info-item">
                  <span>
                    Preferred Role
                  </span>

                  <strong>
                    {applicantForm.preferredRole ||
                      "Not specified"}
                  </strong>
                </div>

                <div className="applicant-info-item">
                  <span>
                    Profile Status
                  </span>

                  <strong>
                    {getReadinessScore() >= 70
                      ? "Ready to apply"
                      : "Needs more details"}
                  </strong>
                </div>
              </div>

              <label className="field applicant-note-field">
                <span>
                  Message to Recruiter
                </span>

                <textarea
                  className="input textarea textarea-sm"
                  name="note"
                  value={
                    applicantForm.note
                  }
                  onChange={
                    handleApplicantChange
                  }
                  placeholder="Tell the recruiter why you are interested in this role..."
                />
              </label>
            </div>

            {/* Footer */}

            <div className="applicant-consent">
              <span className="applicant-check">
                ✓
              </span>

              <p>
                I confirm that the information
                provided above is accurate and
                can be shared with the employer
                for this application.
              </p>
            </div>

            <div className="modal-footer applicant-footer">
              <button
                type="button"
                className="btn btn-ghost"
                onClick={
                  closeApplicantForm
                }
              >
                Cancel
              </button>

              <button
                type="submit"
                className="btn btn-primary"
              >
                Submit Application
              </button>
            </div>
          </form>
        </div>
      )}

      <Toast toast={toast} />
    </div>
  );
}

/* =====================================================
   MAIN APP
   ===================================================== */

export default function App() {
  const [storedTheme, setStoredTheme] =
    usePersistentState(
      "sb:theme",
      null
    );

  const theme =
    storedTheme ??
    (window.matchMedia?.(
      "(prefers-color-scheme: dark)"
    ).matches
      ? "dark"
      : "light");

  useEffect(() => {
    document.documentElement.dataset.theme =
      theme;
  }, [theme]);

  const toggleTheme = () =>
    setStoredTheme(
      theme === "dark"
        ? "light"
        : "dark"
    );

  const [users, setUsers] =
    usePersistentState(
      "sb:users",
      []
    );

  const [session, setSession] =
    usePersistentState(
      "sb:session",
      null
    );

  /* Demo authentication */

  const register = ({
    name,
    email,
    password,
  }) => {
    const normalizedEmail =
      email.trim().toLowerCase();

    if (
      users.some(
        (item) =>
          item.email ===
          normalizedEmail
      )
    ) {
      return {
        ok: false,
        error:
          "An account with this email already exists.",
      };
    }

    const account = {
      name: name.trim(),
      email: normalizedEmail,
      password,
    };

    setUsers((previous) => [
      ...previous,
      account,
    ]);

    setSession({
      name: account.name,
      email: account.email,
    });

    return {
      ok: true,
    };
  };

  const login = ({
    email,
    password,
  }) => {
    const normalizedEmail =
      email.trim().toLowerCase();

    const account = users.find(
      (item) =>
        item.email ===
        normalizedEmail
    );

    if (
      !account ||
      account.password !== password
    ) {
      return {
        ok: false,
        error:
          "Incorrect email or password.",
      };
    }

    setSession({
      name: account.name,
      email: account.email,
    });

    return {
      ok: true,
    };
  };

  const logout = () =>
    setSession(null);

  return (
    <Workspace
      key={session?.email ?? "guest"}
      user={session}
      theme={theme}
      onToggleTheme={toggleTheme}
      onLogin={login}
      onRegister={register}
      onLogout={logout}
    />
  );
}