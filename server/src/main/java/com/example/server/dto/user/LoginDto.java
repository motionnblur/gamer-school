package com.example.server.dto.user;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class LoginDto {
    private String userMail;
    private String userPassword;
}
