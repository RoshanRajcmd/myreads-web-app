import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { updateUserDetails, deleteUserAccountByID, getUserDetailsById, isUserNameTakeninDB, isOldPasswordValid } from '../api/UserService';
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
    var userOnSession = SessionService.getInstance().getSessionUser();
    const [fullName, setFullName] = useState(userOnSession.fullName);
    const [userName, setUserName] = useState(userOnSession.userName);
    const [oldPassword, setOldPassword] = useState({ value: "", showPassword: false });
    const [newPassword, setNewPassword] = useState({ value: "", showPassword: false });
    const [passwordValidMsg, setPasswordValidMsg] = useState('');
    const [userNameTakenMsg, setUserNameTakenMsg] = useState('');


    const redirectToHome = () => {
        navigate("/MyReads/Home");
    }

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
            //If the entered username is not the same as the userOnSession username
            if (enteredUserName !== userOnSession.userName) {
                //Check if the entered username is already taken
                if (await isUserNameTaken(enteredUserName) === false) {
                    setUserNameTakenMsg("");
                }
                else setUserNameTakenMsg("Username already taken");
            }
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

    const handlePasswordVisibility = (isOld) => {
        if (isOld)
            setOldPassword({ ...oldPassword, showPassword: !oldPassword.showPassword });
        else
            setNewPassword({ ...newPassword, showPassword: !newPassword.showPassword });
    }

    const handlePassword = (isOld, enteredPassword) => {
        if (isOld)
            setOldPassword({ ...oldPassword, value: enteredPassword.trim() });
        else {
            if (isValidPassword(enteredPassword.trim())) {
                setNewPassword({ ...newPassword, value: enteredPassword.trim() });
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
            setPasswordValidMsg("Mismatch in New Password");
        }
        else {
            setPasswordValidMsg('');
        }
    }

    const confirmAccountDeletion = (show) => {
        show ? deleteAccountRef.current.showModal() : deleteAccountRef.current.close();
    }

    const deleteUserAccount = async () => {
        const response = await deleteUserAccountByID(userOnSession.userId);
        if (response !== undefined && response.status === 200) {
            toastSuccess("Account Deleted :(");
            navigate("/myreads/login");
        }
        else toastError("Account Deletion Failed please try again later");
    }

    const updateAndRedirectToHome = async (e) => {
        e.preventDefault();

        if (passwordValidMsg === "" && userNameTakenMsg === "") {
            var updatedUserRequest = await createUserByChangedAttrs();
            //console.log(updatedUserRequest);
            const response = await updateUserDetails(userOnSession.userId, updatedUserRequest);
            //console.log(response);
            if (response !== undefined && response?.status === 200) {
                //Update the session user details with the updated user details
                var sessionUserResp = await getUserDetailsById(userOnSession.userId);
                //console.log(sessionUserResp);
                if (sessionUserResp.data !== undefined) {
                    SessionService.getInstance().setSessionUserDetials(sessionUserResp.data);
                }
                else toastError("Failed to Update Session User, please Re-login");

                toastSuccess("Updated Successful");
                navigate("/myreads/Home");
            }
            else toastError("Failed to Update, please try again later");
        }
        else
            toastError("Please correct the errors");
    }

    const createUserByChangedAttrs = async () => {
        var updatedUserRequest = userOnSession;

        if (fullName !== undefined &&
            fullName !== "" &&
            updatedUserRequest.fullName !== fullName.trim())
            updatedUserRequest.fullName = fullName.trim();
        if (userName !== undefined &&
            userName !== "" &&
            updatedUserRequest.userName !== userName)
            updatedUserRequest.userName = userName;
        if (oldPassword !== undefined && oldPassword !== "") {
            if (await isValidOldPassword() === true) {
                if (newPassword !== "") {
                    updatedUserRequest.password = newPassword.value;
                }
                else
                    toastError("Password cannot be updated, Check new Password");
            }
            else
                toastError("Password cannot be updated, Old Password is incorrect");
        }

        return updatedUserRequest;
    }

    const isValidOldPassword = async () => {
        const response = await isOldPasswordValid(userOnSession.userId, oldPassword.value);
        if (response !== undefined && response?.status === 200) {
            //console.log(response);
            return response?.data;
        }
        return false;
    }

    return (
        <div class="flex items-center justify-center
              min-h-screen bg-gray-200">
            <div class="main bg-white rounded-2xl shadow-md p-10 
        transition-transform w-auto text-center">
                <div class="flex justify-end items-center cursor-pointer ">
                    <GiCancel
                        onClick={() => redirectToHome()}
                        size="20px" />
                </div>
                <p class="text-yellow-500 text-3xl font-semibold"> Profile </p>

                <p class="text-s mb-4">Details of user under the Email: {userOnSession.email} will be updated</p>
                <form >
                    <div class="flex gap-5 justify-between">
                        <div>
                            <div>
                                <label for="nameInput" class="block mt-4 mb-2 text-left text-gray-700 font-bold">Full Name:</label>
                                <input type="text"
                                    class="block w-full mb-6 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-yellow-400"
                                    id="nameInput"
                                    placeholder='Enter Full Name'
                                    onChange={(e) => handleFullName(e.target.value)}
                                    value={fullName}
                                    required
                                />
                            </div>

                            <div>
                                <label for="userNameInput" class="flex items-center mt-4 mb-2 text-left text-gray-700 font-bold">
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
                                    class="block w-full mb-6 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-yellow-400"
                                    id="userNameInput"
                                    placeholder='Enter Username'
                                    onChange={(e) => handleUserName(e.target.value)}
                                    value={userName}
                                    required
                                />
                                <span class="block mb-3 text-red-500" visible={userNameTakenMsg !== '' ? true : false}>{userNameTakenMsg}</span>
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

                            <div
                                disabled={oldPassword.value === ""}
                                style={{
                                    pointerEvents: oldPassword.value === "" ? 'none' : 'auto',
                                    opacity: oldPassword.value === "" ? 0.5 : 1
                                }}>
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

                            <div
                                disabled={newPassword.value === ""}
                                style={{
                                    pointerEvents: newPassword.value === "" ? 'none' : 'auto',
                                    opacity: newPassword.value === "" ? 0.5 : 1
                                }}>
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
                        class="border-none bg-red-500 rounded-lg hover:bg-red-400"
                        onClick={() => confirmAccountDeletion(true)}>
                        <span class="flex items-center text-white p-2">
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
                        <button class="rounded-md p-4 text-white bg-red-500 hover:bg-red-400"
                            onClick={() => deleteUserAccount()}>Yes</button>

                        <button class="rounded-md p-4 text-white bg-green-500 hover:bg-green-400"
                            onClick={() => confirmAccountDeletion(false)}>No</button>
                    </div>
                </dialog>
            </div>
        </div >
    )

}