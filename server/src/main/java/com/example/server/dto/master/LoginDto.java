package com.example.server.dto.master;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class LoginDto {
    private String masterId;
    private String masterPassword;
}
