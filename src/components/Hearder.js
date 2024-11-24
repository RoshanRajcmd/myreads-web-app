import React from 'react'

export function Header({ toggleModal, noOfBooks }) {
    return (
        <header class="flex flex-row justify-between items-center mt-12">
            <div class="flex flex-row items-center w-auto ms-auto me-auto overflow-hidden gap-4 ">
                <h3>Books List {noOfBooks}</h3>
                <button onClick={() => toggleModal(true)} class="flex text-white bg-yellow-500 text-xs font-medium p-3 whitespace-normal rounded-3xl shadow-sm transition-shadow">
                    <img src=
                        "https://media.geeksforgeeks.org/wp-content/uploads/20240227164304/visible.png"
                        alt="" class="mr-2 w-4"></img>Add New Book
                </button>
            </div>
        </header>
    )
}
