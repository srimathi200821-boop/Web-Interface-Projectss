export function isNotificationSupported() {
  return typeof window !== "undefined" && "Notification" in window;
}

export function getPermission() {
  return isNotificationSupported() ? Notification.permission : "unsupported";
}

export async function requestPermission() {
  if (!isNotificationSupported()) return "unsupported";

  try {
    return await Notification.requestPermission();
  } catch (error) {
    console.error("Notification permission error:", error);
    return "denied";
  }
}

/** Creates an in-app notification and also shows a system one when allowed. */
export function fireNotification(title, body) {
  if (isNotificationSupported() && Notification.permission === "granted") {
    try {
      new Notification(title, { body });
    } catch {
      // Some mobile browsers only allow notifications via a service worker.
    }
  }

  return {
    id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    title,
    body,
    time: new Date().toISOString(),
    read: false,
  };
}

export function timeAgo(date) {
  const seconds = Math.floor((Date.now() - new Date(date).getTime()) / 1000);

  if (seconds < 10) return "Just now";
  if (seconds < 60) return `${seconds}s ago`;

  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes}m ago`;

  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;

  const days = Math.floor(hours / 24);
  if (days < 7) return `${days}d ago`;

  return new Date(date).toLocaleDateString();
}
