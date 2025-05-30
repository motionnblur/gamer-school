package com.example.server.service;

import com.example.server.dto.UserLoginDto;
import com.example.server.entity.UserEntity;
import com.example.server.repository.UserEntityRepository;
import org.springframework.stereotype.Service;

@Service
public class UserLoginService {
    private final UserEntityRepository userEntityRepository;
    private final EncryptService encryptService;

    public UserLoginService(UserEntityRepository userEntityRepository,
                            EncryptService encryptService) {
        this.userEntityRepository = userEntityRepository;
        this.encryptService = encryptService;
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
    public void login(UserLoginDto userLoginDto) {
        String userMail = userLoginDto.getUserMail();
        String userPassword = userLoginDto.getUserPassword();

        UserEntity entity = userEntityRepository.findByUserMail(userMail);

        if(entity == null)
            throw new IllegalArgumentException("User not found");

        if(!encryptService.checkIfPasswordMatches(userPassword, entity.getUserPassword()))
            throw new IllegalArgumentException("Wrong password");
    }
}
