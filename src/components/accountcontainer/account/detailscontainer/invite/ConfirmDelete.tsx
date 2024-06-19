// External libraries
import React from 'react'
import { MdCancel } from 'react-icons/md';
import { AiOutlineClose } from "react-icons/ai";

// CSS
import '../../../../../styles/main.css';

// Components
import { Button, ButtonTheme, ButtonSize, ButtonVariant } from '../../../../ui/button/Button';
import { Heading, TypographyColor, TypographyType } from '../../../../ui/typography/Heading';
import Body, { BodyColor, BodyType } from '../../../../ui/typography/Body';
import Modal from '../../../../ui/modal/Modal';

interface ConfirmDeleteProps {
    showConfirmDeleteModal: boolean;
    closeConfirmDeleteModal: () => void;
    handleDeleteClick: () => void;
}

const ConfirmDelete: React.FC<ConfirmDeleteProps> = ({
    showConfirmDeleteModal,
    closeConfirmDeleteModal,
    handleDeleteClick
}) => {
    return (
        <div>
            <Modal showModal={showConfirmDeleteModal} classname='width-18-75' >
                <div className='d-flex flex-row justify-content-end w-100 padding-bottom-1'>
                    <Button type="button" theme={ButtonTheme.primary} variant={ButtonVariant.transparent} classname='padding-left-right-0' onClick={() => closeConfirmDeleteModal()}>
                    <AiOutlineClose className="fs-20" />
                    </Button>
                </div>
                <div className='d-flex justify-content-center'>
                    <MdCancel className='text-center fs-60 color-orange' />
                </div>
                <Heading
                    title='Are you sure?'
                    type={TypographyType.h5}
                    colour={TypographyColor.dark}
                />
                <Body
                    type={BodyType.p3}
                    color={BodyColor.dark}
                    classname='text-center'>Do you really want to delete this record? This process cannot be undone.</Body>
                <Button
                    theme={ButtonTheme.warning}
                    size={ButtonSize.large}
                    variant={ButtonVariant.bordered}
                    onClick={() => handleDeleteClick()}
                    classname='margin-top-bottom-2'
                >
                    Delete
                </Button>
                <Button
                    theme={ButtonTheme.primary}
                    size={ButtonSize.large}
                    variant={ButtonVariant.transparent}
                    onClick={() => closeConfirmDeleteModal()}
                    classname='text-decoration-underline'
                >
                    Cancel
                </Button>
            </Modal>
        </div>
    )
}

export default ConfirmDelete;
