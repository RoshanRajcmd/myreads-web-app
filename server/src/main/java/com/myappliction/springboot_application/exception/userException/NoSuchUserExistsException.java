package com.myappliction.springboot_application.exception.userException;

public class NoSuchUserExistsException extends RuntimeException{

    public NoSuchUserExistsException() {}

    public NoSuchUserExistsException(String msg) {
        super(msg);
    }
}
