package com.myappliction.springboot_application.exception.bookException;

public class NoSuchBookExistsException extends RuntimeException{

    public NoSuchBookExistsException() {}

    public NoSuchBookExistsException(String msg) {
        super(msg);
    }
}
