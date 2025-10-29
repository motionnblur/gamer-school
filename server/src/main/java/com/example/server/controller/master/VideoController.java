package com.example.server.controller.master;

import com.example.server.dto.master.VideoMetadataDto;
import com.example.server.service.master.VideoService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;


@RestController("masterVideoController")
@RequestMapping("/master")
public class VideoController {
    private final VideoService videoService;

    public VideoController(VideoService videoService) {
        this.videoService = videoService;
    }

    @GetMapping("/get-all-video-metadata")
    public List<VideoMetadataDto> getVideoMetadata(@RequestParam("userId") String userId) {
        try{
            return videoService.getAllVideoMetadata(userId);
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }
}
