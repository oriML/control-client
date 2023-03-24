import axios from 'axios';
import React, { FormEvent, FormEventHandler } from 'react'
import { useMutation } from 'react-query';
import { useHistory } from 'react-router-dom';
import ErrorMessage from '../../components/error-message/ErrorMessage';
import Loader from '../../components/loader/Loader';
import Login from '../../components/login/Login';
import { SingleFormWrapper } from '../../components/single-form-wrapper/SingleFormWrapper';
import { useAxiosDAL } from '../../hooks/shared/useAxiosDAL';
import useLocalStorage from '../../hooks/shared/useLocalStorage';
import { UserLoginModel, ILoginPageProps } from '../../models/user/UserLoginModel'

export function LoginPage() {

    // todo:
    // when logged and returned true
    // insert jwt to local storage
    // set axios.defaults.headers.common.Authorization = token
    const { Post } = useAxiosDAL();
    const { SetItem } = useLocalStorage();
    const history = useHistory();
    const {
        NODE_ENV,
        REACT_APP_DEV_GLOBAL_URI,
        REACT_APP_PROD_GLOBAL_URI,
        REACT_APP_URI_AUTH
    } = process.env;

    const { mutate, isLoading, isError, error } = useMutation((data: UserLoginModel) => Post(`${NODE_ENV === 'production' ? REACT_APP_PROD_GLOBAL_URI : REACT_APP_DEV_GLOBAL_URI}/${REACT_APP_URI_AUTH}/login`, data)
        , {
            onSuccess({ data }) {
                SetItem('jwt', data.token);
                const state = {
                    id: data.id,
                    email: data.email,
                    name: data.name
                }
                // axios.defaults.headers.common['Authorization'] = `Bearer ${data.token}`;
                history.push('/', state);
            },
        });

    function onSubmit(model: UserLoginModel): void {
        mutate(model);
    }

    return (
        <SingleFormWrapper>
            <Login onSubmit={onSubmit}>
                <div className="relative">
                    <div className="absolute bottom-0 text-center m-auto w-full">
                        {
                            isLoading ?
                                <Loader />
                                :
                                (
                                    isError ?
                                        <ErrorMessage errorMessage={(error as Error)?.message} />
                                        :
                                        null
                                )
                        }
                    </div>
                </div>
            </Login>
        </SingleFormWrapper>
    )
}