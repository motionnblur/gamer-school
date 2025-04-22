package com.example.server.service;

import com.example.server.config.SecurityConfig;
import org.springframework.stereotype.Service;

@Service
public class EncryptService {
    private final SecurityConfig securityConfiguration;

    public EncryptService(SecurityConfig securityConfiguration) {
        this.securityConfiguration = securityConfiguration;
    }

    public String getEncryptedPassword(String decryptedPassword) {
        return securityConfiguration.passwordEncoder().encode(decryptedPassword);
    }
    public boolean checkIfPasswordMatches(String decryptedPassword, String encryptedPassword) {
        return securityConfiguration.passwordEncoder().matches(decryptedPassword, encryptedPassword);
    }
}