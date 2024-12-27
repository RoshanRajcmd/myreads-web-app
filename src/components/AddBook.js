import React, { useState } from 'react';
import { FaSearch } from "react-icons/fa";
import { GiCancel } from "react-icons/gi";
import { addBooktoUserByBookObject } from '../api/UserService';
import { toastError, toastSuccess } from '../api/ToastService';
import { SessionService } from '../api/SessionService';
import { searchBooks } from '../api/UserService';
import { SearchedBook } from './SearchedBook';

export function AddBook({ toggleAddBookModal, onBookAdded }) {
    const [bookData, setBookData] = useState({ title: '', summary: '', publishedOn: '', author: '' });
    const [errorMsg, setErrorMsg] = useState("");
    const userOnSession = SessionService.getInstance();
    //console.log(userOnSession);
    const [searchResults, setSearchResults] = useState([]);



    const handleAddBook = async (event) => {
        event.preventDefault();
        if (validatePublishedDate()) {
            var addBookResp = await addBooktoUserByBookObject(userOnSession.getSessionUserID(), bookData);
            //console.log(addBookResp);
            if (addBookResp !== undefined && addBookResp?.status === 200) {
                toastSuccess("Book Added Successfully");
                cleanForm();
                onBookAdded(); // Notify parent component to re-render BooksList
            }
            else
                toastError("Failed to Add Book or Book Already Exists");
        }
    }

    const cleanForm = () => {
        setBookData({ title: '', summary: '', publishedOn: '', author: '' });
    }

    function validatePublishedDate() {
        let validation = false;
        let publishDate = new Date(bookData.publishedOn);
        let today = new Date();
        if (today.getDate() > publishDate.getDate())
            return true;
        else
            toastError("Please set a valid Date");
        return validation;
    }

    const handleBookDataInput = (event) => {
        //event.target.name: This extracts the name attribute of the input element
        //event.target.value: This extracts the current value of the input element. So the below line will look like
        setBookData({ ...bookData, [event.target.name]: event.target.value });
    }

    const handleBookSearch = async (enteredBookTitle) => {
        if (enteredBookTitle !== undefined && enteredBookTitle !== "") {
            const searchResp = await searchBooks(enteredBookTitle);
            if (searchResp !== undefined && searchResp?.status === 200) {
                setSearchResults(searchResp.data);
                //console.log(searchResp.data);
            }
            else
                toastError("Failed to Search");
        }
    }

    return (
        <div class="flex rounded-lg shadow-md p-10 
        transition-transform text-center bg-white dark:bg-gray-600 text-gray-800 dark:text-slate-200 gap-5">
            <div>
                <div>
                    <input type='text'
                        class="mt-1 mb-6 p-2 w-full border rounded-md focus:outline-none focus:border-yellow-400 bg-white dark:bg-gray-600"
                        id="searchInput"
                        placeholder="Search by Title"
                        required
                        onChange={(e) => handleBookSearch(e.target.value)}
                    />
                    <button type="button" class="focus:outline-none -ml-8">
                        <FaSearch />
                    </button>
                </div>

                <div className="max-h-96 overflow-auto">
                    {searchResults.map(resBook => (
                        <SearchedBook book={resBook} key={resBook.id} onBookAdded={onBookAdded} />
                    ))}
                </div>
            </div>

            <span class="inline-block w-0.5 bg-gray-200 dark:bg-white mx-2.5 h-auto" />

            <div>
                <div class="flex justify-end items-center cursor-pointer ">
                    <GiCancel
                        onClick={() => toggleAddBookModal(false)}
                        size="20px" />
                </div>
                <h1 class="text-yellow-500 text-3xl">
                    Add a Book
                </h1>
                <h3 class="text-lg">
                    Interested in a new Read?
                </h3>
                <h2>Add a book in your Library</h2>
                <span visible={errorMsg !== ""} style={{ color: 'red' }}>{errorMsg}</span>
                <form onSubmit={handleAddBook}>
                    < lable class="block mt-2 mb-2 text-left font-bold"> Book Title: </lable >
                    <input
                        type="text"
                        name="title"
                        value={bookData.title}
                        onChange={handleBookDataInput}
                        class="mt-1 p-2 w-full border rounded-md pr-10 mb-6 px-4 py-2 focus:outline-none focus:border-yellow-400 bg-white dark:bg-gray-600"
                        required />
                    <lable class="block mb-2 text-left font-bold">Book Summary: </lable>
                    <input
                        type="text"
                        name="summary"
                        value={bookData.summary}
                        onChange={handleBookDataInput}
                        class="mt-1 p-2 w-full border rounded-md pr-10 mb-6 px-4 py-2 focus:outline-none focus:border-yellow-400 bg-white dark:bg-gray-600" />
                    <lable class="block mb-2 text-left font-bold">Published Date: </lable>
                    <input
                        type="date"
                        name="publishedOn"
                        value={bookData.publishedOn}
                        onChange={handleBookDataInput}
                        class="mt-1 p-2 w-full border rounded-md pr-10 mb-6 px-4 py-2 focus:outline-none focus:border-yellow-400 bg-white dark:bg-gray-600"
                        required />
                    <lable class="block mb-2 text-left font-bold">Book Author: </lable>
                    <input
                        type="text"
                        name="author"
                        value={bookData.author}
                        onChange={handleBookDataInput}
                        class="mt-1 p-2 w-full border rounded-md pr-10 mb-6 px-4 py-2 focus:outline-none focus:border-yellow-400 bg-white dark:bg-gray-600"
                        required />
                    <button class="w-full bg-yellow-500 text-white py-3 px-6 rounded-md cursor-pointer transition-colors duration-300 hover:bg-yellow-400">Add Book</button>
                </form >
            </div>
        </div>
    )
}
