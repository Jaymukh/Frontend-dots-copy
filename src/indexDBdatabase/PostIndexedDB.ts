import { ClearObjectStore, RetrieveAllData, Stores } from "./db";
import { useRecoilState } from "recoil";
import { useIndexedDBservice } from "../services/IndexedDB.service";
import axios from "axios";

// export function PostIndexedDB() {
//   //   const indexService = useIndexedDBservice();
//   RetrieveAllData("users")
//     .then((response: any) => {
//         //   console.log("This is response", response.length);
//         if (response.length > 0) {
//             console.log("This is response", response);
//         //   console.log("This is payload", payload)
//         useIndexedDBservice()
//           .postIndexedDBdata(response)
//           .then((response) => {
//             ClearObjectStore("users");
//           })
//           .catch((error: any) => {});
//       }
//     })
//     .catch((error) => {
//       console.error("Error in retrieving data:", error);
//     });
// }

export function PostIndexedDB() {
  const indexService = useIndexedDBservice();

  RetrieveAllData("users")
    .then((response: any) => {
      if (response.length > 0) {
        console.log("This is response", response);

        indexService.postIndexedDBdata(response)
          .then(() => {
            ClearObjectStore("users");
          })
          .catch((error: any) => {
            console.error("Error in posting data to IndexedDB:", error);
          });
      }
      else {
        console.log("No data to post");
      }
    })
    .catch((error) => {
      console.error("Error in retrieving data:", error);
    });
}


