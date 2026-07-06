import React, { useEffect, useState, useRef } from "react";
import { useNavigate, Link } from "react-router-dom";
import { UserAuth } from "../../context/AuthContext";
import { FaSearch, FaTimes } from "react-icons/fa";
import netflixLogo from "../../assets/netflix-logo.svg";

const useScrollNavbar = () => {
	const [isScrolled, setIsScrolled] = useState(false);
	useEffect(() => {
		const handleScroll = () => setIsScrolled(window.scrollY > 20);
		window.addEventListener("scroll", handleScroll, { passive: true });
		return () => window.removeEventListener("scroll", handleScroll);
	}, []);
	return isScrolled;
};

const useNavbarSearch = () => {
	const navigate = useNavigate();
	const [searchQuery, setSearchQuery] = useState("");
	const [mobileSearchOpen, setMobileSearchOpen] = useState(false);
	const mobileInputRef = useRef<HTMLInputElement>(null);

	const handleSearchSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		if (searchQuery.trim()) {
			navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
			setMobileSearchOpen(false);
		}
	};

	const toggleMobileSearch = () => {
		setMobileSearchOpen((v) => !v);
		setTimeout(() => mobileInputRef.current?.focus(), 50);
	};

	return { searchQuery, setSearchQuery, mobileSearchOpen, toggleMobileSearch, handleSearchSubmit, mobileInputRef };
};

interface SearchFormProps {
	searchQuery: string;
	setSearchQuery: (v: string) => void;
	onSubmit: (e: React.FormEvent) => void;
	placeholder?: string;
	inputClass: string;
}

const SearchForm = ({ searchQuery, setSearchQuery, onSubmit, placeholder = "Search...", inputClass }: SearchFormProps) => (
	<form onSubmit={onSubmit} className="relative flex items-center">
		<FaSearch className="absolute left-3 text-neutral-400 text-xs pointer-events-none z-10" />
		<input
			type="text"
			placeholder={placeholder}
			value={searchQuery}
			onChange={(e) => setSearchQuery(e.target.value)}
			className={inputClass}
		/>
	</form>
);

interface MobileSearchDrawerProps {
	open: boolean;
	searchQuery: string;
	setSearchQuery: (v: string) => void;
	onSubmit: (e: React.FormEvent) => void;
	inputRef: React.RefObject<HTMLInputElement | null>;
}

const MobileSearchDrawer = ({ open, searchQuery, setSearchQuery, onSubmit, inputRef }: MobileSearchDrawerProps) => (
	<div
		className={`sm:hidden overflow-hidden transition-all duration-400 ease-butter ${open ? "max-h-16 opacity-100" : "max-h-0 opacity-0"
			}`}
	>
		<form onSubmit={onSubmit} className="px-4 pb-3">
			<div className="relative flex items-center">
				<FaSearch className="absolute left-3 text-neutral-400 text-xs pointer-events-none" />
				<input
					ref={inputRef}
					type="text"
					placeholder="Search movies, shows..."
					value={searchQuery}
					onChange={(e) => setSearchQuery(e.target.value)}
					className="w-full bg-black/60 border border-neutral-700 text-white placeholder-neutral-500 rounded-full pl-9 pr-4 py-2 text-sm focus:outline-none focus:border-red-600 focus:bg-black/80 transition-all duration-300 backdrop-blur-sm"
				/>
			</div>
		</form>
	</div>
);

interface NavUserActionsProps {
	email?: string | null;
	onLogout: () => void;
}

const NavUserActions = ({ email, onLogout }: NavUserActionsProps) =>
	email ? (
		<div className="flex items-center gap-2 sm:gap-4">
			<Link to="/profile">
				<button className="capitalize text-white hover:text-gray-300 text-sm font-nsans-medium transition-colors duration-200 cursor-pointer hidden sm:block">
					profile
				</button>
			</Link>
			<button
				onClick={onLogout}
				className="capitalize bg-red-600 px-3 sm:px-5 py-1.5 sm:py-2 rounded text-white font-nsans-medium hover:bg-red-700 active:bg-red-800 transition-all duration-200 ease-butter cursor-pointer text-xs sm:text-sm shadow-md hover:shadow-red-600/30 hover:shadow-lg"
			>
				logout
			</button>
		</div>
	) : (
		<div className="flex items-center gap-2 sm:gap-4">
			<Link to="/login">
				<button className="capitalize text-white hover:text-gray-300 text-sm font-nsans-medium transition-colors duration-200 cursor-pointer hidden sm:block">
					login
				</button>
			</Link>
			<Link to="/signup">
				<button className="capitalize bg-red-600 px-3 sm:px-5 py-1.5 sm:py-2 rounded text-white font-nsans-medium hover:bg-red-700 active:bg-red-800 transition-all duration-200 ease-butter cursor-pointer text-xs sm:text-sm shadow-md">
					sign up
				</button>
			</Link>
		</div>
	);

const Navbar = () => {
	const { user, logOut } = UserAuth();
	const navigate = useNavigate();
	const isScrolled = useScrollNavbar();
	const { searchQuery, setSearchQuery, mobileSearchOpen, toggleMobileSearch, handleSearchSubmit, mobileInputRef } =
		useNavbarSearch();

	const handleLogout = async () => {
		try {
			await logOut();
			navigate("/");
		} catch (err) {
			console.error(err);
		}
	};

	return (
		<nav
			className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ease-butter ${isScrolled ? "bg-black/95 backdrop-blur-md shadow-lg shadow-black/50" : "bg-linear-to-b from-black/70 to-transparent"
				}`}
		>
			<div className="flex items-center justify-between px-4 sm:px-6 lg:px-10 py-3 sm:py-4">
				<div className="flex items-center gap-4 sm:gap-6 min-w-0">
					<Link to="/" className="shrink-0">
						<img className="w-24 sm:w-28 md:w-36" src={netflixLogo} alt="Netflix" />
					</Link>
					<div className="hidden sm:block">
						<SearchForm
							searchQuery={searchQuery}
							setSearchQuery={setSearchQuery}
							onSubmit={handleSearchSubmit}
							placeholder="Search movies, shows..."
							inputClass="bg-black/50 border border-neutral-700/70 text-white placeholder-neutral-500 rounded-full pl-9 pr-4 py-1.5 text-sm focus:outline-none focus:border-red-600 focus:bg-black/80 focus:w-64 transition-all duration-400 ease-butter w-44 md:w-56 backdrop-blur-sm"
						/>
					</div>
				</div>
				<div className="flex items-center gap-2 sm:gap-4 shrink-0">
					<button
						onClick={toggleMobileSearch}
						className="sm:hidden text-white p-2 rounded-full hover:bg-white/10 transition-colors duration-200 cursor-pointer"
						aria-label="Search"
					>
						{mobileSearchOpen ? <FaTimes size={16} /> : <FaSearch size={16} />}
					</button>
					<NavUserActions email={user?.email} onLogout={handleLogout} />
				</div>
			</div>
			<MobileSearchDrawer
				open={mobileSearchOpen}
				searchQuery={searchQuery}
				setSearchQuery={setSearchQuery}
				onSubmit={handleSearchSubmit}
				inputRef={mobileInputRef}
			/>
		</nav>
	);
};

export default Navbar;
