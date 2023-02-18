import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import axios from 'axios';
import { BookModel } from '../../models/BookModel';
import { DispatchType } from '../configStore';

export type BookState = {
    books: BookModel[],
    bookState: boolean
}

const initialState: BookState = {
    books: [],
    bookState: false
}

const bookReducer = createSlice({
    name: 'bookReducer',
    initialState,
    reducers: {
        getBooksAction: (state: BookState, action: PayloadAction<BookModel[]>) => {
            state.books = action.payload
        }
    }
});

export const { getBooksAction } = bookReducer.actions

export default bookReducer.reducer

const bookURL = 'http://localhost:8080/api/books'

export const getBooksApi = () => {
    return async (dispatch: DispatchType) => {
        try {
            const result = await axios.get(bookURL)
            dispatch(getBooksAction(result.data))
        } catch (err) {
            console.log(err)
        }
    }
}