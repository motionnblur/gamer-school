import { useState } from "react";
import { login, signup } from "@/shared/services/authService";

type AuthMode = "login" | "signup";

export function useAuth(onLoginSuccess: (userMail: string) => void) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleAuth(
    mode: AuthMode,
    email: string,
    password: string,
    confirmPassword?: string
  ) {
    setError(null);

    if (mode === "signup" && password !== confirmPassword) {
      setError("Passwords do not match!");
      return;
    }

    try {
      setLoading(true);
      let success = false;

      if (mode === "login") {
        success = await login(email, password);
        if (success) {
          onLoginSuccess(email);
        }
      } else {
        success = await signup(email, password);
      }

      if (!success) {
        setError(
          mode === "login"
            ? "Login failed. Please check your credentials."
            : "Signup failed. Please try again."
        );
      }
    } catch (err) {
      console.error("Auth error:", err);
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return { loading, error, handleAuth };
}
