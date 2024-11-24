import React, { useEffect, useState } from 'react';
import { BookCard } from './BookCard';
import { Header } from './Hearder';

export function BooksList() {
    const [books, setBooks] = useState();
    const [currentPage, setCurrentPage] = useState();

    //An async function that getALL the books of the given page no each
    //by given size. By defaul the page and size value is 0, 10
    const getAllBooks = async (page = 0, size = 10) => {
        try {
            setCurrentPage(page);
            //TODO - Implement the below line when doing CRUD functions of Books
            //const {books} =await getAllBooks(page, size);
            setBooks(books);
            console.log(books);
        }
        catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getAllBooks();
    }, [])

    return (
        <>
            <div><Header /></div>
            <div class="mt-5 ml-0 mr-0" >
                {/* The Below line will check the content of books of lenght is 0 means this no data and then it will return the <div> block when its true*/}
                {books?.content?.lenght === 0 && <div>No Books Added</div>}

                {/* Listing all the BookCards */}
                <ol class="grid grid-rows-2 gap-4">
                    {/* The Below line will return each books in the content as <Book> block when its true*/}
                    {books?.content?.lenght > 0 && books.content.map(book => <BookCard book={book} key={book.id} />)}
                </ol>

                {/* Page Navigation over the books list show */}
                {books?.content?.lenght > 0 && books?.totalPages > 1 &&
                    <div>
                        <a onClick={() => getAllBooks(currentPage - 1)}
                            class={0 === currentPage ? "pointer-events-none opacity-60" : ''}>
                            &laquo;
                        </a>

                        {books && [...Array(books.totalPages).keys()].map((page, index) =>
                            <a onClick={getAllBooks(page)}
                                class={page === currentPage ? "bg-yellow-500 text-white border border-yellow-700 border-solid" : ''}
                                key={page}>{page + 1}
                            </a>
                        )}

                        <a onClick={() => getAllBooks(currentPage + 1)}
                            class={books?.totalPages === currentPage + 1 ? "pointer-events-none opacity-60" : ''}>
                            &raquo;
                        </a>
                    </div>
                }
            </div>
        </>
    )
}
