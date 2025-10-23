import { store } from "@/shared/atoms/store";
import { userNameAtom } from "@/shared/atoms/authAtoms";

const API_BASE = "http://localhost:8080";

export async function login(email: string, password: string): Promise<boolean> {
  const response = await fetch(`${API_BASE}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ userMail: email, userPassword: password }),
  });

  if (response.ok) {
    const sessionId = response.headers.get("sessionId");
    if (sessionId) {
      localStorage.setItem("sessionId", sessionId);
      store.set(userNameAtom, email[0]);
      return true;
    }
  }

  return false;
}

export async function signup(
  email: string,
  password: string
): Promise<boolean> {
  const response = await fetch(`${API_BASE}/sign`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ userMail: email, userPassword: password }),
  });

  return response.ok;
}
