// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCG6RLXWZJcXBkhL1qE5yEHkoDR15qoUCQ",
  authDomain: "ggchat-f307f.firebaseapp.com",
  projectId: "ggchat-f307f",
  storageBucket: "ggchat-f307f.appspot.com",
  messagingSenderId: "1091659122353",
  appId: "1:1091659122353:web:2c5de2b3f992e496a04490"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);