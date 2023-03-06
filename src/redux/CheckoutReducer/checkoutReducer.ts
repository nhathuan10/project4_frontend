import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { BookModel } from '../../models/BookModel';
import { CheckoutModel } from '../../models/CheckoutModel';
import { ShelfCurrentLoanModel } from '../../models/ShelfCurrentLoanModel';
import { http } from '../../utils/config';
import { DispatchType } from '../configStore';

export type CheckoutState = {
    currentLoansCount: number
    isBookCheckoutByUser: boolean | null
    checkOuts: CheckoutModel[] | undefined
    shelfCurrentLoans: ShelfCurrentLoanModel[]
    returnOrRenewResponse: boolean
}

const initialState: CheckoutState = {
    currentLoansCount: 0,
    isBookCheckoutByUser: null,
    checkOuts: [],
    shelfCurrentLoans: [],
    returnOrRenewResponse: false
}

const checkoutReducer = createSlice({
    name: 'checkoutReducer',
    initialState,
    reducers: {
        checkoutBookAction: (state: CheckoutState, action: PayloadAction<BookModel>) => {
            state.checkOuts = action.payload.checkouts
        },
        currentLoansCountAction: (state: CheckoutState, action: PayloadAction<number>) => {
            state.currentLoansCount = action.payload
        },
        isBookCheckoutByUserAction: (state: CheckoutState, action: PayloadAction<boolean>) => {
            state.isBookCheckoutByUser = action.payload
        },
        shelfCurrentLoansAction: (state: CheckoutState, action: PayloadAction<ShelfCurrentLoanModel[]>) => {
            state.shelfCurrentLoans = action.payload
        },
        returnBookAction: (state: CheckoutState) => {
            state.returnOrRenewResponse = !state.returnOrRenewResponse
        },
        renewLoanAction: (state: CheckoutState) => {
            state.returnOrRenewResponse = !state.returnOrRenewResponse
        },
    }
});

export const {
    currentLoansCountAction,
    isBookCheckoutByUserAction,
    checkoutBookAction,
    shelfCurrentLoansAction,
    returnBookAction,
    renewLoanAction
} = checkoutReducer.actions

export default checkoutReducer.reducer

const currentLoansCountURL = '/api/checkouts/currentLoansCount'
const currentLoansURL = '/api/checkouts/currentLoans'

export const checkoutBookApi = (bookId?: number) => {
    return async (dispatch: DispatchType) => {
        try {
            const result = await http.put(`api/books/${bookId}/checkouts`)
            dispatch(checkoutBookAction(result.data))
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

export const currentLoansApi = () => {
    return async (dispatch: DispatchType) => {
        try {
            const result = await http.get(currentLoansURL)
            dispatch(shelfCurrentLoansAction(result.data))
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

export const returnBookApi = (bookId?: number) => {
    return async (dispatch: DispatchType) => {
        try {
            const result = await http.put(`/api/books/${bookId}/returnBook`)
            dispatch(returnBookAction())
        } catch (err) {
            console.log(err)
        }
    }
}

export const renewLoanApi = (bookId?: number) => {
    return async (dispatch: DispatchType) => {
        try {
            const result = await http.put(`/api/books/${bookId}/renewLoan`)
            dispatch(renewLoanAction())
        } catch (err) {
            console.log(err)
        }
    }
}