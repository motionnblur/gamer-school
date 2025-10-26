package com.example.server.service.master;

import com.example.server.dto.master.MasterLoginDto;
import com.example.server.entity.MasterEntity;
import com.example.server.repository.MasterEntityRepository;
import org.springframework.stereotype.Service;

@Service
public class MasterLoginService {
    private final MasterEntityRepository masterEntityRepository;

    public MasterLoginService(MasterEntityRepository masterEntityRepository) {
        this.masterEntityRepository = masterEntityRepository;
    }

    public void login(MasterLoginDto masterLoginDto) {
        String masterId = masterLoginDto.getMasterId();
        String masterPassword = masterLoginDto.getMasterPassword();

        MasterEntity masterEntity = masterEntityRepository.findByMasterId(masterId);

        if(masterEntity == null)
            throw new IllegalArgumentException("Admin not found");
        if(!masterEntity.getMasterPassword().equals(masterPassword))
            throw new IllegalArgumentException("Wrong password");
    }
}
