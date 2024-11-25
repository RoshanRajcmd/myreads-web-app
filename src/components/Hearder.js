import React from 'react'
import { useNavigate } from 'react-router-dom';
import { toastSuccess } from '../api/ToastService';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'


export function Header({ toggleModal, noOfBooks }) {
    const navigate = useNavigate();

    const redirectToLogin = () => {
        toastSuccess("Logged Out");
        navigate("/MyReads/Login");
    }

    return (
        <header class="flex flex-row justify-between items-center mt-12">
            <div class="flex flex-row items-center w-auto ms-auto me-auto overflow-hidden gap-4 ">
                <FontAwesomeIcon icon="fa-solid fa-book" />
                <h3>Books List {noOfBooks}</h3>

                <button onClick={() => toggleModal(true)} class="flex items-center text-white bg-yellow-500 text-xs font-medium p-3 whitespace-normal rounded-3xl shadow-sm transition-shadow">
                    <i class="fa fa-plus fa-lg mr-2" alt="Add New Book"></i>Add New Book
                </button>

                <button
                    onClick={redirectToLogin}
                    class="text-blue-500 hover:underline">
                    Log Out
                    <i class="fa-solid fa-arrow-right-from-bracket" alt="Log Out"></i>
                </button>
            </div>
        </header>
    )
}
