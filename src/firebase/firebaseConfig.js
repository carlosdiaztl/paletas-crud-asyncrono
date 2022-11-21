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
  apiKey: "AIzaSyA0XRn_LWcsJcrz-cb9ZOmitY04axBJYrQ",
  authDomain: "sprint4-6b8f3.firebaseapp.com",
  projectId: "sprint4-6b8f3",
  storageBucket: "sprint4-6b8f3.appspot.com",
  messagingSenderId: "906090938390",
  appId: "1:906090938390:web:c991daa71271c987453537",
  measurementId: "G-SHDNR33LKC"
};



// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const dataBase = getFirestore(app);
export const google = new GoogleAuthProvider();
export const facebook= new FacebookAuthProvider()
// const analytics = getAnalytics(app);
