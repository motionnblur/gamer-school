package com.example.server.service.master;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.nio.file.Files;

@Service
public class ChunkStorageService {

    @Value("${app.upload.tmp-dir:uploads/tmp}")
    private String tempDirPath;

    @Value("${app.upload.final-dir:uploads}")
    private String finalDirPath;

    public void saveChunk(String fileId, int chunkNumber, MultipartFile chunk) throws IOException {
        String rootPath = System.getProperty("user.dir");
        File tempDir = new File(rootPath, tempDirPath + "/" + fileId);

        if (!tempDir.exists() && !tempDir.mkdirs()) {
            throw new IOException("Failed to create upload directory: " + tempDir.getAbsolutePath());
        }

        File chunkFile = new File(tempDir, "chunk-" + chunkNumber);
        chunk.transferTo(chunkFile);
    }

    public boolean isUploadComplete(String fileId, int totalChunks) {
        File tempDir = new File(tempDirPath, fileId);
        File[] chunks = tempDir.listFiles((dir, name) -> name.startsWith("chunk-"));
        return chunks != null && chunks.length == totalChunks;
    }

    public File combineChunks(String fileId, int totalChunks) throws IOException {
        File tempDir = new File(tempDirPath, fileId);
        File finalFile = new File(finalDirPath, fileId + ".mp4");

        try (FileOutputStream fos = new FileOutputStream(finalFile)) {
            for (int i = 0; i < totalChunks; i++) {
                File chunkFile = new File(tempDir, "chunk-" + i);
                Files.copy(chunkFile.toPath(), fos);
                Files.deleteIfExists(chunkFile.toPath());
            }
        }

        Files.deleteIfExists(tempDir.toPath());
        return finalFile;
    }
}

