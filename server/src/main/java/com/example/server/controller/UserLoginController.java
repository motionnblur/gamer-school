package com.example.server.controller;

import com.example.server.dto.UserLoginDto;
import com.example.server.service.UserLoginService;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class UserLoginController {
    private final UserLoginService userLoginService;

    public UserLoginController(UserLoginService userLoginService) {
        this.userLoginService = userLoginService;
    }

    @PostMapping("/sign")
    public String login(@RequestBody UserLoginDto userLoginDto) {
        userLoginService.signUp(userLoginDto);
        return "success";
    }
}
