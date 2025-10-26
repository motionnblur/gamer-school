import { Box, Button, Divider, Stack } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import TvIcon from "@mui/icons-material/Tv";
import PersonIcon from "@mui/icons-material/Person";
import TheatersIcon from "@mui/icons-material/Theaters";

import React, { useState } from "react";

export default function DashBoard() {
  const [disabledButton, setDisabledButton] = useState<String>("dashboard");
  const handleClick = (buttonName: String) => {
    setDisabledButton(buttonName);
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
            onClick={() => handleClick("dashboard")}
            startIcon={<TvIcon />}
            sx={{
              color: "black",
              justifyContent: "flex-start",
              textAlign: "left",
              backgroundColor:
                disabledButton === "dashboard" ? "#deebff" : "white",
              pointerEvents: disabledButton === "dashboard" ? "none" : "auto",
            }}
          >
            Dashboard
          </Button>
          <Button
            onClick={() => handleClick("profile")}
            startIcon={<PersonIcon />}
            sx={{
              color: "black",
              justifyContent: "flex-start",
              textAlign: "left",
              backgroundColor:
                disabledButton === "profile" ? "#deebff" : "white",
              pointerEvents: disabledButton === "profile" ? "none" : "auto",
            }}
          >
            Profile
          </Button>
          <Button
            onClick={() => handleClick("videos")}
            startIcon={<TheatersIcon />}
            sx={{
              color: "black",
              justifyContent: "flex-start",
              textAlign: "left",
              backgroundColor:
                disabledButton === "videos" ? "#deebff" : "white",
              pointerEvents: disabledButton === "videos" ? "none" : "auto",
            }}
          >
            Videos
          </Button>
        </Stack>
      </Box>
      <Box
        sx={{ width: "100%", height: "100%", backgroundColor: "#b8e5ff" }}
      ></Box>
    </Stack>
  );
}
