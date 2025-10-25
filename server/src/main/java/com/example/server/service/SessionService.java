package com.example.server.service;

import org.springframework.stereotype.Service;

import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

@Service
public class SessionService {
    private final Map<String, String> activeSessions = new ConcurrentHashMap<>();

    public void addSession(String sessionId, String userMail) {
        activeSessions.put(sessionId, userMail);
    }

    public void removeSession(String sessionId) {
        activeSessions.remove(sessionId);
    }

    public String getUserMail(String sessionId) {
        return activeSessions.get(sessionId);
    }

    public Map<String, String> getActiveSessions() {
        return activeSessions;
    }
}
