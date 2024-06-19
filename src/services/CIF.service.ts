// External libraries
import { useSetRecoilState } from 'recoil';


// Components
import { cifState, spinnerState } from "../states";

// Utilities
import { useFetchWrapper } from '../helpers';
import { APIS } from '../constants';


const useCIFService = () => {
    const fetchWrapper = useFetchWrapper();
    const setDashboardData = useSetRecoilState(cifState);
    const setSpinner = useSetRecoilState(spinnerState);

    const getInOutFlowData = (geoCode: number) => {
        setSpinner(true);
        const currency = localStorage.getItem('currency');
        return fetchWrapper.get(`${APIS.CIF.GET_INOUTFLOW_DATA}?geo-code=${geoCode}&currency=${currency}`).then(data => {
            setDashboardData(prevCIFData => ({
                ...prevCIFData,
                inOutFlowData: data
            }));
            // setSpinner(false);
        }).catch(error => {
            setSpinner(false);
        });
    }

    const getEHGrowthData = (geoCode: number) => {
        setSpinner(true);
        const currency = localStorage.getItem('currency');
        return fetchWrapper.get(`${APIS.CIF.GET_EH_GROWTH_DATA}?geo-code=${geoCode}&currency=${currency}`).then(data => {
            setDashboardData(prevCIFData => ({
                ...prevCIFData,
                ehGrowthGraphData: data
            }));
            // setSpinner(false);
        }).catch(error => {
            setSpinner(false);
        });
    }

    const getMetricBreakdownData = (geoCode: number) => {
        setSpinner(true);
        const currency = localStorage.getItem('currency');
        return fetchWrapper.get(`${APIS.CIF.GET_METRIC_BREAKDOWN}?geo-code=${geoCode}&currency=${currency}`).then(data => {
            setDashboardData(prevCIFData => ({
                ...prevCIFData,
                metricBreakdownInfo: data
            }));
            // setSpinner(false);
        }).catch(error => {
            setSpinner(false);
        });
    }

    const getGeoSpecificData = (geoCode: number) => {
        setSpinner(true);
        const currency = localStorage.getItem('currency');
        return fetchWrapper.get(`${APIS.CIF.GET_GEO_SPECIFIC_DATA}?geo-code=${geoCode}&currency=${currency}`).then(data => {
            setDashboardData(prevCIFData => ({
                ...prevCIFData,
                geoInfo: data
            }));
            // setSpinner(false);
        }).catch(error => {
            setSpinner(false);
        });
    }

    const getCoreSolutionsGraphData = (geoCode: number) => {
        setSpinner(true);
        const currency = localStorage.getItem('currency');
        return fetchWrapper.get(`${APIS.CIF.GET_CORE_SOLUTIONS_DATA}?geo-code=${geoCode}&currency=${currency}`).then(data => {
            setDashboardData(prevCIFData => ({
                ...prevCIFData,
                coreSolutionsData: data
            }));
            // setSpinner(false);
        }).catch(error => {
            setSpinner(false);
        });
    }

    const sendEmail = (payload: any) => {
        setSpinner(true);
        return fetchWrapper.post(APIS.CIF.SEND_EMAIL, payload);
    }

    return {
        getInOutFlowData,
        getEHGrowthData,
        getMetricBreakdownData,
        getGeoSpecificData,
        getCoreSolutionsGraphData,
        sendEmail,
    }
}

export { useCIFService };