import React from "react";

export default function EmptyState({ title, message, actionLabel, onAction }) {
  return (
    <div className="empty">
      <h2>{title}</h2>
      <p>{message}</p>
      {actionLabel && (
        <button className="btn btn-primary" onClick={onAction}>
          {actionLabel}
        </button>
      )}
    </div>
  );
}
