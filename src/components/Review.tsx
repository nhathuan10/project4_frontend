import React from 'react'

type Props = {}

export default function Review({ }: Props) {
    const date = new Date(review.date)
    const longMonth = date.toLocaleDateString('en-us', { month: 'long' })
    const dateDay = date.getDate()
    const dateYear = date.getFullYear()
    const dateRender = longMonth + ' ' + dateDay + ', ' + dateYear

    return (
        <div>
            <div className='com-sm-8 col-md-8'>
                <h5>{review.userEmail}</h5>
                <div className='row'>
                    <div className='col'>
                        {dateRender}
                    </div>
                    <div className='col'>
                        <StarsReview rating={review.rating} size={16} />
                    </div>
                </div>
                <div className='mt-2'>
                    <p>{review.reviewDescription}</p>
                </div>
            </div>
            <hr />
        </div>
    )
}