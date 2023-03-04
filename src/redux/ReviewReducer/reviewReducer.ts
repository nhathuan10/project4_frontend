import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { http } from '../../utils/config';
import { DispatchType } from '../configStore';

export type ReviewState = {
    isReviewLeft: boolean | null
}

const initialState: ReviewState = {
    isReviewLeft: null
}

const reviewReducer = createSlice({
    name: 'reviewReducer',
    initialState,
    reducers: {
        isReviewLeftAction: (state: ReviewState, action: PayloadAction<boolean>) => {
            state.isReviewLeft = action.payload
        },
    }
});

export const {
    isReviewLeftAction
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