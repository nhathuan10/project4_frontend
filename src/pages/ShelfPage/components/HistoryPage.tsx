import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { DispatchType, RootState } from '../../../redux/configStore'
import { getAllHistoriesByUserApi } from '../../../redux/HistoryReducer/historyReducer'

type Props = {}

export default function HistoryPage({ }: Props) {
    const { historiesByUser } = useSelector((state: RootState) => state.historyReducer)
    const { returnOrRenewResponse } = useSelector((state: RootState) => state.checkoutReducer)
    const dispatch: DispatchType = useDispatch()

    useEffect(() => {
        dispatch(getAllHistoriesByUserApi())
    }, [returnOrRenewResponse])

    return (
        <div className='mt-2'>
            {historiesByUser.length > 0 ?
                <>
                    <h3 className='my-3'>Recent History:</h3>
                    {historiesByUser.map(history => (
                        <div key={history.id}>
                            <div className='card mt-3 shadow p-3 mb-3 loan-box rounded'>
                                <div className='row g-0'>
                                    <div className='col-md-2 mx-4 my-2'>
                                        <div className='d-none d-lg-block'>
                                            {history.img ?
                                                <img src={history.img} width='130' height='200' alt='Book' />
                                                :
                                                <img src={require('../../../assets/img/BooksImages/book_0.png')}
                                                    width='130' height='200' alt='Default' />
                                            }
                                        </div>
                                        <div className='d-lg-none d-flex justify-content-center align-items-center'>
                                            {history.img ?
                                                <img src={history.img} width='130' height='200' alt='Book' />
                                                :
                                                <img src={require('../../../assets/img/BooksImages/book_0.png')}
                                                    width='130' height='200' alt='Default' />
                                            }
                                        </div>
                                    </div>
                                    <div className='col'>
                                        <div className='card-body'>
                                            <h5 className='card-title'> {history.author} </h5>
                                            <h4>{history.title}</h4>
                                            <p className='card-text'>{history.description}</p>
                                            <hr />
                                            <p className='card-text'> Checked out on: {history.checkoutDate}</p>
                                            <p className='card-text'> Returned on: {history.returnedDate}</p>
                                            {history.verified ?
                                                <p className='text-success fst-italic fw-bold'>Book returned successfully !</p>
                                                :
                                                <p className='text-danger fst-italic fw-bold'>Waiting for verification !</p>
                                            }
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
                    <Link className='btn btn-primary' to={'/search-books'}>
                        Search for new book
                    </Link>
                </>
            }
        </div>
    )
}