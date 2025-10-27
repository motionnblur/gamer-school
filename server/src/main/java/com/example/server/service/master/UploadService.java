package com.example.server.service.master;

import com.example.server.service.FileService;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.nio.file.Files;

@Service("masterUploadService")
public class UploadService {
    private final FileService fileService;

    public UploadService(FileService fileService) {
        this.fileService = fileService;
    }
    public void mergeChunksAfterUpload(String fileId,
                                       File tempDir,
                                       int totalChunks) {
        File finalFile = new File("uploads/" + fileId + ".mp4");
        try (FileOutputStream fos = new FileOutputStream(finalFile)) {
            for (int i = 0; i < totalChunks; i++) {
                File c = new File(tempDir, "chunk-" + i);
                Files.copy(c.toPath(), fos);
                c.delete();
            }
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
        tempDir.delete();
    }
    public void handleUpload(MultipartFile chunk,
                             String fileId,
                             int chunkNumber,
                             int totalChunks) throws IOException {
        File tempDir = fileService.createFileIfNotExists("uploads/tmp/" + fileId);
        File chunkFile = fileService.createChunkFile(tempDir, chunkNumber);
        chunk.transferTo(chunkFile);

        if (tempDir.listFiles().length == totalChunks) {
            mergeChunksAfterUpload(fileId, tempDir, totalChunks);
        }
    }
}
