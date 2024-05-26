import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getDatabase } from "firebase/database";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyAlqB406RjjKwc5VhJtv1y39VtlVFWrRLA",
    authDomain: "educative-664a8.firebaseapp.com",
    projectId: "educative-664a8",
    storageBucket: "educative-664a8.appspot.com",
    messagingSenderId: "1024757623306",
    appId: "1:1024757623306:web:1b7de57325482aaae30df3",
    measurementId: "G-RE0RE45YDD"
  };

//const firebaseApp = initializeApp(firebaseConfig);

export const firebaseApp = initializeApp(firebaseConfig);

export const auth = getAuth(firebaseApp);
export const db = getDatabase(firebaseApp);
export const firestore = getFirestore(firebaseApp);
