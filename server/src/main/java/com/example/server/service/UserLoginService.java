package com.example.server.service;

import com.example.server.dto.UserLoginDto;
import com.example.server.entity.UserEntity;
import com.example.server.repository.UserEntityRepository;
import org.springframework.stereotype.Service;

@Service
public class UserLoginService {
    private final UserEntityRepository userEntityRepository;

    public UserLoginService(UserEntityRepository userEntityRepository) {
        this.userEntityRepository = userEntityRepository;
    }

    public void signUp(UserLoginDto userLoginDto) {
        String userMail = userLoginDto.getUserMail();
        String userPassword = userLoginDto.getUserPassword();

        if(userEntityRepository.findByUserMail(userMail) != null)
            throw new IllegalArgumentException("That mail is already in use");

        UserEntity entity = new UserEntity();
        entity.setUserMail(userMail);
        entity.setUserPassword(userPassword);

        userEntityRepository.save(entity);
    }
}
