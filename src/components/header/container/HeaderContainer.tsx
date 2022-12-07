import React from 'react'
import HeaderList from '../list/HeaderList'

export function HeaderContainer() {
    return (
        <div className="bg-green-600 w-full">
            <nav className="relative container mx-auto">
                <HeaderList />
            </nav>
        </div>
    )
}