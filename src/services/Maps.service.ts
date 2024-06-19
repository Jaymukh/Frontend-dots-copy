
// Utilities
import { useFetchWrapper } from '../helpers';
import { APIS } from '../constants';


const useMapsService = () => {
    const fetchWrapper = useFetchWrapper();    

    const getDropdownList = (geoCode: number) => {
        return fetchWrapper.get(`${APIS.MAPS.GET_DROPDOWN}?geo-code=${geoCode}`);
    }

    const getMaps = (geoCode: number) => {
        const userCurrency = localStorage.getItem('currency');
        return fetchWrapper.get(`${APIS.MAPS.GET_MAPS}?geo-code=${geoCode}&currency=${userCurrency}`);
    }

    const getCircle = (geoCode: number) => {
        return fetchWrapper.get(`${APIS.MAPS.GET_CIRCLE}?geo-code=${geoCode}`);
    }

    const getCifData = (geoCode: number) => {
        const userCurrency = localStorage.getItem('currency');
        return fetchWrapper.get(`${APIS.MAPS.GET_CIF_DATA}?geo-code=${geoCode}&currency=${userCurrency}`);
    }

    const getExploreNow = () => {
        return fetchWrapper.get(`${APIS.MAPS.GET_EXPLORE_NOW}?geo-code=1`);
    }

    const getFeaturedStories = (geoCode: number) => {
        const userCurrency = localStorage.getItem('currency');
        return fetchWrapper.get(`${APIS.STORIES.GET_FEATURED_STORIES}?geo-code=${geoCode}&currency=${userCurrency}`)
    }

    const getCoreSolutions = (geoCode: number) => {
        return fetchWrapper.get(`${APIS.MAPS.GET_CORE_SOLUTIONS}?geo-code=${geoCode}`);
    }

    return {
        getDropdownList,
        getMaps,
        getCircle,
        getCifData,
        getExploreNow,
        getFeaturedStories,
        getCoreSolutions,
    }
}

export { useMapsService };