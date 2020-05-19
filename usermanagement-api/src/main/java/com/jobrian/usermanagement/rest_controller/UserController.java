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

    /**
     * Gets all the users
     * @return
     */
    @GetMapping()
    public Iterable<User> getAll (){
        return userRepository.findAll();
    }

    /**
     * Creates a new user
     * @param user
     * @return
     */
    @PostMapping()
    public User addUser (@RequestBody User user){
        return userRepository.save(user);
    }

    /**
     * Deletes a user
     * @param id
     */
    @DeleteMapping("/{id}")
    public void deleteUser(@PathVariable Integer id){
        userRepository.deleteById(id);
    }

    /**
     * Gets all users with out groups
     * @return
     */
    @GetMapping("/no-group")
    public Object getAllUsersWithoutGroup(){
        return userRepository.findUserWithoutGroups();
    }
}
