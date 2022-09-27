import { initializeApp } from "firebase/app";
import { getFirestore, getStorage } from "/firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDiVcUT4niSWqIXICouY82QgqhJ_WI43bk",
  authDomain: "asavgram.firebaseapp.com",
  projectId: "asavgram",
  storageBucket: "asavgram.appspot.com",
  messagingSenderId: "377610641632",
  appId: "1:377610641632:web:10e7fea9d9759a90fbf085",
  measurementId: "G-KC8SH77B1V",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore();
export const storage = getStorage(app);
