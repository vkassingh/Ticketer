import { initializeApp } from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import {
  getFirestore,
  collection,
  addDoc,
  doc,
  setDoc,
  getDoc,
} from "firebase/firestore";

// Firebase Configuration
const firebaseConfig = {
  apiKey: "AIzaSyCufasFnZEyH2AhEu21D0N8jv4-xWcTP10",
  authDomain: "rolebased-792ab.firebaseapp.com",
  projectId: "rolebased-792ab",
  storageBucket: "rolebased-792ab.appspot.com",
  messagingSenderId: "380916629871",
  appId: "1:380916629871:web:8b6883d389801f02c6689a",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// Export Firebase Services
export {
  auth,
  db,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  setDoc,
  getDoc,
  doc,
  collection,
  addDoc,
};
