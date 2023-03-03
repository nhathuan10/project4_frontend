import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { CheckoutModel } from '../../models/CheckoutModel';
import { http } from '../../utils/config';
import { DispatchType } from '../configStore';

export type CheckoutState = {
    currentLoansCount: number
    isBookCheckoutByUser: boolean | null
    checkOuts: CheckoutModel[]
}

const initialState: CheckoutState = {
    currentLoansCount: 0,
    isBookCheckoutByUser: null,
    checkOuts: []
}

const checkoutReducer = createSlice({
    name: 'checkoutReducer',
    initialState,
    reducers: {
        checkoutBookAction: (state: CheckoutState, action: PayloadAction<CheckoutModel[]>) => {
            state.checkOuts = action.payload
        },
        currentLoansCountAction: (state: CheckoutState, action: PayloadAction<number>) => {
            state.currentLoansCount = action.payload
        },
        isBookCheckoutByUserAction: (state: CheckoutState, action: PayloadAction<boolean>) => {
            state.isBookCheckoutByUser = action.payload
        },
    }
});

export const {
    currentLoansCountAction,
    isBookCheckoutByUserAction,
    checkoutBookAction
} = checkoutReducer.actions

export default checkoutReducer.reducer

const currentLoansCountURL = '/api/checkouts/currentLoansCount'

export const checkoutBookApi = (bookId?: number) => {
    return async (dispatch: DispatchType) => {
        try {
            const result = await http.put(`api/books/${bookId}/checkouts`, null)
            dispatch(checkoutBookAction(result.data.checkouts))
        } catch (err) {
            console.log(err)
        }
    }
}

export const currentLoansCountApi = () => {
    return async (dispatch: DispatchType) => {
        try {
            const result = await http.get(currentLoansCountURL)
            dispatch(currentLoansCountAction(result.data))
        } catch (err) {
            console.log(err)
        }
    }
}

export const isBookCheckoutByUserApi = (bookId?: number) => {
    return async (dispatch: DispatchType) => {
        try {
            const result = await http.get(`/api/books/${bookId}/checkouts/isCheckoutByUser`)
            dispatch(isBookCheckoutByUserAction(result.data))
        } catch (err) {
            console.log(err)
        }
    }
}