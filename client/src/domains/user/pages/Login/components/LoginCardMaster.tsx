import React from "react";
import { Box, TextField, Button, Paper } from "@mui/material";
import BgFiller from "../../../../../shared/components/BgFiller";
import {
  openLoginCardAtom,
  openLoginMasterCardAtom,
} from "@/shared/atoms/authAtoms";
import { store } from "@/shared/atoms/store";
import { useAuthFormMaster } from "../hooks/useAuthForm";

export default function LoginCardMaster() {
  const {
    email,
    setEmail,
    password,
    setPassword,
    error,
    loading,
    handleSubmit,
  } = useAuthFormMaster("login");

  const onBgClick = () => {
    store.set(openLoginMasterCardAtom, false);
  };

  return (
    <>
      <BgFiller onBgClick={onBgClick} />
      <Box
        sx={{
          position: "fixed",
          left: "50%",
          top: "50%",
          transform: "translate(-50%, -60%)",
          zIndex: 100,
        }}
        minWidth={360}
        maxWidth={400}
      >
        <Paper
          elevation={3}
          sx={{
            p: 4,
            maxWidth: 400,
            mx: "auto",
            mt: 8,
            position: "relative",
          }}
        >
          <Box component="form" onSubmit={handleSubmit}>
            <TextField
              fullWidth
              required
              label="Master id"
              type="text"
              margin="normal"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <TextField
              fullWidth
              required
              label="Password"
              type="password"
              margin="normal"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <Button fullWidth variant="contained" type="submit" sx={{ mt: 2 }}>
              Login
            </Button>
          </Box>
        </Paper>
      </Box>
    </>
  );
}
