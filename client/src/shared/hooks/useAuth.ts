import { login, signup } from "@/shared/services/authService";
import { store } from "@/shared/atoms/store";
import { userNameAtom } from "@/shared/atoms/authAtoms";

export async function handleSignup(
  email: string,
  password: string
): Promise<boolean> {
  try {
    const response = await signup(email, password);
    return true;
  } catch (err) {
    console.error("Signup error:", err);
    return false;
  } finally {
    return true;
  }
}

export async function handleLogin(
  email: string,
  password: string
): Promise<boolean> {
  try {
    const response = await login(email, password);
    if (response.ok) {
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
