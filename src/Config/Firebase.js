import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";




const firebaseConfig = {
  apiKey: "AIzaSyDogBZbQ9BhWn2rMSXstS63pU05G6UP8lQ",
  authDomain: "face-fake-5b4dc.firebaseapp.com",
  databaseURL: "https://face-fake-5b4dc-default-rtdb.firebaseio.com",
  projectId: "face-fake-5b4dc",
  storageBucket: "face-fake-5b4dc.appspot.com",
  messagingSenderId: "584362847394",
  appId: "1:584362847394:web:be7554fe0ede92ee337bfb",
  measurementId: "G-2CRHKT3CWG"
};

export const app = initializeApp(firebaseConfig);
export const storage = getStorage(app); 



