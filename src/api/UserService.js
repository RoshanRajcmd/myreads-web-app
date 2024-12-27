import axios from "axios";

const API_URL = 'http://localhost:8080/myreads/api/v1/user';
const VALIDATE_USER = 'validateUser';
const CHECK_EMAIL_EXISTS = 'checkEmailExists';
const ADD_NEW_USER = 'addNewUser';
const DELETE_USER = 'deleteUser';
const GET_USER_DETAILS = 'getUserDetails';
const UPDATE_USER_DETAILS = 'updateUserDetails';
const CHECK_USERNAME_EXISTS = 'checkUsernameExists';
const CHECK_OLD_PASSWORD_VALID = 'checkOldPasswordValid'
const GET_USER_BOOKS = 'getUserBooks';
const ADD_BOOK_TO_USER = 'addBookToUser';
const DELETE_BOOK_FROM_USER = 'deleteBookFromUser';
const SEARCH_BOOKS = 'searchBooks';

//If a user by that email exist return their ID else returns empty string
export async function isUserByEmailExist(email) {
    try {
        return await axios.get(`${API_URL}/${CHECK_EMAIL_EXISTS}/${email}`);
    }
    catch (err) {
        if (!err?.response)
            console.log("No Server Response");
        else
            console.log("Validation API Failed" + err.code + err.message);
    }
}

export async function isUserNameTakeninDB(username) {
    try {
        return await axios.get(`${API_URL}/${CHECK_USERNAME_EXISTS}/${username}`);
    }
    catch (err) {
        if (!err?.response)
            console.log("No Server Response");
        else if (err.response?.status === 404)
            console.log("No such User Email found");
        else
            console.log("Validation API Failed" + err.code + err.message);
    }
}

export async function validateUserCred(email, password) {
    try {
        return await axios.get(`${API_URL}/${VALIDATE_USER}?email=${email}&password=${password}`);
    }
    catch (err) {
        if (!err?.response)
            console.log("No Server Response");
        else if (err.response?.status === 404)
            console.log("No such User Email found");
        else
            console.log("Validation API Failed" + err.code + err.message);
    }
}

export async function addNewUser(user) {
    try {
        return await axios.post(`${API_URL}/${ADD_NEW_USER}`, JSON.stringify(user), { headers: { 'Content-Type': 'application/json' } });
    }
    catch (err) {
        if (!err?.response)
            console.log("No Server Response");
        else
            console.log("Validation API Failed" + err.code + err.message);
    }
}

export async function getUserDetailsById(id) {
    try {
        return await axios.get(`${API_URL}/${GET_USER_DETAILS}/${id}`);
    }
    catch (err) {
        if (!err?.response)
            console.log("No Server Response");
        else
            console.log("Validation API Failed" + err.code + err.message);
    }
}

export async function updateUserDetails(id, user) {
    try {
        return await axios.put(`${API_URL}/${UPDATE_USER_DETAILS}/${id}`, JSON.stringify(user), { headers: { 'Content-Type': 'application/json' } });
    }
    catch (err) {
        if (!err?.response)
            console.log("No Server Response");
        else
            console.log("Validation API Failed" + err.code + err.message);
    }
}

export async function deleteUserAccountByID(id) {
    try {
        return await axios.delete(`${API_URL}/${DELETE_USER}/${id}`);
    }
    catch (err) {
        if (!err?.response)
            console.log("No Server Response");
        else
            console.log("Validation API Failed" + err.code + err.message);
    }
}

export async function isOldPasswordValid(id, enteredPassword) {
    try {
        return await axios.get(`${API_URL}/${CHECK_OLD_PASSWORD_VALID}?userId=${id}&oldPassword=${enteredPassword}`);
    }
    catch (err) {
        if (!err?.response)
            console.log("No Server Response");
        else
            console.log("Validation API Failed" + err.code + err.message);
    }
}

export async function getUserBooks(id, page, size) {
    try {
        return await axios.get(`${API_URL}/${GET_USER_BOOKS}/${id}/?page=${page}&size=${size}`);
    }
    catch (err) {
        if (!err?.response)
            console.log("No Server Response");
        else
            console.log("Validation API Failed" + err.code + err.message);
    }
}

export async function addBooktoUserByBookObject(userId, newBook) {
    try {
        return await axios.post(`${API_URL}/${ADD_BOOK_TO_USER}/${userId}`, JSON.stringify(newBook), { headers: { 'Content-Type': 'application/json' } });
    }
    catch (err) {
        if (!err?.response)
            console.log("No Server Response");
        else
            console.log("Validation API Failed" + err.code + err.message);
    }
}

export async function addBookToUserByBookId(userId, newBookId) {
    try {
        return await axios.post(`${API_URL}/${ADD_BOOK_TO_USER}/${userId}/${newBookId}`);
    }
    catch (err) {
        if (!err?.response)
            console.log("No Server Response");
        else
            console.log("Validation API Failed" + err.code + err.message);
    }
}

export async function deleteBookFromUser(userId, bookId) {
    try {
        return await axios.delete(`${API_URL}/${DELETE_BOOK_FROM_USER}/${userId}/${bookId}`);
    }
    catch (err) {
        if (!err?.response)
            console.log("No Server Response");
        else
            console.log("Validation API Failed" + err.code + err.message);
    }
}

export async function searchBooks(bookTitle) {
    try {
        return await axios.get(`${API_URL}/${SEARCH_BOOKS}/${bookTitle}`);
    }
    catch (err) {
        if (!err?.response)
            console.log("No Server Response");
        else
            console.log("Validation API Failed" + err.code + err.message);
    }
}