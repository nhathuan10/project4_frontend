import React from 'react'
import { useDispatch } from 'react-redux'
import { ShelfCurrentLoanModel } from '../../../models/ShelfCurrentLoanModel'
import { renewLoanApi, returnBookApi } from '../../../redux/CheckoutReducer/checkoutReducer'
import { DispatchType } from '../../../redux/configStore'

type Props = {
    mobile: boolean
    shelfCurrentLoan: ShelfCurrentLoanModel
}

export default function LoanModal({ mobile, shelfCurrentLoan }: Props) {
    const dispatch: DispatchType = useDispatch()

    const returnBook = () => {
        dispatch(returnBookApi(shelfCurrentLoan.book.id))
    }

    const renewLoan = () => {
        dispatch(renewLoanApi(shelfCurrentLoan.book.id))
    }

    return (
        <div className='modal fade mt-5' id={mobile ? `mobilemodal${shelfCurrentLoan.book.id}` : `modal${shelfCurrentLoan.book.id}`}
            data-bs-backdrop='static' data-bs-keyboard='false' aria-labelledby='staticBackdropLabel'
            aria-hidden='true' key={shelfCurrentLoan.book.id}
        >
            <div className='modal-dialog'>
                <div className='modal-content'>
                    <div className='modal-header' style={{ backgroundColor: '#C2F003' }}>
                        <h5 className='modal-title' id='staticBackdropLabel'>Loans Options</h5>
                        <button type='button' className='btn-close' data-bs-dismiss='modal' aria-label='Close'></button>
                    </div>
                    <div className='modal-body'>
                        <div className='container'>
                            <div className='mt-3'>
                                <div className='row'>
                                    <div className='col-2'>
                                        {shelfCurrentLoan.book.img ?
                                            <img src={shelfCurrentLoan.book.img} alt="Book" width='60' height='90' /> :
                                            <img src={require('../../../assets/img/BooksImages/book_0.png')}
                                                alt="Book" width='60' height='90' />
                                        }
                                    </div>
                                    <div className='col-10'>
                                        <h6>{shelfCurrentLoan.book.author}</h6>
                                        <h4>{shelfCurrentLoan.book.title}</h4>
                                    </div>
                                </div>
                                <hr />
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
                                    <button onClick={returnBook} data-bs-dismiss='modal'
                                        className='list-group-item list-group-item-action ' aria-current='true'
                                    >
                                        Return Book
                                    </button>
                                    <button
                                        data-bs-dismiss='modal'
                                        className={shelfCurrentLoan.daysLeft < 0 ? 'list-group-item list-group-item-action inactiveLink' :
                                            'list-group-item list-group-item-action'}
                                        onClick={shelfCurrentLoan.daysLeft < 0 ? (e) => e.preventDefault() : renewLoan}
                                    >
                                        {shelfCurrentLoan.daysLeft < 0 ? 'Late dues cannot be renewed' : 'Renew loan for 8 days'}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='modal-footer'>
                        <button type='button' className='btn btn-secondary' data-bs-dismiss='modal'>Close</button>
                    </div>
                </div>
            </div>
        </div>
    )
}