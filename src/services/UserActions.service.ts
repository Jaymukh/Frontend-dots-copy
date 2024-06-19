// External libraries
import { useSetRecoilState, useRecoilState } from 'recoil';
import { useNavigate, useLocation } from 'react-router-dom';
import ReactGA from 'react-ga4';
import * as Constants from '../utils/constants/Constants';

// Components
import { authState, loggedUserState, usersState, spinnerState, overlayState, userCurrencyState, geoJsonState, geoJSONProps } from '../states';
// Utilities
import { APIS, RouteConstants } from '../constants';
import { generateHSL, initialGenerator, useFetchWrapper, useMapHelpers } from '../helpers';


const useUserService = () => {
    const fetchWrapper = useFetchWrapper();
    const [auth, setAuth] = useRecoilState(authState);
    const setUserCurrency = useSetRecoilState(userCurrencyState);
    const setOverlay = useSetRecoilState(overlayState);
    const setLoggedUser = useSetRecoilState(loggedUserState);
    const setUsers = useSetRecoilState(usersState);
    const setSpinner = useSetRecoilState(spinnerState);
    const setGeoJSON = useSetRecoilState(geoJsonState);
    const { getErrorMsg } = useMapHelpers();    
    const navigate = useNavigate();
    const location = useLocation();

    const login = (data: any) => {
        setSpinner(true);
        localStorage.removeItem('user');
        return fetchWrapper.post(APIS.USERS.LOGIN, data)
            .then(user => {
                // store user details and jwt token in local storage to keep user logged in between page refreshes
                localStorage.setItem('user', JSON.stringify(user));
                localStorage.setItem('currency', 'INR');
                setAuth(user);
                setUserCurrency('INR');
                // setSpinner(false);
                getUserDetails();
                // get return url from location state or default to home page
                const from = (!location.pathname || location.pathname === '/login') ? RouteConstants.root : location.pathname;
                if (user.is_first_login) {
                    setOverlay(true);
                    acceptAgreement();
                }
                navigate({
                    pathname: from,
                    search: from === RouteConstants.root ? '?country=1' : '',
                });
            })
            .catch(error => {
                setSpinner(false);
                getErrorMsg(error);
            });

    }

    const logout = () => {
        setSpinner(true);
        const refresh = auth?.tokens?.refresh;
        return fetchWrapper.post(APIS.USERS.LOGOUT, { refresh })
            .then(response => {
                // remove user from local storage, set auth state to null and redirect to login page
                localStorage.removeItem('user');
                localStorage.removeItem('currency');
                setAuth({});
                setUserCurrency('');
                setGeoJSON({}  as geoJSONProps);
                setSpinner(false);
                navigate(RouteConstants.login);
                document.title = 'EPIC Intelligence | Enmasse'
            })
            .catch(error => {
                setSpinner(false);
                getErrorMsg(error);
            });

    }

    const getAll = () => {
        return fetchWrapper.get(APIS.USERS.GET_ALL_USERS).then(response => {
            // setUsers(response);
            handleSortTable(response, Constants.inviteTableHeader[2], 'desc', 2);
            setSpinner(false);
        }).catch(error => {
            setSpinner(false);
            getErrorMsg(error);
        })
    };

    const getUserDetails = () => {
        setSpinner(true);
        return fetchWrapper.get(APIS.USERS.GET_LOGGED_USER).then(data => {
            ReactGA.set({ userId: data.user_id });
            const initial = initialGenerator(data.name);
            const userHSL = generateHSL(data.name);
            setLoggedUser({ ...data, initial: initial, userHSL: userHSL });
            setSpinner(false);
        })
            .catch(error => {
                setSpinner(false);
                getErrorMsg(error);
            });
    };

    const updateUserDetails = (updatedData: any) => {
        return fetchWrapper.put(APIS.USERS.UPDATE_LOGGED_USER, updatedData);
    }

    const updateUserImage = (image: any) => {
        return fetchWrapper.put(APIS.USERS.UPDATE_IMAGE, image);
    }

    const setNewPassword = (data: any) => {
        return fetchWrapper.post(APIS.USERS.SET_NEW_PASSWORD, data);
    }

    const validateToken = (data: any) => {
        return fetchWrapper.get(APIS.USERS.VALIDATE_TOKEN, data);
    }

    const changePassword = (data: any) => {
        return fetchWrapper.put(APIS.USERS.CHANGE_PASSWORD, data);
    }

    const forgotPassword = (data: any) => {
        return fetchWrapper.post(APIS.USERS.FORGOT_PASSWORD, data);
    }

    const inviteNew = (newUser: any) => {
        return fetchWrapper.post(APIS.USERS.INVITE_NEW, newUser)
    }

    const editInvite = (updatedUser: any) => {
        var api = APIS.USERS.EDIT_INVITE + updatedUser.user_id + '/details/';
        return fetchWrapper.put(api, updatedUser)
    }

    const acceptAgreement = () => {
        return fetchWrapper.get(APIS.USERS.ACCEPT_AGREEMENT);
    }

    const deleteInvite = (user_id: string) => {
        const URL = APIS.USERS.DELETE_INVITE + user_id + '/delete/';
        return fetchWrapper.delete(URL);
    }
    	// function for sorting
	const handleSortTable = (users: any, item: Constants.InviteTableHeader, order: string, index: number) => {
		let sortedTable = users.slice().sort((a: any, b: any) => {
			const actualKey = item.key + 'ActualValue';
			const hasActualValue = users.some((obj: any) => obj.hasOwnProperty(actualKey));
			if (a[item.key] === null && b[item.key] === null) {
				return 0;
			} else if (a[item.key] === null) {
				return 1;
			} else if (b[item.key] === null) {
				return -1;
			} else if (typeof a[item.key] === 'string' && typeof b[item.key] === 'string') {
				if (hasActualValue) {
					return order === 'desc' ? a[actualKey] - b[actualKey] : b[actualKey] - a[actualKey];
				}
				return order === 'desc' ? a[item.key].localeCompare(b[item.key]) : b[item.key].localeCompare(a[item.key]);
			} else if (typeof a[item.key] === 'number' && typeof b[item.key] === 'number') {
				if (hasActualValue) {
					return order === 'desc' ? a[actualKey] - b[actualKey] : b[actualKey] - a[actualKey];
				}
				return order === 'desc' ? b[item.key] - a[item.key] : a[item.key] - b[item.key];
			} else {
				return 0;
			}
		});
		setUsers([...sortedTable])
	}

    return {
        login,
        logout,
        getAll,
        getUserDetails,
        updateUserDetails,
        updateUserImage,
        changePassword,
        forgotPassword,
        setNewPassword,
        validateToken,
        inviteNew,
        editInvite,
        acceptAgreement,
        deleteInvite,
    }
}

export { useUserService };