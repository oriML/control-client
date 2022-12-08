import axios from 'axios';
import React, { FormEvent, FormEventHandler } from 'react'
import { useMutation } from 'react-query';
import { useHistory } from 'react-router-dom';
import ErrorMessage from '../../../components/errorMessage/ErrorMessage';
import Loader from '../../../components/loader/Loader';
import SingleFormContainer from '../../../components/singleFormContainer/SingleFormContainer';
import { useAxiosDAL } from '../../../hooks/useAxiosDAL';
import useLocalStorage from '../../../hooks/useLocalStorage';
import { UserLoginModel, ILoginPageProps } from '../../../models/user/UserLoginModel'
import LoginPageList from '../list/LoginPageList'

export function LoginPageContainer() {

    // todo:
    // when logged and returned true
    // insert jwt to local storage
    // set axios.defaults.headers.common.Authorization = token
    const { Post } = useAxiosDAL();
    const { SetItem } = useLocalStorage();
    const history = useHistory();
    const {
        REACT_APP_DEV_GLOBAL_URI,
        REACT_APP_URI_AUTH
    } = process.env;

    const { mutate, isLoading, isError, error } = useMutation((data: UserLoginModel) => Post(`${REACT_APP_DEV_GLOBAL_URI}/${REACT_APP_URI_AUTH}/login`, data)
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
        <SingleFormContainer>
            <LoginPageList onSubmit={onSubmit}>
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
            </LoginPageList>
        </SingleFormContainer>
    )
}