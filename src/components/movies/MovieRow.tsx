import { useEffect, useState } from "react";
import axios from "axios";
import MovieItem from "./MovieItem";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";
import { Movie } from "./Hero";

interface MovieRowProps {
	title: string;
	url: string;
}

const MovieRow = ({ title, url }: MovieRowProps) => {
	const [movies, setMovies] = useState<Movie[]>([]);
	const [rowId] = useState(() => Math.floor(Math.random() * 1000));

	useEffect(() => {
		axios.get(url).then((response) => {
			if (response.data?.results) {
				setMovies(response.data.results as Movie[]);
			}
		});
	}, [url]);

	const slide = (offset: number) => {
		const slider = document.getElementById("slider" + rowId);
		if (slider) {
			slider.scrollLeft = slider.scrollLeft + offset;
		}
	};

	return (
		<div className="my-6">
			<h2 className="font-nsans-bold text-lg md:text-2xl px-4 md:px-8 mb-2 capitalize text-white tracking-wide">
				{title}
			</h2>

			<div className="relative flex items-center group px-4 md:px-8">
				<MdChevronLeft
					onClick={() => slide(-500)}
					className="bg-black/60 hover:bg-black/80 rounded-full absolute left-4 md:left-8 opacity-0 group-hover:opacity-100 text-white z-10 hidden group-hover:block cursor-pointer transition-all duration-250 border border-white/10 shadow-lg"
					size={40}
				/>
				<div
					id={`slider` + rowId}
					className="w-full h-full overflow-x-scroll whitespace-nowrap scroll-smooth scrollbar-hide py-2"
				>
					{movies.map((movie) => (
						<MovieItem key={movie.id} movie={movie} />
					))}
				</div>
				<MdChevronRight
					onClick={() => slide(500)}
					className="bg-black/60 hover:bg-black/80 rounded-full absolute right-4 md:right-8 opacity-0 group-hover:opacity-100 text-white z-10 hidden group-hover:block cursor-pointer transition-all duration-250 border border-white/10 shadow-lg"
					size={40}
				/>
			</div>
		</div>
	);
};

export default MovieRow;
