import axios from "axios";
import { useEffect, useState } from "react";
import endpoints, { createImageUrl } from "../../services/movieServices";

export interface Movie {
  id: number;
  title: string;
  backdrop_path: string | null;
  poster_path: string | null;
  release_date: string;
  overview: string;
}

const Hero = () => {
	const [movie, setMovie] = useState<Movie | null>(null);

	useEffect(() => {
		axios.get(endpoints.popular).then((response) => {
			const movies = response.data.results as Movie[];
			if (movies && movies.length > 0) {
				const randomMovie = movies[Math.floor(Math.random() * movies.length)];
				setMovie(randomMovie);
			}
		});
	}, []);

	const truncate = (str: string, len: number): string => {
		if (!str) return "";
		return str.length > len ? str.slice(0, len) + "..." : str;
	};

	if (!movie) {
		return (
			<div className="w-full h-[550px] lg:h-[850px] flex items-center justify-center text-white bg-black">
				<p className="font-nsans-medium text-lg animate-pulse">Fetching Movies...</p>
			</div>
		);
	}

	const { title, backdrop_path, release_date, overview } = movie;

	return (
		<div className="w-full h-[550px] lg:h-[850px] relative overflow-hidden bg-black">
			{/* Bottom fade overlay to blend into the main layout */}
			<div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-black to-transparent z-20" />
			
			{/* Left side overlay for text readability */}
			<div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/40 to-transparent z-10" />

			<img
				className="w-full h-full object-cover object-top"
				src={createImageUrl(backdrop_path, "original")}
				alt={title}
			/>

			<div className="absolute w-full bottom-[10%] lg:bottom-[20%] p-4 md:p-8 lg:px-16 z-30">
				<h1 className="text-3xl sm:text-5xl lg:text-7xl font-nsans-bold text-white max-w-2xl drop-shadow-lg leading-tight">
					{title}
				</h1>
				
				<div className="flex items-center gap-3 my-4">
					<button className="capitalize bg-white hover:bg-neutral-200 text-black py-2 px-6 rounded font-nsans-bold text-sm md:text-base flex items-center gap-2 shadow-md transition duration-200 cursor-pointer">
						▶ Play
					</button>
					<button className="capitalize bg-neutral-600/60 hover:bg-neutral-600/80 text-white py-2 px-6 rounded font-nsans-bold text-sm md:text-base shadow-md transition duration-200 cursor-pointer">
						ⓘ More Info
					</button>
				</div>
				
				<p className="text-gray-400 text-xs md:text-sm mb-2">{release_date}</p>
				<p className="w-full md:max-w-[70%] lg:max-w-[50%] text-gray-200 text-xs md:text-sm lg:text-base leading-relaxed drop-shadow">
					{truncate(overview, 165)}
				</p>
			</div>
		</div>
	);
};

export default Hero;
