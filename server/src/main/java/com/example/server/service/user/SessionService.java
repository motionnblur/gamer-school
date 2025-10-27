package com.example.server.service.user;

import com.example.server.service.interfaces.ISessionService;
import lombok.Getter;
import org.springframework.stereotype.Service;

import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

@Getter
@Service("userSessionService")
public class SessionService implements ISessionService {
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

    @Override
    public String getMasterId(String sessionId) {
        return activeSessions.get(sessionId);
    }

}
