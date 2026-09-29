import React from "react";

const COLORS = ["#2563eb", "#0f766e", "#7c3aed", "#b45309", "#be123c", "#0369a1", "#4d7c0f", "#a21caf"];

function colorFor(name) {
  const hash = [...name].reduce((sum, char) => sum + char.charCodeAt(0), 0);
  return COLORS[hash % COLORS.length];
}

export default function CompanyAvatar({ name, size = 44 }) {
  return (
    <span
      className="avatar"
      style={{ width: size, height: size, background: colorFor(name), fontSize: size * 0.38 }}
      aria-hidden="true"
    >
      {name.slice(0, 2).toUpperCase()}
    </span>
  );
}
