// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { collection, getFirestore, getDocs } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY ,
  authDomain: "the-breaking-tube.firebaseapp.com",
  projectId: "the-breaking-tube",
  storageBucket: "the-breaking-tube.appspot.com",
  messagingSenderId: import.meta.env.VITE_MESSAGINGSENDER_ID,
  appId: import.meta.env.VITE_APP_ID,
  measurementId: import.meta.env.VITE_MEASUREMENT_ID,
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
// const db = getFirestore();

export const colRef = collection(db, "Watch Later")

getDocs(colRef).then((snapshot) => {
//  console.log( snapshot.docs);
});
// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);