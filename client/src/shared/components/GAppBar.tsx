import { AppBar, Button, Toolbar, Typography } from "@mui/material";
import React, { useEffect } from "react";
import { useAtom } from "jotai";
import { userNameAtom } from "@/shared/atoms/authAtoms";
import { store } from "@/shared/atoms/store";

export default function GAppBar(
  { onLoginButtonClick }: { onLoginButtonClick: () => void },
  user?: string
) {
  const [userName] = useAtom(userNameAtom);

  useEffect(() => {
    const storedUserName = localStorage.getItem("username");
    if (storedUserName) {
      store.set(userNameAtom, storedUserName);
    }
  }, []);

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Game Mastery
        </Typography>
        {userName ? (
          <Button color="inherit">{userName}</Button>
        ) : (
          <Button color="inherit" onClick={onLoginButtonClick}>
            Login
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
}
