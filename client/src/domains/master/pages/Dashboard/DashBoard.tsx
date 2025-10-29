import { Box, Button, Divider, Stack } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import TvIcon from "@mui/icons-material/Tv";
import PersonIcon from "@mui/icons-material/Person";
import TheatersIcon from "@mui/icons-material/Theaters";

import React, { useState } from "react";
import Videos from "../Videos/Videos";
import Profile from "../Profile/Profile";
import MainDashPage from "../MainDashPage";

export default function DashBoard() {
  const [selectedButton, setSelectedButton] = useState<Number>(0);
  const [currentSelectedPageIndex, setCurrentSelectedPageIndex] =
    useState<Number>(0);
  const handleClick = (buttonId: Number) => {
    setCurrentSelectedPageIndex(buttonId);
    setSelectedButton(buttonId);
  };

  return (
    <Stack direction={"row"} width={"100%"} height={"100vh"}>
      <Box
        sx={{
          width: "360px",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "white",
        }}
      >
        <Stack direction={"column"} width={"80%"} height={"86%"} spacing={2}>
          <Button
            onClick={() => handleClick(0)}
            startIcon={<TvIcon />}
            sx={{
              color: "black",
              justifyContent: "flex-start",
              textAlign: "left",
              pointerEvents: selectedButton === 0 ? "none" : "auto",
              boxShadow: selectedButton === 0 ? 1 : 0,
              backgroundColor: selectedButton === 0 ? "#ebf2f6" : "white",
            }}
          >
            Dashboard
          </Button>
          <Button
            onClick={() => handleClick(1)}
            startIcon={<PersonIcon />}
            sx={{
              color: "black",
              justifyContent: "flex-start",
              textAlign: "left",
              pointerEvents: selectedButton === 1 ? "none" : "auto",
              boxShadow: selectedButton === 1 ? 1 : 0,
              backgroundColor: selectedButton === 1 ? "#ebf2f6" : "white",
            }}
          >
            Profile
          </Button>
          <Button
            id="2"
            onClick={() => handleClick(2)}
            startIcon={<TheatersIcon />}
            sx={{
              color: "black",
              justifyContent: "flex-start",
              textAlign: "left",
              pointerEvents: selectedButton === 2 ? "none" : "auto",
              boxShadow: selectedButton === 2 ? 1 : 0,
              backgroundColor: selectedButton === 2 ? "#ebf2f6" : "white",
            }}
          >
            Videos
          </Button>
        </Stack>
      </Box>
      <Box
        sx={{
          width: "100%",
          height: "100%",
          backgroundColor: "#ebf2f6",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Stack
          sx={{
            width: "96%",
            height: "96%",
            backgroundColor: "white",
            borderRadius: "5px",
          }}
        >
          {currentSelectedPageIndex === 0 && <MainDashPage />}
          {currentSelectedPageIndex === 1 && <Profile />}
          {currentSelectedPageIndex === 2 && <Videos />}
        </Stack>
      </Box>
    </Stack>
  );
}
