/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from 'react';
import styles from "./Toast.module.css";
import { IoIosCheckmarkCircle } from "react-icons/io";
import { BiSolidErrorCircle } from 'react-icons/bi';
import { AiOutlineClose } from "react-icons/ai";
import { errorState } from '../../../states';
import { useRecoilState } from 'recoil';
import { Button, ButtonTheme, ButtonVariant } from '../button/Button';

const Toast = () => {
    const [error, setError] = useRecoilState(errorState);

    const onClose = () => {
        setError(null);
    };

    const getTypeClass = (type: string) => {
        if (!type) {
            return '';
        }

        let className = "";
        switch (type) {
            case 'Error':
                className = `${styles.error_toast}`;
                break;
            case 'Success':
                className = `${styles.success_toast}`;
        }
        return className;
    }

    useEffect(() => {
        if (error) {
            const timer = setTimeout(() => {
                onClose();
            }, 7000);
            return () => clearTimeout(timer);
        }
    }, [error]);

    return (
        <>
            {error && <div className={`d-flex align-items-center justify-content-between padding-left-right-3 ${styles.alert_box} ${getTypeClass(error?.type)}`}>
                <div className='d-flex align-items-center'>
                    {error?.type === 'Error' 
                    ? <BiSolidErrorCircle className="fs-43" color='rgba(180, 51, 28, 1)' /> 
                    // : <IoIosCheckmarkCircle className="fs-43" color='rgba(16, 128, 65, 1)' />} 
                    : <IoIosCheckmarkCircle className="fs-43" color='rgba(43, 13, 92, 1)' />}
                    <div className='margin-left-right-3'>
                        <h6 className={`${styles.alert_title} text-start margin-bottom-1 padding-0`}>{error?.type}</h6>
                        <p className={`${styles.alert_description} margin-0 padding-0 text-start`}>{error?.message}</p>
                    </div>
                </div>
                <div className='d-flex align-items-start h-100 padding-top-bottom-3 padding-right-1'>
                    <Button
                        theme={ButtonTheme.primary}
                        variant={ButtonVariant.transparent}
                        onClick={onClose}
                        type='button'
                        classname='padding-left-right-0'
                    >
                        <AiOutlineClose className="fs-20" />
                    </Button>
                </div>

            </div>}
        </>
    );
};

export default Toast;
