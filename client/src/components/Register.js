import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { isUserByEmailExist, addNewUser, isUserNameTakeninDB } from '../api/UserService';
import { toastSuccess, toastError } from '../api/ToastService';
import { IoMdEye } from "react-icons/io";
import { IoMdInformationCircleOutline } from "react-icons/io";
import Tooltip from './ToolTip';

export function Register() {
    const navigate = useNavigate();
    const [fullName, setFullName] = useState('');
    const [userName, setUserName] = useState('');
    const [dob, setDob] = useState('');
    const [email, setEmail] = useState('');
    const [emailValidationMsg, setEmailValidationMsg] = useState('');
    const [password, setPassword] = useState({ value: "", showPassword: false });
    const [passwordValidMsg, setPasswordValidMsg] = useState('');
    const [dobvalidationMsg, setDobValidMsg] = useState('');
    const [userNameTakenMsg, setUserNameTakenMsg] = useState('');

    const handleFullName = (enteredFullName) => {
        //Any special characters are not allowed
        if (enteredFullName !== undefined &&
            enteredFullName !== "" &&
            isValidFullName(enteredFullName)) {
            setFullName(enteredFullName.trim());
            setUserNameTakenMsg("");
        }
    }

    const isValidFullName = (enteredFullName) => {
        let regex = /^[a-zA-Z\s]+$/;
        return regex.test(enteredFullName);
    }

    const handleUserName = async (enteredUserName) => {
        let regex = /^[a-zA-Z0-9_]{5,20}$/;
        if (regex.test(enteredUserName)) {
            //Check if the entered username is already taken
            if (await isUserNameTaken(enteredUserName) === false) {
                setUserNameTakenMsg("");
            }
            else setUserNameTakenMsg("Username already taken");
        }
        else setUserNameTakenMsg("Please enter a valid Username");
        setUserName(enteredUserName.trim());
    }

    const isUserNameTaken = async (enteredUserName) => {
        const response = await isUserNameTakeninDB(enteredUserName);
        if (response !== undefined && response.status === 200) {
            return response?.data;
        }
        return true;
    }

    const handleDOB = (enteredDob) => {
        if (isAdult(enteredDob)) {
            setDob(enteredDob);
            setDobValidMsg("");
        }
        else
            setDobValidMsg("Adults can only Register");
    }

    const isAdult = (enteredDob) => {
        const today = new Date();
        const birthDate = new Date(enteredDob);
        // Calculate age in years
        let age = today.getFullYear() - birthDate.getFullYear();
        const monthDiff = today.getMonth() - birthDate.getMonth();
        // Adjust age if the birthday hasn't occurred this year
        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }
        return age >= 18;
    }

    const handleEmail = async (enteredEmail) => {
        if (enteredEmail !== undefined && enteredEmail !== '') {
            setEmail(enteredEmail.trim());
            if (isValidEmail(enteredEmail)) {
                setEmailValidationMsg("");
                var emailExists = await isEmailExists(enteredEmail);
                if (emailExists) {
                    setEmailValidationMsg("The Email Id is taken");
                }
                else {
                    setEmailValidationMsg("");
                }
            }
            else {
                setEmailValidationMsg("Please enter a valid email Id");
            }
        }
    }

    const isEmailExists = async (email) => {
        if (email !== undefined && email !== '') {
            const response = await isUserByEmailExist(email);
            return response?.data;
        }
        return true;
    }

    const isValidEmail = (email) => {
        const re = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
        return re.test(email);
    }

    const handlePassword = (enteredPassword) => {
        if (isValidPassword(enteredPassword)) {
            setPassword({ ...password, value: enteredPassword.trim() });
            setPasswordValidMsg("");
        }
        else
            setPasswordValidMsg("Please set a strong password");
    }

    const isValidPassword = (enteredPassword) => {
        //         ^(?=.*[a-z]): Ensures at least one lowercase letter.
        // (?=.*[A-Z]): Ensures at least one uppercase letter.
        // (?=.*\d): Ensures at least one digit.
        // (?=.*[@$!%*?&]): Ensures at least one special character.
        // [A-Za-z\d@$!%*?&]{8,}$: Ensures the password is at least 8 characters long.
        let regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@.#$!%*?&])[A-Za-z\d@.#$!%*?&]{6,15}$/;
        return regex.test(enteredPassword);
    }

    const handlePasswordVisibility = () => {
        setPassword({ ...password, showPassword: !password.showPassword });
    }

    const handleConfirmPassword = (comfirmationPassword) => {
        if (comfirmationPassword !== password.value) {
            setPasswordValidMsg("Mismatch in Password");
        }
        else {
            setPasswordValidMsg('');
        }
    }

    const validateAndRedirectToLogin = async (e) => {
        e.preventDefault();

        if (emailValidationMsg === "" && email !== "" && password.value !== "" && passwordValidMsg === "" && dobvalidationMsg === "" && userNameTakenMsg === "") {
            var newUser = {
                fullName: fullName,
                userName: userName,
                dob: dob,
                email: email,
                password: password.value
            }
            const response = await addNewUser(newUser);
            if (response !== undefined && response.status === 200) {
                toastSuccess("Registration Successful");
                navigate("/myreads/login");
            }
            else toastError("Registration Failed please try again later");
        }
        else
            toastError("Please correct the errors");
    }

    const redirectToLoginWithoutValidation = () => {
        navigate("/myreads/login");
    }

    return (
        <div class="flex items-center justify-center
              min-h-screen bg-slate-200 dark:bg-gray-800 text-gray-800 dark:text-slate-200">
            <div class="main bg-white dark:bg-gray-600 rounded-2xl shadow-md p-10 
        transition-transform w-auto text-center">
                <p class="text-yellow-500 text-3xl font-semibold">MyReads</p>

                <p class="text-lg">Sign Up for MyReads</p>

                <form >
                    <div class="flex gap-5">
                        <div>
                            <div>
                                <label for="nameInput" class="block mt-4 mb-2 text-left  font-bold">Full Name:</label>
                                <input type="text"
                                    class="block w-full mb-6 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-yellow-400 bg-white dark:bg-gray-600"
                                    id="nameInput"
                                    placeholder='Enter Full Name'
                                    onChange={(e) => handleFullName(e.target.value)}
                                    required
                                />
                            </div>

                            <div>
                                <label for="userNameInput" class="flex items-center mt-4 mb-2 text-left font-bold">
                                    Username:
                                    <Tooltip message={
                                        <>
                                            <span>The Username must contain:</span>
                                            <ul>
                                                <li>Minimum of 5 characters</li>
                                                <li>Can have '_'</li>
                                                <li>No special character</li>
                                                <li>Numbers are allowed</li>
                                            </ul>
                                        </>
                                    }>
                                        <IoMdInformationCircleOutline />
                                    </Tooltip>
                                </label>
                                <input type="text"
                                    class="block w-full mb-6 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-yellow-400 bg-white dark:bg-gray-600"
                                    id="userNameInput"
                                    placeholder='Enter Username'
                                    onChange={(e) => handleUserName(e.target.value)}
                                    required
                                />
                                <span class="block mb-3 text-red-500" visible={userNameTakenMsg !== '' ? true : false}>{userNameTakenMsg}</span>
                            </div>

                            <div>
                                <label for="dobInput" class="block mt-4 mb-2 text-left font-bold">Date of Birth:</label>
                                <input type="date"
                                    class="block w-full mb-6 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-yellow-400 bg-white dark:bg-gray-600"
                                    id="dobInput"
                                    onChange={(e) => handleDOB(e.target.value)}
                                    required
                                />
                                <span class="block mb-3 text-red-500" visible={dobvalidationMsg !== '' ? true : false}>{dobvalidationMsg}</span>
                            </div>
                        </div>

                        <div>
                            <div>
                                <label for="emailInput" class="block mt-4 mb-2 text-left font-bold">Email:</label>
                                <input type="text"
                                    class="block w-full mb-6 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-yellow-400 bg-white dark:bg-gray-600"
                                    id="emailInput"
                                    placeholder="Enter your Email"
                                    onChange={(e) => handleEmail(e.target.value)}
                                    required
                                />
                                <span class="block mb-3 text-red-500" visible={emailValidationMsg !== '' ? true : false}>{emailValidationMsg}</span>
                            </div>

                            <div>
                                <label for="passwordInput" class="flex items-center mt-4 mb-2 text-left font-bold gap-1">
                                    Password:
                                    <Tooltip message={
                                        <>
                                            <span>The password must contain:</span>
                                            <ul>
                                                <li>Minimum of 6 characters</li>
                                                <li>Atleast one Capital Letter</li>
                                                <li>Atleast one special character</li>
                                                <li>Atleast one number</li>
                                            </ul>
                                        </>
                                    }>
                                        <IoMdInformationCircleOutline />
                                    </Tooltip>
                                </label>
                                <div>
                                    <input type={password.showPassword ? 'text' : 'password'}
                                        class="w-full -ml-4 mb-6 px-4 py-2 border border-gray-300 rounded-md focus:outline-none bg-white dark:bg-gray-600"
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

                            <div>
                                <label for="confirmPasswordInput" class="block mb-2 text-left font-bold">Confirm Password:</label>
                                <input type={password.showPassword ? 'text' : 'password'}
                                    class="w-full mb-6 px-4 py-2 border border-gray-300 rounded-md focus:outline-none bg-white dark:bg-gray-600"
                                    id="confirmPasswordInput"
                                    placeholder="Re-enter Password"
                                    onChange={(e) => handleConfirmPassword(e.target.value)}
                                    required
                                />
                                <span class="block mb-3 text-red-500" visible={passwordValidMsg !== '' ? true : false}>{passwordValidMsg}</span>
                            </div>
                        </div>
                    </div>

                    <div class="flex justify-center items-center">
                        <button
                            type="submit"
                            class="w-full bg-yellow-500 text-white dark:text-gray-600 font-semibold py-3 px-6 rounded-md cursor-pointer transition-colors duration-300 hover:bg-yellow-400"
                            onClick={validateAndRedirectToLogin}
                        >Register</button>
                    </div>
                </form>

                <p class="mt-4">Already have an account?
                    <span
                        class="ml-1 text-blue-500 hover:underline hover:cursor-pointer"
                        onClick={() => redirectToLoginWithoutValidation()}
                    >Login</span>
                </p>
            </div>
        </div >
    )
}