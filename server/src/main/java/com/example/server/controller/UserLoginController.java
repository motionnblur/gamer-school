package com.example.server.controller;

import com.example.server.dto.UserLoginDto;
import com.example.server.service.UserLoginService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
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
    public HttpStatus sign(@RequestBody UserLoginDto userLoginDto) {
        userLoginService.signUp(userLoginDto);
        return HttpStatus.OK;
    }

    @PostMapping("/login")
    public HttpStatus login(@RequestBody UserLoginDto userLoginDto) {
        userLoginService.login(userLoginDto);
        return HttpStatus.OK;
    }
}
