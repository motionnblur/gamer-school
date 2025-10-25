import React, { useEffect, useState } from "react";
import LoginCard from "./LoginCard";
import { Box, Button, Container, Grid, Typography } from "@mui/material";
import {
  openLoginCardAtom,
  openLoginMasterCardAtom,
  isLoggedInAtom,
} from "@/shared/atoms/authAtoms";
import { store } from "@/shared/atoms/store";
import { useAtomValue } from "jotai";
import LoginCardMaster from "./LoginCardMaster";

export default function LoginPage() {
  const isLoggedIn = useAtomValue(isLoggedInAtom);
  const showLoginCard = useAtomValue(openLoginCardAtom);
  const showLoginMasterCard = useAtomValue(openLoginMasterCardAtom);
  const onJourneyButtonClick = () => {
    if (!isLoggedIn) {
      store.set(openLoginCardAtom, true);
    }
  };
  const onMasterButtonClick = () => {
    if (!isLoggedIn) {
      store.set(openLoginMasterCardAtom, true);
    }
  };

  return (
    <>
      {!isLoggedIn && showLoginCard && <LoginCard />}
      {showLoginMasterCard && <LoginCardMaster />}

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
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: "10px",
                width: 2 / 4,
              }}
            >
              <Button
                variant="contained"
                color="primary"
                size="large"
                onClick={onJourneyButtonClick}
              >
                Start Your Journey
              </Button>
              <Button
                variant="contained"
                color="info"
                size="large"
                onClick={onMasterButtonClick}
              >
                I'm already a master !
              </Button>
            </Box>
          </Box>
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
