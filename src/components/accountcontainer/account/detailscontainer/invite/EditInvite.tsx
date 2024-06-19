/* eslint-disable react-hooks/exhaustive-deps */
// External libraries
import React, { useState, useEffect } from 'react';
import { useRecoilState, useSetRecoilState } from "recoil";

// CSS
import '../../../../../styles/main.css';

// Components
import { Button, ButtonTheme, ButtonSize, ButtonVariant } from '../../../../ui/button/Button';
import { Heading, TypographyColor, TypographyType } from '../../../../ui/typography/Heading';
import Body, { BodyColor, BodyType } from '../../../../ui/typography/Body';
import Select, { SelectSize } from '../../../../ui/select/Select';
import { Input } from '../../../../ui/input/Input';
import Drawer from '../../../../ui/Drawer';
import { AllSettingsState, User, errorState, spinnerState } from "../../../../../states";

// Utilities
import { useSettingsService } from '../../../../../services';
import { useMapHelpers } from '../../../../../helpers';

interface EditInviteProps {
    selectedData: User;
    handleCloseDialog: () => void;
    handleUpdate: (updatedRow: User) => void;
}

const EditInvite: React.FC<EditInviteProps> = ({
    selectedData,
    handleCloseDialog,
    handleUpdate
}) => {
    const settingsService = useSettingsService();
    const [settings, setSettings] = useRecoilState(AllSettingsState);
    const setError = useSetRecoilState(errorState);
    const setSpinner = useSetRecoilState(spinnerState);
    const [updatedData, setUpdatedData] = useState<User>(selectedData);
    const { getErrorMsg } = useMapHelpers();

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

    const handleChangeData = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        e.preventDefault();
        const name = e.target.name as keyof User; // Explicitly cast to the known keys of User
        const value = e.target.value;
        setUpdatedData({ ...updatedData, [name]: value });
    }
    const handleUpdateClick = () => {
        if (updatedData.name && updatedData.email_id && updatedData.company && updatedData.role && updatedData.company_type) {
            handleUpdate(updatedData);
        }
        else {
            setError({ type: 'Error', message: 'All fields are mendatory!' });
        }
    };
    return (
        <div className=''>
            <Drawer
                id='edit'
                title='Edit'
                isOpen={selectedData !== null}
                toggleFunction={handleCloseDialog}
            >
                <div className='d-flex flex-column align-items-start justify-content-center text-start'>
                    <Heading
                        title='Name*'
                        type={TypographyType.h5}
                        colour={TypographyColor.dark}
                        classname='margin-top-2 margin-bottom-1'
                    />
                    <Input
                        type="text"
                        placeholder="Enter your name"
                        value={updatedData.name}
                        name='name'
                        onChange={(e) => handleChangeData(e)}
                    />
                    <Heading
                        title='Email*'
                        type={TypographyType.h5}
                        colour={TypographyColor.dark}
                        classname='margin-top-2 margin-bottom-1'
                    />
                    <Input
                        type="email"
                        placeholder="Enter your Email ID"
                        value={updatedData.email_id}
                        name='email_id'
                        disabled= {true}
                        onChange={(e) => handleChangeData(e)}
                    />
                    <Heading
                        title='Company*'
                        type={TypographyType.h5}
                        colour={TypographyColor.dark}
                        classname='margin-top-2 margin-bottom-1'
                    />
                    <Input
                        type="text"
                        placeholder="Enter your company"
                        value={updatedData?.company}
                        name='company'
                        onChange={(e) => handleChangeData(e)}
                    />
                    <Heading
                        title='Company Type*'
                        type={TypographyType.h5}
                        colour={TypographyColor.dark}
                        classname='margin-top-2 margin-bottom-1'
                    />
                    <Select
                        options={settings?.company_types}
                        onChange={(e) => handleChangeData(e)}
                        value={updatedData?.company_type}
                        labelKey='name'
                        valueKey='name'
                        size={SelectSize.large}
                        name='company_type'
                        classname='padding-left-right-3'
                    />
                    <Heading
                        title='Role*'
                        type={TypographyType.h5}
                        colour={TypographyColor.dark}
                        classname='margin-top-2 margin-bottom-1'
                    />
                    <Select
                        options={settings?.roles}
                        onChange={(e) => handleChangeData(e)}
                        value={updatedData?.role}
                        labelKey='name'
                        valueKey='name'
                        size={SelectSize.large}
                        name='role'
                        classname='padding-left-right-3'
                    />
                    <Body
                        type={BodyType.p3}
                        color={BodyColor.dark}
                        classname='Note'>
                        Note: Admins will be able to invite users to the platform
                    </Body>
                    <Button
                        theme={ButtonTheme.primary}
                        size={ButtonSize.large}
                        variant={ButtonVariant.bordered}
                        onClick={() => handleUpdateClick()}
                        classname='margin-top-bottom-3 height-3'
                    >
                        Update
                    </Button>
                </div>
            </Drawer>
        </div>
    );
}

export default EditInvite;

