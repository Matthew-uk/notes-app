// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCYBt5ZWacyhTtVeiyMPRUQZvNekhhxjNc",
  authDomain: "mini-note-app-fcec6.firebaseapp.com",
  projectId: "mini-note-app-fcec6",
  storageBucket: "mini-note-app-fcec6.appspot.com",
  messagingSenderId: "94473546420",
  appId: "1:94473546420:web:3a87b5d938aa072b1c85e1",
  measurementId: "G-G9J9184FXK",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
