import Hero from "../components/movies/Hero";
import MovieRow from "../components/movies/MovieRow";
import endpoints from "../services/movieServices";

const Home = () => {
	return (
		<div className="bg-black text-white min-h-screen pb-12">
			<Hero />
			<div className="-mt-12 md:-mt-24 lg:-mt-32 relative z-40">
				<MovieRow title="upcoming" url={endpoints.upcoming} />
				<MovieRow title="trending" url={endpoints.trending} />
				<MovieRow title="top rated" url={endpoints.topRated} />
				<MovieRow title="comedy" url={endpoints.comedy} />
				<MovieRow title="popular" url={endpoints.popular} />
			</div>
		</div>
	);
};

export default Home;
