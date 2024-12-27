import React, { useState } from 'react';
import { ImCheckboxUnchecked } from "react-icons/im";
import { IoIosCheckbox } from "react-icons/io";
import { SessionService } from '../api/SessionService';
import { toastError, toastSuccess } from '../api/ToastService';
import { addBookToUserByBookId, deleteBookFromUser } from '../api/UserService';

export function SearchedBook({ book, onBookAdded }) {
    const [marked, setMarked] = useState(false);
    const userOnSession = SessionService.getInstance();
    //console.log(userOnSession);

    const handleRead = async () => {
        console.log(marked);
        if (!marked) {
            await handleAddBook();
        }
        else {
            await handleRemoveBook();
        }
        setMarked(!marked);
    }

    const handleAddBook = async () => {
        console.log(userOnSession.getSessionUserID());
        console.log(book);
        var addBookResp = await addBookToUserByBookId(userOnSession.getSessionUserID(), book.id);
        console.log(addBookResp);
        if (addBookResp !== undefined && addBookResp?.status === 200) {
            toastSuccess("Book Added Successfully");
            // Notify parent component to re-render BooksList
            onBookAdded();
        }
        else
            toastError("Failed to Add Book or Book Already Exists");
    }

    const handleRemoveBook = async () => {
        const deleteBookResp = await deleteBookFromUser(userOnSession.getSessionUserID(), book.id);
        if (deleteBookResp !== undefined && deleteBookResp?.status === 200) {
            toastSuccess("Book Deleted Successfully");
            // Notify parent component to re-render BooksList
            onBookAdded();
        }
        else
            toastError("Failed to Delete Book");
    }

    return (
        <div className="flex items-center gap-2">
            <div class="flex items-center hover:cursor-pointer" onClick={() => handleRead()}>
                {marked && <IoIosCheckbox />}
                {!marked && <ImCheckboxUnchecked />}
            </div>
            <div>{book.title}</div>
        </div>
    );
}