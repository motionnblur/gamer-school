package com.example.server.controller.master;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;

@RestController("masterUploadController")
@RequestMapping("/master")
public class UploadController {
    @PostMapping("/upload")
    public HttpStatus uploadVideo(@RequestParam("file") MultipartFile file) {
        if (file.isEmpty()) {
            return HttpStatus.BAD_REQUEST;
        }

        try {
            // Save the file to a local folder (e.g., "uploads")
            File uploadDir = new File("uploads");
            if (!uploadDir.exists()) uploadDir.mkdirs();

            File savedFile = new File(uploadDir, file.getOriginalFilename());
            file.transferTo(savedFile);

            return HttpStatus.OK;
        } catch (IOException e) {
            e.printStackTrace();
            return HttpStatus.BAD_REQUEST;
        }
    }
}
