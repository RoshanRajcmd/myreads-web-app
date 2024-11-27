import React from 'react'
import { Link } from 'react-router-dom'

export function BookCard({ book }) {
    return (
        <Link to={`/books/${book.id}`} class="w-full bg-slate-200 p-3 rounded-3xl cursor-pointer min-h-max">
            <div class="flex flex-row justify-start items-center flex-wrap gap-3">
                <i class="fa fa-solid fa-book"></i>
                <p class="text-lg bg-slate-100 text-center rounded-lg font-semibold p-1">{book.title.substring(0, 15)}</p>
                <p className="contact_title">{book.author}</p>
            </div>
            <div class="mt-4">
                <p class="text-base text-wrap">{book.summary.substring(0, 20)}</p>
                <p class="font-thin text-sm">{book.publishedOn}</p>
            </div>
        </Link>
    )
}
