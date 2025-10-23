import React, { useState } from "react";
import { Box, Tabs, Tab, TextField, Button, Paper } from "@mui/material";
import BgFiller from "../../../shared/components/BgFiller";
import { handleLogin, handleSignup } from "@/shared/hooks/useAuth";

type AuthMode = "login" | "signup";

export default function LoginCard({
  setLoginCardOpen,
  onLoginSuccess,
}: {
  setLoginCardOpen: (setter: boolean) => void;
  onLoginSuccess: (userMail: string) => void;
}) {
  const [mode, setMode] = useState<AuthMode>("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (mode === "login") {
      let success: boolean = await handleLogin(email, password);
      if (success) {
        setLoginCardOpen(false);
      }
    } else if (mode === "signup") {
      handleSignup(email, password);
    }
  };

  const onBgClick = () => {
    setLoginCardOpen(false);
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
          sx={{ p: 4, maxWidth: 400, mx: "auto", mt: 8, position: "relative" }}
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
