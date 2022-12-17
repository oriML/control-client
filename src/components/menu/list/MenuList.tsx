import React from 'react'
import { menuRows } from '../../../utils/constants';
import { IMenuHeaderProps } from '../../main.interface';
import MenuHeader from '../container/components/MenuHeader';
import MenuRow from '../row/MenuRow';

const HrLine = () => <div className="my-4 bg-gray-200 h-[1px]"></div>


function MenuList({ toggleMenu, menuHidden }: IMenuHeaderProps) {
    const listStyle = `z-[1000] sidebar border-l-2 border-l-solid border-l-gray-100 rounded-tl-md fixed top-0 bottom-0 lg:right-0  p-2 w-[300px] overflow-y-auto text-center bg-green-600` + menuHidden;

    return (
        <>
            {/* <span
                className="absolute text-white text-4xl top-5 left-4 cursor-pointer"
            // onClick="openSidebar()"
            >
                <i className="bi bi-filter-left px-2 bg-gray-900 rounded-md"></i>
            </span> */}
            <div className={listStyle}>
                <MenuHeader toggleMenu={toggleMenu} />
                <HrLine />
                {
                    menuRows.map(({ icon, title, path }) => <MenuRow key={title + path} closeMenu={toggleMenu} icon={icon} title={title} path={path} />)
                }
            </div>
        </ >
    )
}

export default MenuList