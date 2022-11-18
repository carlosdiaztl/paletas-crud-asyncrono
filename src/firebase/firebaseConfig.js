// Import the functions you need from the SDKs you need
import { FacebookAuthProvider, getAuth, GoogleAuthProvider } from "firebase/auth";
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBymZ-C2UbYg_oRs-rbaQd_KtrRiDS30pM",
  authDomain: "redux-makaia.firebaseapp.com",
  projectId: "redux-makaia",
  storageBucket: "redux-makaia.appspot.com",
  messagingSenderId: "150484936665",
  appId: "1:150484936665:web:794be76b86c51033995bc8",
  measurementId: "G-BX0JQ0J7TH"
};



// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const dataBase = getFirestore(app);
export const google = new GoogleAuthProvider();
export const facebook= new FacebookAuthProvider()
// const analytics = getAnalytics(app);
