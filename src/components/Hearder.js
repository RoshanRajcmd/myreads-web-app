import React from 'react'
import { useNavigate } from 'react-router-dom';
import { toastSuccess } from '../api/ToastService';
import { ImBooks } from "react-icons/im";
import { IoIosLogOut } from "react-icons/io";
import { FaPlus } from "react-icons/fa";


export function Header({ toggleAddBookModal, noOfBooks }) {
    const navigate = useNavigate();

    const redirectToLogin = () => {
        toastSuccess("Logged Out");
        navigate("/MyReads/Login");
    }

    return (
        <header class="flex flex-row justify-between items-center mt-12">
            <div class="flex flex-row items-center w-auto ms-auto me-auto overflow-hidden gap-4 ">
                <p class="flex items-center">
                    <ImBooks class="mr-1" size="20px" />Books List {noOfBooks}
                </p>
                <button onClick={() => toggleAddBookModal(true)} class="flex items-center text-white bg-yellow-500 text-xs font-medium p-3 whitespace-normal rounded-3xl drop-shadow-xl">
                    <FaPlus class="mr-1" size="15px" />Add New Book
                </button>

                <button
                    onClick={redirectToLogin}
                    class="text-blue-500 hover:underline flex items-center">
                    Log Out
                    <IoIosLogOut class="ml-1" size="15px" />
                </button>
            </div>
        </header>
    )
}
