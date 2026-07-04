const key = import.meta.env.VITE_TMDB_KEY as string;
const baseUrl = "https://api.themoviedb.org/3";

interface MovieEndpoints {
  popular: string;
  topRated: string;
  trending: string;
  comedy: string;
  upcoming: string;
  popularTv: string;
  topRatedTv: string;
  trendingTv: string;
}

const endpoints: MovieEndpoints = {
  popular: `${baseUrl}/movie/popular?api_key=${key}`,
  topRated: `${baseUrl}/movie/top_rated?api_key=${key}`,
  trending: `${baseUrl}/movie/popular?api_key=${key}&language=en-US&page=2`,
  comedy: `${baseUrl}/search/movie?api_key=${key}&language=en-US&query=comedy&page=1&include_adult=true`,
  upcoming: `${baseUrl}/movie/upcoming?api_key=${key}`,
  popularTv: `${baseUrl}/tv/popular?api_key=${key}`,
  topRatedTv: `${baseUrl}/tv/top_rated?api_key=${key}`,
  trendingTv: `${baseUrl}/trending/tv/day?api_key=${key}`,
};

export function createImageUrl(filename: string | null | undefined, size: string): string | undefined {
  if (!filename) return undefined;
  return `https://image.tmdb.org/t/p/${size}/${filename}`;
}

export function getSearchUrl(query: string): string {
  return `${baseUrl}/search/multi?api_key=${key}&language=en-US&query=${encodeURIComponent(query)}&page=1&include_adult=false`;
}

export function getDetailsUrl(id: number, isTv: boolean): string {
  return `${baseUrl}/${isTv ? "tv" : "movie"}/${id}?api_key=${key}&language=en-US`;
}

export function getSeasonDetailsUrl(tvId: number, seasonNumber: number): string {
  return `${baseUrl}/tv/${tvId}/season/${seasonNumber}?api_key=${key}&language=en-US`;
}

export interface Movie {
	id: number;
	title?: string;
	name?: string;
	backdrop_path: string | null;
	poster_path: string | null;
	release_date?: string;
	first_air_date?: string;
	overview: string;
	media_type?: string;
}

// fallow-ignore-next-line complexity
export function getMovieMetadata(movie: Movie) {
	return {
		isTv: movie.media_type === "tv" || !movie.title,
		displayName: movie.title || movie.name || "Untitled",
		release: movie.release_date || movie.first_air_date || "",
	};
}

export default endpoints;
