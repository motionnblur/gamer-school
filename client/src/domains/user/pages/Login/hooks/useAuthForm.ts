import { useState } from "react";
import {
  handleLogin,
  handleSignup,
} from "@/domains/user/pages/Login/hooks/useAuth"; // Assuming useAuth.ts is nearby
import { openLoginCardAtom } from "@/shared/atoms/authAtoms";
import { isLoggedInAtom } from "@/shared/atoms/authAtoms";
import { store } from "@/shared/atoms/store";

type AuthMode = "login" | "signup";

export function useAuthForm(mode: AuthMode) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    if (mode === "signup" && password !== confirmPassword) {
      setError("Passwords do not match.");
      setLoading(false);
      return;
    }

    if (mode === "signup") {
      const success: boolean = await handleSignup(email, password);
      if (success) {
      } else {
        setError("Sign up failed. Please try again.");
      }
    } else if (mode === "login") {
      const success: boolean = await handleLogin(email, password);
      if (success) {
        store.set(isLoggedInAtom, true);
        store.set(openLoginCardAtom, false);
      } else {
        setError("Login failed. Invalid credentials.");
      }
    }

    setLoading(false);
  };

  return {
    email,
    setEmail,
    password,
    setPassword,
    confirmPassword,
    setConfirmPassword,
    error,
    loading,
    handleSubmit,
  };
}
