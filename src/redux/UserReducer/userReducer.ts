import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import axios from 'axios';
import { UserLoginRequest, UserLoginResponse } from '../../models/UserLoginModel';
import { UserRegisterModel } from '../../models/UserRegisterModel';
import { ACCESS_TOKEN, DOMAIN, history, settings, USER_LOGIN } from '../../utils/config';
import { DispatchType } from '../configStore';

export interface UserState {
    userLogin: UserLoginResponse
    isInvalidAccount: boolean
    userSignup: UserRegisterModel | null
    isInvalidAccountSignup: boolean | null
}

const initialState: UserState = {
    userLogin: settings.getStorageJson(USER_LOGIN) ? settings.getStorageJson(USER_LOGIN) : null,
    isInvalidAccount: false,
    userSignup: null,
    isInvalidAccountSignup: null
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
            history.push('/')
        },
        signupAsyncAction: (state: UserState, action: PayloadAction<UserRegisterModel>) => {
            state.userSignup = action.payload
            state.isInvalidAccountSignup = false
        },
        invalidLoginAction: (state: UserState) => {
            state.isInvalidAccount = true
        },
        invalidSingupAction: (state: UserState) => {
            state.isInvalidAccountSignup = true
        },
    }
});

export const {
    loginAsyncAction,
    invalidLoginAction,
    signupAsyncAction,
    invalidSingupAction
} = userReducer.actions

export default userReducer.reducer

const loginURL = '/api/auth/login'
const signupURL = '/api/auth/signup'

export const loginAsyncApi = (userLoginRequest: UserLoginRequest) => {
    return async (dispatch: DispatchType) => {
        try {
            const result = await axios.post(DOMAIN + loginURL, userLoginRequest)
            dispatch(loginAsyncAction(result.data))
        } catch (err: any) {
            if (err.response.status === 500) {
                dispatch(invalidLoginAction())
            }
            console.log(err)
        }
    }
}

export const signupAsyncApi = (userSignupRequest: UserRegisterModel) => {
    return async (dispatch: DispatchType) => {
        try {
            const result = await axios.post(DOMAIN + signupURL, userSignupRequest)
            dispatch(signupAsyncAction(result.data))
        } catch (err: any) {
            if (err.response.status === 400) {
                dispatch(invalidSingupAction())
            }
            console.log(err)
        }
    }
}