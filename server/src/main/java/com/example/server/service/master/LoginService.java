package com.example.server.service.master;

import com.example.server.dto.master.LoginDto;
import com.example.server.entity.MasterEntity;
import com.example.server.repository.MasterEntityRepository;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service("masterLoginService")
public class LoginService {
    private final MasterEntityRepository masterEntityRepository;
    private final SessionService masterSessionService;

    public LoginService(MasterEntityRepository masterEntityRepository,
                        SessionService masterSessionService) {
        this.masterEntityRepository = masterEntityRepository;
        this.masterSessionService = masterSessionService;
    }

    public void login(HttpServletResponse response, LoginDto loginDto) {
        String masterId = loginDto.getMasterId();
        String masterPassword = loginDto.getMasterPassword();

        MasterEntity masterEntity = masterEntityRepository.findByMasterId(masterId);

        if(masterEntity == null)
            throw new IllegalArgumentException("Admin not found");
        if(!masterEntity.getMasterPassword().equals(masterPassword))
            throw new IllegalArgumentException("Wrong password");

        String sessionId = UUID.randomUUID().toString();

        Cookie cookie = new Cookie("SESSION_ID", sessionId);
        cookie.setHttpOnly(true);
        cookie.setSecure(false);
        cookie.setPath("/");
        cookie.setAttribute("SameSite", "Lax");

        masterSessionService.addSession(sessionId, masterId);

        response.addCookie(cookie);
    }
}
