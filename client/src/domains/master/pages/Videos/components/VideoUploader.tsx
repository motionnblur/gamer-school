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

const CHUNK_SIZE = 5 * 1024 * 1024; // 5 MB per chunk

const VideoUploader: React.FC<VideoUploadProps> = ({ onUpload }) => {
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [videoURL, setVideoURL] = useState<string>("");
  const [uploading, setUploading] = useState<boolean>(false);
  const [progress, setProgress] = useState<number>(0);

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
    setProgress(0);

    const totalChunks = Math.ceil(videoFile.size / CHUNK_SIZE);
    const fileId = `${videoFile.name}-${Date.now()}`; // unique identifier

    try {
      for (let i = 0; i < totalChunks; i++) {
        const start = i * CHUNK_SIZE;
        const end = Math.min(start + CHUNK_SIZE, videoFile.size);
        const chunk = videoFile.slice(start, end);

        const formData = new FormData();
        formData.append("file", chunk);
        formData.append("fileId", fileId);
        formData.append("chunkNumber", String(i));
        formData.append("totalChunks", String(totalChunks));

        const response = await fetch(
          "http://localhost:8080/master/upload-chunk",
          {
            method: "POST",
            body: formData,
            credentials: "include",
          }
        );

        if (!response.ok) {
          throw new Error(`Chunk ${i} upload failed`);
        }

        setProgress(Math.round(((i + 1) / totalChunks) * 100));
      }

      alert("Video uploaded successfully!");
      onUpload?.(videoFile);
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
    setProgress(0);
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
              sx={{ borderRadius: 2, mb: 2, maxHeight: 300 }}
            />
            <Typography variant="body2" sx={{ mb: 2 }}>
              {videoFile?.name}
            </Typography>

            {uploading ? (
              <Box>
                <LinearProgress variant="determinate" value={progress} />
                <Typography sx={{ mt: 1 }}>{progress}%</Typography>
              </Box>
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
