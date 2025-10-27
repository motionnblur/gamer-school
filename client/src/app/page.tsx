"use client";

import GAppBar from "@/domains/user/shared/components/GAppBar";
import { store } from "@/shared/atoms/store";
import { useAtomValue } from "jotai";
import LoginPage from "@/domains/user/pages/Login/components/LoginPage";
import { useEffect, useState } from "react";
import {
  userNameAtom,
  isLoggedInAtom,
  isMasterLoggedInAtom,
} from "@/shared/atoms/authAtoms";
import {
  clearSession,
  getSessionId,
  getUserName,
} from "@/domains/user/shared/services/authService";
import Path from "@/domains/user/pages/Path/components/Path";
import DashBoard from "@/domains/master/pages/Dashboard/DashBoard";

export default function Home() {
  const isLoggedIn = useAtomValue(isLoggedInAtom);
  const isMasterLoggedIn = useAtomValue(isMasterLoggedInAtom);
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

  if (isMasterLoggedIn) {
    return <DashBoard />;
  } else {
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
}
