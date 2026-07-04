import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const {
	VITE_FIREBASE_API_KEY,
	VITE_FIREBASE_AUTH_DOMAIN,
	VITE_FIREBASE_PROJECT_ID,
	VITE_FIREBASE_STORAGE_BUCKET,
	VITE_FIREBASE_MESSAGING_SENDER_ID,
	VITE_FIREBASE_API_ID,
} = import.meta.env;

const firebaseConfig = {
	apiKey: VITE_FIREBASE_API_KEY as string,
	authDomain: VITE_FIREBASE_AUTH_DOMAIN as string,
	projectId: VITE_FIREBASE_PROJECT_ID as string,
	storageBucket: VITE_FIREBASE_STORAGE_BUCKET as string,
	messagingSenderId: VITE_FIREBASE_MESSAGING_SENDER_ID as string,
	appId: VITE_FIREBASE_API_ID as string,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
