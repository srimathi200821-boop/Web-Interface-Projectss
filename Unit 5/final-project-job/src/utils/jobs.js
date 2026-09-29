export const APPLICATION_STATUSES = ["Applied", "Under review", "Interview", "Offer", "Rejected"];

export const SORT_OPTIONS = [
  { id: "newest", label: "Newest first" },
  { id: "salary", label: "Highest salary" },
  { id: "company", label: "Company A–Z" },
  { id: "match", label: "Best skill match" },
];

export const MIN_SALARY_OPTIONS = [5, 8, 10];

/** "5 - 9 LPA" -> { min: 5, max: 9 } */
export function salaryRange(job) {
  const numbers = (job.salary.match(/\d+/g) || [0]).map(Number);
  return { min: numbers[0], max: numbers[numbers.length - 1] };
}

export function sortJobs(jobs, sortId) {
  const list = [...jobs];

  switch (sortId) {
    case "salary":
      return list.sort((a, b) => salaryRange(b).max - salaryRange(a).max);
    case "company":
      return list.sort((a, b) => a.company.localeCompare(b.company));
    case "match":
      return list.sort((a, b) => (b.score ?? 0) - (a.score ?? 0));
    default:
      return list.sort((a, b) => a.postedDaysAgo - b.postedDaysAgo);
  }
}

export function statusClass(status) {
  return `status status-${status.toLowerCase().replace(/\s+/g, "-")}`;
}

export function similarJobs(job, allJobs, limit = 3) {
  return allJobs
    .filter((item) => item.id !== job.id)
    .map((item) => ({
      job: item,
      overlap: item.skills.filter((skill) => job.skills.includes(skill)).length + (item.title === job.title ? 2 : 0),
    }))
    .filter((entry) => entry.overlap > 0)
    .sort((a, b) => b.overlap - a.overlap)
    .slice(0, limit)
    .map((entry) => entry.job);
}
