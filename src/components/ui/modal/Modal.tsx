import React from 'react'

interface ModalProps {
    children?: React.ReactNode;
    showModal: boolean;
    classname?: string;
}

const Modal = ({ showModal, children, classname }: ModalProps) => {
    return (
        <div>
            {showModal && <div className={`modal border-rounded ${showModal ? 'show' : ''} d-flex justify-content-center align-items-center m-auto`} tabIndex={-1} role="dialog" style={{ display: showModal ? 'block' : 'none' }}>
                <div className={`modal-dialog modal-dialog-centered m-auto ${classname}`}>
                    <div className={`modal-content `}>
                        <div className="modal-body d-flex flex-column justify-content-center w-auto margin-2">
                            {children}
                        </div>
                    </div>
                </div>
            </div>}
            {showModal && <div className="modal-backdrop fade show"></div>}
        </div>
    )
}

export default Modal;


