import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import axios from "axios";
import { getSearchUrl, Movie } from "../services/movieServices";
import MovieItem from "../components/movies/MovieItem";

const useSearchMovies = (query: string) => {
	const [movies, setMovies] = useState<Movie[]>([]);
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		if (!query) return;

		setLoading(true);
		setMovies([]);

		axios
			.get(getSearchUrl(query))
			.then((res) => setMovies(res.data.results || []))
			.catch(console.error)
			.finally(() => setLoading(false));
	}, [query]);

	return { movies, loading };
};

const SearchSkeleton = () => (
	<div className="grid justify-center gap-6 grid-cols-[repeat(auto-fit,minmax(140px,260px))]">
		{Array.from({ length: 12 }).map((_, i) => (
			<div
				key={i}
				className="w-[140px] sm:w-[180px] md:w-[220px] lg:w-[260px] rounded-lg overflow-hidden animate-pulse bg-neutral-800/60"
				style={{ animationDelay: `${i * 60}ms` }}
			>
				<div className="h-24 sm:h-32 md:h-36 lg:h-40 w-full bg-neutral-700/60" />
			</div>
		))}
	</div>
);

const SearchEmptyState = ({ query }: { query: string }) => (
	<div className="flex flex-col items-center justify-center py-24 gap-4 animate-fade-in-scale opacity-0">
		<span className="text-6xl">404: NOT FOUND</span>

		<p className="text-neutral-400 text-center text-lg font-nsans-medium">
			No results found for{" "}
			<span className="text-white">&quot;{query}&quot;</span>.
		</p>

		<p className="text-neutral-600 text-md text-center">
			Try searching for another movie, show, actor, director or genre.
		</p>
	</div>
);

const SearchResults = ({ movies }: { movies: Movie[] }) => (
	<div className="grid justify-center gap-6 grid-cols-[repeat(auto-fit,minmax(140px,260px))]">
		{movies.map((movie, idx) => (
			<div
				key={movie.id}
				className="opacity-0 animate-fade-in-scale"
				style={{
					animationDelay: `${Math.min(idx * 50, 600)}ms`,
					animationFillMode: "forwards",
				}}
			>
				<MovieItem movie={movie} />
			</div>
		))}
	</div>
);

const SearchHeading = ({ query }: { query: string }) => (
	<h2 className="text-lg sm:text-xl md:text-2xl font-nsans-bold mb-6 animate-fade-in-up opacity-0">
		{query ? (
			<>
				Results for:{" "}
				<span className="text-neutral-400 font-nsans-regular">
					&quot;{query}&quot;
				</span>
			</>
		) : (
			<span className="text-neutral-500">Enter a search term</span>
		)}
	</h2>
);

// fallow-ignore-next-line complexity
const Search = () => {
	const [searchParams] = useSearchParams();
	const query = searchParams.get("q") || "";

	const { movies, loading } = useSearchMovies(query);

	return (
		<div className="min-h-screen bg-black px-4 pt-24 pb-12 text-white sm:px-8 sm:pt-28 lg:px-12 animate-fade-in">
			<SearchHeading query={query} />

			{loading ? (
				<SearchSkeleton />
			) : movies.length === 0 && query ? (
				<SearchEmptyState query={query} />
			) : (
				<SearchResults movies={movies} />
			)}
		</div>
	);
};

export default Search;