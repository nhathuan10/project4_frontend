import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { currentLoansApi } from '../../../redux/CheckoutReducer/checkoutReducer'
import { DispatchType, RootState } from '../../../redux/configStore'
import LoanModal from './LoanModal'

type Props = {}

export default function Loans({ }: Props) {
    const { shelfCurrentLoans } = useSelector((state: RootState) => state.checkoutReducer)
    const dispatch: DispatchType = useDispatch()
    const { returnOrRenewResponse } = useSelector((state: RootState) => state.checkoutReducer)

    useEffect(() => {
        dispatch(currentLoansApi())
    }, [returnOrRenewResponse])

    return (
        <div>
            {/* desktop */}
            <div className='d-none d-lg-block mt-2'>
                {shelfCurrentLoans.length > 0 ?
                    <>
                        <h3 className='text-center mb-5 mt-3 text-dark'>Current Loans: </h3>
                        {shelfCurrentLoans.map(shelfCurrentLoan => (
                            <div key={shelfCurrentLoan.book.id}>
                                <div className='row mt-3 mb-3'>
                                    <div className='col-4 col-md-4 container shelf-book-container'>
                                        {shelfCurrentLoan.book.img ?
                                            <img src={shelfCurrentLoan.book.img} className='shelf-book-picture' width='240' height='360' alt="Book" /> :
                                            <img src={require('../../../assets/img/BooksImages/book_0.png')} className='shelf-book-picture' width='240' height='360' alt="Book" />
                                        }
                                    </div>
                                    <div className='card col-3 col-md-3 container d-flex'>
                                        <div className='card-body'>
                                            <div className='mt-3'>
                                                <h4>Loan Options</h4>
                                                {shelfCurrentLoan.daysLeft > 0 &&
                                                    <p className='text-secondary'>
                                                        Due in {shelfCurrentLoan.daysLeft} days
                                                    </p>
                                                }
                                                {shelfCurrentLoan.daysLeft === 0 &&
                                                    <p className='text-sucess'>Due today</p>
                                                }
                                                {shelfCurrentLoan.daysLeft < 0 &&
                                                    <p className='text-danger'>Past due by {shelfCurrentLoan.daysLeft} days</p>
                                                }
                                                <div className='list-group mt-3'>
                                                    <button className='list-group-item list-group-item-action'
                                                        aria-current='true' data-bs-toggle='modal' data-bs-target={`#modal${shelfCurrentLoan.book.id}`}
                                                    >
                                                        Manage Loan
                                                    </button>
                                                    {/* <p className='text-danger'>Waiting for Verification</p> */}
                                                    <Link to='search' className='list-group-item list-group-item-action'>Search more books?</Link>
                                                </div>
                                            </div>
                                            <hr />
                                            <p className='mt-3'>Help other find their adventure by reviewing your loan</p>
                                            <Link className='btn btn-success' to={`/checkout/${shelfCurrentLoan.book.id}`}>Leave a review</Link>
                                        </div>
                                    </div>
                                </div>
                                <hr />
                                <LoanModal shelfCurrentLoan={shelfCurrentLoan} mobile={false} />
                            </div>
                        ))}
                    </> :
                    <>
                        <h3 className='mt-3'>Currently no loans</h3>
                        <Link className='btn btn-primary' to='/search-books'>Search for a new book</Link>
                    </>
                }
            </div>
            {/* mobile */}
            <div className='container d-lg-none mt-2'>
                {shelfCurrentLoans.length > 0 ?
                    <>
                        <h5 className='mb-3'>Current Loans: </h5>
                        {shelfCurrentLoans.map(shelfCurrentLoan => (
                            <div key={shelfCurrentLoan.book.id}>
                                <div className='d-flex justify-content-center align-items-center'>
                                    {shelfCurrentLoan.book.img ?
                                        <img src={shelfCurrentLoan.book.img} className='shelf-book-picture' width='240' height='360' alt="Book" /> :
                                        <img src={require('../../../assets/img/BooksImages/book_0.png')} width='226' height='349' alt="Book" />
                                    }
                                </div>
                                <div className='card d-flex mb-3 mt-5'>
                                    <div className='card-body container'>
                                        <div className='mt-3'>
                                            <h4>Loan Options</h4>
                                            {shelfCurrentLoan.daysLeft > 0 &&
                                                <p className='text-secondary'>
                                                    Due in {shelfCurrentLoan.daysLeft} days
                                                </p>
                                            }
                                            {shelfCurrentLoan.daysLeft === 0 &&
                                                <p className='text-sucess'>Due today</p>
                                            }
                                            {shelfCurrentLoan.daysLeft < 0 &&
                                                <p className='text-danger'>Past due by {shelfCurrentLoan.daysLeft} days</p>
                                            }
                                            <div className='list-group mt-3'>
                                                <button className='list-group-item list-group-item-action'
                                                    aria-current='true' data-bs-toggle='modal' data-bs-target={`#mobilemodal${shelfCurrentLoan.book.id}`}
                                                >
                                                    Manage Loan
                                                </button>
                                                <Link to='search' className='list-group-item list-group-item-action'>Search more books?</Link>
                                            </div>
                                        </div>
                                        <hr />
                                        <p className='mt-3'>Help other find their adventure by reviewing your loan</p>
                                        <Link className='btn btn-primary' to={`/checkout/${shelfCurrentLoan.book.id}`}>Leave a review</Link>
                                    </div>
                                </div>
                                <hr />
                                <LoanModal shelfCurrentLoan={shelfCurrentLoan} mobile={true} />
                            </div>
                        ))}
                    </> :
                    <>
                        <h3 className='mt-3'>Currently no loans</h3>
                        <Link className='btn btn-primary' to='search'>Search for a new book</Link>
                    </>
                }
            </div>
        </div>
    )
}