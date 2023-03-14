import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { MessageModel } from '../../models/MessageModel';
import { http } from '../../utils/config';
import { DispatchType } from '../configStore';

export type MessageState = {
    newMessage: MessageModel | null
    newMessageResponse: boolean | null
    messages: MessageModel[]
    messagesByClosed: MessageModel[]
    messageResponse: MessageModel | null
    allMessages: MessageModel[]
}

const initialState: MessageState = {
    newMessage: null,
    newMessageResponse: null,
    messages: [],
    messagesByClosed: [],
    messageResponse: null,
    allMessages: []
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
        getMessagesByClosedAction: (state: MessageState, action: PayloadAction<MessageModel[]>) => {
            state.messagesByClosed = action.payload
        },
        submitResponseAction: (state: MessageState, action: PayloadAction<MessageModel>) => {
            state.messageResponse = action.payload
            state.newMessageResponse = !state.newMessageResponse
        },
        getAllMessagesAction: (state: MessageState, action: PayloadAction<MessageModel[]>) => {
            state.allMessages = action.payload
            state.newMessageResponse = !state.newMessageResponse
        },
    }
});

export const {
    submitQuestionAction,
    getMessagesAction,
    getMessagesByClosedAction,
    submitResponseAction,
    getAllMessagesAction,
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

export const getAllMessagesApi = (status: string) => {
    return async (dispatch: DispatchType) => {
        try {
            if (status === 'allMessages') {
                const result = await http.get('api/messages')
                dispatch(getAllMessagesAction(result.data))
            } else {
                const result = await http.get('/api/messages/findByClosed')
                dispatch(getMessagesByClosedAction(result.data))
            }
        } catch (err) {
            console.log(err)
        }
    }
}

export const getMessagesByClosedApi = () => {
    return async (dispatch: DispatchType) => {
        try {
            const result = await http.get('/api/messages/findByClosed')
            dispatch(getMessagesByClosedAction(result.data))
        } catch (err) {
            console.log(err)
        }
    }
}

export const submitResponseApi = (response: MessageModel, id?: number,) => {
    return async (dispatch: DispatchType) => {
        try {
            const result = await http.put(`/api/messages/${id}`, response)
            dispatch(submitResponseAction(result.data))
        } catch (err) {
            console.log(err)
        }
    }
}