package com.example.server.service.interfaces;

import java.util.Map;

public interface ISessionService {
    void addSession(String sessionId, String userMail);
    void removeSession(String sessionId);
    String getUserMail(String sessionId);
    Map<String, String> getActiveSessions();
}
