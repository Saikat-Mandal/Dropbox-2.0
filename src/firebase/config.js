// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";
import { getAuth , GoogleAuthProvider  } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDW8GBvTA_2gxtZA1E6vev1keZGc8BgZbo",
  authDomain: "dropbox-2.firebaseapp.com",
  projectId: "dropbox-2",
  storageBucket: "dropbox-2.appspot.com",
  messagingSenderId: "757788896067",
  appId: "1:757788896067:web:f55896c00911fcd29cddf6",
  measurementId: "G-RTYJSQTRYJ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);

export const googleProvider = new GoogleAuthProvider()

export const db = getFirestore(app);

export const storage = getStorage(app);
