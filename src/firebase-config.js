// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth,GoogleAuthProvider} from 'firebase/auth';
import {getFirestore} from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC1CRHGGNfkVAzPKW9Tgr3wzk3niKUeZLs",
  authDomain: "chatapp-4c5f1.firebaseapp.com",
  projectId: "chatapp-4c5f1",
  storageBucket: "chatapp-4c5f1.appspot.com",
  messagingSenderId: "663782908900",
  appId: "1:663782908900:web:40c40894b06c0a0df09df1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth=getAuth(app);
export const provider=new GoogleAuthProvider();
export const db=getFirestore(app);