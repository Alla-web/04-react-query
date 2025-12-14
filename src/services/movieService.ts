import axios from "axios";
import type { Movie } from "../types/movie";

interface HttpResponse {
  results: Movie[];
  page: number;
  total_pages: number;
}

export default async function fetchMovies(
  query: string,
  page: number
): Promise<HttpResponse> {
  const TOKEN = import.meta.env.VITE_TMDB_TOKEN;

  const response = await axios.get<HttpResponse>(
    "https://api.themoviedb.org/3/search/movie",
    {
      params: {
        query,
        page,
      },
      headers: {
        Authorization: `Bearer ${TOKEN}`,
      },
    }
  );

  return response.data;
}
