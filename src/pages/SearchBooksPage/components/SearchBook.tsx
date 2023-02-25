import React from 'react'
import { NavLink } from 'react-router-dom'
import { BookModel } from '../../../models/BookModel'

type Props = {
    book: BookModel
}

export default function SearchBook({ book }: Props) {
    return (
        <div className='card shadow p-3 m-4 book-item'>
            <div className='row g-0'>
                <div className='col-md-2'>
                    <div className='d-none d-lg-block'>
                        {book.img &&
                            <img src={book.img} width='150' height='220' alt='book' />
                        }
                    </div>
                    <div className='d-lg-none d-flex justify-content-center align-items-center'>
                        {book.img &&
                            <img src={book.img} width='150' height='220' alt='book' />
                        }
                    </div>
                </div>
                <div className='col-md-6'>
                    <div className='card-body'>
                        <h4>Title: <span className='fw-bold text-main-color'>{book.title}</span></h4>
                        <h5>Author: <span className='fw-bold text-main-color'>{book.author}</span></h5>
                        <p>Description: <span className='fst-italic'>{book.description}</span></p>
                        <p>Category: <span className='fw-bold text-main-color'>{book.categoryName}</span></p>
                    </div>
                </div>
                <div className='col-md-4 d-flex justify-content-center align-items-center'>
                    <NavLink to={`/checkout/${book.id}`} className='btn btn-md btn-secondary main-color text-white'>View Details</NavLink>
                </div>
            </div>
        </div>
    )
}