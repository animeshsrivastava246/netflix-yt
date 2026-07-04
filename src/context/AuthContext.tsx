import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import {
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
	signOut,
	onAuthStateChanged,
	UserCredential,
} from "firebase/auth";
import { auth, db } from "../services/firebase";
import { doc, setDoc } from "firebase/firestore";

interface AuthContextType {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	user: any;
	isLoading: boolean;
	signUp: (email: string, password: string) => Promise<void>;
	logIn: (email: string, password: string) => Promise<UserCredential>;
	logOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthContextProvider({ children }: { children: ReactNode }) {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const [user, setUser] = useState<any>(null);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
			setUser(currentUser);
			setIsLoading(false);
		});

		return () => {
			unsubscribe();
		};
	}, []);

	async function signUp(email: string, password: string) {
		const credential = await createUserWithEmailAndPassword(auth, email, password);
		await setDoc(doc(db, "users", credential.user.email!), {
			favShows: [],
		});
	}
	function logIn(email: string, password: string) {
		return signInWithEmailAndPassword(auth, email, password);
	}
	function logOut() {
		return signOut(auth);
	}
	return (
		<AuthContext.Provider value={{ user, isLoading, signUp, logIn, logOut }}>
			{children}
		</AuthContext.Provider>
	);
}

export function UserAuth() {
	const context = useContext(AuthContext);
	if (!context) {
		throw new Error("UserAuth must be used within AuthContextProvider");
	}
	return context;
}