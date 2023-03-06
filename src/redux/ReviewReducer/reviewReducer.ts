import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { ReviewModel } from '../../models/ReviewModel';
import { http } from '../../utils/config';
import { DispatchType } from '../configStore';

export type ReviewState = {
    isReviewLeft: boolean | null
    reviewResponse: ReviewModel | null
}

const initialState: ReviewState = {
    isReviewLeft: null,
    reviewResponse: null
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
    }
});

export const {
    isReviewLeftAction,
    leaveReviewAction
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

export const leaveReviewtApi = (reviewRequest: ReviewModel, bookId?: number) => {
    return async (dispatch: DispatchType) => {
        try {
            const result = await http.post(`/api/books/${bookId}/reviews`, reviewRequest)
            dispatch(leaveReviewAction(result.data))
        } catch (err) {
            console.log(err)
        }
    }
}