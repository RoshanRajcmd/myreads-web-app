package com.myappliction.springboot_application.book;

import com.myappliction.springboot_application.exception.bookException.BookAlreadyExistsException;
import com.myappliction.springboot_application.exception.bookException.NoSuchBookExistsException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.*;

@Service
public class BookService {
    private final BookRepository bookRepository;

    @Autowired
    public BookService(BookRepository bookRepository) {
        this.bookRepository = bookRepository;
    }
    //Gets all the Books in the Database
    public List<Book> getAllBooks(){
        return bookRepository.findAll();
    }

    //Returns the Book by the given bookId
    public Book getBook(UUID bookId){
        return bookRepository.findById(bookId)
                .orElseThrow(() -> new NoSuchBookExistsException("No Book found by the given ID"));
    }

    //Add the given Book in the Database
    public void addBook(Book newBook){
        if(bookRepository.findBookByTitle(newBook.getTitle()).isPresent()){
            throw new BookAlreadyExistsException("Book Already Exists");
        }
        else
            bookRepository.save(newBook);
    }

    //Delete a Book in the Database
    public void deleteBook(UUID bookId){
        Book bookById = bookRepository.findById(bookId)
                .orElseThrow(() -> new NoSuchBookExistsException("No Book found by the given ID"));
        bookRepository.deleteById(bookId);
    }

    //Update Details of a Book in Database
    public void updateBookDetails(UUID bookId, String newTitle, String summary, LocalDate publishedOn, String author){
        Book bookById = bookRepository.findById(bookId)
                .orElseThrow(() -> new NoSuchBookExistsException("No Book found by the given ID"));
        if(newTitle != null &&
                !newTitle.isEmpty() &&
                !Objects.equals(bookById.getTitle(), newTitle)) {
            bookById.setTitle(newTitle);
        }
    }

    public List<Book> findBooksByTitle(String bookTitle) {
        return bookRepository.searchBooksByTitle(bookTitle);
    }
}
