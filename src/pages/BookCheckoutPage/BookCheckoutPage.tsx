import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { DispatchType, RootState } from '../../redux/configStore'
import { getBookByIdApi } from '../../redux/BookReducer/bookReducer'
import StarReview from '../../components/StarReview'
import CheckoutAndReviewBox from './CheckoutAndReviewBox'
import { ReviewModel } from '../../models/ReviewModel'

type Props = {}

export default function BookCheckoutPage({ }: Props) {
    const { book } = useSelector((state: RootState) => state.bookReducer)
    const dispatch: DispatchType = useDispatch()
    const { id } = useParams() as any
    const [totalStars, setTotalStars] = useState(0)
    const { reviews } = useSelector((state: RootState) => state.bookReducer)

    useEffect(() => {
        dispatch(getBookByIdApi(id))
    }, [])

    useEffect(() => {
        let weightedStarReviews = 0
        if (reviews) {
            for (const item of reviews) {
                weightedStarReviews += item.rating
            }
            const round = (Math.round((weightedStarReviews / reviews.length) * 2) / 2).toFixed(1)
            setTotalStars(Number(round))
        }
    })

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
                            <StarReview rating={totalStars} size={20} />
                        </div>
                    </div>
                    <CheckoutAndReviewBox book={book} mobile={false} />
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
                        <StarReview rating={2} size={20} />
                    </div>
                </div>
                <CheckoutAndReviewBox book={book} mobile={true} />
                <hr />
            </div>
        </div>
    )
}