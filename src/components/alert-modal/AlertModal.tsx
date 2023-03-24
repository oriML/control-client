import React, { ReactNode } from 'react'
import { AlertIcon } from '../../icons'
import Modal from '../modal/Modal'

interface IModalProps {
    onSubmit: (id: string) => void
    closeModal: (bool: boolean) => void
    title: string
    text: string
    children: ReactNode
}

function AlertModal({ onSubmit, closeModal, title, text, children }: IModalProps) {

    const ModalButtons = () => (
        <>
            <div className="flex justify-center p-4 [&>*]:text-red-600 [&>*]:text-3xl">
                <AlertIcon size={32} />
            </div>
            <div className="text-center p-3" style={{ direction: 'rtl' }}>
                {text}
            </div>
            {children}
            <div className="flex items-center justify-center gap-4 p-6 border-t border-solid border-blueGray-200 rounded-b">
                <button
                    className="text-white bg-green-500 active:bg-green-700 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1"
                    type="button"
                    onClick={((e) => onSubmit(e.currentTarget.value))}
                >
                    אישור
                </button>
                <button
                    className="text-white bg-red-500 active:bg-red-700 background-transparent font-bold rounded uppercase px-6 py-3 text-sm outline-none focus:outline-none mr-1 mb-1"
                    type="button"
                    onClick={() => closeModal(false)}
                >
                    ביטול
                </button>
            </div>
        </>
    )

    return (
        <div>
            <Modal
                title={title}
                children={<ModalButtons />}
                closeModal={closeModal}
            />
        </div>
    )
}

export default AlertModal