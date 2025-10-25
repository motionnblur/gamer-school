package com.example.server.filters;

import com.example.server.service.SessionService;
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
    private final SessionService sessionService;
    public SessionAuthFilter(SessionService sessionService) {
        this.sessionService = sessionService;
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
        if (path.equals("/login") || path.equals("/sign")) {
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

        if (sessionId != null && sessionService.getActiveSessions().containsKey(sessionId)) {
            // Attach user info to request for controllers
            request.setAttribute("userEmail", sessionService.getActiveSessions().get(sessionId));
            filterChain.doFilter(request, response);
        } else {
            response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
        }
    }
}
