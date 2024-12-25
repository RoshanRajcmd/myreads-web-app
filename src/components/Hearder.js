import { React, useRef } from 'react'
import { useNavigate } from 'react-router-dom';
import { toastSuccess } from '../api/ToastService';
import { ImBooks } from "react-icons/im";
import { IoIosLogOut } from "react-icons/io";
import { FaPlus } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";
import Tooltip from './ToolTip';
import { SessionService } from '../api/SessionService';



export function Header({ toggleAddBookModal, noOfBooks }) {
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
        <header class="flex justify-between mt-6 p-4">
            <div class="flex overflow-hidden gap-4">
                <p class="flex items-center">
                    <ImBooks class="mr-1 text-gray-800" size="20px" />My Books List: {noOfBooks}
                </p>
                <button onClick={() => toggleAddBookModal(true)} class="flex items-center text-white bg-yellow-500 text-xs font-medium p-3 whitespace-normal rounded-3xl drop-shadow-xl">
                    <FaPlus class="mr-1" size="15px" />Add New Book
                </button>
            </div>

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
        </header>
    )
}
