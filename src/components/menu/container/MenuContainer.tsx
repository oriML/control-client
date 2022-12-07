import React from 'react'
import { OpenMenuIcon } from '../../../icons';
import MenuList from '../list/MenuList'

export function MenuContainer() {
    const [showMenu, setShowMenu] = React.useState<boolean>(false);
    const menuHidden = showMenu ? '' : ' hidden';
    const menuNotHidden = showMenu ? ' hidden' : '';
    function toggleMenu() {
        setShowMenu(p => !p)
    }

    return (
        <>
            <div
                className={`flex justify-center items-center my-auto w-4
                cursor-pointer bg-green-600 h-full text-white 
                fixed top-0 right-0
                hover:border-green-800 hover:rounded-tl-full 
                hover:bg-gray-100  hover:text-green-700 rounded-sm` + menuNotHidden}
                onClick={() => toggleMenu()}
            >
                <OpenMenuIcon />
            </div>
            <MenuList toggleMenu={toggleMenu} menuHidden={menuHidden} />
        </>
    )
}