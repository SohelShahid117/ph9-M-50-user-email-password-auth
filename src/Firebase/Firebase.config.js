// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBkiQJeWn0Zvz22InV5BzRq-xKpHvGoy3M",
  authDomain: "user-email-password-auth-60477.firebaseapp.com",
  projectId: "user-email-password-auth-60477",
  storageBucket: "user-email-password-auth-60477.appspot.com",
  messagingSenderId: "38518466169",
  appId: "1:38518466169:web:90834eabc4fa55d27756a8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export default auth;