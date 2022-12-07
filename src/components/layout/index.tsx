import React, { ReactNode } from 'react'
import Header from '../header'
import Menu from '../menu'

interface IAppLayoutProps {
    children: ReactNode
}

function AppLayout({ children }: IAppLayoutProps) {
    return (
        <>
            <Header />
            <Menu />
            {children}
        </>
    )
}

export default AppLayout