// External libraries
import React from 'react';
import { useSetRecoilState } from 'recoil';
import { GoogleMap, LoadScript } from '@react-google-maps/api';

// CSS
import '../../styles/main.css';

// Components
import GlobalOverlayCard from '../GlobalOverlayCard';
import InsightBar from '../InsightBar';
import { errorState } from '../../states';

// Utilities
import * as MapConstants from '../../utils/json/googlemapstyle';


interface GlobalMapProps {
	features?: any; // Replace 'any' with the actual type of 'features' if available
	handleImportFeature?: (code: string) => void;
}

const GlobalMap: React.FC<GlobalMapProps> = ({ features, handleImportFeature }) => {
	const setError = useSetRecoilState(errorState);
	const apiKey = process.env.REACT_APP_GOOGLE_API_KEY || '';
	const center = {
		lat: 20.5937,
		lng: 78.9629
	};

	const handleMapClick = (event: google.maps.MapMouseEvent) => {
		const geocoder = new window.google.maps.Geocoder();
		geocoder.geocode({ location: event.latLng }, (results, status) => {
			if (status === 'OK' && Array.isArray(results) && results.length > 0) {
				const country = results.find((component) => component.types.includes('country'));
				if (country) {
					// const countryCode = country.address_components?.[0]?.short_name || '';
					//handleImportFeature(countryCode);
				}
			} else {
				setError({ type: 'Error', message: 'Geocode was not successful' });
			}
		});
	};


	const mapOptions: google.maps.MapOptions = {
		disableDefaultUI: true,
		zoomControl: false,
		styles: MapConstants.gmapstyle
	};

	return (
		<div className='map row margin-left-right-0'
			style={{ height: '85.5vh', width: '100vw' }}
		>
			<div className='row bg-transparent h-100 w-100 overlay-card padding-left-right-0 margin-0'>
				<div className='col-8'>
					<GlobalOverlayCard />
				</div>
				<div className='col-4 padding-left-right-0 d-flex justify-content-end'>
					<InsightBar />
				</div>
			</div>
			<LoadScript googleMapsApiKey={apiKey}>
				<GoogleMap mapContainerStyle={MapConstants.containerStyle} center={center} zoom={1.5} options={mapOptions} onClick={handleMapClick}>
				</GoogleMap>
			</LoadScript>
		</div>
	);
};

export default GlobalMap;
