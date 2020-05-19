package com.jobrian.usermanagement.rest_controller;

import com.jobrian.usermanagement.model.User;
import com.jobrian.usermanagement.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/user")
public class UserController {
    @Autowired
    private UserRepository userRepository;

    @GetMapping()
    public Iterable<User> getAll (){
        // TODO: remove all passwords
        return userRepository.findAll();
    }

    @PostMapping()
    public User addUser (@RequestBody User user){
        return userRepository.save(user);
    }

    @DeleteMapping("/{id}")
    public void deleteUser(@PathVariable Integer id){
        userRepository.deleteById(id);
    }
    @GetMapping("/no-group")
    public Object getAllUsersWithoutGroup(){
        return userRepository.findUserWithoutGroups();
    }
}
