const key = import.meta.env.VITE_TMDB_KEY as string;
const baseUrl = "https://api.themoviedb.org/3";

export interface MovieEndpoints {
  popular: string;
  topRated: string;
  trending: string;
  comedy: string;
  upcoming: string;
}

const endpoints: MovieEndpoints = {
  popular: `${baseUrl}/movie/popular?api_key=${key}`,
  topRated: `${baseUrl}/movie/top_rated?api_key=${key}`,
  trending: `${baseUrl}/movie/popular?api_key=${key}&language=en-US&page=2`,
  comedy: `${baseUrl}/search/movie?api_key=${key}&language=en-US&query=comedy&page=1&include_adult=true`,
  upcoming: `${baseUrl}/movie/upcoming?api_key=${key}`,
};

export function createImageUrl(filename: string | null | undefined, size: string): string {
  if (!filename) return "";
  return `https://image.tmdb.org/t/p/${size}/${filename}`;
}

export default endpoints;
