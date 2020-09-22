import firebase from "firebase";
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDv3ztVMpbFirJ93ARA07PCilsaZrY109E",
    authDomain: "clone-ddae1.firebaseapp.com",
    databaseURL: "https://clone-ddae1.firebaseio.com",
    projectId: "clone-ddae1",
    storageBucket: "clone-ddae1.appspot.com",
    messagingSenderId: "920827732465",
    appId: "1:920827732465:web:a8648b899eef99135b2450",
    measurementId: "G-BL802LTHDD"
  };

  const firebaseApp = firebase.initializeApp(firebaseConfig);

  const db = firebaseApp.firestore();
  const auth = firebase.auth();

  export { db, auth };