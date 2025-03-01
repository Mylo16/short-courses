import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDfZB3rVOkpXHWRB8H-NH3cF93FhbUqVZ4",
  authDomain: "e-short-courses.firebaseapp.com",
  projectId: "e-short-courses",
  storageBucket: "e-short-courses.firebasestorage.app",
  messagingSenderId: "525608614196",
  appId: "1:525608614196:web:180ff67a5919159cb08d61",
  measurementId: "G-9CZG472JGK"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const db = getFirestore(app);
const provider = new GoogleAuthProvider();

export { auth, analytics, db, provider, signInWithPopup, signOut };