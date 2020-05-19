package com.jobrian.usermanagement.rest_controller;

import com.jobrian.usermanagement.model.Session;
import com.jobrian.usermanagement.model.User;
import com.jobrian.usermanagement.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import javax.servlet.http.HttpSession;

@RestController
@RequestMapping("/api/v1/session")
public class SessionController {
    @Autowired
    private UserRepository userRepository;

    /**
     * Checks that the person that is login in is valid
     * then returns the user
     * @param session
     * @param user
     * @return
     */
    @PostMapping
    public Session createSession(HttpSession session, @RequestBody User user){
        User lookedup = userRepository.findByEmailAndPassword(
                user.getEmail(), user.getPassword()
        );
        lookedup.setPassword("");
        session.setAttribute("session-user", lookedup);
        return new Session(session.getId(), lookedup);
    }
}
