import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { HistoryModel } from '../../models/HistoryModel';
import { http } from '../../utils/config';
import { DispatchType } from '../configStore';

export type HistoryState = {
    historiesByUser: HistoryModel[]
    histories: HistoryModel[]
    verifyResponse: boolean
    isBookReturned: boolean | null
}

const initialState: HistoryState = {
    historiesByUser: [],
    histories: [],
    verifyResponse: false,
    isBookReturned: null,
}

const historyReducer = createSlice({
    name: 'historyReducer',
    initialState,
    reducers: {
        getAllHistoriesByUserAction: (state: HistoryState, action: PayloadAction<HistoryModel[]>) => {
            state.historiesByUser = action.payload
        },
        getAllHistoriesAction: (state: HistoryState, action: PayloadAction<HistoryModel[]>) => {
            state.histories = action.payload
        },
        verifyBookReturnedAction: (state: HistoryState) => {
            state.verifyResponse = !state.verifyResponse
        },
        checkIfBookReturnedAction: (state: HistoryState, action: PayloadAction<boolean>) => {
            state.isBookReturned = action.payload
        },
    }
});

export const {
    getAllHistoriesByUserAction,
    getAllHistoriesAction,
    verifyBookReturnedAction,
    checkIfBookReturnedAction,
} = historyReducer.actions

export default historyReducer.reducer

export const getAllHistoriesByUserApi = () => {
    return async (dispatch: DispatchType) => {
        try {
            const result = await http.get('/api/histories/find-by-user')
            dispatch(getAllHistoriesByUserAction(result.data))
        } catch (err) {
            console.log(err)
        }
    }
}

export const getAllHistoriesApi = () => {
    return async (dispatch: DispatchType) => {
        try {
            const result = await http.get('/api/histories')
            dispatch(getAllHistoriesAction(result.data))
        } catch (err) {
            console.log(err)
        }
    }
}

export const verifyBookReturnedApi = (historyId: number) => {
    return async (dispatch: DispatchType) => {
        try {
            const result = await http.put(`/api/histories/${historyId}/verifyBookReturned`)
            dispatch(verifyBookReturnedAction())
        } catch (err) {
            console.log(err)
        }
    }
}

export const checkIfBookReturnedApi = (bookId: number) => {
    return async (dispatch: DispatchType) => {
        try {
            const result = await http.get(`/api/histories?bookId=${bookId}`)
            dispatch(checkIfBookReturnedAction(result.data))
        } catch (err) {
            console.log(err)
        }
    }
}