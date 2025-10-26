package com.example.server.service.user;

import com.example.server.dto.user.UserLoginDto;
import com.example.server.entity.UserEntity;
import com.example.server.repository.UserEntityRepository;
import com.example.server.service.EncryptService;
import com.example.server.service.SessionService;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
public class UserLoginService {
    private final UserEntityRepository userEntityRepository;
    private final EncryptService encryptService;
    private final SessionService sessionService;

    public UserLoginService(UserEntityRepository userEntityRepository,
                            EncryptService encryptService,
                            SessionService sessionService) {
        this.userEntityRepository = userEntityRepository;
        this.encryptService = encryptService;
        this.sessionService = sessionService;
    }

    public void signUp(UserLoginDto userLoginDto) {
        String userMail = userLoginDto.getUserMail();
        String userPassword = userLoginDto.getUserPassword();

        if(userEntityRepository.findByUserMail(userMail) != null)
            throw new IllegalArgumentException("That mail is already in use");

        UserEntity entity = new UserEntity();
        entity.setUserMail(userMail);
        entity.setUserPassword(encryptService.getEncryptedPassword(userPassword));

        userEntityRepository.save(entity);
    }
    public void login(HttpServletResponse response, UserLoginDto userLoginDto) {
        String userMail = userLoginDto.getUserMail();
        String userPassword = userLoginDto.getUserPassword();

        UserEntity entity = userEntityRepository.findByUserMail(userMail);

        if(entity == null)
            throw new IllegalArgumentException("User not found");

        if(!encryptService.checkIfPasswordMatches(userPassword, entity.getUserPassword()))
            throw new IllegalArgumentException("Wrong password");

        String sessionId = UUID.randomUUID().toString();

        Cookie cookie = new Cookie("SESSION_ID", sessionId);
        cookie.setHttpOnly(true);
        cookie.setSecure(false);
        cookie.setPath("/");
        cookie.setAttribute("SameSite", "Lax");

        sessionService.addSession(sessionId, userMail);

        response.addCookie(cookie);
    }
}
