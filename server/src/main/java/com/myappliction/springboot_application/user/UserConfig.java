package com.myappliction.springboot_application.user;

import com.myappliction.springboot_application.book.Book;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.time.LocalDate;
import java.time.Month;
import java.util.*;

@Configuration
public class UserConfig {

    @Bean
    CommandLineRunner commandLineRunner(UserRepository repository){
        return args -> {
            Set<Book> bookList1 = new HashSet<>();
            bookList1.add(new Book("Lord of the Rings Vol 1",
                    "An Adventure of Frodo Baggins",
                    LocalDate.of(1954, Month.JULY,29),
                    "John Ronald Reuel Tolkien"));
            bookList1.add(new Book("To Kill a Mockingbird",
                    "Set in the 1930s during the Great Depression, this Pulitzer Prize-winning novel explores racial injustice in the American South through the eyes of Scout Finch, a young girl. Her father, Atticus Finch, is a lawyer defending a black man wrongly accused of raping a white woman. The story deals with themes of morality, prejudice, and the loss of innocence.",
                    LocalDate.of(1960, Month.JULY,11),
                    "Harper Lee"));
            bookList1.add(new Book("1984",
                    "George Orwell’s dystopian novel is set in a totalitarian society ruled by \"Big Brother,\" where the government monitors and controls every aspect of life. The protagonist, Winston Smith, rebels against the regime and tries to find freedom in a world filled with surveillance, censorship, and thought control.",
                    LocalDate.of(1949, Month.JUNE,8),
                    "George Orwell"));
            bookList1.add(new Book("The Great Gatsby",
                    "F. Scott Fitzgerald’s novel is a poignant exploration of the American Dream during the Roaring Twenties. The story follows the mysterious Jay Gatsby, whose lavish lifestyle and obsession with Daisy Buchanan, a married woman, lead to his tragic downfall. Themes of wealth, love, and social class are central to the narrative.",
                    LocalDate.of(1925, Month.APRIL,10),
                    "John Ronald Reuel Tolkien"));
            bookList1.add(new Book("Pride and Prejudice",
                    "This beloved romantic novel by Jane Austen centers on Elizabeth Bennet, a smart, independent woman, and her evolving relationship with the wealthy and seemingly aloof Mr. Darcy. Through witty dialogue and keen social observations, the novel explores issues of class, marriage, and personal growth.",
                    LocalDate.of(1813, Month.JANUARY,28),
                    "Jane Austen"));

            User roshan =new User(
                    "Roshan Raj",
                    "Roshan1",
                    "1999-12-05",
                    "roshan@gmail.com",
                    "password1",
                    new HashSet<Book>(bookList1),
                    null);


            User chitra = new User(
                    "Chitra",
                    "Chitra1",
                    "1973-02-12",
                    "chitra@gmail.com",
                    "password2",
                    null,
                    null);

            repository.saveAll(List.of(roshan, chitra));
        };
    }
}
