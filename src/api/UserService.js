import axios from "axios";

const API_URL = 'http://localhost:8080/myreads/api/v1/user';
const VALIDATE_USER = 'validateUser';
const CHECK_EMAIL_EXIST = 'checkEmailExists'

//If a user by that email exist return their ID else returns -1 or 0
export function isUserByEmailExist(email) {
    var emailExists = true;
    axios.get(`${API_URL}/${CHECK_EMAIL_EXIST}/${email}`).then(response => { return response }).catch(error => {
        // Handle errors
        console.error(error);
    });
}

export async function validateUserCred(email, password) {
    return await axios.get(`${API_URL}/${VALIDATE_USER}?email=${email}&password=${password}`);
}

export async function getUserDetails(id) {
    //TODO - Returns the Email, Username, DOB
}

export async function getFriendsOfUser(id) {
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