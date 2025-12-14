import toast, { Toaster } from "react-hot-toast";
import { useEffect, useState } from "react";
import css from "./App.module.css";
import SearchBar from "../SearchBar/SearchBar";
import type { Movie } from "../types/movie";
import fetchMovies from "../services/movieService";
import MovieGrid from "../MovieGrid/MovieGrid";
import Loader from "../Loader/Loader";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import MovieModal from "../MovieModal/MovieModal";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import ReactPaginate from "react-paginate";

export default function App() {
  const [topic, setTopic] = useState<string>("");
  const [page, setPage] = useState<number>(1);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  const [searchId, setSearchId] = useState(0);

  // const noMoviesNotify = () => toast("No movies found for your request.");

  const { data, error, isLoading, isFetching } = useQuery({
    queryKey: ["movies", topic, page],
    queryFn: () => fetchMovies(topic, page),
    enabled: topic !== "",
    placeholderData: keepPreviousData,
    staleTime: 60 * 1000,
  });

  const showNoMovies =
    topic.trim() !== "" && !isLoading && !error && data?.results?.length === 0;

  useEffect(() => {
    if (searchId > 0 && showNoMovies) {
      toast("No movies found for your request");
    }
  }, [showNoMovies, searchId]);

  const handleSearch = (topic: string) => {
    if (topic.trim() !== "") {
      setTopic(topic);
      setPage(1);
      setSearchId(searchId + 1);
    }
  };

  const handleModal = (movie: Movie) => {
    if (!movie) return;
    setSelectedMovie(movie);
  };

  const onModalClose = () => {
    setSelectedMovie(null);
  };

  return (
    <div className={css.app}>
      <SearchBar onSubmit={handleSearch} disabled={isFetching} />
      {isLoading ? <Loader /> : null}
      {error ? <ErrorMessage errorMessage={error.message} /> : null}
      {data?.results?.length ? (
        <>
          <MovieGrid movies={data.results} onSelect={handleModal} />
          <div className={isFetching ? css.paginateDisabled : ""}>
            <ReactPaginate
              pageCount={data.total_pages}
              pageRangeDisplayed={5}
              marginPagesDisplayed={1}
              onPageChange={({ selected }) => setPage(selected + 1)}
              forcePage={page - 1}
              nextLabel="→"
              previousLabel="←"
              containerClassName={css.pagination}
              activeClassName={css.active}
            />
          </div>
        </>
      ) : null}
      {selectedMovie ? (
        <MovieModal movie={selectedMovie} onClose={onModalClose} />
      ) : null}
      <Toaster />
    </div>
  );
}
