package com.example.server.controller.user;

import com.example.server.dto.user.LoginDto;
import com.example.server.service.user.LoginService;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController("userLoginController")
@RequestMapping("/user")
public class LoginController {
    private final LoginService loginService;

    public LoginController(LoginService loginService) {
        this.loginService = loginService;
    }

    @PostMapping("/sign")
    public HttpStatus sign(@RequestBody LoginDto loginDto) {
        loginService.signUp(loginDto);
        return HttpStatus.OK;
    }

    @PostMapping("/login")
    public HttpStatus login(@RequestBody LoginDto loginDto, HttpServletResponse response) {
        loginService.login(response, loginDto);
        return HttpStatus.OK;
    }
}
