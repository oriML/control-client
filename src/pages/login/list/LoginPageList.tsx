import { AxiosResponse } from 'axios'
import React, { FormEventHandler, ReactNode } from 'react'
import { useForm } from 'react-hook-form'
import { UseMutationResult } from 'react-query'
import { Link } from 'react-router-dom'
import ErrorMessage from '../../../components/errorMessage/ErrorMessage'
import Loader from '../../../components/loader/Loader'
import { UserLoginModel } from '../../../models/user/UserLoginModel'

interface ILoginPageListProps {
    onSubmit: (model: UserLoginModel) => void,
    children: ReactNode
}

function LoginPageList({ onSubmit, children }: ILoginPageListProps) {

    const { register, handleSubmit, watch, formState: { errors } } = useForm<UserLoginModel>();

    function onSubmitForm(data: UserLoginModel): void {
        onSubmit(data);
    };
    return (
        <div className="h-full">
            {/* the form */}
            <form className="h-full" onSubmit={handleSubmit(onSubmitForm)}>
                <p className="my-4 text-center">
                    <span>כניסת משתמש</span>
                </p>
                <div className="mb-4">
                    <input
                        type="text"
                        className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                        id="exampleFormControlInput1"
                        placeholder="אימייל"
                        {...register(
                            "email",
                            {
                                required: true,
                                pattern: {
                                    value: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
                                    message: 'פורמט האימייל שגוי'
                                }
                            })}
                    />
                    {errors.email && <ErrorMessage errorMessage={errors.email.message} />}

                </div>
                <div className="mb-4">
                    <input
                        type="password"
                        className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                        placeholder="סיסמא"
                        {...register("password", {
                            required: "סיסמא היא שדה חובה",
                            minLength: {
                                value: 4,
                                message: "הסיסמא חייבת לכלול 4 תווים לפחות"
                            }
                        })}
                    />
                    {errors.password && <ErrorMessage errorMessage={errors.password.message} />}
                </div>
                <div className="text-center pt-1 mb-12 pb-1">
                    <button
                        className="inline-block px-6 py-2.5 text-white font-medium text-s leading-tight uppercase rounded shadow-md hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 w-full mb-3"
                        // data-mdb-ripple="true"
                        // data-mdb-ripple-color="light"
                        style={{
                            background: `linear-gradient(
                          to right,
                          #16A34A,
                          #9DCFA3
                        )`
                        }}
                    >
                        התחבר
                    </button>
                    <div className="flex flex-col gap-2 mt-2">
                        <a className="text-gray-500" href="#!">שכחת סיסמא?</a>
                        <Link className="text-gray-500" to='/register'>צור משתמש חדש</Link>
                    </div>
                </div>
            </form>
            {children}
        </div >
    )
}

export default LoginPageList