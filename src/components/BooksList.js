import React, { useState } from 'react';

export function BooksList() {
    const [books, setBooks] = useState([]);
    const [bookData, setBookData] = useState({ title: '', summary: '', publishedOn: '', author: '' });
    const [errorMsg, setErrorMsg] = useState("");

    const handleAddTask = (event) => {
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

    return (
        <>
            <h1>Hi Welcome to MyBooksList!</h1>
            <h2>Add your book in Library</h2>
            <span visible={errorMsg !== ""} style={{ color: 'red' }}>{errorMsg}</span>
            <form onSubmit={handleAddTask}>
                < span > Book Title: </span >
                <input type="text" name="title" value={bookData.title} onChange={handleBookDataInput} style={{ marginTop: '10px' }} required />
                <br />
                <span>Book Summary: </span>
                <input type="text" name="summary" value={bookData.summary} onChange={handleBookDataInput} style={{ marginTop: '10px' }} />
                <br />
                <span>Published Date: </span>
                <input type="date" name="publishedOn" value={bookData.publishedOn} onChange={handleBookDataInput} style={{ marginTop: '10px' }} required />
                <br />
                <span>Book Author: </span>
                <input type="text" name="author" value={bookData.author} onChange={handleBookDataInput} style={{ marginTop: '10px' }} required />
                <br />
                <button style={{ marginTop: '20px' }}>Add Book</button>
            </form >
            <br />
            <h2>Books List:</h2>
            <ol>
                {books.map(book => (
                    <li>Book Title: {book.title}<br />Book Summary: {book.summary}<br />Published On: {book.publishedOn}<br />Author: {book.author}<br /><br /></li>
                ))}
            </ol>
        </>
    )
}