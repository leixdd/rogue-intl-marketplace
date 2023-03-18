export interface IUser {
    phpsession: string
    username: string
}

export interface IUserLoginCredentials {
    server: string
    account: string
    password: string
    securitycode: string
}