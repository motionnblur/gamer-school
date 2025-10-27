package com.example.server.controller.master;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.nio.file.Files;

@RestController("masterUploadController")
@RequestMapping("/master")
public class UploadController {
    @PostMapping("/upload-chunk")
    public ResponseEntity<String> uploadChunk(
            @RequestParam("file") MultipartFile chunk,
            @RequestParam("fileId") String fileId,
            @RequestParam("chunkNumber") int chunkNumber,
            @RequestParam("totalChunks") int totalChunks) {

        try {
            String uploadRoot = System.getProperty("user.dir") + "/uploads/tmp/" + fileId;
            File tempDir = new File(uploadRoot);
            if (!tempDir.exists() && !tempDir.mkdirs()) {
                throw new IOException("Failed to create upload directory: " + tempDir.getAbsolutePath());
            }

            File chunkFile = new File(tempDir, "chunk-" + chunkNumber);
            chunk.transferTo(chunkFile);

            // Merge chunks if all received
            if (tempDir.listFiles().length == totalChunks) {
                File finalFile = new File("uploads/" + fileId + ".mp4");
                try (FileOutputStream fos = new FileOutputStream(finalFile)) {
                    for (int i = 0; i < totalChunks; i++) {
                        File c = new File(tempDir, "chunk-" + i);
                        Files.copy(c.toPath(), fos);
                        c.delete();
                    }
                }
                tempDir.delete();
                return ResponseEntity.ok("Upload complete: " + finalFile.getName());
            }

            return ResponseEntity.ok("Chunk " + chunkNumber + " uploaded");
        } catch (IOException e) {
            e.printStackTrace();
            return ResponseEntity.internalServerError().body("Error uploading chunk");
        }
    }

}
