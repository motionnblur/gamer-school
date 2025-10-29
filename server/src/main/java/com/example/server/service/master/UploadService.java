package com.example.server.service.master;

import com.example.server.entity.MasterEntity;
import com.example.server.entity.UploadEntity;
import com.example.server.repository.MasterEntityRepository;
import com.example.server.repository.UploadEntityRepository;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.time.LocalDateTime;
import java.util.Map;
import java.util.Optional;
import java.util.concurrent.ConcurrentHashMap;

@Service("masterUploadService")
public class UploadService {
    private final Map<String, Long> pendingVideoId = new ConcurrentHashMap<>();

    private final ChunkStorageService chunkStorageService;
    private final MasterEntityRepository masterEntityRepository;
    private final UploadEntityRepository uploadEntityRepository;
    private final FileService fileService;
    private final VideoService videoService;

    public UploadService(FileService fileService,
                         SessionService masterSessionService,
                         MasterEntityRepository masterEntityRepository,
                         UploadEntityRepository uploadEntityRepository,
                         ChunkStorageService chunkStorageService,
                         VideoService videoService) {
        this.masterEntityRepository = masterEntityRepository;
        this.uploadEntityRepository = uploadEntityRepository;
        this.chunkStorageService = chunkStorageService;
        this.fileService = fileService;
        this.videoService = videoService;
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
        chunkStorageService.saveChunk(fileId, chunkNumber, chunk);
        if (!chunkStorageService.isUploadComplete(fileId, totalChunks)) {
            return;
        }

        File finalFile = chunkStorageService.combineChunks(fileId, totalChunks);
        int videoDuration = (int)videoService.getVideoDurationSeconds(finalFile.getPath());
        long fileSize = fileService.getFileSizeInMegabytes(finalFile);

        MasterEntity masterEntity = masterEntityRepository.findByMasterId(masterId);
        if (masterEntity == null) {
            throw new IllegalArgumentException("Master not found");
        }
        
        UploadEntity uploadEntity = new UploadEntity();
        uploadEntity.setTitle(fileId);
        uploadEntity.setDescription(fileId);
        uploadEntity.setFilePath(finalFile.getPath());
        uploadEntity.setFileSize(fileSize);
        uploadEntity.setDurationSeconds(videoDuration);
        uploadEntity.setUploadDate(LocalDateTime.now());
        uploadEntity.setMaster(masterEntity);

        UploadEntity ue = uploadEntityRepository.save(uploadEntity);

        pendingVideoId.put(fileId, ue.getId());
    }

    public void handleUploadMetadata(String fileId,
                                     String title,
                                     String description,
                                     MultipartFile thumbnail) throws IOException {
        Optional<UploadEntity> uploadEntity = uploadEntityRepository.findById(pendingVideoId.get(fileId));

        uploadEntity.get().setTitle(title);
        uploadEntity.get().setDescription(description);

        if (thumbnail != null && !thumbnail.isEmpty()) {
            String thumbnailFileName = fileId + "_thumbnail.jpg";
            Path thumbnailPath = Paths.get("uploads/thumbnails", thumbnailFileName);

            Files.createDirectories(thumbnailPath.getParent());
            Files.copy(thumbnail.getInputStream(), thumbnailPath);

            uploadEntity.get().setThumbnailPath(thumbnailPath.toString());
        } else {
            uploadEntity.get().setThumbnailPath(null);
        }

        uploadEntityRepository.save(uploadEntity.get());
        pendingVideoId.remove(fileId);
    }

    public void handleGetUploadState(String masterId) throws IOException {
        MasterEntity me = masterEntityRepository.findByMasterId(masterId);
        if(me == null)
            throw new IllegalArgumentException("Master entity not found");
        if (me.getUploads().isEmpty()) {
            throw new IllegalArgumentException("Upload entity not found");
        }
    }
}
