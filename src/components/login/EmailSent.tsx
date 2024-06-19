// External libraries
import React from 'react'
import { AiOutlineClose } from "react-icons/ai";

// CSS
import '../../styles/main.css';

// Components
import { Button, ButtonTheme, ButtonSize, ButtonVariant } from '../ui/button/Button';
import { Heading, TypographyColor, TypographyType } from '../ui/typography/Heading';
import Body, {BodyType, BodyColor} from '../ui/typography/Body';
import Modal from '../ui/modal/Modal';


interface EmailSentProps {
    showModal: boolean;
    handleModal: (value: any) => void;
    email: string;
}

const EmailSent: React.FC<EmailSentProps> = ({
    showModal,
    handleModal,
    email
}) => {
    return (
        <div>
            <Modal showModal={showModal} classname='width-18-75' >
                <div className='d-flex flex-row-reverse'>
                    <Button
                        theme={ButtonTheme.primary}
                        variant={ButtonVariant.transparent}
                        onClick={() => handleModal({ sendMailModal: false })}
                        type='button'
                        classname='padding-left-right-0'
                    >
                        <AiOutlineClose className="fs-20" />
                    </Button>
                </div>
                <div className=" d-flex flex-column justify-content-center margin-top-bottom-2">
                    <Heading
                        title='Email sent'
                        type={TypographyType.h4}
                        colour={TypographyColor.dark}
                        classname='text-start'
                    />
                    <Body
						type={BodyType.p4}
						color={BodyColor.dark}
						classname='text-start'
					>
						Email sent {email} with further instructions.
					</Body>
                    <Button
                        theme={ButtonTheme.primary}
                        size={ButtonSize.large}
                        variant={ButtonVariant.contained}
                        onClick={() => handleModal({ sendMailModal: false })}
                        classname='margin-top-4 margin-bottom-3'
                    >
                        Back to Login
                    </Button>
                </div>
            </Modal>
        </div>
    )
}

export default EmailSent;