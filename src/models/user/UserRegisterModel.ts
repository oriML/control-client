export interface UserRegisterModel {
    email: string,
    password: string,
    name: string
}

export interface IRegisterForm extends UserRegisterModel { }