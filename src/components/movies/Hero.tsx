import axios from "axios";
import { useEffect, useState } from "react";
import endpoints, { createImageUrl } from "../../services/movieServices";
import { Movie, getMovieMetadata } from "../../services/movieServices";
import MovieDetailModal from "./MovieDetailModal";

const truncate = (str: string, len: number): string => {
	if (!str) return "";
	return str.length > len ? str.slice(0, len) + "..." : str;
};

interface HeroBannerProps {
	movie: Movie;
	onMoreInfo: () => void;
}

const HeroBanner = ({ movie, onMoreInfo }: HeroBannerProps) => {
	const { backdrop_path, overview } = movie;
	const { displayName, release } = getMovieMetadata(movie);

	return (
		<div className="w-full h-[60vh] sm:h-[70vh] lg:h-[90vh] relative overflow-hidden bg-black">
			{/* Bottom fade */}
			<div className="absolute bottom-0 left-0 w-full h-40 bg-gradient-to-t from-black to-transparent z-20 pointer-events-none" />
			{/* Side fade */}
			<div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/50 to-transparent z-10 pointer-events-none" />
			{/* Top fade */}
			<div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-black/60 to-transparent z-10 pointer-events-none" />

			<img
				className="w-full h-full object-cover object-top animate-fade-in"
				src={createImageUrl(backdrop_path ?? movie.poster_path, "original") ?? "https://images.unsplash.com/photo-1594909122845-11baa439b7bf?q=80&w=1920"}
				alt={displayName}
			/>

			<div className="absolute w-full bottom-[12%] sm:bottom-[15%] lg:bottom-[22%] px-4 sm:px-8 lg:px-16 z-30">
				<h1 className="text-3xl sm:text-5xl lg:text-7xl font-nsans-bold text-white max-w-[90%] sm:max-w-2xl drop-shadow-lg leading-tight animate-hero-text opacity-0">
					{displayName}
				</h1>

				<div className="flex items-center gap-3 my-4 opacity-0 animate-fade-in-up-200">
					<button
						onClick={() => window.open(`https://www.google.com/search?q=${encodeURIComponent(displayName)}`, "_blank", "noopener,noreferrer")}
						className="capitalize bg-white hover:bg-neutral-200 text-black py-2 sm:py-2.5 px-5 sm:px-8 rounded font-nsans-bold text-sm sm:text-base flex items-center gap-2 shadow-xl transition-all duration-300 ease-butter hover:scale-105 active:scale-95 cursor-pointer"
					>
						&#9658; Play
					</button>
					<button
						onClick={onMoreInfo}
						className="capitalize bg-neutral-600/60 hover:bg-neutral-600/90 text-white py-2 sm:py-2.5 px-5 sm:px-8 rounded font-nsans-bold text-sm sm:text-base shadow-xl transition-all duration-300 ease-butter hover:scale-105 active:scale-95 cursor-pointer backdrop-blur-sm"
					>
						&#9432; More Info
					</button>
				</div>

				<p className="text-gray-400 text-xs sm:text-sm mb-2 opacity-0 animate-fade-in-up-400">
					{release}
				</p>
				<p className="w-full sm:max-w-[70%] lg:max-w-[45%] text-gray-200 text-xs sm:text-sm lg:text-base leading-relaxed drop-shadow opacity-0 animate-fade-in-up-600">
					{truncate(overview, 165)}
				</p>
			</div>
		</div>
	);
};

const HeroSkeleton = () => (
	<div className="w-full h-[60vh] sm:h-[70vh] lg:h-[90vh] relative overflow-hidden bg-neutral-900">
		<div className="absolute inset-0 bg-gradient-to-r from-neutral-800 to-neutral-900 animate-shimmer bg-[length:200%_100%]" />
		<div className="absolute bottom-0 left-0 w-full h-40 bg-gradient-to-t from-black to-transparent" />
		<div className="absolute w-full bottom-[22%] px-4 sm:px-8 lg:px-16 space-y-4">
			<div className="h-10 sm:h-14 lg:h-20 w-64 sm:w-96 bg-neutral-800/60 rounded-lg animate-pulse" />
			<div className="flex gap-3">
				<div className="h-10 w-24 bg-neutral-700/60 rounded animate-pulse" />
				<div className="h-10 w-32 bg-neutral-700/40 rounded animate-pulse" />
			</div>
			<div className="h-4 w-48 bg-neutral-800/60 rounded animate-pulse" />
			<div className="space-y-2">
				<div className="h-3 w-full max-w-md bg-neutral-800/60 rounded animate-pulse" />
				<div className="h-3 w-full max-w-sm bg-neutral-800/60 rounded animate-pulse" />
				<div className="h-3 w-full max-w-xs bg-neutral-800/60 rounded animate-pulse" />
			</div>
		</div>
	</div>
);

const Hero = () => {
	const [movie, setMovie] = useState<Movie | null>(null);
	const [showModal, setShowModal] = useState(false);

	useEffect(() => {
		let isMounted = true;
		axios.get(endpoints.popular).then((response) => {
			if (!isMounted) return;
			const movies = response.data.results as Movie[];
			if (movies && movies.length > 0) {
				const randomMovie = movies[Math.floor(Math.random() * movies.length)];
				setMovie(randomMovie);
			}
		});
		return () => {
			isMounted = false;
		};
	}, []);

	if (!movie) return <HeroSkeleton />;

	return (
		<>
			<HeroBanner movie={movie} onMoreInfo={() => setShowModal(true)} />
			{showModal && (
				<MovieDetailModal
					id={movie.id}
					isTv={!movie.title}
					onClose={() => setShowModal(false)}
				/>
			)}
		</>
	);
};

export default Hero;
