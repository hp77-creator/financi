import { initializeApp } from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDVoG5_mhAHWTwdtqx2_2qnK44VFoV_oLM",
  authDomain: "financi-auth-db.firebaseapp.com",
  projectId: "financi-auth-db",
  storageBucket: "financi-auth-db.appspot.com",
  messagingSenderId: "580139333662",
  appId: "1:580139333662:web:f2944c0e6f622ddaff560f",
  measurementId: "G-NZQG8C15FE",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export const FirebaseAuth = auth;
export const FirebaseApp = app;
