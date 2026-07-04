import Hero from "../components/movies/Hero";
import MovieRow from "../components/movies/MovieRow";
import endpoints from "../services/movieServices";

const Home = () => {
	return (
		<div className="bg-black text-white min-h-screen pb-12">
			<Hero />
			<div className="-mt-12 md:-mt-24 lg:-mt-32 relative z-40">
				<MovieRow title="upcoming movies" url={endpoints.upcoming} />
				<MovieRow title="trending TV shows" url={endpoints.trendingTv} />
				<MovieRow title="popular movies" url={endpoints.popular} />
				<MovieRow title="top rated TV series" url={endpoints.topRatedTv} />
				<MovieRow title="comedy movies" url={endpoints.comedy} />
				<MovieRow title="popular TV shows" url={endpoints.popularTv} />
			</div>
		</div>
	);
};

export default Home;
