import { useEffect, useState } from "react";
import "./App.css";
import { Card } from "./components/Card";
import { Navbar } from "./components/Navbar";

interface Movie {
  id: number;
  title: string;
  release_date: string;
  vote_average: number;
  poster_path: string;
  genre_ids: number[];
  overview: string;
}

function App() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchLoading, setSearchLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const fetchMovies = async (query: string = "") => {
    if (query) {
      setSearchLoading(true);
    } else {
      setLoading(true);
    }
    
    const API_TOKEN = import.meta.env.VITE_READ_ACCESS_TOKEN;

    if (!API_TOKEN) {
      setError('API token is not configured');
      setLoading(false);
      setSearchLoading(false);
      return;
    }

    const baseUrl = 'https://api.themoviedb.org/3';
    const endpoint = query 
      ? `${baseUrl}/search/movie?query=${encodeURIComponent(query)}&include_adult=false&language=en-US&page=1`
      : `${baseUrl}/movie/popular?language=en-US&page=1`;

    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${API_TOKEN}`
      }
    };

    try {
      const response = await fetch(endpoint, options);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setMovies(data.results);
    } catch (err) {
      setError('Error fetching movies: ' + err);
    } finally {
      setLoading(false);
      setSearchLoading(false);
    }
  };

  useEffect(() => {
    fetchMovies();
  }, []);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    fetchMovies(query);
  };

  const handleHomeClick = () => {
    setSearchQuery("");
    fetchMovies();
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <>
      <Navbar onSearch={handleSearch} onHomeClick={handleHomeClick} isSearching={searchLoading} />
      <h3 className="font-bold ml-10 mt-7 text-lg">
        {searchQuery ? `Search Results for "${searchQuery}"` : "Popular Movies"}
      </h3>
      <div className="p-4 min-h-screen">
        {searchLoading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 justify-items-center">
            {movies.map((movie) => (
              <Card
                id={movie.id} 
                key={movie.id}
                title={movie.title}
                releaseDate={movie.release_date}
                rating={movie.vote_average}
                imageUrl={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              />
            ))}
          </div>
        )}
      </div>
    </>
  );
}

export default App;