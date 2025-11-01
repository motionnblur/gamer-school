package com.example.server.controller.master;

import com.example.server.service.master.UploadService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@RestController("masterUploadController")
@RequestMapping("/master")
public class UploadController {
    private final UploadService uploadService;

    public UploadController(UploadService uploadService) {
        this.uploadService = uploadService;
    }

    @GetMapping("/get-upload-state")
    public HttpStatus getUploadState(@RequestParam("userId") String userId) {
        try {
            uploadService.handleGetUploadState(userId);
            return HttpStatus.OK;
        } catch (IOException e) {
            e.printStackTrace();
            return HttpStatus.BAD_REQUEST;
        }
    }

    @PostMapping("/upload-chunk")
    public HttpStatus uploadChunk(
            @RequestParam("userId") String userId,
            @RequestParam("file") MultipartFile chunk,
            @RequestParam("fileId") String fileId,
            @RequestParam("chunkNumber") int chunkNumber,
            @RequestParam("totalChunks") int totalChunks) {

        try {
            uploadService.handleUpload(userId, chunk, fileId, chunkNumber, totalChunks);
            return HttpStatus.OK;
        } catch (IOException e) {
            e.printStackTrace();
            return HttpStatus.BAD_REQUEST;
        }
    }

    @PostMapping("upload-metadata")
    public ResponseEntity<Long> uploadMetadata(
            @RequestParam("fileId") String fileId,
            @RequestParam("title") String title,
            @RequestParam("description") String description,
            @RequestParam(value = "thumbnail", required = false) MultipartFile thumbnail
    )
    {
        try{
            Long videoId = uploadService.handleUploadMetadata(fileId, title, description, thumbnail);
            return new ResponseEntity<>(videoId, HttpStatus.OK);
        } catch(IOException e) {
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }
}
