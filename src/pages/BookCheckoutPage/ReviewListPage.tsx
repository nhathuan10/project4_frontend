import React from 'react'
import { useSelector } from 'react-redux'
import Review from '../../components/Review'
import { RootState } from '../../redux/configStore'

type Props = {}

export default function ReviewListPage({ }: Props) {
    const { reviews } = useSelector((state: RootState) => state.bookReducer)

    return (
        <div className='container mt-5'>
            <h3 className='text-primary fw-bold my-3'>Comments: ({reviews.length})</h3>
            <div className='row'>
                {reviews.map(review => (
                    <Review review={review} key={review.id} />
                ))}
            </div>
        </div>
    )
}