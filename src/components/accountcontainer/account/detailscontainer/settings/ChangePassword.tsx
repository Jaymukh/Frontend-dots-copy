/* eslint-disable @typescript-eslint/no-unused-vars */
// External libraries
import React, { useEffect, useState } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { GiPlainCircle } from 'react-icons/gi';
import { GoCheckCircleFill } from 'react-icons/go';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';

// CSS
import '../../../../../styles/main.css';

// Components
import { Heading, TypographyColor, TypographyType } from '../../../../ui/typography/Heading';
import { Button, ButtonSize, ButtonTheme, ButtonVariant } from '../../../../ui/button/Button';
import Body, { BodyColor, BodyType } from '../../../../ui/typography/Body';
import Drawer from '../../../../ui/Drawer';
import { authState } from '../../../../../states';

// Utilities
import { useUserService } from '../../../../../services';
import { useMapHelpers } from '../../../../../helpers';

interface ChangePasswordProps {
    open: boolean,
    handleUpdateClick: () => void,
    handleDrawer: (open: boolean) => void
    handleShowModal: (flag: boolean) => void;
}

const ChangePassword: React.FC<ChangePasswordProps> = ({ open, handleUpdateClick, handleDrawer, handleShowModal }) => {
    const userService = useUserService();
    const auth = useRecoilValue(authState);
    const { getErrorMsg } = useMapHelpers();

    const [filledInputCount, setFilledInputCount] = useState(0);

    const validationSchema = Yup.object().shape({
        current_password: Yup.string()
            .required('Current password is required'),
        new_password: Yup.string()
            .required('Password is required')
            .min(8, 'Password must be at least 8 characters')
            .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
            .matches(/[!@#$%^&*(),.?":{}|<>]/, 'Password must contain at least one special character')
            .matches(/[0-9]/, 'Password must contain at least one number')
            .test('different-password', 'New password cannot be the same as the current password', function (value) {
                const currentPassword = this.parent.current_password;
                return value !== currentPassword;
            }),
        confirm_new_password: Yup.string()
            .oneOf([Yup.ref('new_password')], 'Passwords must match')
            .required('Confirm password is required'),
    });

    const validationOptions = [
        { key: 'lengthCheck', text: '8 Characters' },
        { key: 'specialChar', text: 'Contains Special character' },
        { key: 'uppercase', text: 'Contains Uppercase' },
        { key: 'number', text: 'Contains Number' },
    ];

    const { handleSubmit, register, watch, formState } = useForm({
        resolver: yupResolver(validationSchema),
    });
    const { errors, isSubmitting } = formState;

    const [conditions, setConditions] = useState({
        lengthCheck: false,
        uppercase: false,
        specialChar: false,
        number: false,
    });

    const updateObject = watch();

    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newPassword = e.target.value;
        setConditions({
            lengthCheck: newPassword.length >= 8,
            uppercase: /[A-Z]/.test(newPassword),
            specialChar: /[!@#$%^&*(),.?":{}|<>]/.test(newPassword),
            number: /\d/.test(newPassword),
        });
    };

    const onSubmit = (values: any) => {
        if (Object.values(errors).length > 0) {
            return;
        }
        userService.changePassword({ ...values, refresh: auth?.tokens?.refresh })
            .then((response: any) => {
                handleDrawer(false);
                handleShowModal(true);
            })
            .catch(error => {
                getErrorMsg(error);
            });
    };

    useEffect(() => {
        const values = watch(); // Get all form values
        const count = Object.values(values).filter(Boolean).length;  //`Boolean` is called as a function and it converts its argument into a boolean value. 
        setFilledInputCount(count);
    }, [updateObject, watch]);

    return (
        <Drawer
            id='change-password'
            title='Change Password'
            isOpen={open}
            toggleFunction={handleDrawer}
        >
            <div className='d-flex flex-column align-items-start justify-content-center text-start'>
                <Body
                    type={BodyType.p2}
                    color={BodyColor.secondary}
                    classname=''>
                    You will be required to re-login after updating the password.
                </Body>
                <form className='d-flex flex-column align-items-start justify-content-center text-start' onSubmit={handleSubmit(onSubmit)}>
                    <Heading
                        title='Old Password*'
                        type={TypographyType.h5}
                        colour={TypographyColor.dark}
                        classname='margin-top-3 margin-bottom-1 text-start'
                    />
                    <input
                        type="password"
                        //name='current_password'
                        {...register("current_password")}
                        className='inputBoxHeight margin-bottom-1 margin-top-0 padding-left-right-2 fs-14 w-100'
                        placeholder='Old password'
                    />
                    {errors?.current_password?.message &&
                        <Body
                            type={BodyType.p3}
                            color={BodyColor.warning}
                            classname='margin-bottom-1'>
                            {errors?.current_password?.message}
                        </Body>
                    }
                    <Heading
                        title='New Password*'
                        type={TypographyType.h5}
                        colour={TypographyColor.dark}
                        classname='margin-top-3 margin-bottom-1 text-start'
                    />
                    <input
                        type="password"
                        //name='new_password'
                        {...register("new_password", {
                            onChange: (e) => {
                                handlePasswordChange(e)
                            }
                        })}
                        className='inputBoxHeight margin-bottom-1 margin-top-0 padding-left-right-2 fs-14 w-100'
                        placeholder='New password'
                    />
                    {errors?.new_password?.message &&
                        <Body
                            type={BodyType.p3}
                            color={BodyColor.warning}
                            classname=''>
                            {errors?.new_password?.message}
                        </Body>
                    }
                    <div className="row margin-top-2">
                        {validationOptions.map((item: { key: string, text: string }) => (
                            <div className="d-flex padding-right-0 margin-bottom-1">
                                {conditions[item?.key as keyof typeof conditions] ? <GoCheckCircleFill className='color-purple' /> : <GiPlainCircle color='#CECECE' />}
                                <Body
                                    type={BodyType.p3}
                                    color={BodyColor.secondary}
                                    classname='margin-left-2 margin-bottom-1'>
                                    {item.text}
                                </Body>
                            </div>
                        ))}
                    </div>
                    <Heading
                        title='Re enter new password*'
                        type={TypographyType.h5}
                        colour={TypographyColor.dark}
                        classname='margin-top-3 margin-bottom-1 text-start'
                    />
                    <input
                        type="password"
                        //name='confirm_new_password'
                        {...register("confirm_new_password")}
                        className='margin-bottom-1 margin-top-0 inputBoxHeight padding-left-right-2 fs-14 w-100'
                        placeholder='Confirm new password'
                    />
                    {errors?.confirm_new_password?.message &&
                        <Body
                            type={BodyType.p3}
                            color={BodyColor.warning}
                            classname=''>
                            {errors?.confirm_new_password?.message}
                        </Body>
                    }
                    <Button
                        type='submit'
                        classname='margin-bottom-0 margin-top-4 height-3'
                        size={ButtonSize.large}
                        theme={ButtonTheme.primary}
                        variant={ButtonVariant.bordered}
                    >
                        {isSubmitting
                            && <Body
                                type={BodyType.p3}
                                color={BodyColor.dark}
                                classname='spinner-border spinner-border-sm margin-right-3' />
                        }
                        Update
                    </Button>
                </form>
            </div>
        </Drawer>
    );
}
export default ChangePassword;

