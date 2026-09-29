import React, { useState } from "react";
import PageHeader from "../components/PageHeader";
import EmptyState from "../components/EmptyState";
import { getPermission, isNotificationSupported, requestPermission, timeAgo } from "../utils/notifications";

export default function Notifications({ notifications, onMarkAllRead, onClear }) {
  const [permission, setPermission] = useState(getPermission());
  const supported = isNotificationSupported();

  const enable = async () => setPermission(await requestPermission());

  return (
    <section className="container section narrow">
      <PageHeader title="Notifications" description="Updates about your applications.">
        {notifications.length > 0 && (
          <div className="button-row">
            <button className="link-btn" onClick={onMarkAllRead}>Mark all read</button>
            <button className="link-btn" onClick={onClear}>Clear all</button>
          </div>
        )}
      </PageHeader>

      {!supported && (
        <p className="notice notice-warn">
          This browser does not support system notifications. Updates still appear in this list.
        </p>
      )}

      {supported && permission === "default" && (
        <div className="notice notice-action">
          <div>
            <strong>Turn on device notifications</strong>
            <p className="muted small">
              Get a system alert when an application status changes. On iPhone, first add this
              site to your Home Screen (Share, then Add to Home Screen).
            </p>
          </div>
          <button className="btn btn-primary btn-sm" onClick={enable}>Enable</button>
        </div>
      )}

      {supported && permission === "granted" && (
        <p className="notice notice-ok">Device notifications are on.</p>
      )}

      {supported && permission === "denied" && (
        <p className="notice notice-warn">
          Notifications are blocked for this site. Allow them in your browser's site settings.
        </p>
      )}

      {notifications.length === 0 ? (
        <EmptyState title="No notifications yet" message="Apply to a job and updates will appear here." />
      ) : (
        <ul className="notification-list">
          {notifications.map((item) => (
            <li className={item.read ? "notification" : "notification unread"} key={item.id}>
              <span className="notification-dot" aria-hidden="true" />
              <div>
                <p className="notification-title">{item.title}</p>
                <p className="muted">{item.body}</p>
                <p className="muted small">{timeAgo(item.time)}</p>
              </div>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
