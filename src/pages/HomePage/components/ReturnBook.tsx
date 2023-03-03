import React from 'react'
import { BookModel } from '../../../models/BookModel'

type Props = {
    book?: BookModel
    bookImg?: string
}

export default function ReturnBook({ book, bookImg }: Props) {
    return (
        <div className='col-xs-6 col-sm-6 col-md-4 col-lg-3 mb-3'>
            <div className='text-center'>
                <img
                    src={book ? book.img : require(`../../../assets/img/BooksImages/${bookImg}.png`)}
                    alt="..."
                    width='160'
                    height='240' />
                <h6 className='mt-2'>{book?.title}</h6>
                <p>{book?.author}</p>
                <a className='btn btn-secondary main-color text-white'>Reserve</a>
            </div>
        </div>
    )
}