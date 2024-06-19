// External libraries
import React from 'react';
import { AiOutlineClose } from "react-icons/ai";

// CSS
import '../../styles/main.css';

// Components
import { Button, ButtonTheme, ButtonSize, ButtonVariant } from '../ui/button/Button';
import { Heading, TypographyColor, TypographyType } from '../ui/typography/Heading';
import Body, { BodyType, BodyColor } from '../ui/typography/Body';
import { Input } from '../ui/input/Input';
import Modal from '../ui/modal/Modal';

interface ForgotPasswordProps {
    showModal: boolean;
    handleModal: (value: any) => void;
    email: string;
    handleEmailChange: (value: string) => void;
    handleSendEmail: () => void;
}


const ForgotPassword: React.FC<ForgotPasswordProps> = (
    {
        showModal,
        handleModal,
        email,
        handleEmailChange,
        handleSendEmail
    }) => {

    return (
        <Modal showModal={showModal} classname='width-30' >
            <div className='d-flex flex-row justify-content-between align-items-center w-100'>
                <Heading
                    title='Forgot Password'
                    type={TypographyType.h4}
                    colour={TypographyColor.dark}
                    classname='text-start'
                />
                <Button
                    theme={ButtonTheme.primary}
                    variant={ButtonVariant.transparent}
                    onClick={() => handleModal({ passwordModal: false })}
                    type='button'
                    classname='padding-left-right-0'
                >
                    <AiOutlineClose className="fs-20" />
                </Button>
            </div>
            <Body
                type={BodyType.p4}
                color={BodyColor.dark}
                classname='text-start'
            >
                Enter your email, we will send you instructions.
            </Body>
            <div className=" d-flex flex-column justify-content-start margin-top-bottom-2 w-100" >
                <Heading
                    title='Email'
                    type={TypographyType.h4}
                    colour={TypographyColor.dark}
                    classname='text-start'
                />
                <Input
                    type="email"
                    placeholder="Enter your email id here"
                    value={email}
                    name='email_id'
                    onChange={(e) => handleEmailChange(e.target.value)}
                />
                <Button
                    theme={ButtonTheme.primary}
                    classname='margin-bottom-2 margin-top-4'
                    size={ButtonSize.large}
                    variant={ButtonVariant.bordered}
                    onClick={handleSendEmail}
                >
                    Send Email
                </Button>
                <Button
                    theme={ButtonTheme.primary}
                    size={ButtonSize.large}
                    variant={ButtonVariant.transparent}
                    onClick={() => handleModal({ passwordModal: false })}
                    classname='underline-text'
                >
                    Back to Login
                </Button>
            </div>
        </Modal>
    )
}

export default ForgotPassword;