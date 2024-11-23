import React from 'react'
import { Link } from 'react-router-dom'

export function BookCard({ book }) {
    return (
        <Link to={`/books/${book.id}`} class="book__item">
            <div class="book__header">
                <p class="book_title">{book.title.substring(0, 15)}</p>
            </div>
            <div class="book__body">
                <p><i class="bi bi-geo"></i> {book.summary.substring(0, 20)}</p>
                <p><i class="bi bi-telephone"></i> {book.publishedOn}</p>
                <p><i class="bi bi-telephone"></i> {book.author}</p>
            </div>
        </Link>
    )
}
