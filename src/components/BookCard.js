import { React, useState } from 'react';
import { Link } from 'react-router-dom';
import { FaBook } from "react-icons/fa";
import { ImCheckboxUnchecked } from "react-icons/im";
import { IoIosCheckbox } from "react-icons/io";
import { MdOutlineDeleteForever } from "react-icons/md";

export function BookCard({ book }) {
    const [marked, setMarked] = useState(false);

    const handleRead = () => {
        setMarked(!marked);
    }

    return (
        <div class="w-full p-5 mb-2 rounded-3xl min-h-max min-w-80 max-w-80 bg-slate-200 dark:bg-gray-600 text-gray-800 dark:text-slate-200">
            <div class="flex flex-row items-center flex-wrap gap-1">
                <FaBook />
                <p class="text-lg text-center rounded-lg font-semibold p-1 hover:bg-yellow-500">{book.title}</p>
                <div class="flex justify-end items-center hover:cursor-pointer ml-auto" onClick={() => handleRead()}>
                    {marked && <IoIosCheckbox size="20px" />}
                    {!marked && <ImCheckboxUnchecked />}
                </div>
                <MdOutlineDeleteForever className="ml-2 hover:text-red-500 cursor-pointer" size="20px" />
            </div>
            <div class="flex flex-row gap-3 items-center">
                <p class="font-thin text-sm">{book.publishedOn}</p>
                <p className="text-xs font-medium">{book.author}</p>
            </div>
            <div class="mt-4">
                <p class="text-base text-wrap">{book.summary}</p>
            </div>
        </div>
    )
}
