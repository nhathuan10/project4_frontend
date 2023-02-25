import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import Review from '../../components/Review'
import { RootState } from '../../redux/configStore'

type Props = {
    mobile: boolean
}

export default function LatestReviews({ mobile }: Props) {
    const { book } = useSelector((state: RootState) => state.bookReducer)
    const { reviews } = useSelector((state: RootState) => state.bookReducer)

    return (
        <div className={mobile ? 'mt-3' : 'row mt-5'}>
            <div className={mobile ? '' : 'col-sm-2 col-md-2'}>
                <h2>Latest Reviews: </h2>
            </div>
            <div className='col-sm-10 col-md-10'>
                {reviews.length > 0 ?
                    <>
                        {reviews.slice(0, 3).map(review => (
                            <Review review={review} key={review.id}></Review>
                        ))}
                        <div className='my-2'>
                            <Link to={`/reviewlist/${book?.id}`} type='button' className='btn btn-secondary main-color btn-md text-white'>Reach All Reviews</Link>
                        </div>
                    </> :
                    <div className='m-3'>
                        <p className='lead'>Currently no reviews for this book</p>
                    </div>
                }
            </div>
        </div>
    )
}