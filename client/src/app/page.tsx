"use client";

import GAppBar from "@/shared/components/GAppBar";
import { store } from "@/shared/atoms/store";
import { Provider, useAtomValue } from "jotai";
import LoginPage from "@/pages/Login/components/LoginPage";
import { useEffect, useState } from "react";
import { userNameAtom, isLoggedInAtom } from "@/shared/atoms/authAtoms";

export default function Home() {
  const isLoggedIn = useAtomValue(isLoggedInAtom);
  const [isLoading, setIsLoading] = useState(true);
  const [showLoginPage, setShowLoginPage] = useState(true);

  useEffect(() => {
    const sessionId = localStorage.getItem("session-id");
    if (sessionId) {
      const storedUserName = localStorage.getItem("username");
      if (storedUserName) store.set(userNameAtom, storedUserName);
      setShowLoginPage(false);
    }
    setIsLoading(false);
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <GAppBar />
      {!isLoggedIn && showLoginPage && <LoginPage />}
    </>
  );
}
