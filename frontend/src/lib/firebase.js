import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { 
  initializeFirestore, 
  getFirestore, 
  terminate,
  clearIndexedDbPersistence
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAf5OQk0B3hHHenhSRXv-ANCO8jvtDnjoI",
  authDomain: "agentjob-bb2cd.firebaseapp.com",
  projectId: "agentjob-bb2cd",
  storageBucket: "agentjob-bb2cd.firebasestorage.app",
  messagingSenderId: "63867156358",
  appId: "1:63867156358:web:fefc0963e6245e234d5e07"
};

// Singleton App initialization
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const auth = getAuth(app);

// Optimized Firestore initialization with resilience fixes
let db;
try {
  db = initializeFirestore(app, {});
} catch (e) {
  db = getFirestore(app);
}

export const recoverFirestore = async () => {
  if (db) {
    await terminate(db);
    await clearIndexedDbPersistence(db);
    window.location.reload();
  }
};

export { app, auth, db };