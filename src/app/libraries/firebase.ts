import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyCmbcLikVzE_zMnhKnF-t__1QGDYNHejjo",
    authDomain: "bumi-f9914.firebaseapp.com",
    projectId: "bumi-f9914",
    storageBucket: "bumi-f9914.appspot.com",
    messagingSenderId: "372593884181",
    appId: "1:372593884181:web:b377d4a149b2fb7eef221c",
    measurementId: "G-QGHSKTD97Q"
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore(app);
const auth = getAuth(app);
const storage = getStorage(app);

export { db, auth, storage };