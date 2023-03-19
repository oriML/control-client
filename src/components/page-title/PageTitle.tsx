import React, { ReactNode } from 'react'

interface IPageTitleProps {
    title: string
    icon: () => JSX.Element
}

export default function PageTitle({ title, icon }: IPageTitleProps) {
    return (
        <div className="py-8 px-14">
            <div className="w-full rounded-lg shadow border-b-2
            text-gray-600 tracking-wider py-2 border-gray-200 bg-gray-100">
                <div className="flex items-center gap-4 justify-end pr-4 text-2xl">
                    <p>{title}</p>
                    <span className="border-2 border-solid border-green-300 bg-green-100 rounded-full p-3 text-center [&>*]:text-green-700">{icon()}</span>
                </div>
            </div>
        </div>
    )
}