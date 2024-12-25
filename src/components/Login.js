import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { validateUserCred, getUserDetailsById } from '../api/UserService';
import { toastSuccess, toastError } from '../api/ToastService';
import { IoMdEye } from "react-icons/io";
import { SessionService } from '../api/SessionService';
//import bcrypt1 from 'bcryptjs';

// var bcrypt = require('bcryptjs');
// const DECRYPE_SALT_INDEX = 10;
// var salt = bcrypt.genSaltSync(DECRYPE_SALT_INDEX);

export function Login() {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [emailValidationMsg, setEmailValidationMsg] = useState('');
    const [password, setPassword] = useState({ value: "", showPassword: false });
    const userSession = SessionService.getInstance();
    //console.log(userSession);

    const handleEmail = (enteredEmail) => {
        if (!validateEmail(enteredEmail)) {
            setEmailValidationMsg("Please Enter vaild Email Id");
        }
        else {
            setEmail(enteredEmail.trim());
            setEmailValidationMsg("");
        }
    }

    const validateEmail = (email) => {
        const re = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
        return re.test(email);
    }

    const handlePassword = (enteredPassword) => {
        setPassword({ ...password, value: enteredPassword });
    }

    const handlePasswordVisibility = () => {
        setPassword({ ...password, showPassword: !password.showPassword });
    }

    const validateUserCredInDB = async () => {
        console.log(password.value);
        //var encryptedPass = bcrypt.hashSync(password.value, salt);
        //console.log(encryptedPass);
        //const response = await validateUserCred(email, encryptedPass);
        const response = await validateUserCred(email, password.value);
        return response?.data;
    };

    const validateAndRedirectToHome = async (e) => {
        e.preventDefault();

        if (emailValidationMsg === "" && email !== "" && password.value !== "") {
            //The below await key will let the execution pause until we get the promise resolved from the called function
            var userIDExists = await validateUserCredInDB();

            if (userIDExists !== undefined && userIDExists !== "") {
                //Sets a session with userdetails once validated
                var sessionUserResp = await getUserDetailsById(userIDExists);
                if (sessionUserResp.data !== undefined) {
                    userSession.setSessionUserDetials(sessionUserResp.data);
                    toastSuccess("Login Successful");
                    navigate("/myreads/home");
                }
                else toastError("Failed to Create Session Please try again later");
            }
            else toastError("Incorrect Email Id or Password");
        } else {
            setEmailValidationMsg("Please enter vaild Email Id or Password");
        }
    }

    const redirectToRegister = () => {
        navigate("/myreads/register");
    }

    return (
        <div class="flex items-center justify-center
              min-h-screen bg-gray-200">
            <div class="main bg-white rounded-2xl shadow-md p-10 
    transition-transform w-96 text-center">
                <p class="text-yellow-500 text-3xl font-semibold">MyReads</p>

                <p class="text-lg">Enter your login credentials</p>

                <form>
                    <div>
                        <label for="emailInput" class="block mt-4 mb-2 text-left text-gray-700 font-bold">Email:</label>

                        <input type="text"
                            class="block w-full mb-6 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-yellow-400"
                            id="emailInput"
                            placeholder="Enter your Email"
                            onChange={(e) => handleEmail(e.target.value)}
                            required
                        />

                        <span class="block mb-3 text-red-500" visible={emailValidationMsg !== '' ? true : false} aria-live='assertive'>{emailValidationMsg}</span>
                    </div>

                    <div>
                        <label for="passwordInput" class="block mt-4 mb-2 text-left text-gray-700 font-bold">Password:</label>
                        <div>
                            <input type={password.showPassword ? 'text' : 'password'}
                                class="w-full -ml-4 mb-6 px-4 py-2 border border-gray-300 rounded-md focus:outline-none"
                                id="passwordInput"
                                placeholder="Enter your Password"
                                onChange={(e) => handlePassword(e.target.value)}
                                required
                            />
                            <button type="button" class="focus:outline-none -ml-8" onClick={handlePasswordVisibility}>
                                <IoMdEye />
                            </button>
                        </div>
                    </div>

                    <div class="flex justify-center items-center">
                        <button
                            type="submit"
                            class="w-full bg-yellow-500 text-white py-3 px-6 rounded-md cursor-pointer transition-colors duration-300 hover:bg-yellow-400"
                            onClick={validateAndRedirectToHome}
                        >Submit</button>
                    </div>
                </form>

                <p class="mt-4">Dont have an account?
                    <span
                        class="ml-1 text-blue-500 hover:underline hover:cursor-pointer"
                        onClick={() => redirectToRegister()}
                    >Register</span>
                </p>
            </div>
        </div>
    )
}