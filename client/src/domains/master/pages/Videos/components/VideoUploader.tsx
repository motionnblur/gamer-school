import React, { useState, ChangeEvent } from "react";
import {
  Box,
  Button,
  Typography,
  Card,
  CardContent,
  CardMedia,
  LinearProgress,
} from "@mui/material";
import UploadFileIcon from "@mui/icons-material/UploadFile";

interface VideoUploadProps {
  onUpload?: (file: File) => void;
}

const VideoUploader: React.FC<VideoUploadProps> = ({ onUpload }) => {
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [videoURL, setVideoURL] = useState<string>("");
  const [uploading, setUploading] = useState<boolean>(false);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type.startsWith("video/")) {
      setVideoFile(file);
      setVideoURL(URL.createObjectURL(file));
    } else {
      alert("Please select a valid video file.");
    }
  };

  const handleUpload = async () => {
    if (!videoFile) return;
    setUploading(true);

    try {
      const formData = new FormData();
      formData.append("file", videoFile);

      // Change this URL to match your backend endpoint
      const response = await fetch(
        "http://localhost:8080/master/videos/upload",
        {
          method: "POST",
          body: formData,
        }
      );

      if (!response.ok) {
        throw new Error("Upload failed");
      }

      const result = await response.json();
      console.log("Server response:", result);

      alert("Video uploaded successfully!");
    } catch (error) {
      console.error(error);
      alert("Failed to upload video");
    } finally {
      setUploading(false);
    }
  };

  const reset = () => {
    setVideoFile(null);
    setVideoURL("");
  };

  return (
    <Card
      variant="outlined"
      sx={{
        p: 3,
        textAlign: "center",
        borderRadius: 3,
        boxShadow: 2,
        maxWidth: 500,
        margin: "auto",
      }}
    >
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Upload a Video
        </Typography>

        {!videoURL ? (
          <Box
            sx={{
              border: "2px dashed #ccc",
              borderRadius: 2,
              p: 4,
              cursor: "pointer",
              "&:hover": { borderColor: "primary.main" },
            }}
            onClick={() => document.getElementById("videoInput")?.click()}
          >
            <UploadFileIcon color="primary" sx={{ fontSize: 48 }} />
            <Typography>Click or drag a video file here</Typography>
            <input
              id="videoInput"
              type="file"
              accept="video/*"
              hidden
              onChange={handleFileChange}
            />
          </Box>
        ) : (
          <Box>
            <CardMedia
              component="video"
              controls
              src={videoURL}
              sx={{
                borderRadius: 2,
                mb: 2,
                maxHeight: 300,
              }}
            />
            <Typography variant="body2" sx={{ mb: 2 }}>
              {videoFile?.name}
            </Typography>

            {uploading ? (
              <LinearProgress />
            ) : (
              <Box sx={{ display: "flex", justifyContent: "center", gap: 2 }}>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleUpload}
                >
                  Upload
                </Button>
                <Button variant="outlined" color="error" onClick={reset}>
                  Remove
                </Button>
              </Box>
            )}
          </Box>
        )}
      </CardContent>
    </Card>
  );
};

export default VideoUploader;
