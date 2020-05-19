package com.jobrian.usermanagement.model;

import javax.persistence.*;

@Entity
@Table(name = "users")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer id;
    @Column(name = "first_name", nullable = true)
    private String firstName = "";
    @Column(name = "last_name", nullable = true)
    private String lastName = "";
    @Column(name = "email", nullable = true)
    private String email = "";
    @Column(name = "password", nullable = true)
    private String password = "";
    @ManyToOne()
    @JoinColumn(name = "role_id", referencedColumnName = "id", columnDefinition = "int default 2")
    private Role role = new Role(2, "employee");
//    @OneToOne
//    private UserGroup userGroup;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public Role getRole() {
        return role;
    }

    public void setRole(Role role) {
        this.role = role;
    }

//    public UserGroup getUserGroup() {
//        return userGroup;
//    }
//
//    public void setUserGroup(UserGroup userGroup) {
//        this.userGroup = userGroup;
//    }

    @Override
    public String toString() {
        return "User{" +
                "id=" + id +
                ", firstName='" + firstName + '\'' +
                ", lastName='" + lastName + '\'' +
                ", email='" + email + '\'' +
                ", password='" + password + '\'' +
                ", role=" + role +
//                ", userGroup=" + userGroup +
                '}';
    }
}
