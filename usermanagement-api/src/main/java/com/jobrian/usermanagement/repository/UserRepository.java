package com.jobrian.usermanagement.repository;

import com.jobrian.usermanagement.model.Role;
import com.jobrian.usermanagement.model.User;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.Collection;
import java.util.List;
import java.util.stream.Stream;
interface UserPartial {
    Integer getId();
    String getFirstName();
    String getLastName();
}

interface UserPartialWithRole extends UserPartial{
    String getEmail();
    Role getRole();
}

@Repository
public interface UserRepository extends CrudRepository<User, Integer> {
    @Query(value="SELECT id, first_name as firstName, last_name as lastName, email FROM users WHERE email=?1 AND 'password'=?2", nativeQuery=true)
    UserPartialWithRole findByEmailAndPassword(String email, String password);

    @Query(value="SELECT id, first_name as firstName, last_name as lastName FROM users\n" +
            "left join user_groups_users as ugu on ugu.users_id = users.id " +
            "where ugu.user_group_id is null order by firstName asc;", nativeQuery=true)
    Iterable<UserPartial> findUserWithoutGroups();

//    @Query(value="DELETE FROM users, user_groups_user ")
//    void deleteUserById(Integer id);
}
