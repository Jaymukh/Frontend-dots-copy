// External libraries
import { useRecoilState, useRecoilValue } from "recoil";
import axios, { AxiosInstance, AxiosResponse } from "axios";
import { useNavigate } from "react-router-dom";

// Components
import { authState, loggedUserState } from "../states";

// Utilities
import { APIS, RouteConstants } from "../constants";
// import { initDB } from "../components/login/db";
import { initDB } from "../indexDBdatabase/db";
import { error } from "console";
import {  postIndexedDB } from "../indexDBdatabase/postDB";

function useFetchWrapper() {
  const [auth, setAuth] = useRecoilState(authState);
  const navigate = useNavigate();

  const loggedUser = useRecoilValue(loggedUserState);

  // Create an Axios instance with common headers
  const axiosInstance: AxiosInstance = axios.create({
    baseURL: "",
    headers: {
      "Content-Type": "application/json",
    },
  });

  // Interceptor for adding authorization headers
  axiosInstance.interceptors.request.use(
    async (config: any) => {
      if (
        [
          APIS.USERS.LOGIN,
          APIS.USERS.FORGOT_PASSWORD,
          APIS.USERS.SET_NEW_PASSWORD,
        ].includes(config.url)
      )
        return config;
      const user = localStorage.getItem("user") || null;
      if (user != null) {
        const token = JSON.parse(user)?.tokens?.access;
        var isTokenExpired = checkTokenExpiry(token);
        if (!isTokenExpired) {
          config.headers["Authorization"] = `Bearer ${token}`;
        } else {
          try {
            const data = await getRefreshToken();
            const newAccessToken = data.access;
            const updatedAuth = {
              ...auth,
              tokens: {
                ...auth.tokens,
                access: newAccessToken,
              },
            };
            setAuth(updatedAuth);
            localStorage.setItem("user", JSON.stringify(updatedAuth));
            config.headers["Authorization"] = `Bearer ${newAccessToken}`;
          } catch (error: any) {
            localStorage.removeItem("user");
            setAuth({});
            navigate(RouteConstants.login);
            throw error;
          }
        }
        return config;
      }
      return config;
    },
    (error: any) => {
      return Promise.reject(error);
    }
  );

  return {
    get: (url: string, params?: any) =>
      axiosInstance.get(getURL(url), { params }).then(handleResponse).catch(handleError),
    post: (url: string, data?: any) =>
      axiosInstance.post(getURL(url), data).then(handleResponse).catch(handleError),
    put: (url: string, data?: any) =>
      axiosInstance.put(getURL(url), data).then(handleResponse).catch(handleError),
    delete: (url: string) =>
      axiosInstance.delete(getURL(url)).then(handleResponse).catch(handleError),
  };

  function getURL(url: string) {
    let host = process.env.REACT_APP_API_HOST_DEV;
    let baseURL = process.env.REACT_APP_API_BASE_URL;
    if (window.location.host === host) {
      url = baseURL + url;
    }
    return url;
  }

  function handleResponse(response: AxiosResponse) {
    storeResponseInDB(response);
    return response.data;
  }

  function handleError(error: any) {
    // console.log("This is error response",error);
    if (error.response) {
      storeResponseInDB(error.response);
    //   console.log("THis is error respomse",error);
    }
    return Promise.reject(error);
  }

  function storeResponseInDB(response: AxiosResponse) {
    const now = new Date();
    const formattedDateTime = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-${String(now.getDate()).padStart(2, "0")} ${String(now.getHours()).padStart(2, "0")}:${String(now.getMinutes()).padStart(2, "0")}:${String(now.getSeconds()).padStart(2, "0")}`;
    const responseObject = {
      id: formattedDateTime,
      URL: response.config.url,
      Method: response.config.method,
      Status: response.status,
      Email: loggedUser.email_id,
      Response: response?.data || response?.data?.current_password?.detail, 
      statusText: response?.statusText || response?.data?.message,
    };
    // console.log("Storing response in IndexedDB", response);
    initDB("users", responseObject);
  }

  async function getRefreshToken() {
    const refresh = auth?.tokens?.refresh;
    const access = auth?.tokens?.access;
    const isExpired = checkTokenExpiry(refresh);
    if (isExpired) {
      localStorage.removeItem("user");
      setAuth(null);
      const error = { response: { data: { detail: "Invalid refresh token" } } };
      throw error;
    } else {
      const headers = {
        Authorization: `Bearer ${access}`,
        "Content-Type": "application/json",
      };
      const response = await axios.post(
        getURL(APIS.USERS.GET_NEW_ACCESS_TOKEN),
      
        { refresh },
        { headers }
      );
      if (response.data) {
        postIndexedDB()
    }
      return handleResponse(response);
    }
  }

  function checkTokenExpiry(token: any) {
    const tokenData = JSON.parse(atob(token.split(".")[1]));
    const expiryTime = tokenData.exp * 1000;
    const currentTime = Date.now();
    return currentTime >= expiryTime;
  }
}

export { useFetchWrapper };



