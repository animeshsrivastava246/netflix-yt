import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserAuth } from "../../context/AuthContext";

interface AuthFormProps {
	isSignUp?: boolean;
}

const useAuthForm = (isSignUp: boolean) => {
	const [rememberLogin, setRememberLogin] = useState(true);
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const { signUp, logIn } = UserAuth();
	const navigate = useNavigate();

	const handleFormSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
		e.preventDefault();

		try {
			if (isSignUp) {
				await signUp(email, password);
			} else {
				await logIn(email, password);
			}
			navigate("/");
		} catch (err) {
			alert(isSignUp ? "Something went wrong" : "Incorrect E-mail or Password");
			console.error(err);
		}
	};

	const title = isSignUp ? "Sign Up" : "Login";
	const alternateLink = isSignUp ? "/login" : "/signup";
	const alternateText = isSignUp ? "Already subscribed to Netflix? Sign In now" : "New to Netflix? Sign Up now";

	return {
		rememberLogin,
		setRememberLogin,
		email,
		setEmail,
		password,
		setPassword,
		handleFormSubmit,
		title,
		alternateLink,
		alternateText,
	};
};

const AuthBackground = () => (
	<>
		<img
			className="hidden sm:block absolute inset-0 w-full h-full object-cover opacity-50"
			src="https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?q=80&w=1920"
			alt="Background"
		/>
		<div className="absolute inset-0 bg-black/60 sm:bg-black/40" />
	</>
);

interface AuthInputsProps {
	email: string;
	setEmail: (v: string) => void;
	password: string;
	setPassword: (v: string) => void;
	isSignUp: boolean;
}

const AuthInputs = ({ email, setEmail, password, setPassword, isSignUp }: AuthInputsProps) => (
	<>
		<input
			className="p-4 bg-zinc-800 text-white rounded focus:outline-none focus:ring-2 focus:ring-red-600 transition duration-150 text-sm"
			type="email"
			placeholder="E-Mail"
			autoComplete="email"
			value={email}
			onChange={(e) => setEmail(e.target.value)}
			required
		/>
		<input
			className="p-4 bg-zinc-800 text-white rounded focus:outline-none focus:ring-2 focus:ring-red-600 transition duration-150 text-sm"
			type="password"
			placeholder="Password"
			autoComplete={isSignUp ? "new-password" : "current-password"}
			value={password}
			onChange={(e) => setPassword(e.target.value)}
			required
		/>
	</>
);

const AuthForm = ({ isSignUp = false }: AuthFormProps) => {
	const {
		rememberLogin,
		setRememberLogin,
		email,
		setEmail,
		password,
		setPassword,
		handleFormSubmit,
		title,
		alternateLink,
		alternateText,
	} = useAuthForm(isSignUp);

	return (
		<div className="w-full min-h-screen relative flex items-center justify-center bg-black">
			<AuthBackground />

			<div className="w-full max-w-[450px] min-h-[500px] sm:bg-black/75 backdrop-blur-sm rounded-lg p-8 md:p-14 z-20 mx-4 border border-white/5 shadow-2xl">
				<h1 className="text-3xl md:text-4xl font-nsans-bold text-white mb-6">{title}</h1>

				<form onSubmit={handleFormSubmit} className="w-full flex flex-col gap-4">
					<AuthInputs
						email={email}
						setEmail={setEmail}
						password={password}
						setPassword={setPassword}
						isSignUp={isSignUp}
					/>

					<button className="bg-red-600 py-3.5 mt-4 rounded font-nsans-bold text-white hover:bg-red-700 active:bg-red-800 transition duration-150 cursor-pointer shadow-md">
						{title}
					</button>

					<div className="flex justify-between items-center text-xs md:text-sm text-neutral-400 mt-2">
						<label className="flex items-center gap-2 cursor-pointer select-none">
							<input
								type="checkbox"
								className="accent-red-600 w-4 h-4 rounded cursor-pointer"
								checked={rememberLogin}
								onChange={() => setRememberLogin(!rememberLogin)}
							/>
							Remember Me
						</label>
						<span className="hover:underline cursor-pointer">Need Help?</span>
					</div>

					<p className="mt-8 text-neutral-500 text-sm">
						<Link to={alternateLink} className="text-white hover:underline">
							{alternateText}
						</Link>
					</p>
				</form>
			</div>
		</div>
	);
};

export default AuthForm;
