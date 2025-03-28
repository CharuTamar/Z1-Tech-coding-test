import { Link } from "react-router-dom";

const MovieCard = ({ movie }) => {
  return (
    <div className="movie-card">
      <Link to={`/detail/${movie.imdbID}`}>
        <img src={movie.Poster} alt={movie.Title} />
        <h3>{movie.Title} ({movie.Year})</h3>
      </Link>
    </div>
  );
};

export default MovieCard;
