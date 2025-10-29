import React, { useState, ChangeEvent } from "react";
import {
  Box,
  Button,
  Typography,
  Card,
  CardContent,
  CardMedia,
  LinearProgress,
  TextField,
  Backdrop,
  CircularProgress,
} from "@mui/material";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import ImageIcon from "@mui/icons-material/Image";

interface VideoUploadProps {
  onUpload?: (
    file: File,
    metadata: { title: string; description: string; thumbnail?: File }
  ) => void;
}

const CHUNK_SIZE = 5 * 1024 * 1024; // 5 MB

const VideoUploader = ({
  onUpload,
  setShowVideoUploader,
}: {
  onUpload?: (
    file: File,
    metadata: { title: string; description: string; thumbnail?: File }
  ) => void;
  setShowVideoUploader: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [videoURL, setVideoURL] = useState<string>("");
  const [uploading, setUploading] = useState<boolean>(false);
  const [progress, setProgress] = useState<number>(0);

  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [thumbnail, setThumbnail] = useState<File | null>(null);
  const [thumbnailURL, setThumbnailURL] = useState<string>("");

  const handleVideoChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type.startsWith("video/")) {
      setVideoFile(file);
      setVideoURL(URL.createObjectURL(file));
    } else {
      alert("Please select a valid video file.");
    }
  };

  const handleThumbnailChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type.startsWith("image/")) {
      setThumbnail(file);
      setThumbnailURL(URL.createObjectURL(file));
    } else {
      alert("Please select a valid image file.");
    }
  };

  const handleUpload = async () => {
    if (!videoFile) {
      alert("Please select a video first.");
      return;
    }

    if (!title.trim()) {
      alert("Please enter a video title.");
      return;
    }

    setUploading(true);
    setProgress(0);

    const userId: string | null = localStorage.getItem("user_id");
    const totalChunks = Math.ceil(videoFile.size / CHUNK_SIZE);
    const fileId = `${videoFile.name}-${Date.now()}`;

    try {
      // Upload video chunks
      for (let i = 0; i < totalChunks; i++) {
        const start = i * CHUNK_SIZE;
        const end = Math.min(start + CHUNK_SIZE, videoFile.size);
        const chunk = videoFile.slice(start, end);

        const formData = new FormData();
        formData.append("userId", userId!);
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

        if (!response.ok) throw new Error(`Chunk ${i} upload failed`);

        setProgress(Math.round(((i + 1) / totalChunks) * 100));
      }

      // Upload metadata (title, description, thumbnail)
      const metadataForm = new FormData();
      metadataForm.append("fileId", fileId);
      metadataForm.append("title", title);
      metadataForm.append("description", description);
      if (thumbnail) metadataForm.append("thumbnail", thumbnail);

      const response = await fetch(
        "http://localhost:8080/master/upload-metadata",
        {
          method: "POST",
          body: metadataForm,
          credentials: "include",
        }
      );
      if (!response.ok) throw new Error("Metadata upload failed");

      alert("Video uploaded successfully!");
      onUpload?.(videoFile, {
        title,
        description,
        thumbnail: thumbnail || undefined,
      });
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
    setTitle("");
    setDescription("");
    setThumbnail(null);
    setThumbnailURL("");
  };

  return (
    <>
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100vw",
          height: "100vh",
          backgroundColor: "rgba(0, 0, 0, 0.5)",
          zIndex: 99,
        }}
        onClick={() => {
          setShowVideoUploader(false);
        }}
      />
      <Card
        variant="outlined"
        sx={{
          p: 3,
          borderRadius: 3,
          boxShadow: 2,
          maxWidth: 600,
          maxHeight: "95%",
          margin: "auto",
          overflow: "auto",
          zIndex: 100,
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        }}
      >
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Upload a Video
          </Typography>

          {/* Video Upload Section */}
          {!videoURL ? (
            <Box
              sx={{
                border: "2px dashed #ccc",
                borderRadius: 2,
                p: 4,
                textAlign: "center",
                cursor: "pointer",
                "&:hover": { borderColor: "primary.main" },
              }}
              onClick={() => document.getElementById("videoInput")?.click()}
              onDragOver={(e) => {
                e.preventDefault();
                e.stopPropagation();
                e.currentTarget.style.borderColor = "#1976d2"; // highlight border
              }}
              onDragLeave={(e) => {
                e.preventDefault();
                e.stopPropagation();
                e.currentTarget.style.borderColor = "#ccc";
              }}
              onDrop={(e) => {
                e.preventDefault();
                e.stopPropagation();
                e.currentTarget.style.borderColor = "#ccc";

                const file = e.dataTransfer.files?.[0];
                if (file && file.type.startsWith("video/")) {
                  setVideoFile(file);
                  setVideoURL(URL.createObjectURL(file));
                } else {
                  alert("Please drop a valid video file.");
                }
              }}
            >
              <UploadFileIcon color="primary" sx={{ fontSize: 48 }} />
              <Typography>Click or drag a video file here</Typography>
              <input
                id="videoInput"
                type="file"
                accept="video/*"
                hidden
                onChange={handleVideoChange}
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

              {/* Metadata Fields */}
              <TextField
                fullWidth
                label="Video Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                sx={{ mb: 2 }}
              />
              <TextField
                fullWidth
                multiline
                minRows={3}
                label="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                sx={{ mb: 2 }}
              />

              {/* Thumbnail Upload */}
              <Box sx={{ mb: 2 }}>
                <Typography variant="subtitle2" sx={{ mb: 1 }}>
                  Thumbnail
                </Typography>
                {!thumbnailURL ? (
                  <Box
                    sx={{
                      border: "2px dashed #ccc",
                      borderRadius: 2,
                      p: 2,
                      textAlign: "center",
                      cursor: "pointer",
                      "&:hover": { borderColor: "primary.main" },
                    }}
                    onClick={() =>
                      document.getElementById("thumbnailInput")?.click()
                    }
                  >
                    <ImageIcon color="primary" sx={{ fontSize: 36 }} />
                    <Typography>Click to upload a thumbnail</Typography>
                    <input
                      id="thumbnailInput"
                      type="file"
                      accept="image/*"
                      hidden
                      onChange={handleThumbnailChange}
                    />
                  </Box>
                ) : (
                  <Box sx={{ textAlign: "center" }}>
                    <img
                      src={thumbnailURL}
                      alt="Thumbnail Preview"
                      style={{
                        width: "100%",
                        maxHeight: 180,
                        borderRadius: "8px",
                        objectFit: "cover",
                      }}
                    />
                    <Button
                      color="error"
                      onClick={() => setThumbnailURL("")}
                      sx={{ mt: 1 }}
                    >
                      Remove Thumbnail
                    </Button>
                  </Box>
                )}
              </Box>

              {/* Upload Progress or Buttons */}
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
    </>
  );
};

export default VideoUploader;
