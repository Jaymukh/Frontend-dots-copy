// External libraries
import { useEffect, useState } from 'react';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from "react-hook-form";
import { useSetRecoilState } from "recoil";
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import ReactGA from 'react-ga4';
import { FaAnglesDown } from "react-icons/fa6";

// CSS
import '../../styles/main.css';

// Components
import globe from '../../utils/images/LoginGlobe.svg';
import ForgotPassword from './ForgotPassword';
import EmailSent from './EmailSent';
import TermsAndConditions from './TermsAndConditions';
import { Button, ButtonTheme, ButtonSize, ButtonVariant } from '../ui/button/Button';
import { Heading, TypographyColor, TypographyType } from '../ui/typography/Heading';
import Body, { BodyType, BodyColor } from '../ui/typography/Body';
import { errorState, spinnerState } from "../../states";

// Utilities
import { useUserService } from '../../services';
import { useMapHelpers } from '../../helpers';
import { ClearObjectStore, Stores, RetrieveAllData } from '../../indexDBdatabase/db';


interface IFormValues {
    email_id: string;
    password: string;
}

interface IModal {
    passwordModal: boolean;
    sendMailModal: boolean;
    tncModal: boolean;
}

export default function Login() {
    const userService = useUserService();
    const setSpinner = useSetRecoilState(spinnerState);
    const { getErrorMsg } = useMapHelpers();
    const setError = useSetRecoilState(errorState);
    const [email, setEmail] = useState('');
    const [showModal, setShowModal] = useState<IModal>({
        passwordModal: false,
        sendMailModal: false,
        tncModal: false
    })

    const validationSchema = Yup.object().shape({
        email_id: Yup.string()
            .required('Email is required')
            .email("Email is not valid")
            .matches(/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/, 'Email is not valid'),
        password: Yup.string()
            .required('Password is required')
    });

    const { handleSubmit, register, formState } = useForm({
        resolver: yupResolver(validationSchema),
    });
    const { errors, isSubmitting, isValid } = formState;

    const onSubmit = (values: IFormValues) => {
       
       
        RetrieveAllData(Stores.Users);
        // ClearObjectStore(Stores.Users)
        // ReactGA.exception({
        //     description: 'An error ocurred',
        //     fatal: true
        // });
        if (Object.values(errors).length > 0) {
            return;
        }
        userService.login(values);
    }

    const handleModal = (value: any) => {
        setShowModal({ ...showModal, ...value });
    }

    const handleEmailChange = (value: string) => {
        setEmail(value);
    }

    const handleSendEmail = () => {
        setSpinner(true);
        userService.forgotPassword({ "email_id": email })
            .then((response: any) => {
                if (response) {
                    setError({ type: 'Success', message: response.detail });
                    setSpinner(false);
                }
            })
            .catch((error: any) => {
                setSpinner(false);
                getErrorMsg(error);
            });
        setEmail('');
        handleModal({ passwordModal: false });
    }

    const [isVisible, setIsVisible] = useState(false);
    const toggleVisibility = () => {
        setIsVisible(!isVisible);
    }

    useEffect(() => {
        ReactGA.send({ hitType: "pageview", page: window.location.href, title: "Login Page" });
    }, []);

    return (
        <div>
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
                    <div className='loginCardAlign' >
                        <Heading
                            title='Login'
                            id='login'
                            type={TypographyType.h2}
                            colour={TypographyColor.dark}
                        />
                        <Body
                            type={BodyType.p1}
                            color={BodyColor.muted}
                            classname='margin-bottom-4'
                        >
                            Enter your email ID and Password to login
                        </Body>
                        <form className='loginCardAlign w-100' onSubmit={handleSubmit(onSubmit)}>
                            <Heading
                                title='Email'
                                type={TypographyType.h5}
                                colour={TypographyColor.dark}
                            />
                            <input
                                {...register("email_id")}
                                className='margin-top-bottom-1 padding-left-right-2 inputBoxHeight w-100'
                                placeholder='Enter your email id here'
                            />
                            {errors?.email_id?.message
                                && <Body
                                    type={BodyType.p3}
                                    color={BodyColor.warning}
                                    classname='margin-0 padding-0'
                                >
                                    {errors?.email_id?.message}
                                </Body>
                            }
                            <div className='d-flex flex-row justify-content-between align-items-center margin-top-2 '>
                                <Heading
                                    title='Password'
                                    type={TypographyType.h5}
                                    colour={TypographyColor.dark}
                                    classname='margin-bottom-0'
                                />
                                <Button
                                    type='button'
                                    theme={ButtonTheme.primary}
                                    size={ButtonSize.default}
                                    variant={ButtonVariant.transparent}
                                    onClick={() => handleModal({ passwordModal: true })}
                                    classname='fw-bold text-decoration-underline h-50'
                                >
                                    Forgot password?
                                </Button>
                            </div>
                            <div className='input-wrapper'>
                                <input
                                    type={isVisible ? 'text' : 'password'}
                                    // name='password'
                                    {...register("password")}
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
                            {errors?.password?.message
                                && <Body
                                    type={BodyType.p3}
                                    color={BodyColor.warning}
                                    classname='margin-0 padding-0'
                                >
                                    {errors?.password?.message}
                                </Body>
                            }
                            <Button
                                type='submit'
                                classname='margin-bottom-2 margin-top-4 height-3'
                                disabled={!isValid}
                                size={ButtonSize.large}
                                theme={ButtonTheme.primary}
                                variant={ButtonVariant.bordered}
                            >
                                {isSubmitting
                                    && <Body
                                        type={BodyType.p3}
                                        color={BodyColor.dark}
                                        classname='spinner-border spinner-border-sm margin-right-3'
                                    />
                                }Login
                            </Button>
                        </form>
                        <Body
                            type={BodyType.p1}
                            color={BodyColor.secondary}
                            classname='margin-bottom-0 margin-top-2'
                        >
                            By clicking on continue you are agreeing to the Enmasse&nbsp;
                            <Button
                                theme={ButtonTheme.primary}
                                size={ButtonSize.large}
                                variant={ButtonVariant.transparent}
                                // onClick={() => handleModal({ tncModal: true })}
                                onClick={() => window.open(process.env.REACT_APP_TERMS_OF_USE, '_blank')}
                                classname='underline-text h-auto padding-0 w-auto'
                            >
                                Terms of Use
                            </Button>
                            &nbsp;and&nbsp;
                            <Button
                                theme={ButtonTheme.primary}
                                size={ButtonSize.large}
                                variant={ButtonVariant.transparent}
                                // onClick={() => handleModal({ tncModal: true })}
                                onClick={() => window.open(process.env.REACT_APP_PRIVACY_POLICY, '_blank')}
                                classname='underline-text h-auto padding-0 black w-auto'
                            >
                                Privacy Policy
                            </Button>
                        </Body>

                    </div>
                </div>

                {
                    showModal?.passwordModal && (
                        <ForgotPassword
                            showModal={showModal?.passwordModal}
                            handleModal={handleModal}
                            email={email}
                            handleEmailChange={handleEmailChange}
                            handleSendEmail={handleSendEmail}
                        />
                    )
                }

                {
                    showModal?.sendMailModal && (
                        <EmailSent
                            showModal={showModal?.sendMailModal}
                            handleModal={handleModal}
                            email={email}
                        />
                    )
                }

                {
                    showModal?.tncModal && (
                        <TermsAndConditions
                            showModal={showModal?.tncModal}
                            handleModal={handleModal}
                        />
                    )
                }
            </div >
        </div >
    )
}
