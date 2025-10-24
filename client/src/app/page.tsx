"use client";

import GAppBar from "@/shared/components/GAppBar";
import { store } from "@/shared/atoms/store";
import { Provider, useAtomValue } from "jotai";
import LoginPage from "@/pages/Login/components/LoginPage";
import { useEffect, useState } from "react";
import { userNameAtom, isLoggedInAtom } from "@/shared/atoms/authAtoms";
import {
  clearSession,
  getSessionId,
  getUserName,
} from "@/shared/services/authService";
import Path from "@/pages/Path/components/Path";

export default function Home() {
  const isLoggedIn = useAtomValue(isLoggedInAtom);
  const [isLoading, setIsLoading] = useState(true);
  const [showLoginPage, setShowLoginPage] = useState(true);

  useEffect(() => {
    const sessionId = getSessionId();
    const storedUserName = getUserName();
    if (sessionId && storedUserName) {
      store.set(userNameAtom, storedUserName);
      store.set(isLoggedInAtom, true);
      setShowLoginPage(false);
    } else {
      clearSession();
    }
    setIsLoading(false);
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <GAppBar />
      <div
        style={{
          width: "100%",
          height: "100%",
          padding: "10px",
          boxSizing: "border-box",
          marginTop: "46px",
        }}
      >
        {!isLoggedIn && showLoginPage && <LoginPage />}
        {isLoggedIn && <Path />}
      </div>
    </>
  );
}
