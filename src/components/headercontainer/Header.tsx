// External libraries
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BsFillBookmarksFill } from 'react-icons/bs';

// CSS
import '../../styles/main.css';

// Components
import AccountOptions from './AccountOptions';
import ExploreNow from './ExploreNow';
import WIPDrawer from '../mapContainer/WIPDrawer';
import HelpOptions from './helpcontainer/HelpOptions';
import { Button, ButtonTheme, ButtonSize, ButtonVariant } from '../ui/button/Button';

// Utilities
import Logo from '../../utils/images/EPIC logo and intelligence-01.svg';
import { RouteConstants } from '../../constants';
import { useSetRecoilState } from 'recoil';
import { spinnerState } from '../../states';


function Header() {
	const navigate = useNavigate();
	const [open, setOpen] = useState(false);
	const [text, setText] = useState<{ title: string, description: string }>({ title: '', description: '' });
	const bookmarkDescription = 'Bookmarks can help you revisit your maps of interest and help you compare with other maps for quicker analysis!'
	const setSpinner = useSetRecoilState(spinnerState);
	
	const onLogoClick = () => {		
		navigate(`${RouteConstants.root}?country=1`);
	}

	const closeWIPDrawer = () => {
		setOpen(false);
		setText({ title: '', description: '' });
	};

	const handleDrawer = (title: string) => {
		setText({ title: title, description: bookmarkDescription });
		setOpen(true);
	}

	return (
		<div className="d-flex justify-content-between align-items-center border-bottom bg-white w-100" style={{ height: '8.25vh' }} >
			<div className="d-flex  margin-left-right-4 align-items-center col-xl-4 col-lg-4 col-md-4 col-sm-12 col-12">
				<img src={Logo} alt="logo" onClick={onLogoClick} className='cursor-pointer margin-left-0 logo-height' />
			</div>
			<div className="d-flex justify-content-between align-items-center padding-left-right-3 col-xl-3 col-lg-3 col-md-3 col-sm-12 col-12 ">
				<ExploreNow />
				<HelpOptions />
				<Button
					theme={ButtonTheme.primary}
					size={ButtonSize.small}
					variant={ButtonVariant.transparent}
					onClick={() => handleDrawer('Add Bookmark')}
					classname='padding-left-right-0'
				>
					<BsFillBookmarksFill className="fs-20" />
				</Button>
				<AccountOptions />
			</div>

			{open && <WIPDrawer open={open} title={text.title} description={text.description} closeWIPDrawer={closeWIPDrawer} />}

		</div>
	);
}

export default Header;