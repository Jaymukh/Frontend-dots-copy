/* eslint-disable react-hooks/exhaustive-deps */
// External libraries
import { useEffect, useState } from 'react';
import { useRecoilValue, useRecoilState } from 'recoil';
import { useSearchParams } from 'react-router-dom';

// CSS
import '../../styles/main.css';

// Components
import BarGraphContainer from './BarGraphContainer';
import BubbleGraph from './BubbleGraph';
import FamilyDetails from './FamilyDetails';
import LineGraph from './LineGraph';
import OverViewMap from './OverViewMap';
import ScatterGraph from './ScatterGraph';
import TableView from './TableView';
import { cifState, mapFeatureState, CoreSolutionByEH } from '../../states';

// Utilities
import { useCIFService, useMapsService, useStoriesService } from '../../services';
import { TABLE_HEADERS } from '../../constants';
import { useMapHelpers } from '../../helpers';


const DashBoard = () => {
    const cifService = useCIFService();
    const mapServices = useMapsService();
    const storiesService = useStoriesService();
    const [searchParams] = useSearchParams();
    const cifData = useRecoilValue(cifState);
    const [mapFeatures, setMapFeatures] = useRecoilState(mapFeatureState);
    const geoCode = searchParams.get('geo_code');
    const { getErrorMsg } = useMapHelpers();

    const [selected, setSelected] = useState<CoreSolutionByEH | undefined>(cifData?.coreSolutionsData?.coreSolutionsByEH![0] || []);

    const handleTabClick = (item: CoreSolutionByEH) => {
        setSelected(item);
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

    useEffect(() => {
        if (cifData?.coreSolutionsData?.coreSolutionsByEH?.length > 0) {
            setSelected(cifData?.coreSolutionsData.coreSolutionsByEH[0]);
        }

    }, [cifData?.coreSolutionsData?.coreSolutionsByEH]);

    useEffect(() => {
        if (geoCode) {
            cifService.getEHGrowthData(Number(geoCode));
            cifService.getGeoSpecificData(Number(geoCode));
            cifService.getInOutFlowData(Number(geoCode));
            cifService.getMetricBreakdownData(Number(geoCode));
            cifService.getCoreSolutionsGraphData(Number(geoCode));
            fetchCifData(Number(geoCode));
            storiesService.getAllStories({
                geo_code: Number(geoCode),
                page_no: 1,
                storiespp: 1
            });
        }
    }, [geoCode]);

    return (
        <div className='row w-100 primary-bg margin-0 dashboard-padding' style={{ height: '86.25vh', overflowY: 'auto', overflowX: 'hidden' }}>
            <div className='col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12 padding-0 margin-top-bottom-2'>
                <FamilyDetails />
            </div>
            <div className='col-xl-5 col-lg-5 col-md-12 col-sm-12 col-12 padding-0 margin-top-bottom-2'>
                <OverViewMap />
            </div>
            <div className='col-xl-7 col-lg-7 col-md-12 col-sm-12 col-12 padding-0 margin-top-bottom-2 d-flex flex-column justify-content-between'>
                <LineGraph classname='margin-bottom-3' category='EH Growth' graphData={cifData?.ehGrowthGraphData?.ehGrowth?.data} infobutton={cifData?.ehGrowthGraphData?.ehGrowth?.infobutton} />
                <LineGraph category='Average EH Transactional Value' graphData={cifData?.ehGrowthGraphData?.averageEhTransactionalValue?.data} infobutton={cifData?.ehGrowthGraphData?.averageEhTransactionalValue?.infobutton} />
            </div>
            <div className='col-xl-5 col-lg-5 col-md-12 col-sm-12 col-12 padding-0 margin-top-bottom-2'>
                <BubbleGraph handleTabClick={handleTabClick} />
            </div>
            <div className='col-xl-7 col-lg-7 col-md-12 col-sm-12 col-12 padding-0 margin-top-bottom-2'>
                <BarGraphContainer selected={selected} handleTabClick={handleTabClick} />
            </div>
            {cifData?.geoInfo?.show &&
                <div className={`col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12 padding-0 margin-top-bottom-2 ${cifData?.inOutFlowData?.show || cifData?.metricBreakdownInfo?.show ? '' : 'margin-bottom-5'}`}>
                    <TableView headerData={TABLE_HEADERS.GEO_INFO_TABLE} data={cifData?.geoInfo?.data} infoButton={cifData?.geoInfo?.infoButton} breakdownType={cifData?.geoInfo?.breakdownType} classname='summary-breakdown-table-container' />
                </div>}
            {cifData?.inOutFlowData?.show && <div className={`col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12 padding-0 margin-top-bottom-2 ${cifData?.metricBreakdownInfo?.show ? '' : 'margin-bottom-5'}`}>
                <ScatterGraph geoName={mapFeatures?.cifData?.properties?.geo_name} />
            </div>}
            {cifData?.metricBreakdownInfo?.show &&
                <div className='col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12 padding-0 margin-top-2 margin-bottom-4'>
                    <TableView headerData={TABLE_HEADERS.METRIC_BREAKDOWN_TABLE} data={cifData?.metricBreakdownInfo?.data} infoButton={cifData?.metricBreakdownInfo?.infoButton} breakdownType={cifData?.metricBreakdownInfo?.breakdownType} classname='dashboard-table-container' />
                </div>}
        </div>
    )
}

export default DashBoard;