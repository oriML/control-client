import React from 'react';
import { Redirect } from 'react-router-dom';
import AppLayout from '../layout';

function AuthHandler(props: React.PropsWithChildren) {

    const isAuthorized = Boolean(localStorage.getItem('jwt'));
    const { children } = props;

    return isAuthorized ? (
        <AppLayout>
            {children}
        </AppLayout>
    ) : (
        <Redirect
            to="/login"
        />
    );
}


export default AuthHandler;
