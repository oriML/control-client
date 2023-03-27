import axios from 'axios';
import React from 'react'
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';
import useLocalStorage from '../../../hooks/shared/useLocalStorage';
import { LogoutIcon } from '../../../icons';

const logo = require('../../../img/money-lock.png');

function HeaderList() {

    const { RemoveItem } = useLocalStorage();

    const { t } = useTranslation();

    const history = useHistory();

    function Logout(e: React.MouseEvent<HTMLDivElement, MouseEvent>) {
        e.preventDefault();
        RemoveItem('jwt');
        axios.defaults.headers.common['Authorization'] = '';
        history.replace('/login');
    }

    return (
        <div className="flex items-center justify-end">
            <div className="mr-auto ml-2 p-2 pt-2 text-white bg-brightRed rounded-full hover:bg-brightRedLight cursor-pointer"
                onClick={Logout}
            >
                <LogoutIcon />
            </div>
            <div className="w-76 mr-2">
                <span className="w-full font-semibold text-xl text-slate-50">
                    {t('CONTROL_MAIN_TITLE')}
                </span>
            </div>
            <div className="py-2 pr-2">
                <img className="w-14 h-14 rounded" src={logo} alt="Header-img" />
            </div>
        </div>
    )
}

export default HeaderList