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
     * @return
     */
    @GetMapping
    public Iterable<UserGroup> getAllUserGroups() {
        return userGroupRepository.findAll();
    }

    /**
     * @param userGroup
     * @return
     */
    @PostMapping
    public UserGroup addUserGroup(@RequestBody UserGroup userGroup) {
        return userGroupRepository.save(userGroup);
    }

    /**
     * @param id
     */
    @DeleteMapping("/{id}")
    public void deleteUserGroup(@PathVariable Integer id){
        userGroupRepository.deleteAllUserFromUserGroup(id);
        userGroupRepository.deleteById(id);
    }

    @PostMapping("/{group_id}")
    public Object addUserToUserGroup(@PathVariable Integer group_id, @RequestBody User user) {
        Optional<UserGroup> userGroup = userGroupRepository.findById(group_id);
        if (userGroup.isPresent()){
            UserGroup temp = userGroup.get();
            temp.getUsers().add(user);
            return userGroupRepository.save(userGroup.get());
        }
        return userGroup;
    }
    @DeleteMapping("/{groupId}/{userId}")
    public void deleteUserFromUserGroup(@PathVariable Integer groupId, @PathVariable Integer userId){
        userGroupRepository.deleteUserFromUserGroup(userId, groupId);
    }
}
