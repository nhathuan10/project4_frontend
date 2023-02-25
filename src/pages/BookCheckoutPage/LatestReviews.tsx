import React from 'react'
import { ReviewModel } from '../../models/ReviewModel'

// type Props = {
//     reviews: ReviewModel[]
//     mobile: boolean
// }

export default function LatestReviews({ mobile }: Props) {
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
                        <div className='m-3'>
                            <Link to={`/reviewlist/${bookId}`} type='button' className='btn main-color btn-md text-white'>Reach All Reviews</Link>
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