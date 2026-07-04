import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { UserAuth } from "../../context/AuthContext";

const Navbar = () => {
	const { user, logOut } = UserAuth();
	const navigate = useNavigate();
	const [isScrolled, setIsScrolled] = useState(false);

	useEffect(() => {
		const handleScroll = () => {
			if (window.scrollY > 20) {
				setIsScrolled(true);
			} else {
				setIsScrolled(false);
			}
		};
		window.addEventListener("scroll", handleScroll);
		return () => window.removeEventListener("scroll", handleScroll);
	}, []);

	const handleLogout = async () => {
		try {
			await logOut();
			navigate("/");
		} catch (err) {
			console.error(err);
		}
	};

	return (
		<div
			className={`fixed top-0 left-0 w-full p-4 md:px-8 flex items-center justify-between z-50 transition-all duration-300 ${
				isScrolled
					? "bg-black/90 backdrop-blur-md border-b border-white/5 shadow-lg"
					: "bg-gradient-to-b from-black/80 to-transparent"
			}`}
		>
			<Link to="/">
				<h1 className="uppercase text-red-600 font-nsans-bold cursor-pointer text-3xl sm:text-4xl lg:text-5xl tracking-tighter">
					Netflix
				</h1>
			</Link>

			{user?.email ? (
				<div className="flex items-center gap-4">
					<Link to="/profile">
						<button className="capitalize text-white hover:text-gray-300 text-sm md:text-base font-nsans-medium transition-colors">
							profile
						</button>
					</Link>

					<button
						onClick={handleLogout}
						className="capitalize bg-red-600 px-4 md:px-6 py-2 rounded text-white font-nsans-medium hover:bg-red-700 transition-colors cursor-pointer text-sm md:text-base shadow-md"
					>
						logout
					</button>
				</div>
			) : (
				<div className="flex items-center gap-4">
					<Link to="/login">
						<button className="capitalize text-white hover:text-gray-300 text-sm md:text-base font-nsans-medium transition-colors">
							login
						</button>
					</Link>
					<Link to="/signup">
						<button className="capitalize bg-red-600 px-4 md:px-6 py-2 rounded text-white font-nsans-medium hover:bg-red-700 transition-colors cursor-pointer text-sm md:text-base shadow-md">
							sign up
						</button>
					</Link>
				</div>
			)}
		</div>
	);
};

export default Navbar;
