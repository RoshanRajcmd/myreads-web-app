package com.myappliction.springboot_application.book;

import com.myappliction.springboot_application.user.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface BookRepository extends JpaRepository<Book, UUID> {
    @Query("SELECT s FROM Book s WHERE s.title = ?1")
    Optional<Book> findBookByTitle(String title);

    @Query("SELECT s FROM Book s WHERE s.title LIKE %?1%")
    List<Book> searchBooksByTitle(String title);
}
