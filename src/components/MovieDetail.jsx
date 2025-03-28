import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const MovieDetail = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const res = await axios.get(
          `https://www.omdbapi.com/?apikey=${import.meta.env.VITE_OMDB_API_KEY}&i=${id}`
        );
        setMovie(res.data);
      } catch (error) {
        console.error("Error fetching movie details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMovieDetails();
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (!movie) return <p>No details found</p>;

  return (
    <div className="movie-detail">
      <h2>{movie.Title} ({movie.Year})</h2>
      <img src={movie.Poster} alt={movie.Title} />
      <p><strong>Plot:</strong> {movie.Plot}</p>
      <p><strong>Actors:</strong> {movie.Actors}</p>
      <p><strong>Director:</strong> {movie.Director}</p>
    </div>
  );
};

export default MovieDetail;
