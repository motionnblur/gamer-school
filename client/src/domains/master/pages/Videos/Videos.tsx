import { Stack, Typography } from "@mui/material";
import React from "react";
import VideoUploader from "./components/VideoUploader";

export default function Videos() {
  return (
    <Stack direction={"column"} sx={{ width: "100%", height: "100%" }} gap={2}>
      <Typography variant="h4" component="h2" sx={{ color: "black" }}>
        You don't have any video uploaded
      </Typography>
      <Typography variant="h4" component="h2" sx={{ color: "black" }}>
        You don't have any video uploaded
      </Typography>
      <VideoUploader />
    </Stack>
  );
}
