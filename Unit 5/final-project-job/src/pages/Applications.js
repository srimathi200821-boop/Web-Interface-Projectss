import React, { useMemo, useState } from "react";
import PageHeader from "../components/PageHeader";
import EmptyState from "../components/EmptyState";
import CompanyAvatar from "../components/CompanyAvatar";
import { APPLICATION_STATUSES, statusClass } from "../utils/jobs";
import { downloadCsv } from "../utils/csv";

const ALL = "All";

export default function Applications({ applications, onUpdateStatus, onWithdraw, onNavigate }) {
  const [filter, setFilter] = useState(ALL);
  const [confirmId, setConfirmId] = useState(null);

  const counts = useMemo(() => {
    const result = { [ALL]: applications.length };
    APPLICATION_STATUSES.forEach((status) => {
      result[status] = applications.filter((item) => item.status === status).length;
    });
    return result;
  }, [applications]);

  const visible = filter === ALL ? applications : applications.filter((item) => item.status === filter);

  const exportCsv = () =>
    downloadCsv(
      "skillbridge-applications.csv",
      applications.map((item) => ({
        Job: item.title,
        Company: item.company,
        Location: item.location,
        Status: item.status,
        "Applied on": new Date(item.appliedDate).toLocaleDateString(),
      }))
    );

  return (
    <section className="container section">
      <PageHeader title="My applications" description="Track every job you have applied to and update its progress.">
        {applications.length > 0 && (
          <button className="btn btn-secondary btn-sm" onClick={exportCsv}>Export CSV</button>
        )}
      </PageHeader>

      {applications.length === 0 ? (
        <EmptyState
          title="No applications yet"
          message="Apply to a job and it will show up here."
          actionLabel="Browse jobs"
          onAction={() => onNavigate("jobs")}
        />
      ) : (
        <>
          <div className="tabs" role="tablist">
            {[ALL, ...APPLICATION_STATUSES].map((status) => (
              <button
                key={status}
                role="tab"
                aria-selected={filter === status}
                className={filter === status ? "tab active" : "tab"}
                onClick={() => setFilter(status)}
              >
                {status} <span className="tab-count">{counts[status]}</span>
              </button>
            ))}
          </div>

          {visible.length === 0 ? (
            <EmptyState title={`No "${filter}" applications`} message="Change an application's status to see it here." />
          ) : (
            <div className="stack">
              {visible.map((item) => (
                <article className="card row-card" key={item.jobId}>
                  <div className="job-identity">
                    <CompanyAvatar name={item.company} />
                    <div>
                      <h3>{item.title}</h3>
                      <p className="job-company">{item.company}</p>
                      <p className="muted small">
                        {item.location} · Applied on {new Date(item.appliedDate).toLocaleDateString()}
                      </p>
                    </div>
                  </div>

                  <div className="row-actions">
                    <span className={statusClass(item.status)}>{item.status}</span>

                    <select
                      className="input input-inline"
                      aria-label={`Update status for ${item.title}`}
                      value={item.status}
                      onChange={(event) => onUpdateStatus(item.jobId, event.target.value)}
                    >
                      {APPLICATION_STATUSES.map((status) => <option key={status} value={status}>{status}</option>)}
                    </select>

                    {confirmId === item.jobId ? (
                      <span className="button-row">
                        <button className="btn btn-danger btn-sm" onClick={() => { onWithdraw(item.jobId); setConfirmId(null); }}>
                          Confirm
                        </button>
                        <button className="btn btn-ghost btn-sm" onClick={() => setConfirmId(null)}>Cancel</button>
                      </span>
                    ) : (
                      <button className="btn btn-ghost btn-sm" onClick={() => setConfirmId(item.jobId)}>Withdraw</button>
                    )}
                  </div>
                </article>
              ))}
            </div>
          )}
        </>
      )}
    </section>
  );
}
