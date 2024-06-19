// CSS
import '../styles/main.css';

// Components
import Header from '../components/headercontainer/Header';
import Family from '../components/familyContainer/family/Family';
import ReactGA from 'react-ga4';
import { useEffect } from 'react';

const StoryDetailsContainer = () => {
    useEffect(() => {
        ReactGA.send({ hitType: "pageview", page: window.location.href, title: "Story Details Page" });
    }, []);
    return (
        <div className='w-100 primary-bg fixed-header'>
            <Header />
            <div className="w-100 z-index-0" style={{ height: '91.75vh', position: 'inherit' }}>
                <Family />
            </div>
        </div>
    );
};

export default StoryDetailsContainer;
