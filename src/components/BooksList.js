import React, { useEffect, useState, useRef } from 'react';
import { BookCard } from './BookCard';
import { Header } from './Hearder';
import { toastError } from '../api/ToastService';
import { AddBook } from './AddBook';
import { SessionService } from '../api/SessionService';
import { getUserBooks } from '../api/UserService';

export function BooksList({ toggleDarkMode }) {
    const [booksData, setBooksData] = useState();
    const [currentPage, setCurrentPage] = useState();
    const addBookModalRef = useRef();
    const userOnSession = SessionService.getInstance();
    //console.log(userOnSession);

    //An async function that getALL the books of the given page no each
    //by given size. By defaul the page and size value is 0, 10
    const getAllBooks = async (page = 0, size = 10) => {
        try {
            setCurrentPage(page);
            //TODO - Implement the below line when doing CRUD functions of Books
            const booksResp = await getUserBooks(userOnSession.getSessionUserID(), page, size);
            if (booksResp?.data?.content !== undefined) {
                setBooksData(booksResp.data);
            }
            else toastError("Failed to find Books");
            //console.log(booksResp);
        }
        catch (error) {
            console.log(error);
            toastError(error.message);
        }
    }

    useEffect(() => {
        getAllBooks();
    }, [])

    const toggleAddBookModal = (show) => {
        //Dialog.showModal will show the Dialog, dialog.close() to close it
        show ? addBookModalRef.current.showModal() : addBookModalRef.current.close();
    }


    return (
        <div class="min-h-screen bg-white dark:bg-gray-800">

            <div><Header toggleDarkMode={toggleDarkMode} toggleAddBookModal={toggleAddBookModal} noOfBooks={booksData?.content.length} /></div>

            <dialog ref={addBookModalRef} class="rounded-3xl">
                <AddBook toggleDarkMode={toggleDarkMode} toggleAddBookModal={toggleAddBookModal} />
            </dialog>

            <div class="my-5 mx-52 gap-4" >
                {/* The Below line will check the content of booksData of length is 0 means this no data and then it will return the <div> block when its true*/}
                {booksData?.content?.length === 0 && <div class="flex items-center justify-center text-gray-800 dark:text-slate-200 text-4xl">No Books Added</div>}

                {/* Listing all the BookCards */}
                <ul class="grid grid-cols-auto-fill-280 gap-16">
                    {/* The Below line will return each booksData in the content as <Book> block when its true*/}
                    {booksData?.content?.length > 0 && booksData.content.map(book => <BookCard book={book} key={book.id} />)}
                </ul>

                {/* Page Navigation over the booksData list show */}
                {booksData?.content?.length > 0 && booksData?.totalPages > 1 &&
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
        </div>
    )
}
