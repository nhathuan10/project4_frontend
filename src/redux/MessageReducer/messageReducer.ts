import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { MessageModel } from '../../models/MessageModel';
import { MessageResponse } from '../../models/MessageResponse';
import { http } from '../../utils/config';
import { DispatchType } from '../configStore';

export type MessageState = {
    newMessage: MessageModel | null
    newMessageResponse: boolean | null
    messages: MessageModel[]
    messagesByClosed: MessageModel[]
    messageResponse: MessageModel | null
    allMessages: MessageResponse | null
}

const initialState: MessageState = {
    newMessage: null,
    newMessageResponse: null,
    messages: [],
    messagesByClosed: [],
    messageResponse: null,
    allMessages: null
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
        getAllMessagesAction: (state: MessageState, action: PayloadAction<MessageResponse>) => {
            state.allMessages = action.payload
        },
        deleteResponseAction: (state: MessageState) => {
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
    deleteResponseAction
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

export const getAllMessagesApi = (status: string, pageNo?: number, pageSize?: number) => {
    return async (dispatch: DispatchType) => {
        try {
            if (status == 'allMessages' && pageNo != null && pageSize != null) {
                const result = await http.get('api/messages' + `?pageNo=${pageNo}&pageSize=${pageSize}`)
                dispatch(getAllMessagesAction(result.data))
            } else if (status == 'pendingMessages') {
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

export const submitResponseApi = (response: MessageModel, id?: number) => {
    return async (dispatch: DispatchType) => {
        try {
            const result = await http.put(`/api/messages/${id}`, response)
            dispatch(submitResponseAction(result.data))
        } catch (err) {
            console.log(err)
        }
    }
}

export const deleteResponseApi = (id?: number) => {
    return async (dispatch: DispatchType) => {
        try {
            const result = await http.delete(`/api/messages/${id}`)
            dispatch(deleteResponseAction())
        } catch (err) {
            console.log(err)
        }
    }
}