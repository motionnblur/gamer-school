import {
  Box,
  IconButton,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import React, { useEffect, useState } from "react";

interface IVideoMetadataDto {
  id: string;
  title: string;
  description: string;
  duration: number;
  uploadDate: string;
}

interface IVideoRow {
  videoId: string;
  videoTitle: string;
  videoDescription: string;
  videoDuration: number;
  videoDate: string;
  thumbnailUrl: string | null;
}

export default function VideosPage() {
  const [rows, setRows] = useState<IVideoRow[]>([]);
  const videoMenuRef = React.useRef<HTMLDivElement>(null);

  function handleEditButton() {
    alert("Edit");
  }
  function handleDeleteButton(videoId: string) {
    fetch(`http://localhost:8080/master/delete-video?videoId=${videoId}`, {
      method: "DELETE",
      credentials: "include",
    })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to delete video");
        return res.json();
      })
      .then((data) => {
        console.log(data);
      })
      .catch((err) => {
        console.error(err);
      });
  }

  useEffect(() => {
    const userId: string | null = localStorage.getItem("user_id");
    if (!userId) return;

    // 1️⃣ Fetch video metadata
    fetch(
      `http://localhost:8080/master/get-all-video-metadata?userId=${userId}`,
      {
        method: "GET",
        credentials: "include",
      }
    )
      .then(async (res) => {
        if (!res.ok) throw new Error("Failed to fetch video metadata");
        const data: IVideoMetadataDto[] = await res.json();

        // 2️⃣ Build row structure (initially without thumbnails)
        const newRows: IVideoRow[] = data.map((video) => {
          const formattedDate = new Date(video.uploadDate).toLocaleString(
            "tr-TR",
            {
              year: "numeric",
              month: "2-digit",
              day: "2-digit",
              hour: "2-digit",
              minute: "2-digit",
              second: "2-digit",
              hour12: false,
            }
          );
          return {
            videoId: video.id,
            videoTitle: video.title,
            videoDescription: video.description,
            videoDuration: video.duration,
            videoDate: formattedDate,
            thumbnailUrl: null, // placeholder until loaded
          };
        });

        setRows(newRows);

        // 3️⃣ Fetch thumbnails for each video
        data.forEach(async (video, index) => {
          try {
            const thumbResponse = await fetch(
              `http://localhost:8080/master/get-video-thumbnail?videoId=${video.id}`,
              { method: "GET", credentials: "include" }
            );
            if (!thumbResponse.ok) throw new Error("Failed to fetch thumbnail");
            const blob = await thumbResponse.blob();
            const url = URL.createObjectURL(blob);

            // Update that specific video’s thumbnail
            setRows((prev) =>
              prev.map((row) =>
                row.videoId === video.id ? { ...row, thumbnailUrl: url } : row
              )
            );
          } catch (err) {
            console.error("Thumbnail load failed for video:", video.id, err);
          }
        });
      })
      .catch((err) => console.error(err));
  }, []);

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Videos</TableCell>
            <TableCell align="right">Descriptions</TableCell>
            <TableCell align="right">Durations</TableCell>
            <TableCell align="right">Date</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.videoTitle}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell
                component="th"
                scope="row"
                sx={{
                  width: "280px",
                  height: "100px",
                }}
                onMouseEnter={() => {
                  if (videoMenuRef.current && videoMenuRef.current.style) {
                    videoMenuRef.current.style.display = "flex";
                  }
                }}
                onMouseLeave={() => {
                  if (videoMenuRef.current && videoMenuRef.current.style) {
                    videoMenuRef.current.style.display = "none";
                  }
                }}
              >
                <Stack
                  sx={{ width: "100%", height: "100%" }}
                  direction={"row"}
                  gap={2}
                >
                  <img
                    style={{
                      width: "100px",
                      height: "68px",
                      objectFit: "contain",
                      borderRadius: "8px",
                      border: "1px solid black",
                    }}
                    src={
                      row.thumbnailUrl // ✅ dynamically from backend
                        ? row.thumbnailUrl
                        : "https://via.placeholder.com/100x68?text=Loading..."
                    }
                    alt={row.videoTitle}
                  />
                  <Stack
                    direction={"column"}
                    sx={{ width: "100%", height: "100%" }}
                  >
                    <Box sx={{ width: "100%", height: "100%" }}>
                      {row.videoTitle}
                    </Box>
                    <Box
                      sx={{
                        width: "100%",
                        height: "100%",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <Stack
                        direction={"row"}
                        gap={1}
                        sx={{
                          width: "100%",
                          height: "100%",
                          display: "none",
                        }}
                        ref={videoMenuRef}
                      >
                        <IconButton
                          aria-label="edit"
                          size="small"
                          onClick={handleEditButton}
                        >
                          <EditIcon fontSize="inherit" />
                        </IconButton>
                        <IconButton
                          aria-label="delete"
                          size="small"
                          onClick={() => {
                            handleDeleteButton(row.videoId);
                          }}
                        >
                          <DeleteIcon fontSize="inherit" />
                        </IconButton>
                      </Stack>
                    </Box>
                  </Stack>
                </Stack>
              </TableCell>
              <TableCell align="right">{row.videoDescription}</TableCell>
              <TableCell align="right">{row.videoDuration}</TableCell>
              <TableCell align="right">{row.videoDate}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
