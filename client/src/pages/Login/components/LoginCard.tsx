import React, { useState } from "react";
import { Box, Tabs, Tab, TextField, Button, Paper } from "@mui/material";
import BgFiller from "../../../shared/components/BgFiller";
import { handleLogin, handleSignup } from "@/shared/hooks/useAuth";
import { openLoginCardAtom } from "@/shared/atoms/authAtoms";
import { store } from "@/shared/atoms/store";
import { useAuthForm } from "../hooks/useAuthForm";

type AuthMode = "login" | "signup";

export default function LoginCard() {
  const [mode, setMode] = useState<AuthMode>("login");
  const {
    email,
    setEmail,
    password,
    setPassword,
    confirmPassword,
    setConfirmPassword,
    error,
    loading,
    handleSubmit,
  } = useAuthForm(mode);

  const onBgClick = () => {
    store.set(openLoginCardAtom, false);
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
          <Tabs
            value={mode}
            onChange={(_, newValue) => setMode(newValue)}
            centered
            textColor="primary"
            indicatorColor="primary"
          >
            <Tab label="Login" value="login" />
            <Tab label="Sign Up" value="signup" />
          </Tabs>

          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <TextField
              fullWidth
              required
              label="Email"
              type="email"
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

            {mode === "signup" && (
              <TextField
                fullWidth
                required
                label="Confirm Password"
                type="password"
                margin="normal"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            )}

            <Button fullWidth variant="contained" type="submit" sx={{ mt: 2 }}>
              {mode === "login" ? "Login" : "Sign Up"}
            </Button>
          </Box>
        </Paper>
      </Box>
    </>
  );
}
