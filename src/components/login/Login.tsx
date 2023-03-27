import { ReactNode } from 'react'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { IUserLogin } from '../../models/user/user.DTO'
import ErrorMessage from '../error-message/ErrorMessage'
interface ILoginProps {
    onSubmit: (model: IUserLogin) => void,
    children: ReactNode
}

function Login({ onSubmit, children }: ILoginProps) {

    const { register, handleSubmit, formState: { errors } } = useForm<IUserLogin>();

    const { t } = useTranslation();

    function onSubmitForm(data: IUserLogin): void {
        onSubmit(data);
    };
    return (
        <div className="h-full">
            {/* the form */}
            <form className="h-full" onSubmit={handleSubmit(onSubmitForm)}>
                <p className="my-4 text-center">
                    <span>{t('USER_LOGIN_TEXT')}</span>
                </p>
                <div className="mb-4">
                    <input
                        type="text"
                        className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                        placeholder={`${t('EMAIL_PLACEHOLDER')}`}
                        {...register(
                            "email",
                            {
                                required: true,
                                pattern: {
                                    value: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
                                    message: t('WRONG_FORMAT_ERR_MESSAGE')
                                }
                            })}
                    />
                    {errors.email && <ErrorMessage errorMessage={errors.email.message} />}

                </div>
                <div className="mb-4">
                    <input
                        type="password"
                        className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                        placeholder={`${t('PASSWORD_PLACEHOLDER')}`}
                        {...register("password", {
                            required: {
                                value: true,
                                message: t('REQUIRED_INPUT_ERR_MESSAGE')
                            },
                            minLength: {
                                value: 4,
                                message: t("MIN_LENGTH_ERR_MESSAGE", { "num": 4 })
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
                        {t('LOGIN_TEXT')}
                    </button>
                    <div className="flex flex-col gap-2 mt-2">
                        <a className="text-gray-500" href="#!">{t('FORGOT_PASSWORD')}</a>
                        <Link className="text-gray-500" to='/register'>{t('REGISTER_TEXT')}</Link>
                    </div>
                </div>
            </form>
            {children}
        </div >
    )
}

export default Login