package com.example.server.controller.master;

import com.example.server.dto.master.LoginDto;
import com.example.server.service.master.LoginService;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

@RestController("masterLoginController")
@RequestMapping("/master")
public class LoginController {
    private final LoginService loginService;

    public LoginController(LoginService loginService) {
        this.loginService = loginService;
    }

    @PostMapping("/login")
    public HttpStatus sign(@RequestBody LoginDto loginDto, HttpServletResponse response) {
        loginService.login(response, loginDto);
        return HttpStatus.OK;
    }
}
