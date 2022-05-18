import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'

const firebaseConfig = {
  apiKey: "AIzaSyBkq0GuC_ey3lVZ9-U7WEKFfHqrT2yJpmQ",
  authDomain: "image-crud-31a3d.firebaseapp.com",
  projectId: "image-crud-31a3d",
  storageBucket: "image-crud-31a3d.appspot.com",
  messagingSenderId: "39053612419",
  appId: "1:39053612419:web:b0ce6e7dd198714a7852b6"
};


const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage(app);