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
import java.util.ArrayList;
import java.util.List;

@Service
public class VideoService {
    private final MasterEntityRepository masterEntityRepository;

    public VideoService(MasterEntityRepository masterEntityRepository) {
        this.masterEntityRepository = masterEntityRepository;
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
                dto.setTitle(e.getTitle());
                dto.setDescription(e.getDescription());
                dto.setDuration(e.getDurationSeconds());
                dto.setUploadDate(e.getUploadDate());

                metadataDtos.add(dto);
            }
        }else {
            throw new Exception("Metadata error");
        }

        return metadataDtos;
    }
}
