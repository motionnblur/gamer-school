package com.example.server.service;

import org.springframework.stereotype.Service;

import java.io.File;

@Service
public class FileService {
    public File createFileIfNotExists(String path) {
        File file = new File(path);
        if (!file.exists()) {
            file.mkdirs();
        }
        return file;
    }
    public File createChunkFile(File tempDir, int chunkNumber) {
        return new File(tempDir, "chunk-" + chunkNumber);
    }
}
