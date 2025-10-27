package com.example.server.service.master;

import com.example.server.entity.MasterEntity;
import com.example.server.entity.UploadEntity;
import com.example.server.repository.MasterEntityRepository;
import com.example.server.repository.UploadEntityRepository;
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
    private final SessionService masterSessionService;
    private final MasterEntityRepository masterEntityRepository;
    private final UploadEntityRepository uploadEntityRepository;

    public UploadService(FileService fileService,
                         SessionService masterSessionService,
                         MasterEntityRepository masterEntityRepository,
                         UploadEntityRepository uploadEntityRepository) {
        this.fileService = fileService;
        this.masterSessionService = masterSessionService;
        this.masterEntityRepository = masterEntityRepository;
        this.uploadEntityRepository = uploadEntityRepository;
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
    public void handleUpload(String masterId,
                             MultipartFile chunk,
                             String fileId,
                             int chunkNumber,
                             int totalChunks) throws IOException {
        String uploadRoot = System.getProperty("user.dir") + "/uploads/tmp/" + fileId;
        File tempDir = new File(uploadRoot);
        if (!tempDir.exists() && !tempDir.mkdirs()) {
            throw new IOException("Failed to create upload directory: " + tempDir.getAbsolutePath());
        }

        File chunkFile = new File(tempDir, "chunk-" + chunkNumber);
        chunk.transferTo(chunkFile);

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

            MasterEntity masterEntity = masterEntityRepository.findByMasterId(masterId);
            if(masterEntity == null)
                throw new IllegalArgumentException("Master not found");

            UploadEntity uploadEntity = new UploadEntity();
            uploadEntity.setTitle(fileId);
            uploadEntity.setDescription(fileId);
            uploadEntity.setFilePath("uploads/" + fileId + ".mp4");
            uploadEntity.setUploadDate(java.time.LocalDateTime.now());
            uploadEntity.setMaster(masterEntity);

            uploadEntityRepository.save(uploadEntity);
        }
    }
}
