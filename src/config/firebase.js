// Functions Import
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// Firebase Configuration
// Add to .env file
const firebaseConfig = {
  apiKey: 'AIzaSyCsxrCR6cYpt2iKxbMhszxPLerzN0R0F28',
  authDomain: 'revio-4f6e0.firebaseapp.com',
  projectId: 'revio-4f6e0',
  storageBucket: 'revio-4f6e0.appspot.com',
  messagingSenderId: '524840537882',
  appId: '1:524840537882:web:8765c30256563fad8be6a3',
  measurementId: 'G-M9RZVWGKC6',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const db = getFirestore(app);
