import { ClearObjectStore, RetrieveAllData, Stores } from "./db";
import { useRecoilState } from "recoil";
import { useIndexedDBservice } from "../services/IndexedDB.service";

export function postIndexedDB() {
  //   const indexService = useIndexedDBservice();
  const payload = RetrieveAllData("users")
    .then((response: any) => {
      console.log("This is response", response);
      console.log("This is response", response.length);
      if (response.length > 0) {
        useIndexedDBservice()
          .postIndexedDBdata(payload)
          .then((response) => {
            ClearObjectStore("users");
          })
          .catch((error: any) => {});
      }
    })
    .catch((error) => {
      console.error("Error in retrieving data:", error);
    });
}
