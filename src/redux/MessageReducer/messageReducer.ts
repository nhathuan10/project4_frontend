import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { MessageModel } from '../../models/MessageModel';
import { http } from '../../utils/config';
import { DispatchType } from '../configStore';

export type MessageState = {
    newMessage: MessageModel | null
    newMessageResponse: boolean | null
    messages: MessageModel[]
}

const initialState: MessageState = {
    newMessage: null,
    newMessageResponse: null,
    messages: []
}

const messageReducer = createSlice({
    name: 'messageReducer',
    initialState,
    reducers: {
        submitQuestionAction: (state: MessageState, action: PayloadAction<MessageModel>) => {
            state.newMessage = action.payload
            state.newMessageResponse = !state.newMessageResponse
        },
        getMessagesAction: (state: MessageState, action: PayloadAction<MessageModel[]>) => {
            state.messages = action.payload
        },
    }
});

export const {
    submitQuestionAction,
    getMessagesAction,
} = messageReducer.actions

export default messageReducer.reducer

export const submitQuestionApi = (message: MessageModel) => {
    return async (dispatch: DispatchType) => {
        try {
            const result = await http.post(`/api/messages`, message)
            dispatch(submitQuestionAction(result.data))
        } catch (err) {
            console.log(err)
        }
    }
}

export const getMessagesApi = () => {
    return async (dispatch: DispatchType) => {
        try {
            const result = await http.get('/api/messages/findByUser')
            dispatch(getMessagesAction(result.data))
        } catch (err) {
            console.log(err)
        }
    }
}