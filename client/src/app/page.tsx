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
import LoginCard from "@/components/LoginCard";

export default function Home() {
  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Game Mastery
          </Typography>
          <Button color="inherit">Login</Button>
          <Button color="inherit">Sign Up</Button>
        </Toolbar>
      </AppBar>

      <LoginCard />
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
            Start Your Journey
          </Button>
        </Container>
      </Box>

      {/* Feature Highlights */}
      <Box sx={{ py: 8, bgcolor: "#121212" }}>
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
            <Grid size={6}>
              <Typography variant="h5" gutterBottom>
                🪄 Be a gaming wizard !
              </Typography>
              <Typography>
                Become the best of the best and win exciting prizes !
              </Typography>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Footer */}
      <Box
        sx={{
          position: "fixed",
          bottom: 0,
          width: "100%",
          bgcolor: "#212121",
          color: "white",
          py: 3,
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
