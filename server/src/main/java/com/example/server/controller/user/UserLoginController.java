package com.example.server.controller.user;

import com.example.server.dto.user.UserLoginDto;
import com.example.server.service.user.UserLoginService;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class UserLoginController {
    private final UserLoginService userLoginService;

    public UserLoginController(UserLoginService userLoginService) {
        this.userLoginService = userLoginService;
    }

    @PostMapping("/user/sign")
    public HttpStatus sign(@RequestBody UserLoginDto userLoginDto) {
        userLoginService.signUp(userLoginDto);
        return HttpStatus.OK;
    }

    @PostMapping("/user/login")
    public HttpStatus login(@RequestBody UserLoginDto userLoginDto, HttpServletResponse response) {
        userLoginService.login(response, userLoginDto);
        return HttpStatus.OK;
    }
}
