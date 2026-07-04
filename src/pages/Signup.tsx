import { useState, FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserAuth } from "../context/AuthContext";

const Signup = () => {
	const [rememberLogin, setRememberLogin] = useState(true);
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const { signUp } = UserAuth();
	const navigate = useNavigate();

	const handleFormSubmit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		try {
			await signUp(email, password);
			navigate("/");
		} catch (err) {
			alert("Something went wrong");
			console.error(err);
		}
	};

	return (
		<div className="w-full min-h-screen relative flex items-center justify-center bg-black">
			{/* Background Image for desktop */}
			<img
				className="hidden sm:block absolute inset-0 w-full h-full object-cover opacity-50"
				src="https://assets.nflxext.com/ffe/siteui/vlv3/b4c7f092-0488-48b7-854d-ca055a84fb4f/5b22968d-b94f-44ec-bea3-45dcf457f29e/IN-en-20231204-popsignuptwoweeks-perspective_alpha_website_large.jpg"
				alt="Background"
			/>
			{/* Overlay */}
			<div className="absolute inset-0 bg-black/60 sm:bg-black/40" />

			<div className="w-full max-w-[450px] min-h-[500px] sm:bg-black/75 backdrop-blur-sm rounded-lg p-8 md:p-14 z-20 mx-4 border border-white/5 shadow-2xl">
				<h1 className="text-3xl md:text-4xl font-nsans-bold text-white mb-6">Sign Up</h1>

				<form onSubmit={handleFormSubmit} className="w-full flex flex-col gap-4">
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
						autoComplete="new-password"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						required
					/>

					<button className="bg-red-600 py-3.5 mt-4 rounded font-nsans-bold text-white hover:bg-red-700 active:bg-red-800 transition duration-150 cursor-pointer shadow-md">
						Sign Up
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
						Already subscribed to Netflix?{" "}
						<Link to="/login" className="text-white hover:underline">
							Sign In now
						</Link>
					</p>
				</form>
			</div>
		</div>
	);
};

export default Signup;
