import React, { ReactNode } from 'react'
import { useState } from 'react'
import { CloseIcon } from '../../icons'

interface IModalProps {
    closeModal: (bool: boolean) => void
    title: string
    children: ReactNode
}

function Modal({ closeModal, title, children }: IModalProps) {

    function stopPropogation(e: React.MouseEvent<HTMLElement>) {
        e.stopPropagation();
        // closeModal(false);
    };
    const Children = () => <div onClick={stopPropogation}>{children}</div>

    return (
        <div onClick={() => closeModal(false)} className="flex justify-center items-center overflow-x-hidden overflow-y-auto bg-zinc-900/[.2] fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-full my-6 mx-auto max-w-3xl">
                <div className="border-0 rounded-lg shadow-lg relative flex flex-col  bg-white outline-none focus:outline-none h-fit m-auto w-2/3">
                    <div className="flex items-center justify-between p-5 border-b border-solid border-gray-300 rounded-t ">
                        <button
                            className="bg-transparent border-0 text-gray-900 [&>*]:text-gray-900"
                            onClick={() => closeModal(false)}
                        >
                            <CloseIcon />
                        </button>
                        <h2 className="text-3xl font=semibold">{title}</h2>
                    </div>
                    <Children />
                </div>
            </div>
        </div>
    )
}

export default Modal