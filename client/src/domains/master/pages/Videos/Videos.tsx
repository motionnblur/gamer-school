import { Stack, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import VideoUploader from "./components/VideoUploader";
import MasterVideos from "./components/MasterVideos";

export default function Videos() {
  const [showEmptyPage, setShowEmptyPage] = useState(true);
  const [showVideoUploader, setShowVideoUploader] = useState(false);

  const openCloseVideoUploader = () => {
    setShowVideoUploader(!showVideoUploader);
  };

  useEffect(() => {
    const userId: string | null = localStorage.getItem("user_id");
    fetch(`http://localhost:8080/master/get-upload-state?userId=${userId}`, {
      method: "GET",
      credentials: "include",
    }).then((res) => {
      if (res.ok) setShowEmptyPage(false);
    });
  }, []);
  return (
    <Stack direction={"column"} sx={{ width: "100%", height: "100%" }} gap={2}>
      {showEmptyPage && (
        <MasterVideos setShowVideoUploader={openCloseVideoUploader} />
      )}
      {showVideoUploader && (
        <VideoUploader
          onUpload={() => {
            setShowEmptyPage(true);
            setShowVideoUploader(false);
          }}
          setShowVideoUploader={openCloseVideoUploader}
        />
      )}
    </Stack>
  );
}
