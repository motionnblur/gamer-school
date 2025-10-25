package com.example.server.controller;

import com.example.server.dto.userpath.UserPathDto;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class UserController {
    @PostMapping("/set-user-path")
    public HttpStatus userPath(@RequestBody UserPathDto userPathDto) {
        return HttpStatus.OK;
    }
}
