import axios from "axios";

const API_URL = 'http://localhost:8080/myreads/api/v1/user';
const VALIDATE_USER = 'validateUser';

export async function isUserByEmailExist(email) {
    return await axios.get(`${API_URL}/${email}`);
}

export async function validateUserCred(email, password) {
    return await axios.get(`${API_URL}/${VALIDATE_USER}?email=${email}&password=${password}`);
}

export async function getUserDetails(email) {
    //TODO - Returns the Email, Username, DOB
}

export async function getFriendsOfUser(email) {
    //TODO - Returns list of friends
}

export async function addUser(user) {
    return await axios.post(API_URL, user);
}

export async function updateUserDetails(user) {
    return await axios.put(API_URL, user);
}

export async function deleteUserAccountByEmail(email) {
    return await axios.delete(`${API_URL}/${email}`);
}