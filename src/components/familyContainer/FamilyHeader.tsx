/* eslint-disable @typescript-eslint/no-unused-vars */
// External libraries
import { useNavigate, useSearchParams } from 'react-router-dom';
import { BiArrowBack } from 'react-icons/bi';

// CSS
import '../../styles/main.css';

// Components
import { Button, ButtonTheme, ButtonSize, ButtonVariant } from '../ui/button/Button';

// Utilities
import { RouteConstants } from '../../constants';
import { spinnerState } from '../../states';
import { useSetRecoilState } from 'recoil';


function FamilyHeader() {
    const navigate = useNavigate();
    const [searchParams, setSearchParams] = useSearchParams();
    const setSpinner = useSetRecoilState(spinnerState);

    const onNavigateBack = () => {
        const currentParams = new URLSearchParams(searchParams.toString());
        currentParams.delete('story_id');
        navigate({
            pathname: RouteConstants.stories,
            search: `?${currentParams.toString()}`,
        });
        setSpinner(true);
    }

    return (
        <div className="w-100 d-flex align-items-center bg-white margin-left-right-0 ps-6 border-bottom z-index-0" style={{ height: '5.5vh' }}>
            <Button
                theme={ButtonTheme.primary}
                size={ButtonSize.default}
                variant={ButtonVariant.transparent}
                onClick={onNavigateBack}
                classname='h-auto'
            >
                <BiArrowBack className='margin-right-2 h-auto fs-22' />
                Back
            </Button>
        </div>
    );
}

export default FamilyHeader;
