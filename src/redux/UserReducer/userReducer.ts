import { createSlice } from '@reduxjs/toolkit'
import { UserLoginResponse } from '../../models/UserLoginModel';
import { settings, USER_LOGIN } from '../../utils/config';

export interface UserState {
    userLogin: UserLoginResponse
}

const initialState: UserState = {
    userLogin: settings.getStorageJson(USER_LOGIN) ? settings.getStorageJson(USER_LOGIN) : null,
}

const userReducer = createSlice({
    name: 'userReducer',
    initialState,
    reducers: {}
});

export const { } = userReducer.actions

export default userReducer.reducer