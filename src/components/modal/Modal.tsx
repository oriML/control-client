import React, { ReactNode } from 'react'
import { useState } from 'react'
import { CloseIcon } from '../../icons'

interface IModalProps {
    closeModal: (bool: boolean) => void
    title: string
    children: ReactNode
}
interface IModalChildernProps {
    onClick: (e: React.MouseEvent<HTMLElement>) => any
    children: ReactNode
}


// position: fixed;
// z-index: 1;
// left: 0;
// top: 0;
// width: 100%;
// height: 100%;
// overflow: auto;
// background-color: rgba(0, 0, 0, 0.5);
// animation: fadein .5s;

// @keyframes fadein {
//     from { opacity: 0; }
//     to   { opacity: 1; }
// }
const ModalBackground = ({ onClick, children }: IModalChildernProps) => <div className="fixed z-10 left-0 top-o w-full h-full overflow-auto bg-black/50 transition-opacity  fade-in"></div>;

const ModalBody = ({ onClick, children }: IModalChildernProps) =>
    <div className="bg-white my-[10%] mx-auto p-5 w-1/2"
        onClick={onClick}
    ></div>;

function Modal({ closeModal, title, children }: IModalProps) {
    return (

        <>
            <div className="flex justify-center items-center overflow-x-hidden overflow-y-auto fixed -top-28 inset-0 z-50 outline-none focus:outline-none">
                <div className="relative w-full h-80 my-6 mx-auto max-w-3xl">
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
                        {children}
                        {/* <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                            <button
                                className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1"
                                type="button"
                                onClick={() => closeModal(false)}
                            >
                                Close
                            </button>
                            <button
                                className="text-white bg-yellow-500 active:bg-yellow-700 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1"
                                type="button"
                                onClick={() => closeModal(false)}
                            >
                                Submit
                            </button>
                        </div> */}
                    </div>
                </div>
            </div>
        </>

        // <>
        //     <ModalBackground onClick={() => closeModal(false)} >
        //         <ModalBody onClick={e => e.stopPropagation()} >
        //             <button onClick={() => closeModal(false)}>Close Modal</button>
        //             {children}
        //         </ModalBody>
        //     </ModalBackground>
        // </>
    )
}

export default Modal