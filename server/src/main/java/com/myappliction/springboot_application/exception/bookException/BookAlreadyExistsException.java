package com.myappliction.springboot_application.exception.bookException;

public class BookAlreadyExistsException extends RuntimeException{
    public BookAlreadyExistsException() {}

    public BookAlreadyExistsException(String msg) {
        super(msg);
    }
}
