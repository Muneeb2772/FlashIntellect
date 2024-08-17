// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAYfHyTSMARqrWnY7JpRVtvmDhsdqqYj1Y",
  authDomain: "flashintellect.firebaseapp.com",
  projectId: "flashintellect",
  storageBucket: "flashintellect.appspot.com",
  messagingSenderId: "1086030181273",
  appId: "1:1086030181273:web:dbbca990a18abb36ff5908"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export {db}