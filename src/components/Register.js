import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';


export function Register() {
    const [username, setUsername] = useState('');
    const [dob, setDob] = useState('');
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
    }

    const handleConfirmPassword = (comfirmationPassword) => {
        if (comfirmationPassword !== password.value) {
            setConfirmPasswordMsg("Missmatch in Password")
        }
        else {
            setConfirmPasswordMsg('')
        }
    }

    const validateAndRedirectToLogin = () => {
        if (emailValidationMsg === "" && email !== "" && password.value !== "" && confirmPasswordMsg === "") {
            alert("Registeration Successful -> Redirecting...")
            // //Comment the below useEffect line if you are working only on the front end
            // //The below line will access the spring boot application running on the given port
            // useEffect(() => {
            //     fetch('http://localhost:8080/api/v1/user/getUsers')
            //         .then(response => response.json())
            //         .then(result => console.log(result));
            // });
            navigate("/MyReads/Login");
        } else {
            alert("Please enter a valid Email Id and Password")
        }
    }
    const redirectToLoginWithoutValidation = () => {
        navigate("/MyReads/Login");
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
                    Sign Up for MyReads
                </h3>
                <form>
                    <label for="userNameInput" class="block mt-4 mb-2 text-left text-gray-700 font-bold">Username:</label>
                    <input type="text"
                        class="block w-full mb-6 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-yellow-400"
                        id="userNameInput"
                        placeholder='Enter your Name'
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                    <label for="dobInput" class="block mt-4 mb-2 text-left text-gray-700 font-bold">Date of Birth:</label>
                    <input type="date"
                        class="block w-full mb-6 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-yellow-400"
                        id="dobInput"
                        onChange={(e) => setDob(e.target.value)}
                        required
                    />
                    <label for="emailInput" class="block mt-4 mb-2 text-left text-gray-700 font-bold">Email:</label>
                    <input type="text"
                        class="block w-full mb-6 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-yellow-400"
                        id="emailInput"
                        placeholder="Enter your Username/Email"
                        onChange={(e) => handleEmail(e.target.value)}
                        required
                    />
                    <span class="block mb-3 text-red-500" visible={emailValidationMsg !== '' ? true : false}>{emailValidationMsg}</span>

                    <h3>The password must contain:</h3>
                    <ul>
                        <li>1. Minimum of 6 characters</li>
                        <li>2. Any special character</li>
                        <li>3. Must have atleast one number</li>
                    </ul>

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

                    <label for="confirmPasswordInput" class="block mb-2 text-left text-gray-700 font-bold">Confirm Password:</label>
                    <div>
                        <input type={password.showPassword ? 'text' : 'password'}
                            class="w-full mb-6 px-4 py-2 border border-gray-300 rounded-md focus:outline-none"
                            id="confirmPasswordInput"
                            placeholder="Re-enter Password"
                            onChange={(e) => handleConfirmPassword(e.target.value)}
                            required
                        />
                    </div>
                    <span class="block mb-3 text-red-500" visible={confirmPasswordMsg !== '' ? true : false}>{confirmPasswordMsg}</span>

                    <div class="flex justify-center items-center">
                        <button
                            type="submit"
                            class="w-full bg-yellow-500 text-white py-3 px-6 rounded-md cursor-pointer transition-colors duration-300 hover:bg-yellow-400"
                            onClick={validateAndRedirectToLogin}
                        >Register</button>
                    </div>
                </form>

                <p class="mt-4">Already have an account?
                    <a href="#"
                        class="text-blue-500 hover:underline"
                        onClick={() => redirectToLoginWithoutValidation()}
                    >Login</a>
                </p>
            </div>
        </div>
    )

}