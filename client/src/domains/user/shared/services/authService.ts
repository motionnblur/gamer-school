export function getSessionId(): string | null {
  return localStorage.getItem("session-id");
}

export function getUserName(): string | null {
  return localStorage.getItem("username");
}

export function clearSession() {
  localStorage.removeItem("session-id");
  localStorage.removeItem("username");
}
