// External libraries
import React from 'react';
import { BiArrowBack } from 'react-icons/bi';
import { useNavigate } from 'react-router-dom';

// CSS
import '../../styles/main.css';

// Components
import { Button, ButtonTheme, ButtonSize, ButtonVariant } from '../ui/button/Button';

const AccountHeader: React.FC<{ routeTo?: string }> = ({ routeTo }) => {
    const navigate = useNavigate();

    return (
        <div className="w-100 d-flex align-items-center bg-white margin-left-right-0 ps-6 border-bottom z-index-0" style={{ height: '5.5vh' }}>
            <Button
                theme={ButtonTheme.primary}
                size={ButtonSize.default}
                variant={ButtonVariant.transparent}
                onClick={() => routeTo ? navigate(routeTo) : navigate(-1)}
                classname='margin-0 h-auto'
            >
                <BiArrowBack className='margin-right-2 fs-22' />
                Back
            </Button>
        </div>
    );
}

export default AccountHeader;
