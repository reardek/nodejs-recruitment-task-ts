export interface IUserCredential {
    username: string,
    password: string
}

export interface IUser extends IUserCredential {
    id: number,
    role: string,
    moviesUploaded: number
}