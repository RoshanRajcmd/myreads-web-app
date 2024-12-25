import { React, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { toastSuccess } from '../api/ToastService';
import { ImBooks } from "react-icons/im";
import { IoIosLogOut } from "react-icons/io";
import { FaPlus } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";
import Tooltip from './ToolTip';
import { SessionService } from '../api/SessionService';
import { IoSunny } from "react-icons/io5";
import { IoMoon } from "react-icons/io5";

export function Header({ toggleDarkMode, toggleAddBookModal, noOfBooks }) {
    const navigate = useNavigate();
    const profileDialogRef = useRef();

    const endSessionAndLogOut = () => {
        SessionService.getInstance().setSessionUserDetials(undefined);
        toastSuccess("Logged Out");
        navigate("/myreads/login");
    }

    const redirectToProfileUpdate = () => {
        navigate("/myreads/updateprofile");
    }

    return (
        <header class="flex justify-between items-center mt-6 p-4 bg-white dark:bg-gray-800">
            <p class="flex items-center text-gray-800 dark:text-white">
                <ImBooks class="mr-1" size="20px" />My Books List: {noOfBooks}
            </p>

            <button onClick={() => toggleAddBookModal(true)} class="flex left-1/2 transform -translate-x-1/2 bg-yellow-500 text-xs font-medium p-3 whitespace-normal rounded-3xl drop-shadow-xl text-white dark:text-gray-800">
                <FaPlus class="mr-1" size="15px" />Add New Book
            </button>

            <div class="flex gap-4 text-gray-800 dark:text-white">
                {/* render moon when dark is false */}
                <button onClick={toggleDarkMode}>
                    {document.body.classList.contains('dark') ? <IoSunny size="25px" /> : <IoMoon size="25px" />}
                </button>

                <div class="group relative cursor-pointer">
                    <CgProfile size="33px" />
                    <span class="absolute top-9 right-0 scale-0 transition-all w-max rounded bg-gray-800 p-2 text-xs font-normal text-white group-hover:scale-100">
                        <a
                            onClick={redirectToProfileUpdate}
                            class="flex items-center hover:underline p-2">
                            Update Profile
                        </a>
                        <a
                            class="flex items-center hover:underline p-2">
                            My Friends
                        </a>
                        <a
                            onClick={endSessionAndLogOut}
                            class="flex items-center hover:underline hover:text-red-500 p-2">
                            Log Out
                            <IoIosLogOut class="ml-1" size="15px" />
                        </a>
                    </span>
                </div>
            </div>
        </header>
    )
}
