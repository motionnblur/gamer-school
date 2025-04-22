"use client";

import {
  Container,
  Typography,
  Button,
  Box,
  AppBar,
  Toolbar,
  Grid,
} from "@mui/material";

import styles from "./page.module.css";

export default function Home() {
  return (
    <>
      {/* Navbar */}
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            GameMastery
          </Typography>
          <Button color="inherit">Login</Button>
          <Button color="inherit">Sign Up</Button>
        </Toolbar>
      </AppBar>

      {/* Hero Section */}
      <Box
        sx={{ bgcolor: "#121212", color: "white", py: 10, textAlign: "center" }}
      >
        <Container maxWidth="md">
          <Typography variant="h2" gutterBottom>
            Get Good at Gaming
          </Typography>
          <Typography variant="h6" paragraph>
            Learn from top-tier pro gamers, watch exclusive content, and join
            live streams.
          </Typography>
          <Button variant="contained" color="primary" size="large">
            Start Learning
          </Button>
        </Container>
      </Box>

      {/* Feature Highlights */}
      <Box sx={{ py: 8, bgcolor: "#273F4F" }}>
        <Container>
          <Grid container spacing={4}>
            <Grid size={6}>
              <Typography variant="h5" gutterBottom>
                🎮 Learn from Pros
              </Typography>
              <Typography>
                Access courses and tutorials created by top-ranking competitive
                gamers.
              </Typography>
            </Grid>
            <Grid size={6}>
              <Typography variant="h5" gutterBottom>
                📺 Live Streams
              </Typography>
              <Typography>
                Watch live coaching sessions, ranked games, and real-time
                strategy breakdowns.
              </Typography>
            </Grid>
            <Grid size={6}>
              <Typography variant="h5" gutterBottom>
                🧑‍🤝‍🧑 Join the Community
              </Typography>
              <Typography>
                Connect with other learners and pros through discussions,
                forums, and Discord.
              </Typography>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Footer */}
      <Box
        sx={{
          bgcolor: "#212121",
          color: "white",
          py: 4,
          mt: 8,
          textAlign: "center",
        }}
      >
        <Container>
          <Typography>
            &copy; {new Date().getFullYear()} GameMastery. All rights reserved.
          </Typography>
        </Container>
      </Box>
    </>
  );
}
