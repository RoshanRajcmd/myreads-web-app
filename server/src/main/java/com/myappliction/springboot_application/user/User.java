package com.myappliction.springboot_application.user;
import com.myappliction.springboot_application.book.Book;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.Period;
import java.time.format.DateTimeFormatter;
import java.util.*;

@Entity
@Table(name ="users")
@NoArgsConstructor
@AllArgsConstructor
public class User {
    @Id
    @Column(unique = true)
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID userId;
    private String fullName;
    private String userName;
    private String dob;
    //Transient is to tell the Hibernate API that this column will be handled in the runtime and does not need to be
    //stored in the DB. If you don't use this annotation the age will get calculated and shown in the web but that null
    // value will be show in DB, if this annotation used it will not display this age column in DB.
    @Transient
    private Integer age;
    @Column(unique = true)
    private String email;
    private String password;
    private Set<Long> friendsIds;
    //Cascade All to initialize the child object in the DB while initializing Part object and its columns
    @ManyToMany(cascade = CascadeType.ALL)
    private Set<Book> booksList = new HashSet<Book>();


    public User(String fullName, String userName, String dob, String email, String password,
                Set<Book> booksList, Set<Long> friendsIds){
        this.fullName = fullName;
        this.userName = userName;
        this.dob = dob;
        this.email = email;
        this.password = password;
        this.booksList = booksList;
        this.friendsIds = friendsIds;
    }

    public UUID getId() {
        return userId;
    }

    public void setId(UUID userId) {
        this.userId = userId;
    }

    public String getFullName() {
        return fullName;
    }

    public void setFullName(String fullName) {
        this.fullName = fullName;
    }

    public String getUserName() { return userName; }

    public void setUserName(String userName) { this.userName = userName; }

    public String getDob() {
        return dob;
    }

    public void setDob(String dob) {
        this.dob = dob;
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

    public Integer getAge() {
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
        LocalDate birthDate = LocalDate.parse(this.dob, formatter);
        return Period.between(birthDate, LocalDate.now()).getYears();
    }

    public void setAge(Integer age) {
        this.age = age;
    }

    public Set<Long> getFriendsIds() {
        return friendsIds;
    }

    public void setFriendsIds(Set<Long> friendsIds) {
        this.friendsIds = friendsIds;
    }

    public Set<Book> getBooksList() {
        return booksList;
    }

    public Page<Book> getBooksList(Pageable pageable) {
        List<Book> books = new ArrayList<>(booksList);
        int start = (int) pageable.getOffset();
        int end = Math.min((start + pageable.getPageSize()), books.size());
        return new PageImpl<>(books.subList(start, end), pageable, books.size());
    }

    public void setBooksList(Set<Book> booksList) {
        this.booksList = booksList;
    }
}
