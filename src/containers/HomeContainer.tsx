// CSS
import '../styles/main.css';

// Components
import Header from '../components/headercontainer/Header';
import MapContainer from '../components/mapContainer/MapContainer';
import { useEffect } from 'react';
import ReactGA from 'react-ga4';

const HomeContainer = () => {
	useEffect(() => {
		ReactGA.send({ hitType: "pageview", page: window.location.href, title: "Home Page" });
	}, []);
	return (
		<>
			<div className='w-100 primary-bg fixed-header'>
				<Header />
				<MapContainer />
			</div>
		</>
	);
};

export default HomeContainer;