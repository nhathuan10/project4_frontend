import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import StarReview from '../../components/StarReview'
import { ReviewRequest } from '../../models/ReviewModel'
import { DispatchType, RootState } from '../../redux/configStore'
import { leaveReviewtApi } from '../../redux/ReviewReducer/reviewReducer'

type Props = {}

export default function LeaveAReview({ }: Props) {
    const { book } = useSelector((state: RootState) => state.bookReducer)
    const dispatch: DispatchType = useDispatch()
    const [starInput, setStarInput] = useState(0)
    const [displayInput, setDisplayInput] = useState(false)
    const [reviewDescription, setReviewDescription] = useState('')

    const starValue = (value: number) => {
        setStarInput(value)
        setDisplayInput(true)
    }

    const submitReview = () => {
        const review: ReviewRequest = { rating: starInput, description: reviewDescription }
        dispatch(leaveReviewtApi(review, book?.id))
    }

    return (
        <div className='dropdown' style={{ cursor: 'pointer' }}>
            <h5 className='dropdown-toggle' id='dropdownMenuButton1' data-bs-toggle='dropdown'>
                Leave a review ?
            </h5>
            <ul id='submitReviewRating' className='dropdown-menu' aria-labelledby='dropdownMenuButton1'>
                <li><button onClick={() => starValue(0)} className='dropdown-item'>0 star</button></li>
                <li><button onClick={() => starValue(0.5)} className='dropdown-item'>0.5 star</button></li>
                <li><button onClick={() => starValue(1)} className='dropdown-item'>1 star</button></li>
                <li><button onClick={() => starValue(1.5)} className='dropdown-item'>1.5 star</button></li>
                <li><button onClick={() => starValue(2)} className='dropdown-item'>2 star</button></li>
                <li><button onClick={() => starValue(2.5)} className='dropdown-item'>2.5 star</button></li>
                <li><button onClick={() => starValue(3)} className='dropdown-item'>3 star</button></li>
                <li><button onClick={() => starValue(3.5)} className='dropdown-item'>3.5 star</button></li>
                <li><button onClick={() => starValue(4)} className='dropdown-item'>4 star</button></li>
                <li><button onClick={() => starValue(4.5)} className='dropdown-item'>4.5 star</button></li>
                <li><button onClick={() => starValue(5)} className='dropdown-item'>5 star</button></li>
            </ul>
            <StarReview rating={starInput} size={32} />
            {displayInput &&
                <form action="#" method='post'>
                    <hr />
                    <div className='mb-3'>
                        <label className='form-label'>Description</label>
                        <textarea
                            className='form-control'
                            id='submitReviewDescription'
                            placeholder='Optional'
                            rows={3}
                            onChange={e => setReviewDescription(e.target.value)}>
                        </textarea>
                    </div>
                    <div>
                        <button type='button' onClick={submitReview} className='btn main-color btn-dark mt-1'>Submit Review</button>
                    </div>
                </form>
            }
        </div>
    )
}