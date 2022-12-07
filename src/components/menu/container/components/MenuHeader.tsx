import React from 'react'
import { CloseMenuIcon } from '../../../../icons'
import { IMenuHeaderProps } from '../../../main.interface'

function MenuHeader({ toggleMenu }: IMenuHeaderProps) {
    return (
        <div className="flex align-middle justify-between text-gray-100 text-xl">
            <div className="p-2.5 mt-1 flex items-center">
                {/* <i className="bi bi-app-indicator px-2 py-1 rounded-md bg-blue-600"></i> */}
                <h1 className="font-bold text-gray-200 text-[15px] ml-3">מערכת קונטרול</h1>
                <i
                    className="bi bi-x cursor-pointer ml-28 lg:hidden"
                // onClick="openSidebar()"
                ></i>
            </div>
            <div
                className="flex justify-center items-center my-auto w-10 h-10 cursor-pointer hover:border-white hover:bg-gray-100 hover:text-green-800 rounded-full"
                onClick={() => toggleMenu()}
            >
                <CloseMenuIcon />
            </div>
        </div>
    )
}

export default MenuHeader