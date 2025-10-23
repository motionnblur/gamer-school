import { AppBar, Button, Toolbar, Typography } from "@mui/material";
import React from "react";
import { useAtom } from "jotai";
import { openLoginCardAtom, userNameAtom } from "@/shared/atoms/authAtoms";
import { store } from "@/shared/atoms/store";

export default function GAppBar() {
  const [userName] = useAtom(userNameAtom);

  const handleLoginButtonClick = () => {
    store.set(openLoginCardAtom, true);
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Game Mastery
        </Typography>
        {userName ? (
          <Button color="inherit">{userName}</Button>
        ) : (
          <Button color="inherit" onClick={handleLoginButtonClick}>
            Login
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
}
