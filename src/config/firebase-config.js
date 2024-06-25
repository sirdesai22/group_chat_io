// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration

const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: "group-chat-7a263.firebaseapp.com",
  projectId: "group-chat-7a263",
  storageBucket: "group-chat-7a263.appspot.com",
  messagingSenderId: "480020454422",
  appId: "1:480020454422:web:a1e942fe836df58b3ae937",
  measurementId: "G-JXBLGLCP40"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth  = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

export const db = getFirestore(app); 
export const storage = getStorage(app); 