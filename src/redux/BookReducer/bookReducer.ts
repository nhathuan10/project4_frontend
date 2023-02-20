import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import axios from 'axios';
import { BookModel, BookRequest } from '../../models/BookModel';
import { DispatchType } from '../configStore';

export type BookState = {
    books: BookModel[]
    bookState: boolean
    addedBook: BookModel | null
    book: BookModel | null
    updatedBook: BookModel | null
}

const initialState: BookState = {
    books: [],
    bookState: false,
    addedBook: null,
    book: null,
    updatedBook: null
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
            state.bookState = !state.bookState
        },
        getBookByIdAction: (state: BookState, action: PayloadAction<BookModel>) => {
            state.book = action.payload
            state.bookState = !state.bookState
        },
        updateBookAction: (state: BookState, action: PayloadAction<BookModel>) => {
            state.updatedBook = action.payload
            state.bookState = !state.bookState
        },
    }
});

export const {
    getBooksAction,
    addBookAction,
    getBookByIdAction,
    updateBookAction } = bookReducer.actions

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

export const addBookApi = (categoryId: number, book: BookRequest) => {
    return async (dispatch: DispatchType) => {
        try {
            const result = await axios.post(addBookURL + `/${categoryId}/books`, book)
            dispatch(addBookAction(result.data))
        } catch (err) {
            console.log(err)
        }
    }
}

export const getBookByIdApi = (id: number) => {
    return async (dispatch: DispatchType) => {
        try {
            const result = await axios.get(bookURL + `/${id}`)
            dispatch(getBookByIdAction(result.data))
        } catch (err) {
            console.log(err)
        }
    }
}

export const updateBookApi = (categoryId: number, bookId: number, bookRequest: BookRequest) => {
    return async (dispatch: DispatchType) => {
        try {
            const result = await axios.put(addBookURL + `/${categoryId}/books/${bookId}`, bookRequest)
            dispatch(updateBookAction(result.data))
        } catch (err) {
            console.log(err)
        }
    }
}