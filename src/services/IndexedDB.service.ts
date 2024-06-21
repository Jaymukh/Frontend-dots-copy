import { useFetchWrapper, useMapHelpers } from "../helpers";
import { APIS } from "../constants";


export function useIndexedDBservice (){
    const fetchWrapper = useFetchWrapper();
    const { getErrorMsg } = useMapHelpers();


    const postIndexedDBdata = async (data:any) => {
        fetchWrapper.post(APIS.INDEXEDDB, data)
        // try{
        //     await fetchWrapper.post(APIS.INDEXEDDB, data)
        //     getErrorMsg("Success");
        // }
        //  catch (error: any) {
        //     getErrorMsg(error);
           
        // }
    }
    return {postIndexedDBdata};
}

