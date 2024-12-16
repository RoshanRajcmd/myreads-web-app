import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { isUserByEmailExist, addUser } from '../api/UserService';
import { toastSuccess, toastError } from '../api/ToastService';
import { IoMdEye } from "react-icons/io";
import { IoMdInformationCircleOutline } from "react-icons/io";
import Tooltip from './ToolTip';



export function Register() {
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [dob, setDob] = useState('');
    const [email, setEmail] = useState('');
    const [emailValidationMsg, setEmailValidationMsg] = useState('');
    const [password, setPassword] = useState({ value: "", showPassword: false });
    const [confirmPasswordMsg, setConfirmPasswordMsg] = useState('');
    const [isEmailIdTaken, setIsEmailIdTaken] = useState(true);

    const handleEmail = (enteredEmail) => {
        if (enteredEmail !== undefined && enteredEmail !== '') {
            if (!validateEmail(enteredEmail)) {
                setEmailValidationMsg("Please enter a valid email Id");
            }
            else {
                setEmail(enteredEmail.trim());
                setEmailValidationMsg('');
            }
        }
    }

    // useEffect(() => {
    //     isEmailExist(email);
    // });

    const isEmailExist = (email) => {
        if (email !== undefined && email !== '') {
            const response = isUserByEmailExist(email);
            setIsEmailIdTaken(response.data);
        }
    }

    const validateEmail = (email) => {
        const re = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
        return re.test(email);
    }

    const handlePassword = (enteredPassword) => {
        //TODO - Need Validation of password and change the input box border color when the password is not valid
        setPassword({ ...password, value: enteredPassword });
    }

    const handlePasswordVisibility = () => {
        setPassword({ ...password, showPassword: !password.showPassword });
    }

    const handleConfirmPassword = (comfirmationPassword) => {
        if (comfirmationPassword !== password.value) {
            setConfirmPasswordMsg("Missmatch in Password");
        }
        else {
            setConfirmPasswordMsg('');
        }
    }

    const validateAndRedirectToLogin = () => {
        if (emailValidationMsg === "" && email !== "" && password.value !== "" && confirmPasswordMsg === "") {
            const newUser = {
                name: { username },
                dob: { dob },
                email: { email },
                password: { password }
            }
            //TODO - API call to Add the user to DB
            isEmailExist(email);
            if (isEmailIdTaken) {
                setEmailValidationMsg("Email Id is taken");
            }
            else {
                setIsEmailIdTaken(true);
                toastSuccess("Registration Successful");
                navigate("/myreads/login");
            }
        } else {
            toastError("Please correct the errors");
        }
    }

    const redirectToLoginWithoutValidation = () => {
        navigate("/myreads/login");
    }

    return (
        <div class="flex items-center justify-center
              min-h-screen bg-gray-200">
            <div class="main bg-white rounded-2xl shadow-md p-10 
        transition-transform w-auto text-center">
                <p class="text-yellow-500 text-3xl font-semibold">MyReads</p>

                <p class="text-lg">Sign Up for MyReads</p>

                <form >
                    <div class="flex gap-5">
                        <div>
                            <div>
                                <label for="userNameInput" class="block mt-4 mb-2 text-left text-gray-700 font-bold">Username:</label>
                                <input type="text"
                                    class="block w-full mb-6 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-yellow-400"
                                    id="userNameInput"
                                    placeholder='Enter your Name'
                                    onChange={(e) => setUsername(e.target.value)}
                                    required
                                />
                            </div>

                            <div>
                                <label for="dobInput" class="block mt-4 mb-2 text-left text-gray-700 font-bold">Date of Birth:</label>
                                <input type="date"
                                    class="block w-full mb-6 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-yellow-400"
                                    id="dobInput"
                                    onChange={(e) => setDob(e.target.value)}
                                    required
                                />
                            </div>
                        </div>

                        <div>
                            <div>
                                <label for="emailInput" class="block mt-4 mb-2 text-left text-gray-700 font-bold">Email:</label>
                                <input type="text"
                                    class="block w-full mb-6 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-yellow-400"
                                    id="emailInput"
                                    placeholder="Enter your Email"
                                    onChange={(e) => handleEmail(e.target.value)}
                                    required
                                />
                                <span class="block mb-3 text-red-500" visible={emailValidationMsg !== '' ? true : false}>{emailValidationMsg}</span>
                            </div>

                            <div>
                                <label for="passwordInput" class="flex items-center mt-4 mb-2 text-left text-gray-700 font-bold gap-1">
                                    Password:
                                    <Tooltip message={
                                        <>
                                            <span>The password must contain:</span>
                                            <ul>
                                                <li>Minimum of 6 characters</li>
                                                <li>Any special character</li>
                                                <li>Must have atleast one number</li>
                                            </ul>
                                        </>
                                    }>
                                        <IoMdInformationCircleOutline />
                                    </Tooltip>
                                </label>
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

                            <div>
                                <label for="confirmPasswordInput" class="block mb-2 text-left text-gray-700 font-bold">Confirm Password:</label>
                                <input type={password.showPassword ? 'text' : 'password'}
                                    class="w-full mb-6 px-4 py-2 border border-gray-300 rounded-md focus:outline-none"
                                    id="confirmPasswordInput"
                                    placeholder="Re-enter Password"
                                    onChange={(e) => handleConfirmPassword(e.target.value)}
                                    required
                                />
                                <span class="block mb-3 text-red-500" visible={confirmPasswordMsg !== '' ? true : false}>{confirmPasswordMsg}</span>
                            </div>
                        </div>
                    </div>

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
                    > Login</a>
                </p>
            </div>
        </div >
    )
}