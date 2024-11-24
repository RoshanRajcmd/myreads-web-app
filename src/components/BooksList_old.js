import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export function BooksList() {
    const [books, setBooks] = useState([]);
    const [bookData, setBookData] = useState({ title: '', summary: '', publishedOn: '', author: '' });
    const [errorMsg, setErrorMsg] = useState("");
    const navigate = useNavigate();

    const handleAddBook = (event) => {
        event.preventDefault();
        if (validateGivenBookDetails()) {
            setBooks([bookData, ...books]);
            //clean the form
            setErrorMsg("");
            setBookData({ title: '', summary: '', publishedOn: '', author: '' });
        }
    }

    function validateGivenBookDetails() {
        let validation = false;
        let publishDate = new Date(bookData.publishedOn);
        let currentDate = new Date();
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
        //setBookData({ ...bookData, title: event.target.value })
        setBookData({ ...bookData, [event.target.name]: event.target.value });
    }

    const redirectToLogin = () => {
        navigate("/MyReads/Login");
    }

    return (
        <div class="min-h-screen bg-gray-200">
            <div class="bg-white rounded-lg shadow-md p-10 
        transition-transform w-96 h-lvh text-center">
                <h1 class="text-yellow-500 text-3xl">
                    Add a Book
                </h1>
                <h3 class="text-lg">
                    Interested in a new Read?
                </h3>
                <h2>Add a book in your Library</h2>
                <span visible={errorMsg !== ""} style={{ color: 'red' }}>{errorMsg}</span>
                <form onSubmit={handleAddBook}>
                    < lable class="block mb-2 text-left text-gray-700 font-bold"> Book Title: </lable >
                    <input
                        type="text"
                        name="title"
                        value={bookData.title}
                        onChange={handleBookDataInput}
                        class="mt-1 p-2 w-full border rounded-md pr-10 mb-6 px-4 py-2"
                        required />
                    <lable class="block mb-2 text-left text-gray-700 font-bold">Book Summary: </lable>
                    <input
                        type="text"
                        name="summary"
                        value={bookData.summary}
                        onChange={handleBookDataInput}
                        class="mt-1 p-2 w-full border rounded-md pr-10 mb-6 px-4 py-2" />
                    <lable class="block mb-2 text-left text-gray-700 font-bold">Published Date: </lable>
                    <input
                        type="date"
                        name="publishedOn"
                        value={bookData.publishedOn}
                        onChange={handleBookDataInput}
                        class="mt-1 p-2 w-full border rounded-md pr-10 mb-6 px-4 py-2"
                        required />
                    <lable class="block mb-2 text-left text-gray-700 font-bold">Book Author: </lable>
                    <input
                        type="text"
                        name="author"
                        value={bookData.author}
                        onChange={handleBookDataInput}
                        class="mt-1 p-2 w-full border rounded-md pr-10 mb-6 px-4 py-2"
                        required />
                    <button class="w-full bg-yellow-500 text-white py-3 px-6 rounded-md cursor-pointer transition-colors duration-300 hover:bg-yellow-400">Add Book</button>
                </form >
                <button
                    onClick={redirectToLogin}
                    class="text-blue-500 hover:underline pt-6">Log Out</button>
            </div>
            <div >
                <h2>Books List:</h2>
                <ol>
                    {books.map(book => (
                        <li>Book Title: {book.title}<br />Book Summary: {book.summary}<br />Published On: {book.publishedOn}<br />Author: {book.author}<br /><br /></li>
                    ))}
                </ol>
            </div>
        </div>
    )
}
