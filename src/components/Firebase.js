import { initializeApp } from "firebase/app";
import {getFirestore} from 'firebase/firestore';
import {getAuth} from 'firebase/auth'
const firebaseConfig = {
    apiKey: "AIzaSyChgnTRilFfbLwO9sj07xf7xFFrBvwT5Z4",
    authDomain: "fir-rayan-b57cf.firebaseapp.com",
    projectId: "fir-rayan-b57cf",
    storageBucket: "fir-rayan-b57cf.appspot.com",
    messagingSenderId: "497358466829",
    appId: "1:497358466829:web:3417f16e1020dab05f0a44",
    measurementId: "G-1VCYPCPW2L"
  };
  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);
  const auth = getAuth(app)
  export {db,auth}