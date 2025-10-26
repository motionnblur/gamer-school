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
              pointerEvents: disabledButton === "dashboard" ? "none" : "auto",
              boxShadow: disabledButton === "dashboard" ? 1 : 0,
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
              pointerEvents: disabledButton === "profile" ? "none" : "auto",
              boxShadow: disabledButton === "profile" ? 1 : 0,
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
              pointerEvents: disabledButton === "videos" ? "none" : "auto",
              boxShadow: disabledButton === "videos" ? 1 : 0,
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
        ></Stack>
      </Box>
    </Stack>
  );
}
