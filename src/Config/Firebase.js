import  firebase from "firebase";


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

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const storage = firebase.storage(); 


export { storage };
export default db;
