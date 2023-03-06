import React from 'react'
import { ReviewModel } from '../models/ReviewModel'
import StarReview from './StarReview'

type Props = {
    review: ReviewModel 
}

export default function Review({ review }: Props) {

    const date = new Date(review.date)
    const longMonth = date.toLocaleDateString('en-us', { month: 'long' })
    const dateDay = date.getDate()
    const dateYear = date.getFullYear()
    const dateRender = longMonth + ' ' + dateDay + ', ' + dateYear

    return (
        <div>
            <div className='col-sm-8 col-md-8'>
                <h5>{review.userEmail}</h5>
                <div className='row'>
                    <div className='col'>
                        {dateRender}
                    </div>
                    <div className='col'>
                        <StarReview rating={review.rating} size={16} />
                    </div>
                </div>
                <div className='mt-2'>
                    <p className='fst-italic text-dark'>{review.description}</p>
                </div>
            </div>
            <hr />
        </div>
    )
}