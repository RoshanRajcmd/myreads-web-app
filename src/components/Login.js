import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export function Login() {
    const [email, setEmail] = useState('');
    const [emailValidationMsg, setEmailValidationMsg] = useState('');
    const [password, setPassword] = useState({ value: "", showPassword: false });
    const [confirmPasswordMsg, setConfirmPasswordMsg] = useState('');
    const navigate = useNavigate();

    const handlePasswordVisibility = () => {
        setPassword({ ...password, showPassword: !password.showPassword })
    }

    const handlePassword = (enteredPassword) => {
        setPassword({ ...password, value: enteredPassword })
    }

    const validateEmail = (email) => {
        const re = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
        return re.test(email);
    }

    const handleEmail = (enteredEmail) => {
        if (!validateEmail(enteredEmail)) {
            setEmailValidationMsg("Please enter a valid email Id")
        }
        else {
            setEmail(enteredEmail.trim())
            setEmailValidationMsg('')
        }
        console.log(email)
    }

    const handleConfirmPassword = (comfirmationPassword) => {
        if (handleConfirmPassword !== password) {
            setConfirmPasswordMsg("Missmatch in Password")
        }
        else {
            setConfirmPasswordMsg('')
        }
    }

    const redirectToHome = () => {
        if (emailValidationMsg === "" && email !== "" && password.value !== "") {
            alert("Successful Login -> Redirecting...");
            navigate("/MyReads/Home");
        } else {
            alert("Please enter a valid Email Id and Password");
        }
    }

    const redirectToRegister = () => {
        navigate("/MyReads/Register");
    }

    return (
        <div class="flex items-center justify-center
              min-h-screen bg-gray-200">
            <div class="main bg-white rounded-lg shadow-md p-10 
    transition-transform w-96 text-center">
                <h1 class="text-yellow-500 text-3xl">
                    MyReads
                </h1>
                <h3 class="text-lg">
                    Enter your login credentials
                </h3>
                <form>
                    <label for="emailInput" class="block mt-4 mb-2 text-left text-gray-700 font-bold">Username:</label>
                    <input type="text"
                        class="block w-full mb-6 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-yellow-400"
                        id="emailInput"
                        placeholder="Enter your Username/Email"
                        onChange={(e) => handleEmail(e.target.value)}
                        required
                    />
                    <span class="block mb-3 text-red-500" visible={emailValidationMsg !== '' ? true : false}>{emailValidationMsg}</span>

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
                            <img src=
                                "https://media.geeksforgeeks.org/wp-content/uploads/20240227164304/visible.png"
                                alt="" class="w-4"></img>
                        </button>
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
                    >Register</a>
                </p>
            </div>
        </div>
    )
}