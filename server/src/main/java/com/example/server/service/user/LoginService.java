package com.example.server.service.user;

import com.example.server.dto.user.LoginDto;
import com.example.server.entity.UserEntity;
import com.example.server.repository.UserEntityRepository;
import com.example.server.service.EncryptService;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service("userLoginService")
public class LoginService  {
    private final UserEntityRepository userEntityRepository;
    private final EncryptService encryptService;
    private final SessionService sessionService;

    public LoginService(UserEntityRepository userEntityRepository,
                        EncryptService encryptService,
                        SessionService sessionService) {
        this.userEntityRepository = userEntityRepository;
        this.encryptService = encryptService;
        this.sessionService = sessionService;
    }

    public void signUp(LoginDto loginDto) {
        String userMail = loginDto.getUserMail();
        String userPassword = loginDto.getUserPassword();

        if(userEntityRepository.findByUserMail(userMail) != null)
            throw new IllegalArgumentException("That mail is already in use");

        UserEntity entity = new UserEntity();
        entity.setUserMail(userMail);
        entity.setUserPassword(encryptService.getEncryptedPassword(userPassword));

        userEntityRepository.save(entity);
    }
    public void login(HttpServletResponse response, LoginDto loginDto) {
        String userMail = loginDto.getUserMail();
        String userPassword = loginDto.getUserPassword();

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
