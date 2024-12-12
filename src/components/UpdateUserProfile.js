import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { getUserDetails, deleteUserAccountByEmail } from '../api/UserService';
import { toastSuccess, toastError } from '../api/ToastService';
import { IoMdEye } from "react-icons/io";
import { IoMdInformationCircleOutline } from "react-icons/io";
import Tooltip from './ToolTip';
import { MdOutlineDeleteForever } from "react-icons/md";
import { GiCancel } from "react-icons/gi";



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
    const [passwordErrMsg, setPasswordErrMsg] = useState('');


    const redirectToHomeWithoutValidation = () => {
        navigate("/MyReads/Home");
    }

    const updateAndRedirectToHome = () => {
        //If Username updated add it new attribute list
        if (oldPassword.value !== "" && passwordErrMsg === "") {
            //TODO - API call to update the user to DB
            toastSuccess("Profile Updated");
            navigate("/MyReads/Home");
        } else {
            toastError("Failed to Update Profile");
        }
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
        else
            setNewPassword({ ...newPassword, value: enteredPassword });
    }

    const handleConfirmPassword = (comfirmationPassword) => {
        if (comfirmationPassword !== newPassword.value) {
            setPasswordErrMsg("Missmatch in New Password");
        }
        else {
            setPasswordErrMsg('');
        }
    }

    const deleteUserAccount = () => {
        //TODO - call for deleteUserAccountByEmail
    }

    const confirmAccountDeletion = (show) => {
        show ? deleteAccountRef.current.showModal() : deleteAccountRef.current.close();
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
                                    onChange={(e) => setDob(e.target.value)}
                                    required
                                />
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
                                                <li>Any special character</li>
                                                <li>Must have atleast one number</li>
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

                            <span class="block mb-3 text-red-500" visible={passwordErrMsg !== '' ? true : false}>{passwordErrMsg}</span>
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

                <dialog ref={deleteAccountRef} class="bg-white rounded-lg p-6 font-bold" >
                    <span>Deletion of Account will be permanent and will NOT be reverted back.
                        <br /> Do you still want to proceed?</span>

                    <div class="space-x-10 mt-4">
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