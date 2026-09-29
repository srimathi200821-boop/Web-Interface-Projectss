const escapeRegExp = (text) => text.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

/** Whole-word skill check, so "Java" does not match "JavaScript". */
export function containsSkill(text, skill) {
  const pattern = new RegExp(
    `(^|[^a-z0-9+#])${escapeRegExp(skill.toLowerCase())}($|[^a-z0-9+#])`
  );
  return pattern.test(text.toLowerCase());
}

export function calculateMatch(job, userSkills) {
  const owned = new Set(userSkills.map((skill) => skill.toLowerCase()));
  const matched = job.skills.filter((skill) => owned.has(skill.toLowerCase()));
  const missing = job.skills.filter((skill) => !owned.has(skill.toLowerCase()));
  const score = Math.round((matched.length / Math.max(job.skills.length, 1)) * 100);

  return { ...job, matched, missing, score };
}

export function rankJobs(jobs, userSkills) {
  return jobs
    .map((job) => calculateMatch(job, userSkills))
    .sort((a, b) => b.score - a.score);
}

export function matchTone(score) {
  if (score >= 75) return "good";
  if (score >= 50) return "mid";
  return "low";
}
