import React, { useEffect, useState } from "react";
import axios from "axios";
import MovieItem from "./MovieItem";

const MovieRow = ({ title, url }) => {
	const [movies, setMovies] = useState([]);

	useEffect(() => {
		axios.get(url).then((response) => setMovies(response.data.results));
	}, [url]);

	console.log(movies);

	return (
		<>
			<h2 className="font-nsans-bold md:text-xl p-4 capitalize">{title}</h2>

			<div className="relative flex items-center">
				<div
					id={`slider`}
					className="w-full h-full overflow-x-scroll whitespace-nowrap scroll-smooth scrollbar-hide"
				>
					{movies.map((movie) => (
						<MovieItem key={movie.id} movie={movie} />
					))}
				</div>
			</div>
		</>
	);
};

export default MovieRow;
