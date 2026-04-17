import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  // TODO: Replace with your Firebase credentials
  apiKey: "AIzaSyAf5OQk0B3hHHenhSRXv-ANCO8jvtDnjoI",
  authDomain: "agentjob-bb2cd.firebaseapp.com",
  projectId: "agentjob-bb2cd",
  storageBucket: "agentjob-bb2cd.firebasestorage.app",
  messagingSenderId: "63867156358",
  appId: "1:63867156358:web:fefc0963e6245e234d5e07"
};

// Initialize Firebase
const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { app, auth, db };