/* eslint-disable react-hooks/exhaustive-deps */
// External libraries
import { useRecoilValue } from "recoil";

// Components
import Profile from './profile/Profile';
import Settings from './settings/Settings';
import Invite from './invite/Invite';
import { visiblePanelState } from '../../../../states';


const DetailsContainer = () => {
    const visiblePanel = useRecoilValue(visiblePanelState);

    return (
        <div className='col-lg-9 col-md-9 col-sm-9 col-9 h-100 z-index-0 padding-right-5'>
            {visiblePanel === '/profile' ? <Profile /> : visiblePanel === '/settings' ? <Settings /> : <Invite />}
        </div>
    );
}

export default DetailsContainer;
