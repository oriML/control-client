import React, { ReactNode } from 'react'

export function SingleFormWrapper({ children }: { children: ReactNode }) {
    return (
        <section className="m-auto p-28 pt-20 pb-44 h-full w-full flex justify-center items-center">
            <div className="border-solid border-2 rounded-lg px-28 pt-6 pb-8">
                {children}
            </div>
        </section>
    )
}
