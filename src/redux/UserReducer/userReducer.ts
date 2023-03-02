import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import axios, { AxiosError } from 'axios';
import { UserLoginRequest, UserLoginResponse } from '../../models/UserLoginModel';
import { ACCESS_TOKEN, history, http, settings, USER_LOGIN } from '../../utils/config';
import { DispatchType } from '../configStore';

export interface UserState {
    userLogin: UserLoginResponse
    isInvalidAccount: boolean
}

const initialState: UserState = {
    userLogin: settings.getStorageJson(USER_LOGIN) ? settings.getStorageJson(USER_LOGIN) : null,
    isInvalidAccount: false
}

const userReducer = createSlice({
    name: 'userReducer',
    initialState,
    reducers: {
        loginAsyncAction: (state: UserState, action: PayloadAction<UserLoginResponse>) => {
            state.userLogin = action.payload
            settings.setStorageJson(USER_LOGIN, action.payload)
            settings.setCookieJson(USER_LOGIN, action.payload, 30)
            settings.setStorage(ACCESS_TOKEN, action.payload.accessToken)
            settings.setCookie(ACCESS_TOKEN, action.payload.accessToken, 30)
            state.isInvalidAccount = false
            history.push('/search-books')
        },
        invalidLoginAction: (state: UserState) => {
            state.isInvalidAccount = true
        },
    }
});

export const {
    loginAsyncAction,
    invalidLoginAction
} = userReducer.actions

export default userReducer.reducer

const authURL = '/api/auth/login'

export const loginAsyncApi = (userLoginRequest: UserLoginRequest) => {
    return async (dispatch: DispatchType) => {
        try {
            const result = await axios.post('http://localhost:8080' + authURL, userLoginRequest)
            dispatch(loginAsyncAction(result.data))
        } catch (err: any) {
            if(err.response.status === 500){
                dispatch(invalidLoginAction())
            }
            console.log(err)
        }
    }
}