import React from 'react'
import { NavLink } from 'react-router-dom'
import { BookModel } from '../../../models/BookModel'

type Props = {
    book: BookModel
}

export default function SearchBook({ book }: Props) {
    return (
        <div className='card mt-3 shadow p-3 mb-3 bg-body rounded'>
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
                        <h4>{book.title}</h4>
                        <h5 className='card-title'>{book.author}</h5>
                        <p className='card-text'>{book.description}</p>
                        <p>Category: <span className='fw-bold'>{book.categoryName}</span></p>
                    </div>
                </div>
                <div className='col-md-4 d-flex justify-content-center align-items-center'>
                    <NavLink to={`/checkout/3`} className='btn btn-md btn-secondary main-color text-white'>View Details</NavLink>
                </div>
            </div>
        </div>
    )
}