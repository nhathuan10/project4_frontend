import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { HistoryModel } from '../../models/HistoryModel';
import { http } from '../../utils/config';
import { DispatchType } from '../configStore';

export type HistoryState = {
    histories: HistoryModel[]
}

const initialState: HistoryState = {
    histories: []
}

const historyReducer = createSlice({
    name: 'historyReducer',
    initialState,
    reducers: {
        getAllHistoriesAction: (state: HistoryState, action: PayloadAction<HistoryModel[]>) => {
            state.histories = action.payload
        },
    }
});

export const {
    getAllHistoriesAction,
} = historyReducer.actions

export default historyReducer.reducer

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