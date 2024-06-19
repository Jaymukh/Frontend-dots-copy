/* eslint-disable react-hooks/exhaustive-deps */
// External libraries
import React, { useEffect, useState } from 'react';
import { useSetRecoilState } from 'recoil'; 
import { useSearchParams } from 'react-router-dom';

// CSS
import '../../styles/main.css';

// Components
import MapOptions from './MapOptions';
import GlobalMap from './GlobalMap';
import StateMap from './StateMap';
import { BreadcrumbItem } from '../ui/breadcrumb/Breadcrumb';
import { geoJsonState, spinnerState, mapFeatureState } from '../../states';

// Utilities
import { useMapsService } from '../../services';
import { useMapHelpers } from '../../helpers';


const countries = [{ geo_id: 1, name: 'India' }];

function MapContainer() {
    const mapServices = useMapsService();
    const setSpinner = useSetRecoilState(spinnerState);
    const routeFlag = window.location.pathname === '/' ? true : false;
    const [global, setGlobal] = useState<boolean>(routeFlag);
    const [states, setStates] = useState<any>([]);
    const [districts, setDistricts] = useState<any>([]);
    const setGeoJSON = useSetRecoilState(geoJsonState);
    const setMapFeatures = useSetRecoilState(mapFeatureState);
    const { getErrorMsg } = useMapHelpers();

    const getSearchParams = () => {
        if (global) {
            return { country: '1' };
        }
    }

    const [searchParams, setSearchParams] = useSearchParams(getSearchParams());
    const [breadcrumbList, setBreadcrumbList] = useState<BreadcrumbItem[]>([{ key: 'country', geo_id: 1, label: 'India', link: '?&country=1' }]);
    const [isChecked, setIsChecked] = useState<any>({ coreSolution: false, viewStories: true });

    const getSelectedObject = () => {
        const params: Record<string, string> = {};
        searchParams?.toString().split('&').forEach((param) => {
            const [key, value] = param.split('=');
            params[key] = value;
        });
        return params;
    }
    const [selected, setSelected] = useState<any>(getSelectedObject());
    
    const handleGlobal = () => {
        setGlobal(!global);
        // navigate({
        //     pathname: RouteConstants.root,
        //     search: '?country=1',
        // });
    }

    const handleCountryChange = () => {
        // setGlobal(!global);
        // setTimeout(() => {
        //     navigate(global ? `${RouteConstants.explore}?country=1` : RouteConstants.root);
        // });
        updateSelected('country', 1);
    };

    const handleStateChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const value = event.target.value;
        updateSelected('state', value);
    };

    const handleDistrictChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const value = event.target.value;
        updateSelected('district', value);
    };

    const updateBreadcrumb = () => {
        const keys = Object.keys(selected).filter(key => selected[key]);
        const resultArray: { key: string; geo_id: any; label: string; link: string; }[] = [{ key: 'global', geo_id: null, label: 'Global', link: '/' }];

        let link = '';
        keys.forEach((key, index) => {
            link += `&${key}=${selected[key]}`;
            const geo_id = Number(selected[key]);
            const label = key === 'country'
                ? countries?.find((country: any) => country.geo_id === geo_id)?.name
                : key === 'state'
                    ? states?.find((state: any) => state.geo_id === geo_id)?.name
                    : districts?.find((district: any) => district.geo_id === geo_id)?.name;
            resultArray.push({ key, geo_id, label, link });
        });
        setBreadcrumbList(resultArray);
    };

    const handleBreadcrumbClick = (item: BreadcrumbItem, index: number) => {
        if (index !== breadcrumbList.length - 1) {
            if (item.key === 'global') {
                // handleGlobal();
            } else {
                updateSelected(item.key, item.geo_id);
            }
        }
    }

    const updateSelected = (key: string, value: any) => {
        if (key === 'district') {
            setSelected({ ...selected, district: value });
        } else if (key === 'state') {
            setSelected({ ...selected, state: value, district: '' });
        } else if (key === 'country') {
            setSelected({ country: value, state: '', district: '' })
        }
    }

    const fetchDropdownList = (geo_id: string, level: string) => {
        mapServices.getDropdownList(Number(geo_id)).then((data: any) => {
            level === 'states' ? setStates(data) : setDistricts(data);
        }).catch(error => {
            errorHandler(error);
        });
    }

    const fetchGeoJsonData = (geo_id: string) => {
        mapServices.getMaps(Number(geo_id)).then((data: any) => {
            document.title = data?.rootProperties?.Name + ' | EPIC Intelligence | Enmasse';
            setGeoJSON(data);            
            fetchMapCircles(geo_id);
            fetchFeaturedStories(geo_id);
            setSpinner(false);
        }).catch(error => {
            setSpinner(false);
            window.history.back();
            errorHandler(error);
        });
    }

    const fetchMapCircles = (geo_id: string) => {
        mapServices.getCircle(Number(geo_id)).then(data => {
            setMapFeatures(prevMapFeatures => ({
                ...prevMapFeatures,
                circles: data
            }));
        }).catch(error => {
            errorHandler(error);
        });
    }

    const fetchFeaturedStories = (geo_id: string) => {
        mapServices.getFeaturedStories(Number(geo_id)).then(data => {
            setMapFeatures(prevMapFeatures => ({
                ...prevMapFeatures,
                featuredStories: data
            }));
        }).catch(error => {
            errorHandler(error);
        });
    }

    const fetchCifData = (geoCode: number) => {
        mapServices.getCifData(geoCode).then((response) => {
            if (response) {
                setMapFeatures(prevMapFeatures => ({ ...prevMapFeatures, cifData: response }));
            }
        }).catch(error => {
            getErrorMsg(error);
        });
    };

    const errorHandler = (error: any) => {
        getErrorMsg(error);
    };

    const setDocumentTitle = (value: string) => {
        //document.title = document.title = value + ' | EPIC Intelligence | Enmasse';
    }

    useEffect(() => {
        setSelected({ country: searchParams.get('country'), state: (searchParams.get('state') ? searchParams.get('state') : ''), district: (searchParams.get('district') ? searchParams.get('district') : '') });
    }, [searchParams.get('country'), searchParams.get('state'), searchParams.get('district')])

    useEffect(() => {
        if (selected) {
            const currentParams = new URLSearchParams();
            for (const key in selected) {
                if (selected[key]) {
                    currentParams.set(key, selected[key]);
                }
            }
            setSearchParams(currentParams);
            if (selected.district) {
                setDocumentTitle(districts.find((item: any) => item.geo_id === Number(selected.district))?.name);
            } else if (selected.state) {
                setDocumentTitle(states.find((item: any) => item.geo_id === Number(selected.state))?.name);
            } else if (selected.country) {
                setDocumentTitle(countries.find((item: any) => item.geo_id === Number(selected.country))!.name);
            }
        }
    }, [selected]);

    useEffect(() => {
        updateBreadcrumb();
    }, [selected, states, districts]);

    useEffect(() => {
        setSpinner(true);
        fetchDropdownList(selected.country, 'states');
        if (selected.district) {
            fetchDropdownList(selected.state, 'districts');
            fetchGeoJsonData(selected.district);
            fetchCifData(selected.district);
        } else if (selected.state) {
            fetchDropdownList(selected.state, 'districts');
            fetchGeoJsonData(selected.state);
            fetchCifData(selected.state);
        } else if (selected.country) {
            fetchGeoJsonData(selected.country);
            fetchCifData(selected.country);
        }
    }, [selected.country, selected.state, selected.district]);

    return (
        <div className='MapContainer margin-left-right-0' style={{ height: '91.75vh' }}>
            <MapOptions
                handleCountryChange={handleCountryChange}
                handleStateChange={handleStateChange}
                handleDistrictChange={handleDistrictChange}
                handleGlobal={handleGlobal}
                global={global}
                countries={countries}
                states={states}
                districts={districts}
                selected={selected}
            />
            {!global ? (
                <GlobalMap />
            ) : (
                <StateMap
                    selected={selected}
                    updateSelected={updateSelected}
                    breadcrumbs={breadcrumbList}
                    handleBreadcrumbClick={handleBreadcrumbClick}
                    isChecked={isChecked}
                    setIsChecked={setIsChecked}
                />
            )}
        </div>
    );
}

export default MapContainer;
