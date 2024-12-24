import React, { useEffect, useState, useRef } from 'react';
import { BookCard } from './BookCard';
import { Header } from './Hearder';
import { toastError } from '../api/ToastService';
import { AddBook } from './AddBook';
import { SessionService } from '../api/SessionService';

export function BooksList() {
    const [booksData, setBooksData] = useState();
    const [currentPage, setCurrentPage] = useState();
    const addBookModalRef = useRef();
    const userSession = SessionService.getInstance();

    //An async function that getALL the books of the given page no each
    //by given size. By defaul the page and size value is 0, 10
    const getAllBooks = async (page = 0, size = 10) => {
        try {
            setCurrentPage(page);
            //TODO - Implement the below line when doing CRUD functions of Books
            //const {books} =await getAllBooks(page, size);
            const bookData = [
                {
                    id: 1,
                    title: "Book1",
                    summary: "Test Summary",
                    publishedOn: "10-12-2002",
                    author: "Roshan"
                },
                {
                    id: 1,
                    title: "Book2",
                    summary: "Test Summary",
                    publishedOn: "12-07-2012",
                    author: "Raj"
                }
            ];
            setBooksData(bookData);
            console.log(bookData);
        }
        catch (error) {
            console.log(error);
            toastError(error.message);
        }
    }

    // useEffect(() => {
    //     getAllBooks();
    // }, [])

    const toggleAddBookModal = (show) => {
        //Dialog.showModal will show the Dialog, dialog.close() to close it
        show ? addBookModalRef.current.showModal() : addBookModalRef.current.close();
    }


    return (
        <>
            <div><Header toggleAddBookModal={toggleAddBookModal} nbOfContacts={2} /></div>

            <dialog ref={addBookModalRef} class="rounded-3xl">
                <AddBook toggleAddBookModal={toggleAddBookModal} />
            </dialog>

            <div class="mt-5 ml-0 mr-0" >
                {/* The Below line will check the content of booksData of lenght is 0 means this no data and then it will return the <div> block when its true*/}
                {booksData?.content?.lenght === 0 && <div>No Books Added</div>}

                {/* Listing all the BookCards */}
                <ol class="grid grid-rows-2 gap-4">
                    {/* The Below line will return each booksData in the content as <Book> block when its true*/}
                    {booksData?.content?.lenght > 0 && booksData.content.map(book => <BookCard book={book} key={book.id} />)}
                </ol>

                {/* Page Navigation over the booksData list show */}
                {booksData?.content?.lenght > 0 && booksData?.totalPages > 1 &&
                    <div>
                        <a onClick={() => getAllBooks(currentPage - 1)}
                            class={0 === currentPage ? "pointer-events-none opacity-60" : ''}>
                            &laquo;
                        </a>

                        {booksData && [...Array(booksData.totalPages).keys()].map((page, index) =>
                            <a onClick={getAllBooks(page)}
                                class={page === currentPage ? "bg-yellow-500 text-white border border-yellow-700 border-solid" : ''}
                                key={page}>{page + 1}
                            </a>
                        )}

                        <a onClick={() => getAllBooks(currentPage + 1)}
                            class={booksData?.totalPages === currentPage + 1 ? "pointer-events-none opacity-60" : ''}>
                            &raquo;
                        </a>
                    </div>
                }
            </div>
        </>
    )
}
