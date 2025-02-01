import { React, useState } from 'react';
import { Link } from 'react-router-dom';
import { FaBook } from "react-icons/fa";
import { ImCheckboxUnchecked } from "react-icons/im";
import { IoIosCheckbox } from "react-icons/io";
import { MdOutlineDeleteForever } from "react-icons/md";
import { deleteBookFromUser } from '../api/UserService';
import { toastError, toastSuccess } from '../api/ToastService';
import { SessionService } from '../api/SessionService';

export function BookCard({ book, onBookAdded }) {
    const [marked, setMarked] = useState(false);
    const userOnSession = SessionService.getInstance();
    //console.log(userOnSession);

    const handleRead = () => {
        setMarked(!marked);
    }

    const handleRemoveBook = async () => {
        const deleteBookResp = await deleteBookFromUser(userOnSession.getSessionUserID(), book.id);
        if (deleteBookResp !== undefined && deleteBookResp?.status === 200) {
            toastSuccess("Book Deleted Successfully");
            onBookAdded();
        }
        else
            toastError("Failed to Delete Book");
    }

    return (
        <div className={marked ? "opacity-50" : "opacity-100"}>
            <div className="w-full p-5 mb-2 rounded-3xl min-h-max min-w-80 max-w-80 bg-slate-200 dark:bg-gray-600 text-gray-800 dark:text-slate-200">
                <div className="flex flex-row items-center gap-1 min-h-5 max-w-80">
                    <FaBook />
                    <p className="text-lg text-center rounded-lg font-semibold p-1 hover:bg-yellow-500">{book.title}</p>
                    {/* <div className="flex items-center hover:cursor-pointer ml-auto" onClick={() => handleRead()}>
                        {marked && <IoIosCheckbox />}
                        {!marked && <ImCheckboxUnchecked />}
                    </div> */}
                    <MdOutlineDeleteForever
                        className="ml-auto hover:text-red-500 cursor-pointer" size="20px"
                        onClick={() => handleRemoveBook()}
                    />
                </div>
                <div className="flex flex-row gap-3 items-center">
                    <p className="font-thin text-sm">{book.publishedOn}</p>
                    <p className="text-xs font-medium">{book.author}</p>
                </div>
                <div className="mt-4">
                    <p className="text-base text-wrap">{book.summary}</p>
                </div>
            </div>
        </div>
    )
}
