package com.example.server.dto.user;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UserLoginDto {
    private String userMail;
    private String userPassword;
}
