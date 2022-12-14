import React from 'react'
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next'
import { useMutation } from 'react-query';
import { useHistory } from 'react-router-dom';
import ErrorMessage from '../../../components/errorMessage/ErrorMessage';
import SingleFormContainer from '../../../components/singleFormContainer/SingleFormContainer';
import { useAxiosDAL } from '../../../hooks/useAxiosDAL';
import useLocalStorage from '../../../hooks/useLocalStorage';
import { IRegisterForm, UserRegisterModel } from '../../../models/user/UserRegisterModel';
import RegisterPageList from '../list/RegisterPageList'

export function RegisterPageContainer() {
    const { Post } = useAxiosDAL();
    const { SetItem } = useLocalStorage();
    const history = useHistory();
    const {
        NODE_ENV,
        REACT_APP_DEV_GLOBAL_URI,
        REACT_APP_PROD_GLOBAL_URI,
        REACT_APP_URI_AUTH
    } = process.env;

    const { mutate, isLoading, isError, error } = useMutation((data: UserRegisterModel) => Post(`${NODE_ENV === 'production' ? REACT_APP_PROD_GLOBAL_URI : REACT_APP_DEV_GLOBAL_URI}/${REACT_APP_URI_AUTH}/register`, data)
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

    const { register, handleSubmit, watch, formState: { errors } } = useForm<IRegisterForm>();

    function onSubmitForm(data: UserRegisterModel): void {
        mutate(data);
    };

    return (
        <SingleFormContainer>
            <div className="h-full">
                <form className="h-full" onSubmit={handleSubmit(onSubmitForm)}>
                    <p className="my-4 text-center">
                        <span>{t('USER_REGISTER_TITLE')}</span>
                    </p>
                    <div className="mb-4">
                        <input
                            type="email"
                            className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                            id="exampleFormControlInput1"
                            placeholder="????????????"
                            {...register(
                                "email",
                                {
                                    required: true,
                                    pattern: {
                                        value: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
                                        message: '?????????? ?????????????? ????????'
                                    }
                                })}
                        />
                        {errors.email && <ErrorMessage errorMessage={errors.email.message} />}

                    </div>
                    <div className="mb-4">
                        <input
                            type="password"
                            className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                            placeholder="??????????"
                            {...register("password", {
                                required: "?????????? ?????? ?????? ????????",
                                minLength: {
                                    value: 4,
                                    message: "???????????? ?????????? ?????????? 4 ?????????? ??????????"
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
                                required: "?????? ????????",
                                minLength: {
                                    value: 2,
                                    message: "???? ???????????? ???????? ?????????? 2 ?????????? ??????????"
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
                            style={{
                                background: `linear-gradient(
                      to right,
                      #16A34A,
                      #9DCFA3
                      )`
                            }}
                        >
                            ??????????
                        </button>
                    </div>
                </form>
            </div>
        </SingleFormContainer>
    )
}