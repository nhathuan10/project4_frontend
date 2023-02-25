import React from 'react'
import { NavLink } from 'react-router-dom'
import { BookModel } from '../../models/BookModel'

type Props = {
    book: BookModel | null
    mobile: boolean
}

export default function CheckoutAndReviewBox({ book, mobile }: Props) {
    return (
        <div className={mobile ? 'card d-flex mt-5' : 'card col-3 container d-flex mb-5'}>
            <div className='card-body container'>
                <div className='mt-3'>
                    <p>
                        <b>0/5 </b>
                        books checked out
                    </p>
                    <hr />
                    {book && book.copiesAvailable && book.copiesAvailable > 0 ?
                        <h4 className='text-success'>
                            Available
                        </h4>
                        :
                        <h4 className='text-danger'>
                            Wait List
                        </h4>
                    }
                    <div className='row'>
                        <p className='col-6 lead'>
                            <b>{book?.copies} </b>
                            copies
                        </p>
                        <p className='col-6 lead'>
                            <b>{book?.copiesAvailable} </b>
                            available
                        </p>
                    </div>
                </div>
                <NavLink to='/' className='btn btn-success btn-lg'>Sign in</NavLink>
                <hr />
                <p className='mt-3'>
                    This number can change until placing order has been complete.
                </p>
                <p>
                    Sign in to be able to leave a review.
                </p>
            </div>
        </div>
    )
}