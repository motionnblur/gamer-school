package com.example.server.controller.master;

import com.example.server.dto.master.MasterLoginDto;
import com.example.server.service.master.MasterLoginService;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class MasterLoginController {
    private final MasterLoginService masterLoginService;

    public MasterLoginController(MasterLoginService masterLoginService) {
        this.masterLoginService = masterLoginService;
    }

    @PostMapping("/master/login")
    public HttpStatus sign(@RequestBody MasterLoginDto masterLoginDto) {
        masterLoginService.login(masterLoginDto);
        return HttpStatus.OK;
    }
}
