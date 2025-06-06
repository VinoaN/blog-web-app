import { initializeApp, getApps, getApp } from 'firebase/app';
import {
  getAuth,
  GoogleAuthProvider as GoogleAuthFirebase,
  onAuthStateChanged as authChangeEventListener,
  User,
  signInWithPopup as firebaseSignIn,
  signOut as firebaseSignOut,
} from 'firebase/auth';
import { Timestamp } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_APIKEY,
  authDomain: process.env.NEXT_PUBLIC_AUTHDOMAIN,
  projectId: process.env.NEXT_PUBLIC_PROJECTID,
  storageBucket: process.env.NEXT_PUBLIC_STORAGEBUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_MESSAGINGSENDERID,
  appId: process.env.NEXT_PUBLIC_APPID,
  measurementId: process.env.NEXT_PUBLIC_MEASUREMENTID,
};

const firebaseApp = !getApps().length
  ? initializeApp(firebaseConfig)
  : getApp();
const firebaseAuth = getAuth(firebaseApp);

const googleAuthProvider = new GoogleAuthFirebase();
googleAuthProvider.setCustomParameters({ prompt: 'select_account' });

export {
  firebaseAuth,
  googleAuthProvider,
  firebaseSignIn,
  authChangeEventListener,
  firebaseSignOut,
  GoogleAuthFirebase,
  Timestamp as FirebaseTimestamp,
};
export type { User as FirebaseUser, Timestamp as FirebaseTimestampType };
