import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";




const firebaseConfig = {
    apiKey: "AIzaSyBEiHDEwdMwzOq1dZLgGXa06ds0xxryies",
    authDomain: "fakefacepredict-bd648.firebaseapp.com",
    databaseURL: "https://fakefacepredict-bd648-default-rtdb.firebaseio.com",
    projectId: "fakefacepredict-bd648",
    storageBucket: "fakefacepredict-bd648.appspot.com",
    messagingSenderId: "930399145413",
    appId: "1:930399145413:web:d08ef2e4595f1c36270fac",
    measurementId: "G-EX9ZN2RGXT"
  }

export const app = initializeApp(firebaseConfig);
export const storage = getStorage(app); 



