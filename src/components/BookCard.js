import React from 'react';
import { Link } from 'react-router-dom';
import { FaBook } from "react-icons/fa";
import { ImCheckboxUnchecked } from "react-icons/im";


export function BookCard({ book }) {
    return (
        <div class="w-full bg-slate-200 p-3 rounded-3xl min-h-max min-w-80 max-w-80">
            <div class="flex flex-row justify-start items-center flex-wrap gap-1">
                <FaBook />
                <p class="text-lg text-center rounded-lg font-semibold text-gray-800 p-1 hover:bg-yellow-500">{book.title}</p>
                <ImCheckboxUnchecked class="absolute items-end" />
            </div>
            <div class="flex flex-row gap-3 items-center">
                <p class="font-thin text-sm">{book.publishedOn}</p>
                <p className="text-xs font-medium">{book.author}</p>
            </div>
            <div class="mt-4">
                <p class="text-base text-wrap text-gray-800">{book.summary}</p>
            </div>
        </div>
    )
}
