import { useFetchWrapper, useMapHelpers } from "../helpers";
import { APIS } from "../constants";


export function useIndexedDBservice (){
    const fetchWrapper = useFetchWrapper();
    const { getErrorMsg } = useMapHelpers();


    const postIndexedDBdata = async (data:any) => {
        fetchWrapper.post(APIS.ANALYTICS.INDEXEDDB, data)
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


// import { useFetchWrapper, useMapHelpers } from "../helpers";
// import { APIS } from "../constants";
// import { RetrieveAllData, ClearObjectStore } from "../indexDBdatabase/db";


// export function useIndexedDBservice (){
//     const fetchWrapper = useFetchWrapper();
//     const { getErrorMsg } = useMapHelpers();


//     const postIndexedDBdata = async (data:any) => {
//         fetchWrapper.post(APIS.ANALYTICS.INDEXEDDB, RetrieveAllData("users")).then((response: any) => {
//             if (response.length > 0) {
//               console.log("This is response", response);
      
//               const indexService = useIndexedDBservice();
//               indexService
//                 .postIndexedDBdata(response)
//                 .then((res: any) => {
//                   ClearObjectStore("users");
//                   console.log(res.message);
//                 })
//                 .catch((error: any) => {
//                   console.error("Error in posting data to IndexedDB:", error);
//                 });
//             } else {
//               console.log("No data found in the 'users' object store.");
//             }
//           })
//           .catch((error: any) => {
//             console.error("Error in retrieving data:", error);
//           });
//         // try{
//         //     await fetchWrapper.post(APIS.INDEXEDDB, data)
//         //     getErrorMsg("Success");
//         // }
//         //  catch (error: any) {
//         //     getErrorMsg(error);
           
//         // }
//     }
//     return {postIndexedDBdata};
// }


   






