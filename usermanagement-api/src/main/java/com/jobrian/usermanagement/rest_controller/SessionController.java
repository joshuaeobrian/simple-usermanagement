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
    @PostMapping
    public Session createSession(HttpSession session, @RequestBody User user){
        System.out.printf("Session, %s%n", session.getId());
        Object lookedup = userRepository.findByEmailAndPassword(
                user.getEmail(), user.getPassword()
        );
        System.out.println(lookedup);
        session.setAttribute("session-user", lookedup);
        return new Session(session.getId(), lookedup);
    }
    @DeleteMapping
    public void endSession(HttpSession session){
        session.removeAttribute("session-user");
    }

}
