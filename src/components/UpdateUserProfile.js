import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { updateUserDetails, deleteUserAccountByID } from '../api/UserService';
import { toastSuccess, toastError } from '../api/ToastService';
import { IoMdEye } from "react-icons/io";
import { IoMdInformationCircleOutline } from "react-icons/io";
import Tooltip from './ToolTip';
import { MdOutlineDeleteForever } from "react-icons/md";
import { GiCancel } from "react-icons/gi";
import { SessionService } from '../api/SessionService';



export function UpdateUserProfile() {
    const navigate = useNavigate();
    const oldPasswordInputRef = useRef();
    const newPasswordInputRef = useRef();
    const deleteAccountRef = useRef();
    var email;
    const [username, setUsername] = useState('');
    const [dob, setDob] = useState('');
    const [oldPassword, setOldPassword] = useState({ value: "", showPassword: false });
    const [newPassword, setNewPassword] = useState({ value: "", showPassword: false });
    const [passwordValidMsg, setPasswordValidMsg] = useState('');
    const [dobvalidationMsg, setDobValidMsg] = useState('');


    const redirectToHomeWithoutValidation = () => {
        navigate("/MyReads/Home");
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

    const handlePasswordVisibility = (isOld) => {
        if (isOld)
            setOldPassword({ ...oldPassword, showPassword: !oldPassword.showPassword });
        else
            setNewPassword({ ...newPassword, showPassword: !newPassword.showPassword });
    }

    const handlePassword = (isOld, enteredPassword) => {
        if (isOld)
            setOldPassword({ ...oldPassword, value: enteredPassword });
        else {
            if (isValidPassword(enteredPassword)) {
                setNewPassword({ ...newPassword, value: enteredPassword });
                setPasswordValidMsg("");
            }
            else
                setPasswordValidMsg("Please set a strong password");
        }
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

    const handleConfirmPassword = (comfirmationPassword) => {
        if (comfirmationPassword !== newPassword.value) {
            setPasswordValidMsg("Missmatch in New Password");
        }
        else {
            setPasswordValidMsg('');
        }
    }

    const confirmAccountDeletion = (show) => {
        show ? deleteAccountRef.current.showModal() : deleteAccountRef.current.close();
    }

    const deleteUserAccount = async () => {
        //TODO - call for deleteUserAccountByEmail
        const response = await deleteUserAccountByID(SessionService.getInstance().getSessionUserID());
        if (response !== undefined && response.status === 200) {
            toastSuccess("Account Deleted :(");
            navigate("/myreads/login");
        }
        else toastError("Account Deletion Failed please try again later");
    }

    const updateAndRedirectToHome = async (e) => {
        e.preventDefault();

        if (passwordValidMsg === "" && dobvalidationMsg === "") {
            var updatedUser = {
                name: username,
                dob: dob,
                email: email,
                password: newPassword.value
            }
            const response = await updateUserDetails(updatedUser);
            if (response !== undefined && response.status === 200) {
                toastSuccess("Updated Successful");
                navigate("/myreads/Home");
            }
            else toastError("Failed to Update, please try again later");
        }
        else
            toastError("Please correct the errors");
    }

    return (
        <div class="flex items-center justify-center
              min-h-screen bg-gray-200">
            <div class="main bg-white rounded-2xl shadow-md p-10 
        transition-transform w-auto text-center">
                <div class="flex justify-end items-center cursor-pointer ">
                    <GiCancel
                        onClick={() => redirectToHomeWithoutValidation()}
                        size="20px" />
                </div>
                <p class="text-yellow-500 text-3xl font-semibold"> Profile </p>

                <p class="text-s mb-4">Details of user under the Email id: {email} will be updated</p>
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
                                    onChange={(e) => handleDOB(e.target.value)}
                                    required
                                />
                                <span class="block mb-3 text-red-500" visible={dobvalidationMsg !== '' ? true : false}>{dobvalidationMsg}</span>
                            </div>
                        </div>

                        <div>
                            <div>
                                <span class="flex text-left text-gray-700 font-bold mt-4">Change Password</span>
                                <label for="oldPasswordInputRef" class="flex items-center mb-2 text-left text-gray-700 font-bold gap-1">
                                    Old Password:
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
                                    <input type={oldPassword.showPassword ? 'text' : 'password'}
                                        class="w-full -ml-4 mb-6 px-4 py-2 border border-gray-300 rounded-md focus:outline-none"
                                        id="oldPasswordInputRef"
                                        ref={oldPasswordInputRef}
                                        placeholder="Enter Old Password"
                                        onChange={(e) => handlePassword(true, e.target.value)}
                                        required
                                    />
                                    <button type="button" class="focus:outline-none -ml-8" onClick={() => handlePasswordVisibility(true)}>
                                        <IoMdEye />
                                    </button>
                                </div>
                            </div>

                            <div>
                                <label for="newPasswordInputRef" class="flex items-center mb-2 text-left text-gray-700 font-bold gap-1">
                                    New Password:
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
                                    <input type={newPassword.showPassword ? 'text' : 'password'}
                                        class="w-full -ml-4 mb-6 px-4 py-2 border border-gray-300 rounded-md focus:outline-none"
                                        id="newPasswordInputRef"
                                        ref={newPasswordInputRef}
                                        placeholder="Enter New Password"
                                        onChange={(e) => handlePassword(false, e.target.value)}
                                        required
                                    />
                                    <button type="button" class="focus:outline-none -ml-8" onClick={() => handlePasswordVisibility(false)}>
                                        <IoMdEye />
                                    </button>
                                </div>
                            </div>

                            <div>
                                <label for="confirmPasswordInput" class="block mb-2 text-left text-gray-700 font-bold">Confirm New Password:</label>
                                <input type={newPassword.showPassword ? 'text' : 'password'}
                                    class="w-full mb-6 px-4 py-2 border border-gray-300 rounded-md focus:outline-none"
                                    id="confirmPasswordInput"
                                    placeholder="Re-enter Password"
                                    onChange={(e) => handleConfirmPassword(e.target.value)}
                                    required
                                />
                            </div>

                            <span class="block mb-3 text-red-500" visible={passwordValidMsg !== '' ? true : false}>{passwordValidMsg}</span>
                        </div>
                    </div>

                    <div class="flex justify-center items-center">
                        <button
                            type="submit"
                            class="w-full bg-yellow-500 text-white py-3 px-6 rounded-md cursor-pointer transition-colors duration-300 hover:bg-yellow-400"
                            onClick={updateAndRedirectToHome}
                        >Update</button>
                    </div>
                </form>

                <div class="flex justify-center items-center mt-4">
                    <p class="mr-3">I would like to delete my account</p>

                    <button
                        class="border-none bg-red-500 rounded-lg"
                        onClick={() => confirmAccountDeletion(true)}>
                        <span class="flex items-center text-white hover:underline p-2">
                            <MdOutlineDeleteForever />
                            Delete Account
                        </span>
                    </button>
                </div>

                <dialog ref={deleteAccountRef} class="bg-white rounded-lg p-6" >
                    <span class="font-medium text-gray-600">Deletion of Account will be permanent and CANNOT be reverted back.
                        <br /> Your Book contributions will not be deleted
                        <br /> Do you still want to proceed?</span>

                    <div class="space-x-10 mt-4 font-bold">
                        <button class="rounded-md p-4 text-white bg-red-500"
                            onClick={() => deleteUserAccount()}>Yes</button>

                        <button class="rounded-md p-4 text-white bg-green-500"
                            onClick={() => confirmAccountDeletion(false)}>No</button>
                    </div>
                </dialog>
            </div>
        </div >
    )

}