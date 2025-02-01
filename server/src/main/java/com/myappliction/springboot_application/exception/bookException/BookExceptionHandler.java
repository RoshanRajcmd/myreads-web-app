package com.myappliction.springboot_application.exception.bookException;

import com.myappliction.springboot_application.exception.ApiException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

import java.time.ZoneId;
import java.time.ZonedDateTime;

@ControllerAdvice
public class BookExceptionHandler {

    @ExceptionHandler(value = BookAlreadyExistsException.class)
    public ResponseEntity<Object> handleCustomerAlreadyExistsException(BookAlreadyExistsException ex) {
        ApiException apiException =  new ApiException(
                ex.getMessage(),
                HttpStatus.CONFLICT,
                ZonedDateTime.now(ZoneId.of("Z"))
        );
        return new ResponseEntity<>(apiException, HttpStatus.CONFLICT);
    }

    @ExceptionHandler(value = NoSuchBookExistsException.class)
    public ResponseEntity<Object> handleNoSuchUserExistsException(NoSuchBookExistsException ex) {
        ApiException apiException =  new ApiException(
                ex.getMessage(),
                HttpStatus.NOT_FOUND,
                ZonedDateTime.now(ZoneId.of("Z"))
            );
        return new ResponseEntity<>(apiException, HttpStatus.NOT_FOUND);
    }
}