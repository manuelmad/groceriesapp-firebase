// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-app.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getFirestore } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-firestore.js";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAwDs8xpOS19pF55OWb5Bz7fONeKLFK6gA",
  authDomain: "groceries-list-d614d.firebaseapp.com",
  projectId: "groceries-list-d614d",
  storageBucket: "groceries-list-d614d.appspot.com",
  messagingSenderId: "760984783638",
  appId: "1:760984783638:web:97c7edaa4c9a174bac9e37"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);