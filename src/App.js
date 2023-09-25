import { useState } from "react";
import { useMovies } from "./components/CustomHooks/useMovies";
import { useLocalStorageState } from "./components/CustomHooks/useLocalStorageState";
import ErrorMessage from "./components/UI/ErrorMessage/ErrorMessage";
import NavBar from "./components/UI/Header/NavBar/NavBar";
import Search from "./components/UI/Header/Search/Search";
import NumResults from "./components/UI/Header/NumResult/NumResult";
import Loader from "./components/UI/Loader/Loader";
import Main from "./components/UI/Main/Main/Main";
import Box from "./components/UI/Main/Box/Box";
import MovieList from "./components/UI/Main/Movies/MovieList/MovieList";
import MovieDetail from "./components/UI/Main/Movies/MovieDetail/MovieDetail";
import WatchedSummary from "./components/UI/Watched/WatchedSummary/WatchedSummary";
import WatchedMoviesList from "./components/UI/Watched/WatchedMoviesList/WatchedMoviesList";

export default function App() {
  const [query, setQuery] = useState("");
  const [selectedID, setSelectedID] = useState(null);

  const { movies, isLoading, error } = useMovies(query, handleCloseMovie);
  const [watched, setWatched] = useLocalStorageState([], "watched");

  const handleSelectMovie = function (id) {
    setSelectedID((selectedID) => (id === selectedID ? null : id));
  };

  function handleCloseMovie() {
    setSelectedID(null);
  }

  const handleAddWatched = function (movie) {
    setWatched((watched) => [...watched, movie]);
  };

  const handleDeleteWatched = function (id) {
    setWatched((watched) => watched.filter((movie) => movie.imdbID !== id));
  };

  return (
    <>
      <NavBar>
        <Search query={query} setQuery={setQuery} />
        <NumResults movies={movies} />
      </NavBar>
      <Main movies={movies}>
        <Box>
          {isLoading && <Loader />}
          {!isLoading && !error && (
            <MovieList movies={movies} onSelectMovie={handleSelectMovie} />
          )}
          {error && <ErrorMessage message={error} />}
        </Box>
        <Box>
          {selectedID ? (
            <MovieDetail
              selectedID={selectedID}
              onCloseMovie={handleCloseMovie}
              onAddWatched={handleAddWatched}
              watched={watched}
            />
          ) : (
            <>
              <WatchedSummary watched={watched} />
              <WatchedMoviesList
                watched={watched}
                onDeleteWatched={handleDeleteWatched}
              />
            </>
          )}
        </Box>
      </Main>
    </>
  );
}
