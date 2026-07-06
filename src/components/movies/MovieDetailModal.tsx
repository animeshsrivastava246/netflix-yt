import { useEffect, useState, useCallback } from "react";
import { createPortal } from "react-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { getDetailsUrl, getSeasonDetailsUrl, createImageUrl, Movie, formatAestheticDate } from "../../services/movieServices";
import { FaTimes, FaPlay, FaPlus, FaCheck } from "react-icons/fa";
import { doc, onSnapshot, updateDoc, getDoc } from "firebase/firestore";
import { db } from "../../services/firebase";
import { UserAuth } from "../../context/AuthContext";

interface MovieDetailModalProps {
	id: number;
	isTv: boolean;
	onClose: () => void;
}

interface Genre {
	id: number;
	name: string;
}

interface Season {
	id: number;
	name: string;
	episode_count: number;
	season_number: number;
}

interface DetailData {
	title?: string;
	name?: string;
	backdrop_path: string | null;
	poster_path: string | null;
	overview: string;
	release_date?: string;
	first_air_date?: string;
	vote_average: number;
	genres: Genre[];
	runtime?: number;
	episode_run_time?: number[];
	number_of_seasons?: number;
	number_of_episodes?: number;
	seasons?: Season[];
	status?: string;
}

interface Episode {
	id: number;
	name: string;
	overview: string;
	episode_number: number;
	still_path: string | null;
	air_date: string;
}

const useFetchUrl = <T,>(url: string | null, processData: (data: unknown) => T) => {
	const [data, setData] = useState<T | null>(null);
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		if (!url) return;
		let isMounted = true;
		setLoading(true);
		axios
			.get(url)
			.then((res) => {
				if (isMounted) setData(processData(res.data));
			})
			.catch((err) => {
				console.error(err);
			})
			.finally(() => {
				if (isMounted) setLoading(false);
			});
		return () => {
			isMounted = false;
		};
	}, [url, processData]);

	return { data, loading };
};

const useMovieDetail = (id: number, isTv: boolean, onClose: () => void) => {
	const processData = useCallback((data: unknown) => data as DetailData, []);
	const { data, loading } = useFetchUrl(getDetailsUrl(id, isTv), processData);

	useEffect(() => {
		const handleKeyDown = (e: KeyboardEvent) => {
			if (e.key === "Escape") onClose();
		};
		window.addEventListener("keydown", handleKeyDown);
		return () => window.removeEventListener("keydown", handleKeyDown);
	}, [onClose]);

	return { data, loading: loading || data === null };
};

const useFavoriteStatus = (movieId: number, movieData: DetailData | null, onClose: () => void) => {
	const { user } = UserAuth();
	const [isFav, setIsFav] = useState(false);
	const navigate = useNavigate();

	useEffect(() => {
		if (user?.email) {
			const unsubscribe = onSnapshot(doc(db, "users", user.email), (docSnap) => {
				if (docSnap.exists()) {
					const favShows = (docSnap.data().favShows || []) as Movie[];
					const exists = favShows.some((item) => item.id === movieId);
					setIsFav(exists);
				}
			});
			return () => unsubscribe();
		}
	}, [user?.email, movieId]);

	// fallow-ignore-next-line complexity
	const toggleFavorite = async () => {
		if (!user?.email) {
			onClose();
			navigate("/login");
			return;
		}
		if (!movieData) return;
		const userDoc = doc(db, "users", user.email);
		const docSnap = await getDoc(userDoc);
		if (docSnap.exists()) {
			const currentFavs = (docSnap.data().favShows || []) as Movie[];
			let updatedFavs;
			if (isFav) {
				updatedFavs = currentFavs.filter((item) => item.id !== movieId);
			} else {
				const moviePayload = {
					id: movieId,
					title: movieData.title || null,
					name: movieData.name || null,
					backdrop_path: movieData.backdrop_path,
					poster_path: movieData.poster_path,
					overview: movieData.overview,
					release_date: movieData.release_date || null,
					first_air_date: movieData.first_air_date || null,
				};
				updatedFavs = [...currentFavs, moviePayload];
			}
			await updateDoc(userDoc, {
				favShows: updatedFavs,
			});
		}
	};

	return { isFav, toggleFavorite };
};

const useSeasonEpisodes = (tvId: number, seasonNumber: number) => {
	const processData = useCallback((data: unknown) => {
		const res = data as { episodes?: Episode[] };
		return res.episodes || [];
	}, []);
	const url = seasonNumber > 0 ? getSeasonDetailsUrl(tvId, seasonNumber) : null;
	const { data, loading } = useFetchUrl(url, processData);

	return { episodes: data || [], loading };
};

// fallow-ignore-next-line complexity
const getDetailDisplayValues = (data: DetailData) => {
	const title = data.title || data.name || "Untitled";
	const releaseYear = (data.release_date || data.first_air_date || "").split("-")[0];
	const rating = data.vote_average ? data.vote_average.toFixed(1) : "N/A";
	const runtime = data.runtime 
		? `${data.runtime}m` 
		: data.episode_run_time && data.episode_run_time.length > 0 
		? `${data.episode_run_time[0]}m` 
		: "";
	return { title, releaseYear, rating, runtime };
};

interface DetailHeroProps {
	data: DetailData;
	title: string;
	onClose: () => void;
	isFav: boolean;
	onToggleFavorite: () => void;
}

// fallow-ignore-next-line complexity
const DetailHero = ({ data, title, onClose, isFav, onToggleFavorite }: DetailHeroProps) => (
	<div className="relative h-64 sm:h-96">
		<div className="absolute inset-0 bg-linear-to-t from-[#181818] via-transparent to-transparent z-10" />
		<img
			src={createImageUrl(data.backdrop_path || data.poster_path, "original") || "https://images.unsplash.com/photo-1594909122845-11baa439b7bf?q=80&w=1080"}
			alt={title}
			className="w-full h-full object-cover"
		/>
		<button
			onClick={onClose}
			className="absolute top-4 right-4 bg-black/60 text-white hover:bg-black/80 p-2 rounded-full z-20 transition duration-200"
			aria-label="Close modal"
		>
			<FaTimes size={18} />
		</button>
		<div className="absolute bottom-6 left-6 right-6 z-20">
			<h2 className="text-2xl sm:text-4xl md:text-5xl font-nsans-bold text-white drop-shadow-lg mb-4">
				{title}
			</h2>
			<div className="flex items-center gap-3">
				<button
					onClick={() => window.open(`https://www.google.com/search?q=${encodeURIComponent(title)}`, "_blank", "noopener,noreferrer")}
					className="flex items-center gap-2 bg-white text-black hover:bg-neutral-200 px-6 py-2 rounded font-nsans-bold text-sm sm:text-base transition duration-200 shadow-lg transform hover:scale-105"
				>
					<FaPlay /> Play
				</button>
				<button
					onClick={onToggleFavorite}
					className="flex items-center justify-center w-10 h-10 rounded-full border-2 border-neutral-500 hover:border-white text-white transition duration-200 bg-black/40 hover:bg-black/60 shadow-lg transform hover:scale-105"
					title={isFav ? "Remove from favorites" : "Add to favorites"}
				>
					{isFav ? <FaCheck size={16} className="text-green-500" /> : <FaPlus size={16} />}
				</button>
			</div>
		</div>
	</div>
);

interface MetadataHeaderProps {
	rating: string;
	releaseYear: string;
	runtime: string;
	seasonsCount?: number;
}

// fallow-ignore-next-line complexity
const MetadataHeader = ({ rating, releaseYear, runtime, seasonsCount }: MetadataHeaderProps) => (
	<div className="flex flex-wrap items-center gap-3 text-xs sm:text-sm">
		<span className="text-green-500 font-nsans-bold tracking-wider">{Number(rating) > 0 ? `${Math.round(Number(rating) * 10)}% Match` : "98% Match"}</span>
		{releaseYear && (
			<span className="px-2 py-0.5 rounded bg-neutral-800 border border-neutral-700 text-xs font-nsans-medium text-neutral-300">
				{releaseYear}
			</span>
		)}
		{runtime && <span className="text-neutral-400">{runtime}</span>}
		{seasonsCount && (
			<span className="bg-red-950/40 text-red-500 border border-red-900/40 px-2 py-0.5 rounded text-xs font-nsans-bold">
				{seasonsCount} {seasonsCount === 1 ? "Season" : "Seasons"}
			</span>
		)}
	</div>
);


interface MetadataSidebarProps {
	genres: Genre[];
	status?: string;
	episodesCount?: number;
}

const MetadataSidebar = ({ genres, status, episodesCount }: MetadataSidebarProps) => (
	<div className="space-y-3 text-sm">
		<div>
			<span className="text-neutral-500">Genres:</span>{" "}
			<span className="text-neutral-300">
				{genres.map((g) => g.name).join(", ")}
			</span>
		</div>
		{status && (
			<div>
				<span className="text-neutral-500">Status:</span>{" "}
				<span className="text-neutral-300">{status}</span>
			</div>
		)}
		{episodesCount && (
			<div>
				<span className="text-neutral-500">Total Episodes:</span>{" "}
				<span className="text-neutral-300">{episodesCount}</span>
			</div>
		)}
	</div>
);

interface DetailMetadataProps {
	data: DetailData;
	releaseYear: string;
	rating: string;
	runtime: string;
}

// fallow-ignore-next-line complexity
const DetailMetadata = ({ data, releaseYear, rating, runtime }: DetailMetadataProps) => (
	<div className="p-6 md:p-8 grid grid-cols-1 md:grid-cols-3 gap-6">
		<div className="md:col-span-2 space-y-4">
			<MetadataHeader
				rating={rating}
				releaseYear={releaseYear}
				runtime={runtime}
				seasonsCount={data.number_of_seasons}
			/>
			<p className="text-neutral-300 text-sm sm:text-base leading-relaxed">
				{data.overview || "No overview available."}
			</p>
		</div>

		<MetadataSidebar
			genres={data.genres}
			status={data.status}
			episodesCount={data.number_of_episodes}
		/>
	</div>
);

interface SeasonsSectionProps {
	tvId: number;
	seasons: Season[];
}

const EpisodeCard = ({ ep }: { ep: Episode }) => (
	<div className="flex flex-col md:flex-row gap-4 p-4 rounded-lg bg-neutral-900/40 border border-neutral-800/40 hover:bg-neutral-900/80 transition duration-300">
		{ep.still_path && (
			<img
				src={createImageUrl(ep.still_path, "w300")}
				alt={ep.name}
				className="w-full md:w-40 h-24 object-cover rounded-md shrink-0"
			/>
		)}
		<div className="space-y-2">
			<div className="flex justify-between items-center gap-4">
				<h4 className="font-nsans-bold text-sm sm:text-base text-white">
					{ep.episode_number}. {ep.name}
				</h4>
				<span className="text-xs text-neutral-500 shrink-0">{formatAestheticDate(ep.air_date)}</span>
			</div>
			<p className="text-xs sm:text-sm text-neutral-400 leading-relaxed line-clamp-3">
				{ep.overview || "No overview available for this episode."}
			</p>
		</div>
	</div>
);

const EpisodeList = ({ episodes, loading }: { episodes: Episode[]; loading: boolean }) =>
	loading ? (
		<div className="flex justify-center py-8">
			<div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-red-600" />
		</div>
	) : (
		<div className="space-y-4 max-h-[500px] overflow-y-auto pr-2 scrollbar-thin">
			{episodes.map((ep) => (
				<EpisodeCard key={ep.id} ep={ep} />
			))}
		</div>
	);

const SeasonsSection = ({ tvId, seasons }: SeasonsSectionProps) => {
	const validSeasons = seasons.filter((s) => s.season_number > 0);
	const [selectedSeason, setSelectedSeason] = useState(
		validSeasons.length > 0 ? validSeasons[0].season_number : 1
	);
	const { episodes, loading } = useSeasonEpisodes(tvId, selectedSeason);

	return (
		<div className="p-6 md:p-8 border-t border-neutral-800">
			<div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
				<h3 className="text-lg sm:text-xl font-nsans-bold">Episodes</h3>
				{validSeasons.length > 1 && (
					<select
						value={selectedSeason}
						onChange={(e) => setSelectedSeason(Number(e.target.value))}
						className="bg-neutral-800 text-white border border-neutral-700 px-4 py-2 rounded focus:outline-none focus:ring-1 focus:ring-red-600 text-sm cursor-pointer"
					>
						{validSeasons.map((season) => (
							<option key={season.id} value={season.season_number}>
								{season.name}
							</option>
						))}
					</select>
				)}
			</div>
			<EpisodeList episodes={episodes} loading={loading} />
		</div>
	);
};

// fallow-ignore-next-line complexity
const MovieDetailModal = ({ id, isTv, onClose }: MovieDetailModalProps) => {
	const { data, loading } = useMovieDetail(id, isTv, onClose);
	const { isFav, toggleFavorite } = useFavoriteStatus(id, data, onClose);
	const [animateShow, setAnimateShow] = useState(false);

	useEffect(() => {
		if (!loading && data) {
			const timer = setTimeout(() => setAnimateShow(true), 50);
			return () => clearTimeout(timer);
		}
	}, [loading, data]);

	if (loading) {
		return (
			<div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center backdrop-blur-sm">
				<div className="relative flex items-center justify-center">
					<div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-600" />
					<div className="absolute h-6 w-6 rounded-full border border-red-600/40 animate-ping" />
				</div>
			</div>
		);
	}

	if (!data) return null;

	const { title, releaseYear, rating, runtime } = getDetailDisplayValues(data);

	return createPortal(
		<div
			className={`fixed inset-0 bg-black/85 z-9998 overflow-y-auto backdrop-blur-md transition-opacity duration-500 ${
				animateShow ? "opacity-100" : "opacity-0"
			}`}
			onClick={onClose}
		>
			{/* inner wrapper: min-h-full so centering works even when modal > viewport */}
			<div className="flex min-h-full items-center justify-center p-4 sm:p-6">
				<div
					className={`bg-[#181818] text-white rounded-xl max-w-3xl w-full relative overflow-hidden shadow-2xl transition-all duration-500 ${
						animateShow
							? "scale-100 translate-y-0 opacity-100"
							: "scale-95 translate-y-8 opacity-0"
					}`}
					style={{ transitionTimingFunction: "cubic-bezier(0.34, 1.56, 0.64, 1)" }}
					onClick={(e) => e.stopPropagation()}
				>
					<DetailHero
						data={data}
						title={title}
						onClose={onClose}
						isFav={isFav}
						onToggleFavorite={toggleFavorite}
					/>
					<DetailMetadata data={data} releaseYear={releaseYear} rating={rating} runtime={runtime} />
					{isTv && data.seasons && data.seasons.length > 0 && (
						<SeasonsSection tvId={id} seasons={data.seasons} />
					)}
				</div>
			</div>
		</div>,
		document.body
	);
};

export default MovieDetailModal;
