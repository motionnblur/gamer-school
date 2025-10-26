import MasterLoginDto from "../dtos/MasterLoginDto";

const API_BASE_USER = "http://localhost:8080/user";
const API_BASE_MASTER = "http://localhost:8080/master";

export async function login(
  email: string,
  password: string
): Promise<Response> {
  const response = await fetch(`${API_BASE_USER}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ userMail: email, userPassword: password }),
    credentials: "include",
  });

  return response;
}

export async function loginMaster(
  email: string,
  password: string
): Promise<Response> {
  const loginDto: MasterLoginDto = {
    masterId: email,
    masterPassword: password,
  };

  const response = await fetch(`${API_BASE_MASTER}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(loginDto),
    credentials: "include",
  });

  return response;
}

export async function signup(
  email: string,
  password: string
): Promise<Response> {
  const response = await fetch(`${API_BASE_USER}/sign`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ userMail: email, userPassword: password }),
  });

  return response;
}
