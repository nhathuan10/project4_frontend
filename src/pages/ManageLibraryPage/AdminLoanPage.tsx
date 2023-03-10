import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { DispatchType, RootState } from '../../redux/configStore'
import { getAllHistoriesApi, verifyBookReturnedApi } from '../../redux/HistoryReducer/historyReducer'

type Props = {}

export default function AdminLoanPage({ }: Props) {
    const { histories } = useSelector((state: RootState) => state.historyReducer)
    const { verifyResponse } = useSelector((state: RootState) => state.historyReducer)
    const dispatch: DispatchType = useDispatch()

    useEffect(() => {
        dispatch(getAllHistoriesApi())
    }, [verifyResponse])

    const verifyBookReturned = (id: number) => {
        dispatch(verifyBookReturnedApi(id))
    }

    return (
        <div className='mt-2 container'>
            {histories.length > 0 ?
                <>
                    <h3 className='mt-3'>All Book Returned History :</h3>
                    {histories.map(history => (
                        <div key={history.id}>
                            <div className='card mt-3 shadow p-3 mb-3 bg-body rounded'>
                                <div className='row g-0'>
                                    <div className='col-md-2 mx-4 my-2'>
                                        <div className='d-none d-lg-block'>
                                            {history.img ?
                                                <img src={history.img} width='130' height='200' alt='Book' />
                                                :
                                                <img src={require('../../assets/img/BooksImages/book_0.png')}
                                                    width='130' height='200' alt='Default' />
                                            }
                                        </div>
                                        <div className='d-lg-none d-flex justify-content-center align-items-center'>
                                            {history.img ?
                                                <img src={history.img} width='130' height='200' alt='Book' />
                                                :
                                                <img src={require('../../assets/img/BooksImages/book_0.png')}
                                                    width='130' height='200' alt='Default' />
                                            }
                                        </div>
                                    </div>
                                    <div className='col'>
                                        <div className='card-body'>
                                            <h5 className='card-title'>Author: {history.author} </h5>
                                            <h4>Title: {history.title}</h4>
                                            <h6>Customer Email: {history.userEmail}</h6>
                                            <p className='card-text'>{history.description}</p>
                                            <hr />
                                            <p className='card-text'> Checked out on: {history.checkoutDate}</p>
                                            <p className='card-text'> Returned on: {history.returnedDate}</p>
                                            <button className='btn btn-danger' onClick={() => verifyBookReturned(history.id)}>Confirm Book Returned</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <hr />
                        </div>
                    ))}
                </>
                :
                <>
                    <h3 className='mt-3'>Currently no history: </h3>
                    <Link className='btn btn-primary' to={'search'}>
                        Search for new book
                    </Link>
                </>
            }
        </div>
    )
}