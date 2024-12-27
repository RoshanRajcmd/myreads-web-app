import React, { useState } from 'react';
import { FaSearch } from "react-icons/fa";
import { GiCancel } from "react-icons/gi";
import { ImCheckboxUnchecked } from "react-icons/im";
import { IoIosCheckbox } from "react-icons/io";

export function AddBook({ toggleAddBookModal }) {
    const [bookData, setBookData] = useState({ title: '', summary: '', publishedOn: '', author: '' });
    const [errorMsg, setErrorMsg] = useState("");
    const [marked, setMarked] = useState(false);
    const items = [
        { id: 1, name: 'Item 1' },
        { id: 2, name: 'Item 2' },
        { id: 3, name: 'Item 2' },
        { id: 4, name: 'Item 2' },
        { id: 5, name: 'Item 2' },
        { id: 6, name: 'Item 2' },
        { id: 7, name: 'Item 2' },
        { id: 8, name: 'Item 2' },
        { id: 9, name: 'Item 2' },
        { id: 10, name: 'Item 2' },
        { id: 1, name: 'Item 1' },
        { id: 2, name: 'Item 2' },
        { id: 3, name: 'Item 2' },
        { id: 4, name: 'Item 2' },
        { id: 5, name: 'Item 2' },
        { id: 6, name: 'Item 2' },
        { id: 7, name: 'Item 2' },
        { id: 8, name: 'Item 2' },
        { id: 9, name: 'Item 2' },
        { id: 10, name: 'Item 2' },
        { id: 7, name: 'Item 2' },
        { id: 8, name: 'Item 2' },
        { id: 9, name: 'Item 2' },
        { id: 10, name: 'Item 2' },
    ];

    const handleRead = () => {
        setMarked(!marked);
    }
    const handleAddBook = (event) => {
        event.preventDefault();
        if (validateGivenBookDetails()) {
            //clean the form
            setErrorMsg("");
        }
    }

    function validateGivenBookDetails() {
        let validation = false;
        let publishDate = new Date(bookData.publishedOn);
        let currentDate = new Date();
        //TODO - append validation of existing book details under the same user
        if (publishDate <= currentDate) {
            validation = true;
        }
        else {
            setErrorMsg("Please set a valid Date");
        }
        return validation;
    }

    const handleBookDataInput = (event) => {
        //event.target.name: This extracts the name attribute of the input element
        //event.target.value: This extracts the current value of the input element. So the below line will look like
        setBookData({ ...bookData, [event.target.name]: event.target.value });
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
                    />
                    <button type="button" class="focus:outline-none -ml-8">
                        <FaSearch />
                    </button>
                </div>

                <div className="max-h-96 overflow-auto">
                    <ul>
                        {items.map(item => (
                            <li className="flex items-center gap-2" key={item.id}>
                                <div class="flex items-center hover:cursor-pointer" onClick={() => handleRead()}>
                                    {marked && <IoIosCheckbox size="18px" />}
                                    {!marked && <ImCheckboxUnchecked />}
                                </div>
                                {item.name}</li>
                        ))}
                    </ul>
                </div>
            </div>

            <span class="inline-block w-0.5 bg-gray-600 dark:bg-white mx-2.5 h-auto" />

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
