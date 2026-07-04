import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import {
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
	signOut,
	onAuthStateChanged,
	User,
	UserCredential,
} from "firebase/auth";
import { auth, db } from "../services/firebase";
import { doc, setDoc } from "firebase/firestore";

interface AuthContextType {
	user: User | null;
	signUp: (email: string, password: string) => Promise<UserCredential>;
	logIn: (email: string, password: string) => Promise<UserCredential>;
	logOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthContextProvider({ children }: { children: ReactNode }) {
	const [user, setUser] = useState<User | null>(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
			setUser(currentUser);
			setLoading(false);
		});

		return () => {
			unsubscribe();
		};
	}, []);

	async function signUp(email: string, password: string): Promise<UserCredential> {
		const userCredential = await createUserWithEmailAndPassword(auth, email, password);
		await setDoc(doc(db, "users", email), {
			favShows: [],
		});
		return userCredential;
	}

	function logIn(email: string, password: string): Promise<UserCredential> {
		return signInWithEmailAndPassword(auth, email, password);
	}

	function logOut(): Promise<void> {
		return signOut(auth);
	}

	return (
		<AuthContext.Provider value={{ user, signUp, logIn, logOut }}>
			{!loading && children}
		</AuthContext.Provider>
	);
}

export function UserAuth(): AuthContextType {
	const context = useContext(AuthContext);
	if (!context) {
		throw new Error("UserAuth must be used within an AuthContextProvider");
	}
	return context;
}
