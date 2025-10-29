package com.example.server.dto.master;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class VideoMetadataDto {
    private String title;
    private String description;
    private int duration;
    private java.time.LocalDateTime uploadDate;
}
