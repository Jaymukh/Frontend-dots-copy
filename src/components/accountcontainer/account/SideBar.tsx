// External libraries
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { useNavigate } from 'react-router-dom';

// CSS
import '../../../styles/main.css';

// Components
import { Heading, TypographyColor, TypographyType } from '../../ui/typography/Heading';
import Body, { BodyColor, BodyType } from '../../ui/typography/Body';
import { loggedUserState, spinnerState, visiblePanelState } from '../../../states';

// Utilities
import * as Constants from '../../../utils/constants/Constants';

const SideBar = () => {
    const navigate = useNavigate();
    const loggedUser = useRecoilValue(loggedUserState);
    const [visiblePanel, setVisiblePanel] = useRecoilState(visiblePanelState);
    const setSpinner = useSetRecoilState(spinnerState);

    const handleItemClick = (data: string) => {        
        setVisiblePanel('/' + data);
        navigate('/' + data);  
    }

    return (
        <div className='account-sidebar col-lg-3 col-md-3 col-sm-3 col-3 padding-0 padding-right-3 h-100'>
            <div className="h-100 bg-white full-height d-flex flex-column justify-content-between w-100" style={{ height: '81.5vh' }}>
                <ul className='sidebar-ul'>
                    {Constants.sidebarData.map((data, index) => (
                        (loggedUser.role === 'Admin' || data.index !== 2) 
                        && (
                            <li className='padding-0 margin-0' key={index}>
                                <button
                                    className={`list-item-button ${'/' + (data.option).toLowerCase() === visiblePanel ? 'li-selected' : 'li-not-selected'
                                        }`}
                                    onClick={() => handleItemClick((data.option).toLowerCase())}
                                >
                                    <Body 
                                    color={BodyColor.secondary}
                                    type={BodyType.p3}
                                    classname='margin-left-right-3 li-icon'>
                                        {data.icon}
                                    </Body>
                                    <Heading
                                        title={data.option}
                                        colour={TypographyColor.dark}
                                        type={TypographyType.h4}
                                        classname='margin-top-bottom-0'
                                    />
                                </button>
                            </li>
                        )
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default SideBar;
