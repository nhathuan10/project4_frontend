import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { HistoryModel } from '../../models/HistoryModel';
import { http } from '../../utils/config';
import { DispatchType } from '../configStore';

export type HistoryState = {
    historiesByUser: HistoryModel[]
    histories: HistoryModel[]
    verifyResponse: boolean
}

const initialState: HistoryState = {
    historiesByUser: [],
    histories: [],
    verifyResponse: false,
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
        deleteHistoryAction: (state: HistoryState) => {
            state.verifyResponse = !state.verifyResponse
        },
    }
});

export const {
    getAllHistoriesByUserAction,
    getAllHistoriesAction,
    verifyBookReturnedAction,
    deleteHistoryAction
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

export const deleteHistoryApi = (historyId: number) => {
    return async (dispatch: DispatchType) => {
        try {
            const result = await http.delete(`/api/histories/${historyId}`)
            dispatch(deleteHistoryAction())
        } catch (err) {
            console.log(err)
        }
    }
}



