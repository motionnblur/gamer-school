import { Box, Button, Stack, Typography } from "@mui/material";
import React from "react";

export default function MasterVideos() {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
        height: "100%",
      }}
    >
      <Stack
        direction={"column"}
        sx={{
          width: "260px",
          height: "220px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
        spacing={4}
      >
        <Typography variant="subtitle2" gutterBottom color="gray">
          No videos available
        </Typography>
        <Button variant="contained">Upload video</Button>
      </Stack>
    </Box>
  );
}
