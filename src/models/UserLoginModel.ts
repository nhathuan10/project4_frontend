import { RoleModel } from "./RoleModel"

export type UserLoginRequest = {
    usernameOrEmail: string
    password: string
}

export type UserLoginResponse = {
    accessToken: string
    userEmail: string
    tokenType: string
    roles: RoleModel
}