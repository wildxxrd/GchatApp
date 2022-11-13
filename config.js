//firebase config key setup
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";

const db = firebase.firestore();

//web app Firebase configuration
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCG6RLXWZJcXBkhL1qE5yEHkoDR15qoUCQ",
  authDomain: "ggchat-f307f.firebaseapp.com",
  projectId: "ggchat-f307f",
  storageBucket: "ggchat-f307f.appspot.com",
  messagingSenderId: "1091659122353",
  appId: "1:1091659122353:web:2c5de2b3f992e496a04490"
};


  firebase.initializeApp(firebaseConfig);

// firebase methods
export const getPainatedTasks = () =>{
  const queryRef = db.collection('posts')
    .limit(15);


  return queryRef.get();
}


export { firebase };
