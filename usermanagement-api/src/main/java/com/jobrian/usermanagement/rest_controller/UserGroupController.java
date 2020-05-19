package com.jobrian.usermanagement.rest_controller;

import com.jobrian.usermanagement.model.User;
import com.jobrian.usermanagement.model.UserGroup;
import com.jobrian.usermanagement.repository.UserGroupRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/api/v1/user-group")
public class UserGroupController {
    @Autowired
    private UserGroupRepository userGroupRepository;

    /**
     * Gets all user groups in the management system
     * @return
     */
    @GetMapping
    public Iterable<UserGroup> getAllUserGroups() {
        return userGroupRepository.findAll();
    }

    /**
     * Post request that takes a UserGroup and adds them to the system
     * @param userGroup
     * @return User
     */
    @PostMapping
    public UserGroup addUserGroup(@RequestBody UserGroup userGroup) {
        return userGroupRepository.save(userGroup);
    }

    /**
     * Delete request that deletes a user by given ID
     * @param id
     */
    @DeleteMapping("/{id}")
    public void deleteUserGroup(@PathVariable Integer id){
        userGroupRepository.deleteAllUserFromUserGroup(id);
        userGroupRepository.deleteById(id);
    }

    /**
     * Post request that will add user to a given group
     * @param group_id
     * @param user
     * @return
     */
    @PostMapping("/{group_id}")
    public Object addUserToUserGroup(@PathVariable Integer group_id, @RequestBody User user) {
        Optional<UserGroup> userGroup = userGroupRepository.findById(group_id);
        if (userGroup.isPresent()){
            UserGroup temp = userGroup.get();
            temp.getUsers().add(user);
            return userGroupRepository.save(temp);
        }
        return userGroup;
    }

    /**
     * Delete request that deletes a user from a given group
     * @param groupId
     * @param userId
     */
    @DeleteMapping("/{groupId}/{userId}")
    public void deleteUserFromUserGroup(@PathVariable Integer groupId, @PathVariable Integer userId){
        userGroupRepository.deleteUserFromUserGroup(userId, groupId);
    }
}
