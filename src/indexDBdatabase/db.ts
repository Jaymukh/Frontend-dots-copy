let request: IDBOpenDBRequest;
let db: IDBDatabase;
let version = 1;

export interface User {
  id: string;
  name: string;
  email: string;
}

export enum Stores {
  Users = "users",
}

// export const initDB = (storeName: string, data: any): Promise<boolean> => {
//   return new Promise((resolve) => {
//     // open the connection
//     request = indexedDB.open("myDB",);

//     request.onupgradeneeded = () => {
//       db = request.result;

//       // if the data object store doesn't exist, create it
//       if (!db.objectStoreNames.contains(Stores.Users)) {
//         console.log("Creating users store");
//         db.createObjectStore(Stores.Users, {
//           keyPath: "id",
//           autoIncrement: true,
//         });
//       }
//     };

//     request.onsuccess = async () => {
//       try {
//         // console.log('request.onsuccess - addData', data);
//         db = request.result;
//         version =db.version;
//         const tx = db.transaction(storeName, "readwrite");
//         const store = tx.objectStore(storeName);
//         store.add(data);
//         // resolve(Email);
//       } catch (error) {
//         request.onerror = function (event) {
//           console.error("Database error:", (event.target as IDBRequest).error);
//         };
//       }
//     };
//   });
// };

// const version = 2;

// export enum Stores {
//   Users = "users",
// }

// export const initDB = (storeName: string, data: any): Promise<boolean> => {
//   return new Promise((resolve, reject) => {
//     const request = indexedDB.open("myDB", version);

//     request.onupgradeneeded = () => {
//       const db = request.result;

//       if (!db.objectStoreNames.contains(Stores.Users)) {
//         console.log("Creating users store");
//         db.createObjectStore(Stores.Users, {
//           keyPath: "id",
//           autoIncrement: true,
//         });
//       }
//     };

//     request.onsuccess = async () => {
//       try {
//         console.log(initDB)
//         const db = request.result;
//         const tx = db.transaction(storeName, "readwrite");
//         const store = tx.objectStore(storeName);
//         store.add(data);

//         tx.oncomplete = () => resolve(true);
//       } catch (error) {
//         console.log(initDB)

//         reject(error);
//       }
//     };

//     request.onerror = (event) => {
//       console.error("Database error:", (event.target as IDBRequest).error);
//       reject((event.target as IDBRequest).error);
//     };
//   });
// };

export const initDB = (storeName: string, data: any): Promise<boolean> => {
  return new Promise((resolve) => {
    // open the connection
    request = indexedDB.open("myDB");

    request.onupgradeneeded = () => {
      db = request.result;

      // if the data object store doesn't exist, create it
      if (!db.objectStoreNames.contains(Stores.Users)) {
        console.log("Creating users store");
        db.createObjectStore(Stores.Users, { keyPath:"id" });
      }
      // no need to resolve here
    };

    request.onsuccess = async () => {
            try {
              // console.log(initDB)
              const db = request.result;
              const tx = db.transaction(storeName, "readwrite");
              const store = tx.objectStore(storeName);
              store.add(data);
      
              tx.oncomplete = () => resolve(true);
            } catch (error) {
              // console.log(initDB)
      
              // reject(error);
            }
          };

    request.onerror = () => {
      const error = request.error?.message;
      if (error) {
        console.log(error);
      }
    };
  });
};

interface ClearObjectStoreProps {
  storeName: string;
}

// export const ClearObjectStore = ({ storeName }) => {
  



export const ClearObjectStore = (storeName:string) => {
  const request = indexedDB.open('myDB', 1);

  request.onerror = (event) => {
    console.error('Database error:', request.error);
  };

  request.onsuccess = (event) => {
    const db = request.result;
    const transaction = db.transaction(storeName, 'readwrite');
    const objectStore = transaction.objectStore(storeName);

    const clearRequest = objectStore.clear();

    clearRequest.onsuccess = () => {
      console.log(`Object store '${storeName}' cleared successfully.`);
    };

    clearRequest.onerror = (event) => {
      console.error(`Error clearing object store '${storeName}':`, request.error);
    };
  };
};

export const RetrieveAllData = (storeName:string) => {
    const request = indexedDB.open('myDB', 1);
  
    request.onerror = (event) => {
      console.error('Database error:', request.error);
    };
  
    request.onsuccess = (event) => {
      const db = request.result;
    //   console.log(request);
      const transaction = db.transaction(storeName, 'readonly');
      const objectStore = transaction.objectStore(storeName);
  
      const getAllRequest = objectStore.getAll();
  
      getAllRequest.onsuccess = () => {
        console.log(`All data from '${storeName}' retrieved successfully:`, getAllRequest.result);
      };
  
      getAllRequest.onerror = (event) => {
        console.error(`Error retrieving data from '${storeName}':`, getAllRequest.error);
      };
    };
  };
  



// Example functional component using the clearIndexedDBStore function