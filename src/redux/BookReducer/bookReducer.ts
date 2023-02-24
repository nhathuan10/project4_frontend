import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import axios from 'axios';
import { BookModel, BookRequest } from '../../models/BookModel';
import { BookResponse } from '../../models/BookResponse';
import { DispatchType } from '../configStore';

export type BookState = {
    bookResponse: BookResponse | null
    // booksResponseByTitle: BookResponse | null
    bookState: boolean
    addedBook: BookModel | null
    book: BookModel | null
    updatedBook: BookModel | null
    deleteBookResponse: string
    totalAmountOfBooks: number
    totalPages: number
    currentPage: number
}

const initialState: BookState = {
    bookResponse: null,
    // booksResponseByTitle: null,
    bookState: false,
    addedBook: null,
    book: null,
    updatedBook: null,
    deleteBookResponse: '',
    totalAmountOfBooks: 0,
    totalPages: 0,
    currentPage: 1
}

const bookReducer = createSlice({
    name: 'bookReducer',
    initialState,
    reducers: {
        getBooksAction: (state: BookState, action: PayloadAction<BookResponse>) => {
            state.bookResponse = action.payload
            state.totalAmountOfBooks = action.payload.totalElements
            state.totalPages = action.payload.totalPages
            state.currentPage = action.payload.pageNo + 1
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
        deleteBookAction: (state: BookState, action: PayloadAction<string>) => {
            state.deleteBookResponse = action.payload
            state.bookState = !state.bookState
        },
        getBooksByTitleAction: (state: BookState, action: PayloadAction<BookResponse>) => {
            state.bookResponse = action.payload
            // state.totalAmountOfBooks = action.payload.totalElements
            // state.totalPages = action.payload.totalPages
            // state.currentPage = action.payload.pageNo + 1
        }
    }
});

export const {
    getBooksAction,
    addBookAction,
    getBookByIdAction,
    updateBookAction,
    deleteBookAction,
    getBooksByTitleAction
} = bookReducer.actions

export default bookReducer.reducer

const bookURL = 'http://localhost:8080/api/books'
const addBookURL = 'http://localhost:8080/api/categories'

export const getBooksApi = (pageNo?: number, pageSize?: number) => {
    return async (dispatch: DispatchType) => {
        try {
            if (pageNo != null && pageSize != null) {
                const result = await axios.get(bookURL + `?pageNo=${pageNo}&pageSize=${pageSize}`)
                dispatch(getBooksAction(result.data))
            } else {
                const result = await axios.get(bookURL)
                dispatch(getBooksAction(result.data))
            }
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

export const deleteBookApi = (bookId: number) => {
    return async (dispatch: DispatchType) => {
        try {
            const result = await axios.delete(bookURL + `/${bookId}`)
            dispatch(deleteBookAction(result.data))
        } catch (err) {
            console.log(err)
        }
    }
}

export const getBooksByTitleApi = (title: string, pageNo?: number, pageSize?: number) => {
    return async (dispatch: DispatchType) => {
        try {
            
            const result = await axios.get(bookURL + `/find-by-title?title=${title}&pageNo=${pageNo}&pageSize=${pageSize}`)
            dispatch(getBooksByTitleAction(result.data))
        } catch (err) {
            console.log(err)
        }
    }
}