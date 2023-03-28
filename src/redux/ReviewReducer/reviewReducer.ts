import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { ReviewModel } from '../../models/ReviewModel';
import { ReviewResponse } from '../../models/ReviewResponse';
import { http } from '../../utils/config';
import { DispatchType } from '../configStore';

export type ReviewState = {
    isReviewLeft: boolean | null
    reviewResponse: ReviewModel | null
    allReviews: ReviewResponse | null
    flash: boolean
}

const initialState: ReviewState = {
    isReviewLeft: null,
    reviewResponse: null,
    allReviews: null,
    flash: false
}

const reviewReducer = createSlice({
    name: 'reviewReducer',
    initialState,
    reducers: {
        isReviewLeftAction: (state: ReviewState, action: PayloadAction<boolean>) => {
            state.isReviewLeft = action.payload
        },
        leaveReviewAction: (state: ReviewState, action: PayloadAction<ReviewModel>) => {
            state.reviewResponse = action.payload
        },
        getAllReviewsAction: (state: ReviewState, action: PayloadAction<ReviewResponse>) => {
            state.allReviews = action.payload
        },
        deleteReviewAction: (state: ReviewState) => {
            state.flash = !state.flash
        },
    }
});

export const {
    isReviewLeftAction,
    leaveReviewAction,
    getAllReviewsAction,
    deleteReviewAction
} = reviewReducer.actions

export default reviewReducer.reducer

export const isReviewLeftApi = (bookId?: number) => {
    return async (dispatch: DispatchType) => {
        try {
            const result = await http.get(`/api/books/${bookId}/reviews/checkIfReviewCreated`)
            dispatch(isReviewLeftAction(result.data))
        } catch (err) {
            console.log(err)
        }
    }
}

export const leaveReviewApi = (reviewRequest: ReviewModel, bookId?: number) => {
    return async (dispatch: DispatchType) => {
        try {
            const result = await http.post(`/api/books/${bookId}/reviews`, reviewRequest)
            dispatch(leaveReviewAction(result.data))
        } catch (err) {
            console.log(err)
        }
    }
}

export const getAllReviewsApi = (pageNo?: number, pageSize?: number) => {
    return async (dispatch: DispatchType) => {
        try {
            if (pageNo != null && pageSize != null) {
                const result = await http.get(`/api/reviews?pageNo=${pageNo}&pageSize=${pageSize}`)
                dispatch(getAllReviewsAction(result.data))
            } else {
                const result = await http.get('/api/reviews')
                dispatch(getAllReviewsAction(result.data))
            }
        } catch (err) {
            console.log(err)
        }
    }
}

export const deleteReviewApi = (id?: number) => {
    return async (dispatch: DispatchType) => {
        try {
            const result = await http.delete('/api/reviews/' + id)
            dispatch(deleteReviewAction())
        } catch (err) {
            console.log(err)
        }
    }
}