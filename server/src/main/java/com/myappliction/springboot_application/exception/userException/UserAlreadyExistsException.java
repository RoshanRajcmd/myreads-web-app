package com.myappliction.springboot_application.exception.userException;

public class UserAlreadyExistsException extends RuntimeException{
    public UserAlreadyExistsException() {}

    public UserAlreadyExistsException(String msg) {
        super(msg);
    }
}
