package com.example.server.controller.master;

import com.example.server.service.master.UploadService;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@RestController("masterUploadController")
@RequestMapping("/master")
public class UploadController {
    private final UploadService uploadService;

    public UploadController(UploadService uploadService) {
        this.uploadService = uploadService;
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
    public HttpStatus uploadMetadata(
            @RequestParam("fileId") String fileId,
            @RequestParam("title") String title,
            @RequestParam("description") String description,
            @RequestParam(value = "thumbnail", required = false) MultipartFile thumbnail
    )
    {
        try{
            uploadService.handleUploadMetadata(fileId, title, description, thumbnail);
            return HttpStatus.OK;
        } catch(IOException e) {
            e.printStackTrace();
            return HttpStatus.BAD_REQUEST;
        }
    }
}
