import { Box, Button, Divider, Stack } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import TvIcon from "@mui/icons-material/Tv";
import PersonIcon from "@mui/icons-material/Person";
import TheatersIcon from "@mui/icons-material/Theaters";

import React from "react";

export default function DashBoard() {
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
            startIcon={<TvIcon />}
            sx={{
              color: "black",
              justifyContent: "flex-start",
              textAlign: "left",
              pointerEvents: "none",
              backgroundColor: "#f0f0f0",
            }}
          >
            Dashboard
          </Button>
          <Button
            startIcon={<PersonIcon />}
            sx={{
              color: "black",
              justifyContent: "flex-start",
              textAlign: "left",
            }}
          >
            Profile
          </Button>
          <Button
            startIcon={<TheatersIcon />}
            sx={{
              color: "black",
              justifyContent: "flex-start",
              textAlign: "left",
            }}
          >
            Videos
          </Button>
          <Button
            startIcon={<DeleteIcon />}
            sx={{
              color: "black",
              justifyContent: "flex-start",
              textAlign: "left",
            }}
          >
            Button
          </Button>
          <Button
            startIcon={<DeleteIcon />}
            sx={{
              color: "black",
              justifyContent: "flex-start",
              textAlign: "left",
            }}
          >
            Button
          </Button>
          <Divider
            component="div"
            role="presentation"
            sx={{ backgroundColor: "#f0f0f0", height: "4px" }}
          />
          <Button
            startIcon={<DeleteIcon />}
            sx={{
              color: "black",
              justifyContent: "flex-start",
              textAlign: "left",
            }}
          >
            Button
          </Button>
          <Button
            startIcon={<DeleteIcon />}
            sx={{
              color: "black",
              justifyContent: "flex-start",
              textAlign: "left",
            }}
          >
            Button
          </Button>
          <Button
            startIcon={<DeleteIcon />}
            sx={{
              color: "black",
              justifyContent: "flex-start",
              textAlign: "left",
            }}
          >
            Button
          </Button>
        </Stack>
      </Box>
      <Box
        sx={{ width: "100%", height: "100%", backgroundColor: "#b8e5ff" }}
      ></Box>
    </Stack>
  );
}
