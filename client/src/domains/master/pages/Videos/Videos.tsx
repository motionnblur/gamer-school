import { Stack } from "@mui/material";
import React, { useEffect, useState } from "react";
import VideoUploader from "./components/VideoUploader";
import EmptyVideos from "./components/EmptyVideos";
import VideosPage from "./components/VideosPage";

export default function Videos() {
  const [showEmptyPage, setShowEmptyPage] = useState(true);
  const [showVideoUploader, setShowVideoUploader] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const openCloseVideoUploader = () => {
    setShowVideoUploader(!showVideoUploader);
  };

  useEffect(() => {
    const userId = localStorage.getItem("user_id");

    const fetchUploadState = async () => {
      try {
        const res = await fetch(
          `http://localhost:8080/master/get-upload-state?userId=${userId}`,
          {
            method: "GET",
            credentials: "include",
          }
        );

        if (res.ok) {
          setShowEmptyPage(false);
        } else {
          setShowEmptyPage(true);
        }
      } catch (err) {
        console.error("Error fetching upload state:", err);
        setShowEmptyPage(true);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUploadState();
  }, []);

  if (isLoading) {
    return (
      <Stack
        direction="column"
        alignItems="center"
        justifyContent="center"
        sx={{ width: "100%", height: "100%" }}
      >
        Loading...
      </Stack>
    );
  }

  return (
    <Stack direction={"column"} sx={{ width: "100%", height: "100%" }} gap={2}>
      {showEmptyPage && (
        <>
          <EmptyVideos setShowVideoUploader={openCloseVideoUploader} />
          {showVideoUploader && (
            <VideoUploader
              onUpload={() => {
                setShowEmptyPage(true);
                setShowVideoUploader(false);
              }}
              setShowVideoUploader={openCloseVideoUploader}
              setShowEmptyPage={setShowEmptyPage}
            />
          )}
        </>
      )}

      {!showEmptyPage && (
        <>
          <VideosPage
            setShowEmptyPage={setShowEmptyPage}
            setShowVideoUploader={setShowVideoUploader}
          />
          {showVideoUploader && (
            <VideoUploader
              onUpload={() => {
                setShowEmptyPage(true);
                setShowVideoUploader(false);
              }}
              setShowVideoUploader={openCloseVideoUploader}
              setShowEmptyPage={setShowEmptyPage}
            />
          )}
        </>
      )}
    </Stack>
  );
}
