// External libraries
import React, { useEffect, useState } from 'react'

// CSS
import '../../../../../styles/main.css';

// Components
import { Heading, TypographyColor, TypographyType } from '../../../../ui/typography/Heading';
import Body, { BodyType, BodyColor } from '../../../../ui/typography/Body';
import Select, { SelectSize } from '../../../../ui/select/Select';
import { Button, ButtonTheme, ButtonSize, ButtonVariant } from '../../../../ui/button/Button';
import Switch from '../../../../ui/switch/Switch';
import Drawer from '../../../../ui/Drawer';
import { AllSettingsState, UserSettingsState, spinnerState, authState, userCurrencyState } from '../../../../../states';
import { useRecoilState } from 'recoil';

// Utilities

interface EditSettingProps {
    editMode: boolean;
    handleEditClick: (editMode: boolean) => void;
    handleUpdateUserSettings: (updatedData: any) => void;
}

const EditSetting: React.FC<EditSettingProps> = ({ editMode, handleEditClick, handleUpdateUserSettings }) => {
    const [settings, setSettings] = useRecoilState(AllSettingsState);
    const [usersettings, setUserSettings] = useRecoilState(UserSettingsState);
    const [updatedData, setUpdatedData] = useState(usersettings);
    const [isChecked, setIsChecked] = useState(updatedData?.email_notification);

    const toggleSwitch = () => {
        const newValue = !isChecked;
        setIsChecked(newValue);
        setUpdatedData({ ...updatedData, email_notification: newValue });
    };

    const handleChangeData = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const name = e.target.name;
        const value = e.target.value;
        setUpdatedData({ ...updatedData, [name]: value });
    };
    
    useEffect(() => {
        setUpdatedData(usersettings);
    }, [usersettings])

    return (
        <Drawer
            id='edit-setting'
            title='Edit Setting'
            isOpen={editMode}
            toggleFunction={handleEditClick}
        >
            <div className='d-flex flex-column align-items-start justify-content-center text-start'>
                <Heading
                    title='Language Preference'
                    type={TypographyType.h5}
                    colour={TypographyColor.dark}
                    classname='margin-top-2 margin-bottom-1'
                />
                <Select
                    options={settings?.languages}
                    value={updatedData?.language}
                    labelKey='name'
                    valueKey='name'
                    size={SelectSize.large}
                    name='language'
                    disabled={false}
                    onChange={(e) => handleChangeData(e)}
                />
                <Heading
                    title='Currency Preference'
                    type={TypographyType.h5}
                    colour={TypographyColor.dark}
                    classname='margin-top-2 margin-bottom-1'
                />
                <Select
                    options={settings?.currencies}
                    value={updatedData?.currency}
                    labelKey='name'
                    valueKey='code'
                    size={SelectSize.large}
                    name='currency'
                    disabled={false}
                    onChange={(e) => handleChangeData(e)}
                />
                <Heading
                    title='Location Focus'
                    type={TypographyType.h5}
                    colour={TypographyColor.dark}
                    classname='margin-top-2 margin-bottom-1'
                />
                <Select
                    options={settings?.locations}
                    value={updatedData?.location}
                    labelKey='name'
                    valueKey='name'
                    size={SelectSize.large}
                    name='location'
                    disabled={false}
                    onChange={(e) => handleChangeData(e)}
                />
                <Heading
                    title='Notifications'
                    type={TypographyType.h5}
                    colour={TypographyColor.dark}
                    classname='margin-top-2 margin-bottom-1'
                />
                <div className={`w-100 d-flex justify-content-between align-items-center padding-left-right-2 padding-top-bottom-2 input-div `} aria-disabled={false}>
                    <Body
                        type={BodyType.p2}
                        color={BodyColor.dark}
                        classname=''>Receive email notifications</Body>

                    <Switch
                        isChecked={isChecked}
                        toggleSwitch={toggleSwitch}
                        name='email_notification'
                        disabled={false}
                    />
                </div>
                <Button
                    theme={ButtonTheme.primary}
                    size={ButtonSize.large}
                    variant={ButtonVariant.bordered}
                    onClick={() => handleUpdateUserSettings(updatedData)}
                    classname='margin-top-bottom-3 height-3'
                >
                    Update
                </Button>
            </div>
        </Drawer>
    )
}

export default EditSetting;
