import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next'
import { useMutation } from 'react-query';
import { useHistory } from 'react-router-dom';
import ErrorMessage from '../../components/error-message/ErrorMessage';
import { SingleFormWrapper } from '../../components/single-form-wrapper/SingleFormWrapper';
import { useAxiosDAL } from '../../hooks/shared/useAxiosDAL';
import useLocalStorage from '../../hooks/shared/useLocalStorage';
import { IUserRegister } from '../../models/user/user.DTO';

export function RegisterPage() {
    const { Post } = useAxiosDAL();
    const { SetItem } = useLocalStorage();
    const history = useHistory();
    const {
        NODE_ENV,
        REACT_APP_DEV_GLOBAL_URI,
        REACT_APP_PROD_GLOBAL_URI,
        REACT_APP_URI_AUTH
    } = process.env;

    const { mutate } = useMutation((data: IUserRegister) => Post(`${NODE_ENV === 'production' ? REACT_APP_PROD_GLOBAL_URI : REACT_APP_DEV_GLOBAL_URI}/${REACT_APP_URI_AUTH}/register`, data)
        , {
            onSuccess({ data }) {
                SetItem('jwt', data.token);
                const state = {
                    id: data.id,
                    email: data.email,
                    name: data.name
                }
                history.push('/', state);
            },
        });
    const { t } = useTranslation();

    const { register, handleSubmit, formState: { errors } } = useForm<IUserRegister>();

    function onSubmitForm(data: IUserRegister): void {
        mutate(data);
    };

    return (
        <SingleFormWrapper>
            <div className="h-full">
                <form className="h-full" onSubmit={handleSubmit(onSubmitForm)}>
                    <p className="my-4 text-center">
                        <span>{t('USER_REGISTER_TITLE')}</span>
                    </p>
                    <div className="mb-4">
                        <input
                            type="email"
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

                    <div className="mb-4">
                        <input
                            type="text"
                            className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                            placeholder={`${t('NAME_PLACEHOLDER')}`}
                            {...register("name", {
                                required: {
                                    value: true,
                                    message: t('REQUIRED_INPUT_ERR_MESSAGE')
                                },
                                minLength: {
                                    value: 2,
                                    message: t("MIN_LENGTH_ERR_MESSAGE", { "num": 2 })
                                }
                            })}
                        />
                        {errors.name && <ErrorMessage errorMessage={errors.name.message} />}
                    </div>

                    <div className="text-center pt-1 mb-12 pb-1">
                        <button
                            className="inline-block px-6 py-2.5 text-white font-medium text-s leading-tight uppercase rounded shadow-md hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 w-full mb-3"
                            // data-mdb-ripple="true"
                            // data-mdb-ripple-color="light"
                            style={{ background: `linear-gradient( to right, #16A34A,#9DCFA3)` }}>
                            {t('LOGIN_TEXT')}
                        </button>
                    </div>
                </form>
            </div>
        </SingleFormWrapper>
    )
}