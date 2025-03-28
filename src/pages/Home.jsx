// import { useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";

// const Home = () => {
//   const [query, setQuery] = useState("");
//   const [movies, setMovies] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");
//   const navigate = useNavigate();

//   const handleSearch = async (e) => {
//     e.preventDefault();
//     if (!query) return;

//     setLoading(true);
//     setError("");

//     try {
//       console.log("Fetching movies for query:", query); // ✅ Debug line

//       const res = await axios.get(
//         `https://www.omdbapi.com/?apikey=${import.meta.env.VITE_OMDB_API_KEY}&s=${query}`
//       );

//       console.log("API response:", res.data); // ✅ Debug line

//       if (res.data.Response === "True") {
//         setMovies(res.data.Search);
//       } else {
//         setError(res.data.Error);
//       }
//     } catch (err) {
//       console.error("Error fetching movies:", err);
//       setError("Failed to fetch movies.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleMovieClick = (id) => {
//     navigate(`/detail/${id}`);
//   };

//   return (
//     <div className="container">
//       {/* Search Bar */}
//       <form onSubmit={handleSearch} className="search-form">
//         <input
//           type="text"
//           value={query}
//           onChange={(e) => setQuery(e.target.value)}
//           placeholder="Search for a movie..."
//         />
//         <button type="submit">Search</button>
//       </form>

//       {/* Loading State */}
//       {loading && <p>Loading...</p>}

//       {/* Error State */}
//       {error && <p style={{ color: "red" }}>{error}</p>}

//       {/* ✅ Movie List (ADD IT HERE) */}
//       {movies.length > 0 ? (
//         <div className="movie-list">
//           {movies.map((movie) => (
//             <div
//               key={movie.imdbID}
//               className="movie-card"
//               onClick={() => handleMovieClick(movie.imdbID)}
//             >
//               <img
//                 src={movie.Poster !== "N/A" ? movie.Poster : "/placeholder.png"}
//                 alt={movie.Title}
//               />
//               <div className="movie-info">
//                 <h3>{movie.Title}</h3>
//                 <p>{movie.Year}</p>
//               </div>
//             </div>
//           ))}
//         </div>
//       ) : (
//         <p>No movies found. Try a different search term.</p>
//       )}
//     </div>
//   );
// };

// export default Home;


import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // ✅ Fetch default movies on component mount
  useEffect(() => {
    fetchDefaultMovies();
  }, []);

  const fetchDefaultMovies = async () => {
    setLoading(true);
    try {
      const res = await axios.get(
        `https://www.omdbapi.com/?apikey=${import.meta.env.VITE_OMDB_API_KEY}&s=avengers`
      );
      console.log("Default movies:", res.data);

      if (res.data.Response === "True") {
        setMovies(res.data.Search);
      } else {
        setError(res.data.Error);
      }
    } catch (err) {
      console.error("Error fetching default movies:", err);
      setError("Failed to load default movies.");
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!query) return;

    setLoading(true);
    setError("");

    try {
      const res = await axios.get(
        `https://www.omdbapi.com/?apikey=${import.meta.env.VITE_OMDB_API_KEY}&s=${query}`
      );

      console.log("API response:", res.data);

      if (res.data.Response === "True") {
        setMovies(res.data.Search);
      } else {
        setError(res.data.Error);
      }
    } catch (err) {
      console.error("Error fetching movies:", err);
      setError("Failed to fetch movies.");
    } finally {
      setLoading(false);
    }
  };

  const handleMovieClick = (id) => {
    navigate(`/detail/${id}`);
  };

  return (
    <div className="container">
      {/* Search Bar */}
      <form onSubmit={handleSearch} className="search-form">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search for a movie..."
        />
        <button type="submit">Search</button>
      </form>

      {/* Loading State */}
      {loading && <p>Loading...</p>}

      {/* Error State */}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {/* ✅ Movie List (This will work on first load + search) */}
      {movies.length > 0 ? (
        <div className="movie-list">
          {movies.map((movie) => (
            <div
              key={movie.imdbID}
              className="movie-card"
              onClick={() => handleMovieClick(movie.imdbID)}
            >
              <img
                src={movie.Poster !== "N/A" ? movie.Poster : "/placeholder.png"}
                alt={movie.Title}
              />
              <div className="movie-info">
                <h3>{movie.Title}</h3>
                <p>{movie.Year}</p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p>No movies found. Try a different search term.</p>
      )}
    </div>
  );
};

export default Home;
