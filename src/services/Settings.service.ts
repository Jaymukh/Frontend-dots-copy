// Utilities
import { useFetchWrapper } from '../helpers';
import { APIS } from '../constants';

const useSettingsService = () => {
    const fetchWrapper = useFetchWrapper();

    const getAllSettings = () => {
        return fetchWrapper.get(APIS.SETTINGS.GET_ALL_SETTINGS);
    }

    const getUserSettings = () => {
        return fetchWrapper.get(APIS.SETTINGS.USER_SETTINGS);
    }

    const updateUserSettings = (payload: any) => {
        return fetchWrapper.put(APIS.SETTINGS.USER_SETTINGS, payload);
    }

    return {
        getAllSettings,
        getUserSettings,
        updateUserSettings
    }
}

export { useSettingsService };