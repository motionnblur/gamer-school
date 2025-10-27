package com.example.server.filters;

import com.example.server.service.interfaces.ISessionService;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

@Component
public class SessionAuthFilter extends OncePerRequestFilter {
    private final ISessionService userSessionService;
    private final ISessionService masterSessionService;
    public SessionAuthFilter(com.example.server.service.user.SessionService userSessionService,
                             com.example.server.service.master.SessionService masterSessionService) {
        this.userSessionService = userSessionService;
        this.masterSessionService = masterSessionService;
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
            throws ServletException, IOException {

        String path = request.getRequestURI();
        String method = request.getMethod();

        if ("OPTIONS".equalsIgnoreCase(method)) {
            response.setStatus(HttpServletResponse.SC_OK);
            filterChain.doFilter(request, response);
            return;
        }
        if (path.equals("/master/login") || path.equals("/user/login") || path.equals("/user/sign")) {
            filterChain.doFilter(request, response);
            return;
        }

        String sessionId = null;

        if (request.getCookies() != null) {
            for (Cookie cookie : request.getCookies()) {
                if ("SESSION_ID".equals(cookie.getName())) {
                    sessionId = cookie.getValue();
                    break;
                }
            }
        }

        if(path.startsWith("/user"))
        {
            handleUserFilter(sessionId, userSessionService, filterChain, request, response);
        }else if(path.startsWith("/master"))
        {
            handleMasterFilter(sessionId, masterSessionService, filterChain, request, response);
        }
    }

    private void handleUserFilter(String sessionId,
                                  ISessionService userSessionService,
                                  FilterChain filterChain,
                                  HttpServletRequest request,
                                  HttpServletResponse response) throws ServletException, IOException {
        if (sessionId != null && userSessionService.getActiveSessions().containsKey(sessionId)) {
            request.setAttribute("userEmail", userSessionService.getActiveSessions().get(sessionId));
            filterChain.doFilter(request, response);
        } else {
            response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
        }
    }
    private void handleMasterFilter(String sessionId,
                                    ISessionService masterSessionService,
                                    FilterChain filterChain,
                                    HttpServletRequest request,
                                    HttpServletResponse response) throws ServletException, IOException {
        if (sessionId != null && masterSessionService.getActiveSessions().containsKey(sessionId)) {
            filterChain.doFilter(request, response);
        } else {
            response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
        }
    }
}
