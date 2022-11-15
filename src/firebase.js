import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from 'firebase/firestore'


const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_KEY,
  authDomain: "spaceadmin-dce3e.firebaseapp.com",
  projectId: "spaceadmin-dce3e",
  storageBucket: "spaceadmin-dce3e.appspot.com",
  messagingSenderId: "86536083569",
  appId: "1:86536083569:web:170f6912fca36f38a8e3d0"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)
export const auth = getAuth()