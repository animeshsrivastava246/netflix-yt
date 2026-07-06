import { useEffect, useState } from "react";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";
import { AiOutlineClose } from "react-icons/ai";
import { UserAuth } from "../context/AuthContext";
import { db } from "../services/firebase";
import { createImageUrl } from "../services/movieServices";
import { arrayRemove, doc, onSnapshot, updateDoc } from "firebase/firestore";
import { Movie, getMovieMetadata } from "../services/movieServices";
import MovieDetailModal from "../components/movies/MovieDetailModal";

const useProfileFavorites = (email?: string | null) => {
	const [movies, setMovies] = useState<Movie[]>([]);

	useEffect(() => {
		if (email) {
			const unsubscribe = onSnapshot(doc(db, "users", email), (docSnap) => {
				if (docSnap.exists() && docSnap.data()) {
					setMovies((docSnap.data().favShows as Movie[]) || []);
				}
			});
			return () => unsubscribe();
		}
	}, [email]);

	const unlikeShow = async (movie: Movie) => {
		if (email) {
			const userDoc = doc(db, "users", email);
			await updateDoc(userDoc, {
				favShows: arrayRemove(movie),
			});
		}
	};

	return { movies, unlikeShow };
};

const ProfileHeader = ({ email }: { email: string }) => (
	<div className="relative w-full h-[400px] md:h-[500px]">
		<img
			className="block w-full h-full object-cover opacity-60"
			src="https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?q=80&w=1920"
			alt="Netflix background"
		/>
		<div className="bg-linear-to-t from-black via-black/45 to-transparent absolute inset-0" />
		<div className="absolute bottom-[10%] left-4 md:left-12 lg:left-16 p-4 z-25">
			<h1 className="text-3xl md:text-5xl lg:text-6xl font-nsans-bold my-2 drop-shadow-md">
				My Shows
			</h1>
			<p className="font-nsans-light text-gray-400 text-sm md:text-lg">{email}</p>
		</div>
	</div>
);

interface FavoriteCardProps {
	movie: Movie;
	onSelect: () => void;
	onUnlike: (e: React.MouseEvent) => void;
}

const FavoriteCard = ({ movie, onSelect, onUnlike }: FavoriteCardProps) => {
	const { displayName } = getMovieMetadata(movie);
	return (
		<div
			onClick={onSelect}
			className="relative w-[160px] sm:w-[200px] md:w-[240px] lg:w-[280px] inline-block rounded-lg overflow-hidden cursor-pointer m-2 transition-transform duration-300 ease-out hover:scale-105 shadow-md hover:shadow-xl"
		>
			<img
				className="w-full h-28 sm:h-36 md:h-40 block object-cover object-top"
				src={createImageUrl(movie.backdrop_path ?? movie.poster_path, "w500") || "https://images.unsplash.com/photo-1594909122845-11baa439b7bf?q=80&w=500"}
				alt={displayName}
			/>
			<div className="absolute inset-0 bg-black/75 opacity-0 hover:opacity-100 transition-opacity duration-200 flex flex-col justify-between p-3">
				<button
					onClick={onUnlike}
					className="self-end text-gray-300 hover:text-white drop-shadow-md transition-colors"
					title="Remove from favorites"
				>
					<AiOutlineClose size={22} className="hover:scale-110 transition-transform" />
				</button>
				<p className="whitespace-normal text-xs md:text-sm font-nsans-bold text-white text-center leading-tight">
					{displayName}
				</p>
				<div className="h-[22px]" />
			</div>
		</div>
	);
};

interface FavoritesSliderProps {
	movies: Movie[];
	slide: (offset: number) => void;
	setSelectedMovie: (m: Movie) => void;
	unlikeShow: (m: Movie) => void;
}

const FavoritesSlider = ({ movies, slide, setSelectedMovie, unlikeShow }: FavoritesSliderProps) => (
	<div className="relative flex items-center group">
		<MdChevronLeft
			onClick={() => slide(-500)}
			className="bg-black/60 hover:bg-black/80 rounded-full absolute left-2 opacity-0 group-hover:opacity-100 text-white z-10 hidden group-hover:block cursor-pointer transition-all duration-200 border border-white/10 shadow-lg"
			size={40}
		/>
		<div
			id="slider"
			className="w-full h-full overflow-x-scroll whitespace-nowrap scroll-smooth scrollbar-hide py-2"
		>
			{movies.length === 0 ? (
				<p className="text-gray-500 font-nsans-medium text-sm py-4 px-2">
					No favorite shows added yet. Mark shows as favorite on the home screen!
				</p>
			) : (
				movies.map((movie) => (
					<FavoriteCard
						key={movie.id}
						movie={movie}
						onSelect={() => setSelectedMovie(movie)}
						onUnlike={(e) => {
							e.stopPropagation();
							unlikeShow(movie);
						}}
					/>
				))
			)}
		</div>
		<MdChevronRight
			onClick={() => slide(500)}
			className="bg-black/60 hover:bg-black/80 rounded-full absolute right-2 opacity-0 group-hover:opacity-100 text-white z-10 hidden group-hover:block cursor-pointer transition-all duration-200 border border-white/10 shadow-lg"
			size={40}
		/>
	</div>
);

// fallow-ignore-next-line complexity
const Profile = () => {
	const { user } = UserAuth();
	const { movies, unlikeShow } = useProfileFavorites(user?.email);
	const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);

	const slide = (offset: number) => {
		const slider = document.getElementById("slider");
		if (slider) slider.scrollLeft += offset;
	};

	if (!user) {
		return (
			<div className="w-full h-screen flex items-center justify-center text-white bg-black">
				<p className="font-nsans-medium text-lg animate-pulse">Fetching your shows...</p>
			</div>
		);
	}

	const isTv = selectedMovie ? selectedMovie.media_type === "tv" || !selectedMovie.title : false;

	return (
		<div className="bg-black text-white min-h-screen pb-12 pt-20">
			<ProfileHeader email={user.email || ""} />

			<div className="px-4 md:px-12 lg:px-16 mt-6">
				<h2 className="font-nsans-bold text-lg md:text-2xl mb-4 capitalize text-white tracking-wide">
					My Favorite Shows
				</h2>
				<FavoritesSlider
					movies={movies}
					slide={slide}
					setSelectedMovie={setSelectedMovie}
					unlikeShow={unlikeShow}
				/>
			</div>

			{selectedMovie && (
				<MovieDetailModal
					id={selectedMovie.id}
					isTv={isTv}
					onClose={() => setSelectedMovie(null)}
				/>
			)}
		</div>
	);
};

export default Profile;
