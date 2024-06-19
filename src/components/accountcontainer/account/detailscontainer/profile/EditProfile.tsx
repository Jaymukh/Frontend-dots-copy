/* eslint-disable react-hooks/exhaustive-deps */
// External libraries
import React, { useEffect, useState } from 'react';
import { useRecoilState, useSetRecoilState } from "recoil";

// CSS
import '../../../../../styles/main.css';

// Components
import { Button, ButtonTheme, ButtonSize, ButtonVariant } from '../../../../ui/button/Button';
import { Heading, TypographyColor, TypographyType } from '../../../../ui/typography/Heading';
import Select, { SelectSize } from '../../../../ui/select/Select';
import { Input } from '../../../../ui/input/Input';
import Drawer from '../../../../ui/Drawer';
import { AllSettingsState, User, errorState, spinnerState } from "../../../../../states";

// Utilities
import { useSettingsService } from '../../../../../services';
import { useMapHelpers } from '../../../../../helpers';

interface EditProfileProps {
    selectedData: User;
    handleUpdate: (updatedRow: User) => void;
    open: boolean,
    handleOpen: () => void;
}

export default function EditProfile({
    selectedData,
    handleUpdate,
    open,
    handleOpen
}: EditProfileProps) {

    // all settings's data
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
        const name = e.target.name as keyof User;
        const value = e.target.value;
        if (name === 'phone_number') {
            const validValue = value.replace(/[^0-9+-]/g, '');
            setUpdatedData({ ...updatedData, [name]: validValue });
        }
        else {
            setUpdatedData({ ...updatedData, [name]: value });
        }
    };

    const handleUpdateClick = () => {
        if (updatedData.name && updatedData.email_id && updatedData.phone_number && updatedData.designation) {
            handleUpdate(updatedData);
        }
        else {
            setError({ type: 'Error', message: "All fields are mendatory!" });
        }
    };


    return (
        <Drawer
            id='edit-profile'
            title='Edit'
            isOpen={open}
            toggleFunction={handleOpen}
        >
            <div className='d-flex flex-column justify-content-start align-items-start'>
                <Heading
                    title='Name*'
                    type={TypographyType.h5}
                    colour={TypographyColor.dark}
                    classname='margin-top-0 margin-bottom-1'
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
                    classname='margin-top-3 margin-bottom-1'
                />
                <Input
                    type="email"
                    placeholder="Enter your Email ID"
                    value={updatedData.email_id}
                    name='email_id'
                    onChange={(e) => handleChangeData(e)}
                    disabled={true}
                />
                <Heading
                    title='Phone Number*'
                    type={TypographyType.h5}
                    colour={TypographyColor.dark}
                    classname='margin-top-3 margin-bottom-1'
                />
                <Input
                    type="tel"
                    placeholder="Enter your Phone number"
                    value={updatedData.phone_number}
                    name='phone_number'
                    maxlength={15}
                    onChange={(e) => handleChangeData(e)}
                    pattern="[0-9+-]*"
                />
                <Heading
                    title='Country*'
                    type={TypographyType.h5}
                    colour={TypographyColor.dark}
                    classname='margin-top-3 margin-bottom-1'
                />
                <Select
                    options={settings?.countries}
                    value={updatedData?.country}
                    labelKey='name'
                    valueKey='name'
                    size={SelectSize.large}
                    onChange={(e) => handleChangeData(e)}
                    name='company_type'
                    classname='padding-left-right-3'
                />
                <Heading
                    title='Company*'
                    type={TypographyType.h5}
                    colour={TypographyColor.dark}
                    classname='margin-top-3 margin-bottom-1'
                />
                <Input
                    type="text"
                    placeholder="Enter your Company name"
                    value={updatedData.company}
                    name='company'
                    onChange={(e) => handleChangeData(e)}
                />
                <Heading
                    title='Designation*'
                    type={TypographyType.h5}
                    colour={TypographyColor.dark}
                    classname='margin-top-3 margin-bottom-1'
                />
                <Input
                    type="text"
                    placeholder="Enter your designation"
                    value={updatedData.designation}
                    name='designation'
                    onChange={(e) => handleChangeData(e)}
                />
                <Heading
                    title='Role*'
                    type={TypographyType.h5}
                    colour={TypographyColor.dark}
                    classname='margin-top-3 margin-bottom-1'
                />
                <Select
                    options={settings?.roles}
                    value={updatedData?.role}
                    labelKey='name'
                    valueKey='name'
                    size={SelectSize.large}
                    onChange={(e) => handleChangeData(e)}
                    name='role'
                    disabled={true}
                    classname='padding-left-right-3'
                />
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
    );
}