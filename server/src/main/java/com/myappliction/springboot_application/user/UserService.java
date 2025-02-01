//This class is the server logic layer in that does validation/business logic in between
//the API(Controller) and DB service(Repository) layer
package com.myappliction.springboot_application.user;

import com.myappliction.springboot_application.book.Book;
import com.myappliction.springboot_application.book.BookRepository;
import com.myappliction.springboot_application.book.BookService;
import com.myappliction.springboot_application.exception.userException.NoSuchUserExistsException;
import com.myappliction.springboot_application.exception.userException.UserAlreadyExistsException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Objects;
import java.util.Set;
import java.util.UUID;
import java.util.logging.Logger;

@Service
public class UserService {
    private static Logger log;
    private final UserRepository userRepository;
    private final BookService bookService;

    @Autowired
    public UserService(UserRepository userRepository, BookService bookService) {
        this.userRepository = userRepository;
        this.bookService = bookService;
    }

    //Gets all the Users in the Database
    public List<User> getAllUsers(){
        return userRepository.findAll();
    }

    //Returns True if the given email exists in user table of database
    public boolean isUserByEmailExist(String email){
        //if there is any value in the result of JPQL Query then it means the email is already been registered by someone
        return userRepository.findUserByEmail(email).isPresent();
    }

    //Returns the User by the given userId
    public User getUser(String userId){
        return userRepository.findById(UUID.fromString(userId))
                .orElseThrow(() -> new NoSuchUserExistsException("No User found by the given ID"));
    }

    //Add the given User in the Database
    public void addNewUser(User newUser){
        if(isUserByEmailExist(newUser.getEmail())){
            throw new UserAlreadyExistsException("Email is Taken");
        }
        else {
            userRepository.save(newUser);
        }
    }

    //Delete the given User in Database by userId
    public void deleteUser(String userId){
        if(userRepository.existsById(UUID.fromString(userId)))
            userRepository.deleteById(UUID.fromString(userId));
        else
            throw new NoSuchUserExistsException("No User found by the given ID");
    }

    //Update the details of given user in Database
    public void updateUserDetails(String userId, User updateUser){
        User userById = getUser(userId);

        if(updateUser.getFullName() != null &&
                !updateUser.getFullName() .isEmpty() &&
                !Objects.equals(userById.getFullName(), updateUser.getFullName())) {
            userById.setFullName(updateUser.getFullName() );
        }
        if(updateUser.getUserName() != null &&
                !updateUser.getUserName() .isEmpty() &&
                !Objects.equals(userById.getUserName(), updateUser.getUserName() )) {
            userById.setUserName(updateUser.getUserName() );
        }
        if(updateUser.getPassword() != null &&
                !updateUser.getPassword() .isEmpty() &&
                !Objects.equals(userById.getPassword(), updateUser.getPassword() )) {
            userById.setPassword(updateUser.getPassword() );
        }
        userRepository.save(userById);
    }

    //Validates the given password and user email and returns the user if exists by the given credentials
    public String validateUserCred(String email, String password){
        User userByMail = userRepository.findUserByEmail(email)
                .orElseThrow(() -> new NoSuchUserExistsException("No User found by the given Email"));
        if(userByMail.getPassword().equals(password))
            return userByMail.getId().toString();
        else
            return "";
    }

    //Returns True if the given username exists in user table of database
    public boolean isUserByUsernameExist(String username) {
        return userRepository.findUserByUsername(username).isPresent();
    }

    //Returns True if the given old password is valid for the given user
    public boolean isOldPasswordValid(String userId, String oldPassword) {
        User user = getUser(userId);
        return user.getPassword().equals(oldPassword);
    }

    //Gets the Books under the given User
    public Page<Book> getUsersBooks(String userId, int page, int size){
        return getUser(userId).getBooksList(PageRequest.of(page, size, Sort.by("name")));
    }

    //Adds the given book by the given ID to the given user by userId
    public void addBookToUserByBookId(String userId, String newBookId){
        Book newBookById = bookService.getBook(UUID.fromString(newBookId));
        User userByID = getUser(userId);
        userByID.getBooksList().add(newBookById);
        userRepository.save(userByID);
    }

    //Adds the given book to the given user by userId
    public void addBookToUserByBookObject(String userId, Book newBook){
        //First add the book in the book table and then add the book in the user's book list
        bookService.addBook(newBook);
        User userByID = getUser(userId);
        userByID.getBooksList().add(newBook);
        userRepository.save(userByID);
    }

    //Deletes the given book under given user by userId
    public void deleteBookFromUser(String userId, String bookId) {
        User userByID = getUser(userId);
        Book bookById = bookService.getBook(UUID.fromString(bookId));
        userByID.getBooksList().remove(bookById);
        userRepository.save(userByID);
    }

    public List<Book> searchBooks(String bookTitle) {
        return bookService.findBooksByTitle(bookTitle);
    }

    public boolean isBookExistUnderUser(String userId, String bookId) {
        Book bookById = bookService.getBook(UUID.fromString(bookId));
        return getUser(userId).getBooksList().contains(bookById);
    }
}
