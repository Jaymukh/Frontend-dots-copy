/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import '../../../styles/main.css';
import React, { useState, useCallback, useRef, useEffect } from 'react';
import { GoogleMap, Marker, useJsApiLoader } from '@react-google-maps/api';
import * as MapConstants from '../../../utils/json/googlemapstyle';
import { useMapsService, useUserService } from '../../../services';
import { errorState, geoJsonState, spinnerState, storiesState } from '../../../states';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { useSearchParams } from 'react-router-dom';
import markerPurple from '../../../utils/images/Location pin-purple-01.svg';
import markerGrey from '../../../utils/images/Location pin-gray-01.svg';
import { useMapHelpers } from '../../../helpers';

interface StaticMapProps {
	coordinates?: any;
	noMarkers?: boolean;
}

const StaticMap: React.FC<StaticMapProps>
	= ({ coordinates, noMarkers }) => {
		const mapRef = useRef(null);
		const mapServices = useMapsService();
		const [geoJSON, setGeoJSON] = useRecoilState(geoJsonState)
		const { family } = useRecoilValue(storiesState);
		const setSpinner = useSetRecoilState(spinnerState);
		const { getErrorMsg } = useMapHelpers();
		const [searchParams, setSearchParams] = useSearchParams();
		const [map, setMap] = useState<google.maps.Map | null>(null);
		const [focusedMarker, setFocusedMarker] = useState<any>(null);
		const [markers, setMarkers] = useState<any>([]);
		const [center, setCenter] = useState({
			lat: 20.5937,
			lng: 78.9629
		});

		const apiKey = process.env.REACT_APP_GOOGLE_API_KEY;

		const { isLoaded } = useJsApiLoader({
			id: 'google-map-script',
			googleMapsApiKey: apiKey || ''
		})

		const mapOptions = {
			disableDefaultUI: true,
			zoomControl: false,
			mapTypeControl: false,
			streetViewControl: false,
			styles: MapConstants.staticMapStyle,
			isFractionalZoomEnabled: true,
			keyboardShortcuts: false,
			gestureHandling: "none", //manual zoom handling
		};



		const handleMapLoad = useCallback((mapInstance: google.maps.Map) => {
			setMap(mapInstance);
			(mapInstance as any).circles = [];
		}, []);

		const fetchGeoJsonData = (geo_id: string) => {
			setSpinner(true);
			mapServices.getMaps(Number(geo_id)).then((data: any) => {				
				document.title = data?.rootProperties?.Name + ' | EPIC Intelligence | Enmasse';
				setGeoJSON(data);				
				setSpinner(false);
			}).catch(error => {
				setSpinner(false);
				getErrorMsg(error);
			});
		}

		useEffect(() => {
			if (coordinates) {
				const index = markers?.findIndex((item: any) => {
					return item.geometry.coordinates.join(',') === coordinates.join(',');
				});
				setFocusedMarker(index);
			}
		}, [coordinates, markers])

		useEffect(() => {
			if (!noMarkers) {
				const markerList = family?.filter((marker, index, self) => {
					return (
						self.findIndex((m) => m.geometry.coordinates.join(',') === marker.geometry.coordinates.join(',')) === index
					)
				});
				setMarkers(markerList);
			}
		}, [family]);

		useEffect(() => {
			const geoCode = searchParams.get('geo_code');
			fetchGeoJsonData(geoCode!);
		}, [searchParams.get('geo_code')]);

		useEffect(() => {
			if (map && Object.keys(geoJSON).length) {
				map.data.forEach((feature) => {
					map.data.remove(feature);
				});
				map.data.addGeoJson(geoJSON);

				map.data.setStyle((feature: any) => {
					const fillColor = feature.getProperty('Color');
					return {
						fillColor,
						fillOpacity: 1,
						strokeColor: '#ffffff',
						strokeWeight: 0.5,
					};
				});

				const processCoordinates = (coordinates: any) => {
					if (Array.isArray(coordinates[0])) {
						// Multi-part geometry, like a polygon with holes or a multi-line string
						coordinates.forEach((coordSet: any) => {
							processCoordinates(coordSet);
						});
					} else {
						// Single set of coordinates
						bounds.extend(new window.google.maps.LatLng(coordinates[1], coordinates[0]));
					}
				};

				const bounds = new window.google.maps.LatLngBounds();
				geoJSON?.features.forEach((feature: any) => {
					processCoordinates(feature.geometry.coordinates);
				});

				// Set map center and zoom level based on bounding box
				map.fitBounds(bounds);
				setCenter({ lat: bounds.getCenter().lat(), lng: bounds.getCenter().lng() });
			}
		}, [map, geoJSON]);

		return (
			<div style={{ height: '100%', width: '100%' }} className='d-flex flex-column align-items-center justify-content-center'>
				{isLoaded &&
					// && (
					// 	<LoadScript
					// 		googleMapsApiKey={apiKey}
					// 	>
					<GoogleMap
						ref={mapRef}
						zoom={6}
						mapContainerStyle={MapConstants.containerStyle}
						center={center}
						onLoad={handleMapLoad}
						options={mapOptions}
					>
						{markers?.map((marker: any, index: number) => (
							<Marker
								key={index}
								position={{
									lng: marker.geometry.coordinates[0],
									lat: marker.geometry.coordinates[1]
								}}
								icon={{
									url: focusedMarker === index ? markerPurple : markerGrey,
								}}
							//onClick={() => handleMarkerClick(marker, index)}
							/>
						))}
					</GoogleMap>}

			</div>
		);
	};

export default StaticMap;
