import { FirebaseApp, getApp, getApps, initializeApp } from 'firebase/app';
import { Firestore, getFirestore } from 'firebase/firestore';

// Teslimde kişisel Firebase bilgilerini göndermemek için boş bırakıldı.
// Kendi Firebase Console bilgilerinizle doldurunca uygulama Firestore'a bağlanır.
export const firebaseConfig = {
  apiKey: '',
  authDomain: '',
  projectId: '',
  storageBucket: '',
  messagingSenderId: '',
  appId: ''
};

export const isFirebaseConfigured =
  firebaseConfig.apiKey.trim().length > 0 &&
  firebaseConfig.authDomain.trim().length > 0 &&
  firebaseConfig.projectId.trim().length > 0 &&
  firebaseConfig.appId.trim().length > 0;

let firebaseApp: FirebaseApp | null = null;
let firestoreDb: Firestore | null = null;

if (isFirebaseConfigured) {
  firebaseApp = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);
  firestoreDb = getFirestore(firebaseApp);
}

export const app = firebaseApp;
export const db = firestoreDb;
