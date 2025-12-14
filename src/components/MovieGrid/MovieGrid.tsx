import type { Movie } from "../types/movie";
import css from "./MovieGrid.module.css";
import PlaceholderPoster from "../../assets/placeholer-poster.png";

interface MovieGridProps {
  movies: Movie[];
  onSelect: (movie: Movie) => void;
}

export default function MovieGrid({ movies, onSelect }: MovieGridProps) {
  return (
    <ul className={css.grid}>
      {movies.map((movie) => (
        <li key={movie.id}>
          <div className={css.card}>
            <img
              onClick={() => onSelect(movie)}
              className={css.image}
              src={
                movie.poster_path
                  ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}`
                  : PlaceholderPoster
              }
              alt={movie.title}
              loading="lazy"
            />
            <h2 className={css.title}>{movie.title.toLocaleLowerCase()}</h2>
          </div>
        </li>
      ))}
    </ul>
  );
}
