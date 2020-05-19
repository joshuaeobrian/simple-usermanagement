package com.jobrian.usermanagement.repository;

import com.jobrian.usermanagement.model.UserGroup;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import javax.transaction.Transactional;

@Repository
public interface UserGroupRepository extends CrudRepository<UserGroup, Integer> {
    @Transactional
    @Modifying
    @Query(value="DELETE ugu FROM user_groups_users as ugu inner JOIN user_groups ug on ugu.user_group_id = ug.id WHERE ugu.users_id=:user_id and ugu.user_group_id=:group_id", nativeQuery=true)
    void deleteUserFromUserGroup(@Param("user_id")Integer userId, @Param("group_id") Integer groupId);

    @Transactional
    @Modifying
    @Query(value="DELETE ugu FROM user_groups_users as ugu inner JOIN user_groups ug on ugu.user_group_id = ug.id WHERE ugu.user_group_id=:group_id", nativeQuery=true)
    void deleteAllUserFromUserGroup(@Param("group_id") Integer groupId);
}
