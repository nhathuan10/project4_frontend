import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Pagination2 from '../../components/Pagination2'
import { ReviewModel } from '../../models/ReviewModel'
import { DispatchType, RootState } from '../../redux/configStore'
import { getAllReviewsApi, getReviewsByUserEmailApi } from '../../redux/ReviewReducer/reviewReducer'
import ReviewItem from './ReviewItem'

type Props = {}

export default function AdminReviewPage({ }: Props) {
    const { allReviews } = useSelector((state: RootState) => state.reviewReducer)
    const { reviewsByUserEmail } = useSelector((state: RootState) => state.reviewReducer)
    const { flash } = useSelector((state: RootState) => state.reviewReducer)
    const dispatch: DispatchType = useDispatch()
    const [userEmail, setUserEmail] = useState('')
    const [currentPage, setCurrentPage] = useState(1)
    const [totalPages, setTotalPages] = useState<any>(0)
    const [totalAmountOfReviews, setTotalAmountOfReviews] = useState<any>(0)
    const [reviewsPerPage] = useState(4)

    const indexOfLastReview: number = currentPage * reviewsPerPage
    const indexOfFirstReview: number = indexOfLastReview - reviewsPerPage
    let lastItem = reviewsPerPage * currentPage <= totalAmountOfReviews ? reviewsPerPage * currentPage : totalAmountOfReviews
    const paginate = (pageNumber: number) => setCurrentPage(pageNumber)

    useEffect(() => {
        dispatch(getAllReviewsApi(currentPage - 1, 8))
    }, [currentPage, flash])

    useEffect(() => {
        setTotalAmountOfReviews(allReviews?.totalElements)
        setTotalPages(allReviews?.totalPages)
    }, [currentPage, allReviews])

    useEffect(() => {
        if (userEmail != '') {
            dispatch(getReviewsByUserEmailApi(userEmail))
        }
    }, [userEmail])
    console.log(reviewsByUserEmail)

    const renderAllReviews = () => {
        return allReviews?.content.map((review: ReviewModel, index: number) => (
            <ReviewItem review={review} key={index} />
        ))
    }

    const renderReviewsByUserEmail = () => {
        return reviewsByUserEmail.map((review: ReviewModel, index: number) => (
            <ReviewItem review={review} key={index} />
        ))
    }

    return (
        <div className='container'>
            <h2 className='text-center my-3'>All Reviews</h2>
            <input
                className='form-control w-25 my-2 custom-input'
                type='search'
                placeholder='Search By User Email'
                aria-label='Search'
                onChange={e => setUserEmail(e.target.value)}
                value={userEmail}
            />
            {userEmail == '' &&
                <>
                    <h5>Number of results: {totalAmountOfReviews}</h5>
                    <p>{indexOfFirstReview + 1} to {lastItem} of {totalAmountOfReviews} items:</p>
                </>
            }
            <table className="table table-striped table-hover">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">User Email</th>
                        <th scope="col">Date</th>
                        <th scope="col">Rating</th>
                        <th scope="col">Description</th>
                        <th scope="col">Book Title</th>
                        <td></td>
                    </tr>
                </thead>
                <tbody>
                    {userEmail != '' ? renderReviewsByUserEmail() : renderAllReviews()}
                </tbody>
            </table>
            {totalPages > 1 && userEmail == '' &&
                <Pagination2 currentPage={currentPage} totalPages={totalPages} paginate={paginate} />
            }
        </div>
    )
}