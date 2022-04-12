// Import the functions you need from the SDKs you need
import { initializeApp, getApp, getApps } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyBkTruEv9EqOre4B2k1Lvn6YRT6zKQK4X8',
  authDomain: 'twitter-clone-a1afa.firebaseapp.com',
  projectId: 'twitter-clone-a1afa',
  storageBucket: 'twitter-clone-a1afa.appspot.com',
  messagingSenderId: '799414832782',
  appId: '1:799414832782:web:33b938026c92cdd80443df',
  measurementId: 'G-S2X7YWLHJ7',
}

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp()
const db = getFirestore()
const storage = getStorage()

export default app
export { db, storage }
