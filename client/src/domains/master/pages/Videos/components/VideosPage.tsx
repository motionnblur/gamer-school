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

export default function VideosPage() {
  function createData(
    videoTitle: string,
    videoDescription: string,
    videoDuration: number,
    videoDate: string
  ) {
    return { videoTitle, videoDescription, videoDuration, videoDate };
  }
  const [rows, setRows] = useState([
    createData("Video 1", "Video description", 10, new Date().toISOString()),
    createData("Video 2", "Video description", 20, new Date().toISOString()),
    createData("Video 3", "Video description", 30, new Date().toISOString()),
  ]);

  const videoMenuRef = React.useRef<HTMLDivElement>(null);

  function handleMenuItemClick() {
    alert("Item clicked");
  }

  useEffect(() => {
    const userId: string | null = localStorage.getItem("user_id");
    fetch(
      `http://localhost:8080/master/get-all-video-metadata?userId=${userId}`,
      {
        method: "GET",
        credentials: "include",
      }
    ).then((res: Response) => {
      if (res.ok) {
        res.json().then((data: IVideoMetadataDto[]) => {
          const newRows = data.map((video) => {
            const date = new Date(video.uploadDate);
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

            return createData(
              video.title,
              video.description,
              video.duration,
              formattedDate
            );
          });
          setRows(newRows);
        });
      }
    });
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
                    src="https://images.pexels.com/photos/1037992/pexels-photo-1037992.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
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
                          aria-label="delete"
                          size="small"
                          onClick={handleMenuItemClick}
                        >
                          <EditIcon fontSize="inherit" />
                        </IconButton>
                        <IconButton
                          aria-label="delete"
                          size="small"
                          onClick={handleMenuItemClick}
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
