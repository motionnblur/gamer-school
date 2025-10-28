package com.example.server.service.master;

import org.springframework.stereotype.Service;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;

@Service
public class VideoService {
    public double getVideoDurationSeconds(String filePath) {
        ProcessBuilder pb = new ProcessBuilder(
                "mediainfo",
                "--Inform=Video;%Duration%",
                filePath
        );


        try {
            Process process = pb.start();
            try (BufferedReader reader = new BufferedReader(new InputStreamReader(process.getInputStream()))) {
                String durationStr = reader.readLine();
                process.waitFor(); // wait for ffprobe to finish
                if (durationStr != null && !durationStr.isEmpty()) {
                    return Double.parseDouble(durationStr.trim());
                }
            }
        } catch (IOException | InterruptedException e) {
            e.printStackTrace(); // you can replace this with a logger
        }
        return 0.0;
    }
}
