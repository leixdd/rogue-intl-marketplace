export interface IUser {
    phpsession: string
    username: string
    isLoggedIn: boolean
}

export interface IUserLoginCredentials {
    server: string
    account: string
    password: string
    securitycode: string
}