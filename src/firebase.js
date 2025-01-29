import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCaOp6xPJSHalfQ0NHLtz87vWDvmW_lxzA",
  authDomain: "excalibrush-blog.firebaseapp.com",
  databaseURL:
    "https://excalibrush-blog-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "excalibrush-blog",
  storageBucket: "excalibrush-blog.firebasestorage.app",
  messagingSenderId: "263322573867",
  appId: "1:263322573867:web:9c46d1b408e6228eacde6e",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);
