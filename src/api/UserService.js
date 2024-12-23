import axios from "axios";

const API_URL = 'http://localhost:8080/myreads/api/v1/user';
const VALIDATE_USER = 'validateUser';
const CHECK_EMAIL_EXIST = 'checkEmailExists';
const ADD_NEW_USER = 'addNewUser';

//If a user by that email exist return their ID else returns -1 or 0
export async function isUserByEmailExist(email) {
    try {
        return await axios.get(`${API_URL}/${CHECK_EMAIL_EXIST}/${email}`);
    }
    catch (err) {
        if (!err?.response)
            console.log("No Server Response");
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

export async function getUserDetails(id) {
    //TODO - Returns the Email, Username, DOB
}

export async function getFriendsOfUser(id) {
    //TODO - Returns list of friends
}

export async function updateUserDetails(user) {
    return await axios.put(API_URL, user);
}

export async function deleteUserAccountByEmail(email) {
    return await axios.delete(`${API_URL}/${email}`);
}