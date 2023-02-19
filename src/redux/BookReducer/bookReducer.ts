import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import axios from 'axios';
import AddBookRequest from '../../models/AddBookRequest';
import { BookModel } from '../../models/BookModel';
import { DispatchType } from '../configStore';

export type BookState = {
    books: BookModel[],
    bookState: boolean,
    addedBook: BookModel | null
}

const initialState: BookState = {
    books: [],
    bookState: false,
    addedBook: null
}

const bookReducer = createSlice({
    name: 'bookReducer',
    initialState,
    reducers: {
        getBooksAction: (state: BookState, action: PayloadAction<BookModel[]>) => {
            state.books = action.payload
        },
        addBookAction: (state: BookState, action: PayloadAction<BookModel>) => {
            state.addedBook = action.payload
        }
    }
});

export const { getBooksAction, addBookAction } = bookReducer.actions

export default bookReducer.reducer

const bookURL = 'http://localhost:8080/api/books'
const addBookURL = 'http://localhost:8080/api/categories'

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

export const addBookApi = (categoryId: number, book: AddBookRequest) => {
    return async (dispatch: DispatchType) => {
        try {
            const result = await axios.post(addBookURL + `/${categoryId}/books`, book)
            dispatch(addBookAction(result.data))
        } catch (err) {
            console.log(err)
        }
    }
}