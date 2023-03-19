import React, { ReactNode } from 'react'
import Modal from '../modal/Modal'
interface IModalProps {
    // onSubmit: React.MouseEventHandler<HTMLButtonElement>
    closeModal: (bool: boolean) => void
    title: string
    text: string
    children: ReactNode
}

function SubmitModal({
    closeModal,
    title,
    text,
    children
}: IModalProps) {
    return (
        <>
            <Modal
                title={title}
                closeModal={closeModal}
                children={children}
            />
        </>
    )
}

export default SubmitModal