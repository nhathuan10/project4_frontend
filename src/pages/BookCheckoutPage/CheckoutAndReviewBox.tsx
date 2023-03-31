import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { checkoutBookApi, currentLoansCountApi, isBookCheckoutByUserApi } from '../../redux/CheckoutReducer/checkoutReducer'
import { DispatchType, RootState } from '../../redux/configStore'
import { isReviewLeftApi } from '../../redux/ReviewReducer/reviewReducer'
import LeaveAReview from './LeaveAReview'

type Props = {
    mobile: boolean
}

export default function CheckoutAndReviewBox({ mobile }: Props) {
    const { currentLoansCount } = useSelector((state: RootState) => state.checkoutReducer)
    const { book } = useSelector((state: RootState) => state.bookReducer)
    const { checkOuts } = useSelector((state: RootState) => state.checkoutReducer)
    const { isBookCheckoutByUser } = useSelector((state: RootState) => state.checkoutReducer)
    const { userLogin } = useSelector((state: RootState) => state.userReducer)
    const { isReviewLeft } = useSelector((state: RootState) => state.reviewReducer)
    const { reviewResponse } = useSelector((state: RootState) => state.reviewReducer)

    const dispatch: DispatchType = useDispatch()

    useEffect(() => {
        dispatch(currentLoansCountApi())
    }, [checkOuts, isBookCheckoutByUser])

    useEffect(() => {
        dispatch(isBookCheckoutByUserApi(book?.id))
    }, [book, checkOuts])

    useEffect(() => {
        dispatch(isReviewLeftApi(book?.id))
    }, [book, reviewResponse])

    const checkoutBook = () => {
        dispatch(checkoutBookApi(book?.id))
    }

    const buttonRender = () => {
        if (userLogin) {
            if (!isBookCheckoutByUser && currentLoansCount < 5) {
                return (
                    <div className='text-center mt-3'>
                        <button
                            className='btn btn-success'
                            onClick={checkoutBook}
                        >
                            Borrow
                        </button>
                    </div>
                )
            } else if (isBookCheckoutByUser) {
                return (
                    <p className='text-center mt-2'><b>Book checked out. Enjoy!</b></p>
                )
            } else if (!isBookCheckoutByUser) {
                return (
                    <p className='text-danger text-center'>Too many books checked out</p>
                )
            }
        }
    }

    const reviewRender = () => {
        if (userLogin) {
            if (isReviewLeft) {
                return (
                    <p><b>Thank you for your review</b></p>
                )
            } else {
                return (
                    <LeaveAReview />
                )
            }
        }
    }

    return (
        <div className={mobile ? 'card d-flex mt-5' : 'card col-3 container d-flex mb-5 rounded-3 checkout-box'}>
            <div className='card-body container'>
                <div className='mt-3 text-center'>
                    {currentLoansCount == 0 || currentLoansCount == 1 ?
                        <p>
                            <b>{currentLoansCount}/5 </b>
                            book borrowed
                        </p> :
                        <p>
                            <b>{currentLoansCount}/5 </b>
                            books borrowed
                        </p>
                    }
                    <hr />
                    {book && book.copiesAvailable && book.copiesAvailable > 0
                        ?
                        <h4 className='text-success'>Available</h4>
                        :
                        <h4 className='text-danger'>Wait List</h4>
                    }
                    <b>{book?.copiesAvailable}</b> <span className='fst-italic'>copies available</span>
                </div>
                {buttonRender()}
                <hr />
                <p className='mt-3'>
                    This number can change until placing order has been complete.
                </p>
                {reviewRender()}
            </div>
        </div>
    )
}