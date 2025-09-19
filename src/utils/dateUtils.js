/**
 * Formats an ISO date string to a readable format, e.g. "September 19, 2025"
 * @param {string} dateStr - ISO date string
 * @returns {string} formatted date string
 */
export function formatDate(dateStr) {
  if (!dateStr) return "";
  const options = { year: "numeric", month: "long", day: "numeric" };
  const date = new Date(dateStr);
  return date.toLocaleDateString(undefined, options);
}

/**
 * Gets a formatted relative time from a date to now
 * @param {string} dateStr - ISO date string
 * @returns {string} e.g. "2 days ago"
 */
export function timeSince(dateStr) {
  const now = new Date();
  const past = new Date(dateStr);
  const seconds = Math.floor((now - past) / 1000);

  let interval = Math.floor(seconds / 31536000);
  if (interval >= 1) return interval + " year" + (interval > 1 ? "s" : "") + " ago";

  interval = Math.floor(seconds / 2592000);
  if (interval >= 1) return interval + " month" + (interval > 1 ? "s" : "") + " ago";

  interval = Math.floor(seconds / 86400);
  if (interval >= 1) return interval + " day" + (interval > 1 ? "s" : "") + " ago";

  interval = Math.floor(seconds / 3600);
  if (interval >= 1) return interval + " hour" + (interval > 1 ? "s" : "") + " ago";

  interval = Math.floor(seconds / 60);
  if (interval >= 1) return interval + " minute" + (interval > 1 ? "s" : "") + " ago";

  return "Just now";
}
