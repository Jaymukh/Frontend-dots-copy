/* eslint-disable react-hooks/exhaustive-deps */
// External libraries
import React, { useEffect } from 'react';
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";

// CSS
import '../../../../../styles/main.css';

// Components
import Select, { SelectSize } from '../../../../ui/select/Select';
import { Button, ButtonTheme, ButtonSize, ButtonVariant } from '../../../../ui/button/Button';
import { Heading, TypographyColor, TypographyType } from '../../../../ui/typography/Heading';
import { Input } from '../../../../ui/input/Input';
import Drawer from '../../../../ui/Drawer';
import { loggedUserState, AllSettingsState, errorState, spinnerState } from "../../../../../states";

// Utilities
import { useUserService, useSettingsService } from '../../../../../services';
import { useMapHelpers } from '../../../../../helpers';

interface NewData {
    name: string | undefined;
    email_id: string | undefined;
    role: string | undefined;
    company: string | undefined;
    company_type: string | undefined;
}
interface InviteNewProps {
    openInviteNew: boolean;
    handleCloseInviteNew: () => void;
    setOpenInviteSent: (openInviteSent: boolean) => void;
    newData: NewData;
    setNewData: React.Dispatch<React.SetStateAction<NewData>>;
    handleChangeData: (event: any) => void;
}

const InviteNew: React.FC<InviteNewProps> = ({
    openInviteNew,
    handleCloseInviteNew,
    setOpenInviteSent,
    newData,
    setNewData,
    handleChangeData
}) => {

    const userService = useUserService();
    const loggedUser = useRecoilValue(loggedUserState);
    const [settings, setSettings] = useRecoilState(AllSettingsState);
    const setError = useSetRecoilState(errorState);
    const setSpinner = useSetRecoilState(spinnerState);
    const { getErrorMsg } = useMapHelpers();
    const settingsService = useSettingsService();


    const handleSubmitInviteNew = () => {
        if (newData.name && newData.email_id && newData.company && newData.role && newData.company_type) {
            var payload = { ...newData, user_id: loggedUser.user_id, designation: 'Manager', country: 'India', phone_number: 5436525362, status: 'Invited' };
            userService.inviteNew(payload)
                .then((response: any) => {
                    if (response) {
                        userService.getAll();
                        setOpenInviteSent(true);
                        handleCloseInviteNew();
                    }
                })
                .catch(error => {
                    getErrorMsg(error);
                });
        }
        else {
            setError({ type: 'Error', message: "All fields are mandatory!" });
        }
    };
    const fetchAllSettings = () => {
        setSpinner(true);
        settingsService.getAllSettings().then((response) => {
            if (response) {
                setSettings(response);
                setSpinner(false);
            }
        }).catch(error => {
            setSpinner(false);
            getErrorMsg(error);
        });
    }

    //function to get all the settings details
    useEffect(() => {
        fetchAllSettings();
    }, []);

    return (
        <>
            <Drawer
                id='invite'
                title='Invite'
                isOpen={openInviteNew}
                toggleFunction={handleCloseInviteNew}
            >
                <div className='d-flex flex-column align-items-start justify-content-center text-start'>
                    <Heading
                        title='Name*'
                        type={TypographyType.h5}
                        colour={TypographyColor.dark}
                        classname='margin-top-0 margin-bottom-1'
                    />
                    <Input
                        type="text"
                        placeholder="Full name"
                        value={newData.name}
                        name='name'
                        onChange={(e) => handleChangeData(e)}
                    />
                    <Heading
                        title='Email*'
                        type={TypographyType.h5}
                        colour={TypographyColor.dark}
                        classname='margin-top-3 margin-bottom-1'
                    />
                    <Input
                        type="email"
                        placeholder="Enter work email"
                        value={newData.email_id}
                        name='email_id'
                        onChange={(e) => handleChangeData(e)}
                    />
                    <Heading
                        title='Company*'
                        type={TypographyType.h5}
                        colour={TypographyColor.dark}
                        classname='margin-top-3 margin-bottom-1'
                    />
                    <Input
                        type="text"
                        placeholder="Company"
                        value={newData?.company}
                        name='company'
                        onChange={(e) => handleChangeData(e)}
                    />
                    <Heading
                        title='Company Type*'
                        type={TypographyType.h5}
                        colour={TypographyColor.dark}
                        classname='margin-top-3 margin-bottom-1'
                    />
                    <Select
                        options={settings?.company_types}
                        onChange={(e) => handleChangeData(e)}
                        value={newData?.company_type}
                        labelKey='name'
                        valueKey='name'
                        size={SelectSize.large}
                        name='company_type'
                        placeholder='Select'
                        classname='padding-left-right-3'
                    />
                    <Heading
                        title='Role*'
                        type={TypographyType.h5}
                        colour={TypographyColor.dark}
                        classname='margin-top-3 margin-bottom-1'
                    />
                    <Select
                        options={settings?.roles}
                        onChange={(e) => handleChangeData(e)}
                        value={newData?.role}
                        labelKey='name'
                        valueKey='name'
                        size={SelectSize.large}
                        name='role'
                        placeholder='Select'
                        classname='padding-left-right-3'
                    />
                    <Heading
                        title='Note: Admins will be able to invite users to the platform'
                        colour={TypographyColor.dark}
                        type={TypographyType.h6}
                        classname='Note'
                    />
                    <Button
                        theme={ButtonTheme.primary}
                        size={ButtonSize.large}
                        variant={ButtonVariant.bordered}
                        onClick={() => handleSubmitInviteNew()}
                        classname='margin-top-bottom-3 height-3'
                    >
                        Invite
                    </Button>
                </div>
            </Drawer>

        </>
    );
}

export default InviteNew;
