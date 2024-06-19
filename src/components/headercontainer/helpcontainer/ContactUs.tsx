// External libraries
import { useState } from 'react';
import { useRecoilValue, useSetRecoilState } from "recoil";

// CSS
import '../../../styles/main.css';

// Components
import { Button, ButtonTheme, ButtonSize, ButtonVariant } from '../../ui/button/Button';
import { Heading, TypographyType, TypographyColor } from '../../ui/typography/Heading';
import Body, { BodyType, BodyColor } from '../../ui/typography/Body';
import { Input } from '../../ui/input/Input';
import Drawer from '../../ui/Drawer';
import { loggedUserState, User, spinnerState, errorState } from "../../../states";

// Utilities
import { useCIFService } from '../../../services';
import { useMapHelpers } from '../../../helpers';


interface ContactUsProps {
    contactUsDrawerOpen: boolean,
    handleContactUsDrawer: (contactUsDrawerOpen: boolean) => void;
}

export default function ContactUs({ contactUsDrawerOpen, handleContactUsDrawer }: ContactUsProps) {
    const loggedUser = useRecoilValue<User>(loggedUserState);
    const cifService = useCIFService();
    const setSpinner = useSetRecoilState(spinnerState);
    const setError = useSetRecoilState(errorState);
    const { getErrorMsg } = useMapHelpers();
    // const location = geoJSON?.rootProperties?.Name + geoJSON?.rootProperties?.id + geoJSON?.rootProperties?.region;

    const [payloadData, setPayloadData] = useState
        <{ email_id: string, name: string, company: string, message: string, purpose: string }>
        ({ email_id: loggedUser?.email_id, name: loggedUser?.name, company: loggedUser?.company, message: '', purpose: 'Contact Us' });

    const handleChangeData = (e: any) => {
        e.preventDefault();
        const name = e.target.name;
        const value = e.target.value;

        const wordLimit = 250;
        const words = value.split(/\s+/).filter((word: any) => word !== '');

        if (words.length > wordLimit) {
            // Truncate the input to the word limit
            const truncatedInput = words.slice(0, wordLimit).join(' ');
            setPayloadData({ ...payloadData, [name]: truncatedInput });
        }
        else {
            setPayloadData({ ...payloadData, [name]: value });
        }
    };

    const handleSendClick = () => {
        if (payloadData.message) {
            setSpinner(true);
            cifService.sendEmail(payloadData).then((response: any) => {
                if (response) {
                    setError({ type: 'Success', message: response.message });
                    handleContactUsDrawer(false);
                }
                setSpinner(false);
            })
                .catch(error => {
                    getErrorMsg(error);
                    setSpinner(false);
                });
        }
        else {
            setError({ type: 'Error', message: 'Write something!' });
        }
    };

    return (
        <Drawer
            id='contact-us'
            title='Contact us'
            isOpen={contactUsDrawerOpen}
            toggleFunction={handleContactUsDrawer}
        >
            <div className='d-flex flex-column align-items-start justify-content-center text-start'>
                <Body
                    type={BodyType.p1}
                    color={BodyColor.secondary}
                    classname='margin-bottom-2'
                >
                    Please contact us through this form or email us directly at ei@enmasse.world, and we shall reach out to you promptly.                </Body>
                <Heading
                    title='Name*'
                    type={TypographyType.h5}
                    colour={TypographyColor.dark}
                    classname='margin-top-3'
                />
                <Input
                    type="text"
                    placeholder="Enter your name"
                    value={loggedUser.name}
                    disabled={true}
                />
                <Heading
                    title='Email*'
                    type={TypographyType.h5}
                    colour={TypographyColor.dark}
                    classname='margin-top-3'
                />
                <Input
                    type="email"
                    placeholder="Enter your Email ID"
                    value={loggedUser.email_id}
                    disabled={true}
                />
                <Heading
                    title='Message*'
                    type={TypographyType.h5}
                    colour={TypographyColor.dark}
                    classname='margin-top-3'
                />
                <textarea
                    value={payloadData.message}
                    name='message'
                    onChange={(e) => handleChangeData(e)}
                    placeholder="Type your request message (Max 250 words)"
                    style={{ height: '10rem' }}
                    className='fs-13 padding-3 rounded w-100'
                />
                <Button
                    theme={ButtonTheme.primary}
                    size={ButtonSize.large}
                    variant={ButtonVariant.bordered}
                    onClick={() => handleSendClick()}
                    classname='margin-top-bottom-3 height-3'
                >
                    Send Message
                </Button>
            </div>
        </Drawer>
    );
}