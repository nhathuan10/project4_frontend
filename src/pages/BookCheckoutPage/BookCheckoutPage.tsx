import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { DispatchType, RootState } from '../../redux/configStore'
import { getBookByIdApi } from '../../redux/BookReducer/bookReducer'
import StarReview from '../../components/StarReview'

type Props = {}

export default function BookCheckoutPage({ }: Props) {
    const book = useSelector((state: RootState) => state.bookReducer.book)
    const dispatch: DispatchType = useDispatch()
    const { id } = useParams() as any

    useEffect(() => {
        dispatch(getBookByIdApi(id))
    }, [])

    return (
        <div>
            <div className='container d-none d-lg-block'>
                <div className='row mt-5'>
                    <div className='col-sm-2 col-md-2'>
                        {book?.img &&
                            <img src={book?.img} width='220' height='350' alt='Book' />
                        }
                    </div>
                    <div className='col-4 col-md-4 container'>
                        <div className='ml-2'>
                            <h2>{book?.title}</h2>
                            <h5 className='text-primary'>{book?.author}</h5>
                            <p className='lead'>{book?.description}</p>
                            <StarReview rating={3.5} size={20}/>
                        </div>
                    </div>
                </div>
                <hr />
            </div>
            <div className='container d-lg-none mt-5'>
                <div className='d-flex justify-content-center align-items-center'>
                    {book?.img &&
                        <img src={book?.img} width='220' height='350' alt='Book' />
                    }
                </div>
                <div className='mt-4'>
                    <div className='ml-2'>
                        <h2>{book?.title}</h2>
                        <h5 className='text-primary'>{book?.author}</h5>
                        <p className='lead'>{book?.description}</p>
                        <StarReview rating={2} size={20}/>
                    </div>
                </div>
                <hr />
            </div>
        </div>
    )
}