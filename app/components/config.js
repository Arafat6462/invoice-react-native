// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";


import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDDT2XE8mabI5FBoGCYzIfoAiYYuQ6oeMk",
  authDomain: "crud-42f5d.firebaseapp.com",
  projectId: "crud-42f5d",
  storageBucket: "crud-42f5d.appspot.com",
  messagingSenderId: "1050103599523",
  appId: "1:1050103599523:web:700d719258f3d1f9e04a16",
  measurementId: "G-L6ZHMRCK1J",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);


export const db = getFirestore(app);
