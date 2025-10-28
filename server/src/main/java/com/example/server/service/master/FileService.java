package com.example.server.service.master;

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
    public long getFileSizeInMegabytes(File file) {
        long sizeInBytes = file.length();
        final double MB = 1024.0 * 1024.0;

        return (long) (sizeInBytes / MB);
    }
}
