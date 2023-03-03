import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, NavLink } from 'react-router-dom'
import { BookModel } from '../../models/BookModel'
import { checkoutBookApi, currentLoansCountApi, isBookCheckoutByUserApi } from '../../redux/CheckoutReducer/checkoutReducer'
import { DispatchType, RootState } from '../../redux/configStore'

type Props = {
    mobile: boolean
}

export default function CheckoutAndReviewBox({ mobile }: Props) {
    const { currentLoansCount } = useSelector((state: RootState) => state.checkoutReducer)
    const { book } = useSelector((state: RootState) => state.bookReducer)
    const { checkOuts } = useSelector((state: RootState) => state.checkoutReducer)
    const { isBookCheckoutByUser } = useSelector((state: RootState) => state.checkoutReducer)
    const { userLogin } = useSelector((state: RootState) => state.userReducer)
    const dispatch: DispatchType = useDispatch()

    useEffect(() => {
        dispatch(currentLoansCountApi())
    }, [checkOuts])

    useEffect(() => {
        dispatch(isBookCheckoutByUserApi(book?.id))
    }, [book])

    const checkoutBook = () => {
        dispatch(checkoutBookApi(book?.id))
    }

    console.log(checkOuts)
    console.log(isBookCheckoutByUser)

    const buttonRender = () => {
        if (userLogin) {
            if (!isBookCheckoutByUser && currentLoansCount < 5) {
                return (
                    <button
                        className='btn btn-success btn-lg'
                        onClick={checkoutBook}
                    >
                        Checkout
                    </button>
                )
            } else if (isBookCheckoutByUser) {
                return (
                    <p><b>Book checked out. Enjoy!</b></p>
                )
            } else if (!isBookCheckoutByUser) {
                return (
                    <p className='text-danger'>Too many books checked out</p>
                )
            }
        }
    }

    return (
        <div
            className={mobile ? 'card d-flex mt-5' : 'card col-3 container d-flex mb-5'}
            style={{ backgroundColor: '#AAFFFF' }}
        >
            <div className='card-body container'>
                <div className='mt-3'>
                    <p>
                        <b>{currentLoansCount}/5 </b>
                        books checked out
                    </p>
                    <hr />
                    {book && book.copiesAvailable && book.copiesAvailable > 0 ?
                        <h4 className='text-success'>Available</h4> :
                        <h4 className='text-danger'>Wait List</h4>
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
                {buttonRender()}
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