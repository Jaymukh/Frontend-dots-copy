/* eslint-disable react-hooks/exhaustive-deps */
// External libraries
import React, { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { GiPlainCircle } from 'react-icons/gi';
import { GoCheckCircleFill } from 'react-icons/go';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { FaAnglesDown } from 'react-icons/fa6';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';

// CSS
import '../../styles/main.css';

// Components
import { Button, ButtonTheme, ButtonSize, ButtonVariant } from '../ui/button/Button';
import { Heading, TypographyColor, TypographyType } from '../ui/typography/Heading';
import Body, { BodyType, BodyColor } from '../ui/typography/Body';

// Utilities
import { useUserService } from '../../services';
import { RouteConstants, } from '../../constants';
import CheckGIF from "../../utils/images/Accept State-01.svg";
import globe from '../../utils/images/LoginGlobe.svg';
import ErrorState from '../../utils/images/Error State-FINAL.svg';
import { useMapHelpers } from '../../helpers';
import { useSetRecoilState } from 'recoil';
import { spinnerState } from '../../states';


const UpdatePassword = () => {
    const navigate = useNavigate();
    const userService = useUserService();
    const [searchParams] = useSearchParams();
    const { getErrorMsg } = useMapHelpers();
    const token = searchParams.get('token');
    const [passwordCreated, setPasswordCreated] = useState(false);
    const [isTokenValid, setIsTokenValid] = useState(false);
    const [error, setError] = useState<string>('');
    const setSpinner = useSetRecoilState(spinnerState);
    const validationSchema = Yup.object().shape({
        new_password: Yup.string()
            .required('Password is required')
            .min(8, 'Password must be at least 8 characters')
            .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
            .matches(/[!@#$%^&*(),.?":{}|<>]/, 'Password must contain at least one special character')
            .matches(/[0-9]/, 'Password must contain at least one number'),
        confirm_new_password: Yup.string()
            .oneOf([Yup.ref('new_password')], 'Passwords must match')
            .required('Confirm password is required'),
    });

    const { handleSubmit, register, formState } = useForm({
        resolver: yupResolver(validationSchema),
    });
    const { errors, isSubmitting, isValid } = formState;

    const [conditions, setConditions] = useState({
        lengthCheck: false,
        uppercase: false,
        specialChar: false,
        number: false,
    });

    const validationOptions = [
        { key: 'lengthCheck', text: '8 Characters' },
        { key: 'uppercase', text: 'Contains Uppercase' },
        { key: 'specialChar', text: 'Contains Special character' },
        { key: 'number', text: 'Contains Number' },
    ];

    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newPassword = e.target.value;
        setConditions({
            lengthCheck: newPassword.length >= 8,
            uppercase: /[A-Z]/.test(newPassword),
            specialChar: /[!@#$%^&*(),.?":{}|<>]/.test(newPassword),
            number: /\d/.test(newPassword),
        });
    };

    const [isVisible, setIsVisible] = useState(false);
    const toggleVisibility = () => {
        setIsVisible(!isVisible);
    }

    const onSubmit = (values: any) => {
        if (Object.values(errors).length > 0) {
            return;
        }
        userService.setNewPassword({ ...values, token: token })
            .then((response: any) => {
                setPasswordCreated(true);
            })
            .catch(error => {
                getErrorMsg(error);
            });
    };

    const handleContinue = () => {
        navigate(RouteConstants.login);
    }

    useEffect(() => {
        setSpinner(true);
        userService.validateToken({ token: token })
            .then((response: any) => {
                setIsTokenValid(true);
                setSpinner(false);
            })
            .catch((error: any) => {
                setIsTokenValid(false);
                setSpinner(false);
                setError(error?.response?.data?.detail);
            });
    }, []);


    return (
        <div className='row margin-left-right-0' style={{ height: '100vh', width: '100vw' }} >
            <div className='col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6 login-update-box bg-white'>
                <div className='loginCardAlign'>
                    <img src={globe} alt='enmasse' style={{ width: '100%' }} />
                    <div>
                        <Heading
                            title='EPIC Intelligence by Enmasse™'
                            type={TypographyType.h2}
                            colour={TypographyColor.dark}
                        />
                        <Body
                            type={BodyType.p1}
                            color={BodyColor.muted}
                        >
                            Welcome to the beta version of EPIC Intelligence, the location insights product that enables companies serving Entrepreneurial Households™ to address the multi-trillion dollar EPIC Opportunity™ at scale.
                        </Body>
                        <a href="#login" className="down-arrow"> <FaAnglesDown /></a>
                    </div>
                </div>
            </div>
            <div className='col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6 login-update-box '>
                {!isTokenValid ?
                    <div className='loginCardAlign'>
                        <div className='d-flex justify-content-center'>
                            <img src={ErrorState} alt="Error" width={310} height={310}></img>
                        </div>
                        <Heading
                            title={error?.split(':')[0] ? error?.split(':')[0] : 'Something went wrong!'}
                            type={TypographyType.h2}
                            colour={TypographyColor.dark}
                            classname='text-center margin-bottom-2'
                        />
                        <Body
                            type={BodyType.p2}
                            color={BodyColor.muted}
                            classname='margin-bottom-3 text-center'
                        >
                            {error?.split(':')[1] ? error?.split(':')[1] : 'Please try again by setting the password again from the invite link. If the problem persists, please contact us by replying to the email you received the invite from'}
                        </Body>
                        <Button
                            theme={ButtonTheme.primary}
                            size={ButtonSize.large}
                            variant={ButtonVariant.bordered}
                            type='button'
                            onClick={handleContinue}
                            classname='margin-top-3 height-3'
                        >
                            Visit website
                        </Button>
                    </div>
                    : (passwordCreated ?
                        <div className='loginCardAlign'>
                            <div className='d-flex justify-content-center'>
                                <img src={CheckGIF} alt="Created Successfully GIF" width={319} height={319}></img>
                            </div>
                            <Heading
                                title='Created Successfully'
                                type={TypographyType.h2}
                                colour={TypographyColor.dark}
                                classname='text-center margin-bottom-2'
                            />
                            <Body
                                type={BodyType.p2}
                                color={BodyColor.muted}
                                classname='margin-bottom-3 text-center'
                            >
                                Password created successfully!
                            </Body>
                            <Button
                                theme={ButtonTheme.primary}
                                size={ButtonSize.large}
                                variant={ButtonVariant.bordered}
                                type='button'
                                onClick={handleContinue}
                                classname='margin-top-3'
                            >
                                Continue
                            </Button>
                        </div>
                        :
                        <form className='loginCardAlign' onSubmit={handleSubmit(onSubmit)}>
                            <Heading
                                title='Create a Password'
                                id='login'
                                type={TypographyType.h2}
                                colour={TypographyColor.dark}
                                classname='margin-bottom-2'
                            />
                            <Body
                                type={BodyType.p2}
                                color={BodyColor.muted}
                                classname='margin-bottom-3'
                            >
                                Create password for your account.
                            </Body>
                            <Heading
                                title='Password'
                                type={TypographyType.h4}
                                colour={TypographyColor.dark}
                                classname='margin-top-3 text-start'
                            />
                            <div className='input-wrapper'>
                                <input
                                    type={isVisible ? 'text' : 'password'}
                                    // name='new_password'
                                    {...register("new_password", {
                                        onChange: (e) => {
                                            handlePasswordChange(e)
                                        }
                                    })}
                                    className='margin-top-bottom-1 padding-left-right-2 inputBoxHeight w-100'
                                    placeholder='Enter your password here'
                                />
                                <Body
                                    type={BodyType.p3}
                                    color={BodyColor.dark}
                                    classname='eye-icon'
                                    onClick={toggleVisibility}
                                >
                                    {isVisible ? <FaEye className="fs-22" /> : <FaEyeSlash className="fs-22" />}
                                </Body>
                            </div>
                            {errors?.new_password?.message
                                && <Body
                                    type={BodyType.p3}
                                    color={BodyColor.warning}
                                    classname='margin-0 padding-0'
                                >
                                    {errors?.new_password?.message}
                                </Body>
                            }
                            <div className="row margin-top-bottom-2">
                                {validationOptions.map((item: { key: string, text: string }, index: number) => (
                                    <div className='col-12 col-sm-12 col-md-12 col-lg-6 col-xl-6 d-flex align-items-center padding-right-0'>
                                        {conditions[item?.key as keyof typeof conditions] ? <GoCheckCircleFill className='color-purple fs-18' /> : <GiPlainCircle color='#CECECE' className='fs-18' />}
                                        <Body
                                            type={BodyType.p3}
                                            color={BodyColor.dark}
                                            classname='margin-left-2'>
                                            {item.text}
                                        </Body>
                                    </div>
                                ))}
                            </div>
                            <Heading
                                title='Confirm password'
                                type={TypographyType.h4}
                                colour={TypographyColor.dark}
                                classname='text-start'
                            />
                            <input
                                type="password"
                                // name="confirm_new_password"
                                {...register("confirm_new_password")}
                                className='margin-top-bottom-1 padding-left-right-2 inputBoxHeight w-100'
                                placeholder='Re enter your password here' />
                            {errors?.confirm_new_password?.message
                                && <Body
                                    type={BodyType.p3}
                                    color={BodyColor.warning}
                                    classname='margin-0 padding-0'
                                >
                                    {errors?.confirm_new_password?.message}
                                </Body>
                            }
                            <Button
                                theme={ButtonTheme.primary}
                                size={ButtonSize.large}
                                variant={ButtonVariant.bordered}
                                type='submit'
                                classname='margin-top-3'
                                disabled={!isValid}
                            >
                                {isSubmitting
                                    && <Body
                                        type={BodyType.p3}
                                        color={BodyColor.dark}
                                        classname='spinner-border spinner-border-sm margin-right-3'
                                    />
                                }
                                Create Password
                            </Button>
                        </form>)
                }
            </div>
        </div>
    )
}

export default UpdatePassword;