import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getStorage } from 'firebase/storage'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
	apiKey: 'AIzaSyDWVHaR_QQGUdvWt8G0tmsWyVIuy47vez4',
	authDomain: 'chat-2f250.firebaseapp.com',
	projectId: 'chat-2f250',
	storageBucket: 'chat-2f250.appspot.com',
	messagingSenderId: '1041581671926',
	appId: '1:1041581671926:web:655de24cd7501de1c873d7',
	measurementId: 'G-6HTG7F5JS7'
}

// Initialize Firebase
export const app = initializeApp(firebaseConfig)
export const auth = getAuth()
export const storage = getStorage()
export const db = getFirestore()

// firebase login
// firebase init
// firebase deploy
