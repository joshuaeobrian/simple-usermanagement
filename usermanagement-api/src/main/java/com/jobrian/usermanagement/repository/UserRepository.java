package com.jobrian.usermanagement.repository;

import com.jobrian.usermanagement.model.Role;
import com.jobrian.usermanagement.model.User;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

interface UserPartial {
    Integer getId();
    String getFirstName();
    String getLastName();
    String getEmail();
}

interface UserPartialWithRole extends UserPartial{
    String getEmail();
}

@Repository
public interface UserRepository extends CrudRepository<User, Integer> {
    User findByEmailAndPassword(String email, String password);

    @Query(value="SELECT id, first_name as firstName, last_name as lastName FROM users\n" +
            "left join user_groups_users as ugu on ugu.users_id = users.id " +
            "where ugu.user_group_id is null order by firstName asc;", nativeQuery=true)
    Iterable<UserPartial> findUserWithoutGroups();

}
