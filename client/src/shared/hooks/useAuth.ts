import { login, signup } from "@/shared/services/authService";
import { store } from "@/shared/atoms/store";
import { userNameAtom } from "@/shared/atoms/authAtoms";

export async function handleSignup(email: string, password: string) {
  try {
    const response = await signup(email, password);
  } catch (err) {
    console.error("Signup error:", err);
  } finally {
  }
}

export async function handleLogin(
  email: string,
  password: string
): Promise<boolean> {
  try {
    const response = await login(email, password);
    const sessionId = response.headers.get("sessionId");
    if (sessionId) {
      store.set(userNameAtom, email[0]);
      localStorage.setItem("username", email[0]);
      return true;
    }
    return false;
  } catch (err) {
    console.error("Login error:", err);
    return false;
  } finally {
    return true;
  }
}
