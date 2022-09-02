import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: process.env.API_KEY,
    authDomain: "discord-clone-6d5c7.firebaseapp.com",
    projectId: "discord-clone-6d5c7",
    storageBucket: "discord-clone-6d5c7.appspot.com",
    messagingSenderId: "490463437935",
    appId: "1:490463437935:web:3681753eb463c96e11999a",
    measurementId: "G-F5QR3Q1FK8"
  };

  const firebaseApp = initializeApp(firebaseConfig);
  const db = getFirestore();
  const auth = getAuth();
  const provider = new GoogleAuthProvider();

  export { auth, provider };
  export default db;
