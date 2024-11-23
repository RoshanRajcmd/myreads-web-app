import axios from "axios";

const API_URL = 'http://localhost:8080/myreads/api/v1/user';
const VALIDATE_USER = 'validateUser';

export async function addUser(user) {
    return await axios.post(API_URL, user);
}

export async function getUserById(id) {
    return await axios.get(`${API_URL}/${id}`);
}

export async function validateUserCred(email, password) {
    return await axios.get(`${API_URL}/${VALIDATE_USER}?email=${email}&password=${password}`);
}

export async function updateUser(user) {
    return await axios.put(API_URL, user);
}

export async function deleteUserById(id) {
    return await axios.delete(`${API_URL}/${id}`);
}