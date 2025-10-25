const API_BASE = "http://localhost:8080";

export async function login(
  email: string,
  password: string
): Promise<Response> {
  const response = await fetch(`${API_BASE}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ userMail: email, userPassword: password }),
    credentials: "include",
  });

  return response;
}

export async function signup(
  email: string,
  password: string
): Promise<Response> {
  const response = await fetch(`${API_BASE}/sign`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ userMail: email, userPassword: password }),
  });

  return response;
}
