import React, { ReactNode } from 'react'
import { Link, useLocation } from 'react-router-dom';

interface IMenuRowProps {
    icon: () => JSX.Element,
    title: string,
    path: string,
    closeMenu: () => void
}


function MenuRow({ icon, title, path, closeMenu }: IMenuRowProps) {
    const { pathname } = useLocation();
    const isSelected = pathname == path;

    const rowConstStyle = `mt-3 flex items-center
    rounded-md duration-300 cursor-pointer`;

    const rowStyle = rowConstStyle + (isSelected ? `text-gray-100 bg-gray-100 ` : ` hover:text-gray-600  text-white hover:bg-gray-100`);

    const iconStyle = `pr-2 text-center mb-1`;

    const titleStyle = `p-2.5 px-4 text-[15px] text-gray-300 text-right w-full font-bold ${isSelected ? `text-green-800` : `hover:text-green-800`}`;
    return (
        <Link to={path} onClick={closeMenu}>
            <div
                className={rowStyle}
            >
                {/* <i className={iconStyle}>{icon}</i> */}
                <div className={iconStyle}>
                    {icon()}
                </div>
                <span className={titleStyle}>{title}</span>
            </div>
        </Link>
    )
}

export default MenuRow