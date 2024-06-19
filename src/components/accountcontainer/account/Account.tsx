/* eslint-disable react-hooks/exhaustive-deps */
// External libraries
import React, { useEffect } from 'react';

// Components
import SideBar from './SideBar';
import DetailsContainer from './detailscontainer/DetailsContainer';
import { useSetRecoilState } from 'recoil';
import { geoJSONProps, geoJsonState } from '../../../states';

const Account = () => {
    const setGeoJSON = useSetRecoilState(geoJsonState);
    
    useEffect(() => {
        setGeoJSON({}  as geoJSONProps);
    }, []);

    return (
        <div className='row' style={{height: '86.25vh'}}>
            <SideBar />
            <DetailsContainer  />
        </div >
    );
}

export default Account;
