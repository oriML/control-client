import React, { ReactNode } from 'react'

interface IPageWrapperProps {
    children: ReactNode
}

function PageWrapper({ children }: IPageWrapperProps) {
    return (
        <div className="w-full h-full bg-slate-200">
            {children}
        </div>
    )
}

export default PageWrapper