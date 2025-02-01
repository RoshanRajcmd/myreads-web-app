package com.myappliction.springboot_application.user;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.UUID;

//The User and Long (ID) passed into the JpaRepository making Jpa provide function to CURD operations with the table
//(repository) in this case the User is the table and ID is its primary key
@Repository
public interface UserRepository extends JpaRepository<User, UUID> {

    //The below declaration is a JPQL Query when ?1 will have the value of email we send in to this method. This query
    //will query out all the Users with the given email
    @Query("SELECT s FROM User s WHERE s.email = ?1")
    Optional<User> findUserByEmail(String email);

    @Query("SELECT s FROM User s WHERE s.userName = ?1")
    Optional<User> findUserByUsername(String username);
}
