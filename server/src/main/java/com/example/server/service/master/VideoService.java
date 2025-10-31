package com.example.server.service.master;

import com.example.server.dto.master.VideoMetadataDto;
import com.example.server.entity.MasterEntity;
import com.example.server.entity.UploadEntity;
import com.example.server.repository.MasterEntityRepository;
import com.example.server.repository.UploadEntityRepository;
import org.springframework.stereotype.Service;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class VideoService {
    private final MasterEntityRepository masterEntityRepository;
    private final UploadEntityRepository uploadEntityRepository;

    public VideoService(MasterEntityRepository masterEntityRepository,
                        UploadEntityRepository uploadEntityRepository) {
        this.masterEntityRepository = masterEntityRepository;
        this.uploadEntityRepository = uploadEntityRepository;
    }

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

    public List<VideoMetadataDto> getAllVideoMetadata(String masterId) throws Exception {
        MasterEntity me = masterEntityRepository.findByMasterId(masterId);
        if(me == null) {
            throw new Exception("Couldn't found master entity");
        }

        List<UploadEntity> dtos = me.getUploads();
        List<VideoMetadataDto> metadataDtos = new ArrayList<>();
        if(!dtos.isEmpty()) {
            for(UploadEntity e : dtos) {
                VideoMetadataDto dto = new VideoMetadataDto();
                dto.setId(e.getId());
                dto.setTitle(e.getTitle());
                dto.setDescription(e.getDescription());
                dto.setDuration(e.getDurationSeconds());
                dto.setUploadDate(e.getUploadDate());

                metadataDtos.add(dto);
            }
        }

        return metadataDtos;
    }

    public byte[] getVideoThumbnail(long videoId) throws IOException {
        Optional<UploadEntity> uploadEntity = uploadEntityRepository.findById(videoId);
        if(uploadEntity.isEmpty()) {
            throw new RuntimeException("Upload entity not found");
        }
        return Files.readAllBytes(Paths.get(uploadEntity.get().getThumbnailPath()));
    }

    public void deleteVideo(long videoId) throws IOException {
        Optional<UploadEntity> uploadEntity = uploadEntityRepository.findById(videoId);
        if(uploadEntity.isEmpty()) {
            throw new RuntimeException("Upload entity not found");
        }
        uploadEntityRepository.delete(uploadEntity.get());
        Files.deleteIfExists(Paths.get(uploadEntity.get().getFilePath()));
        Files.deleteIfExists(Paths.get(uploadEntity.get().getThumbnailPath()));
    }
}
