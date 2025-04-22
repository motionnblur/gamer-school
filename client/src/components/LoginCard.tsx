import React, { useState } from "react";
import {
  Box,
  Tabs,
  Tab,
  TextField,
  Button,
  Typography,
  Paper,
} from "@mui/material";

type AuthMode = "login" | "signup";

const AuthForm: React.FC = () => {
  const [mode, setMode] = useState<AuthMode>("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (mode === "signup" && password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    if (mode === "login") {
      console.log("Logging in with:", { email, password });
      // Add login API call here
    } else {
      console.log("Signing up with:", { email, password });
      // Add sign-up API call here
    }
  };

  return (
    <Paper elevation={3} sx={{ p: 4, maxWidth: 400, mx: "auto", mt: 8 }}>
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

      <Typography variant="body2" align="center" sx={{ mt: 2 }}>
        {mode === "login"
          ? "Don't have an account? Switch to Sign Up."
          : "Already have an account? Switch to Login."}
      </Typography>
    </Paper>
  );
};

export default AuthForm;
