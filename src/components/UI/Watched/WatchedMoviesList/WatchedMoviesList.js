import WatchedMovie from "../WatchedMovie/WatchedMovie";

export default function WatchedMoviesList({ watched, onDeleteWatched }) {
  console.log(watched);
  console.log(onDeleteWatched);
  return (
    <ul className="list">
      {watched.map((movie) => (
        <WatchedMovie
          movie={movie}
          key={movie.imdbID}
          onDeleteWatched={onDeleteWatched}
        />
      ))}
    </ul>
  );
}
