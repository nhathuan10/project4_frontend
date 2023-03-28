import React from 'react'
import { useDispatch } from 'react-redux'
import { ReviewModel } from '../../models/ReviewModel'
import { DispatchType } from '../../redux/configStore'
import { deleteReviewApi } from '../../redux/ReviewReducer/reviewReducer'

type Props = {
    review: ReviewModel
}

export default function ReviewItem({ review }: Props) {
    const dispatch: DispatchType = useDispatch()
    const date = new Date(review.date)
    const longMonth = date.toLocaleDateString('en-us', { month: 'long' })
    const dateDay = date.getDate()
    const dateYear = date.getFullYear()
    const dateRender = longMonth + ' ' + dateDay + ', ' + dateYear

    const deleteReview = (id?: number) => {
        dispatch(deleteReviewApi(id))
    }

    return (
        <tr>
            <td>{review.id}</td>
            <td>{review.userEmail}</td>
            <td>{dateRender}</td>
            <td>{review.rating}</td>
            <td>{review.description}</td>
            <td>{review.bookTitle}</td>
            <td>
                <button className='btn btn-danger' onClick={() => deleteReview(review.id)}>Delete</button>
            </td>
        </tr>
    )
}