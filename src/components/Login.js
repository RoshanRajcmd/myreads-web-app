import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { validateUserCred } from '../api/UserService';
import { toastSuccess, toastError } from '../api/ToastService';
import { IoMdEye } from "react-icons/io";

export function Login() {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [emailValidationMsg, setEmailValidationMsg] = useState('');
    const [password, setPassword] = useState({ value: "", showPassword: false });
    const [isValidUser, setValidUser] = useState(false);

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

    useEffect(() => {
        validateUserCredInDB();
    });

    //TODO - Async validation call the API on each letter of password user types in
    const validateUserCredInDB = async () => {
        try {
            if (emailValidationMsg === "" && email !== "" && password.value !== "") {
                const response = await validateUserCred(email, password.value);
                setValidUser(response?.data);
            }
        }
        catch (err) {
            if (!err?.response)
                console.log("No Server Response");
            else if (err.response?.status === 404)
                console.log("No such User Email found");
            else
                console.log("Validation API Failed");
        }
    };

    const redirectToHome = () => {
        if (emailValidationMsg === "" && email !== "" && password.value !== "") {
            if (isValidUser) {
                toastSuccess("Login Successful");
                setValidUser(false);
                navigate("/myreads/home");
            }
            else toastError("Incorrect Email Id or Password");
            //TODO the above else state is not lasting long and immediatly getting refreshed, no delay will help this issue
            //How about useRef - https://youtu.be/t2ypzz6gJm0
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
                        <label for="emailInput" class="block mt-4 mb-2 text-left text-gray-700 font-bold">Username:</label>

                        <input type="text"
                            class="block w-full mb-6 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-yellow-400"
                            id="emailInput"
                            placeholder="Enter your Username/Email"
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
                            onClick={redirectToHome}
                        >Submit</button>
                    </div>
                </form>

                <p class="mt-4">Dont have an account?
                    <a href="#"
                        class="text-blue-500 hover:underline"
                        onClick={() => redirectToRegister()}
                    > Register</a>
                </p>
            </div>
        </div>
    )
}