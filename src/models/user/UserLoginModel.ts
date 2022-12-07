export interface UserLoginModel {
    email: string,
    password: string
}

export interface ILoginPageProps extends UserLoginModel { }