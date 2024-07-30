import { useEffect, useState } from "react";
import "./App.css";
import { Card } from "./components/Card";
import { Navbar } from "./components/Navbar";
import { DetailCard } from "./components/DetailCard";

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
  const [guestSessionId, setGuestSessionId] = useState<string | null>(null);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  
  const API_TOKEN = import.meta.env.VITE_READ_ACCESS_TOKEN;
  useEffect(() => {
    fetchMovies();
    createGuestSession();
  }, []);

  const createGuestSession = async () => {
    try {
      const response = await fetch('https://api.themoviedb.org/3/authentication/guest_session/new', {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: `Bearer ${API_TOKEN}`
        }
      });
      if (!response.ok) {
        throw new Error('Failed to create guest session');
      }
      const data = await response.json();
      setGuestSessionId(data.guest_session_id);
    } catch (err) {
      console.error('Error creating guest session:', err);
    }
  };

  const fetchMovies = async (query: string = "") => {
    if (query) {
      setSearchLoading(true);
    } else {
      setLoading(true);
    }
    

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


  const handleSearch = (query: string) => {
    setSearchQuery(query);
    fetchMovies(query);
  };

  const handleHomeClick = () => {
    setSearchQuery("");
    fetchMovies();
  };

  const handleMovieSelect = (movie: Movie) => {
    setSelectedMovie(movie);
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
                key={movie.id}
                id={movie.id} 
                title={movie.title}
                releaseDate={movie.release_date}
                rating={movie.vote_average}
                imageUrl={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                onSelect={() => handleMovieSelect(movie)}
              />
            ))}
          </div>
        )}
      </div>
      {selectedMovie && (
        <DetailCard
          movieId={selectedMovie.id}
          onClose={() => setSelectedMovie(null)}
          onLoaded={() => {}}
          guestSessionId={guestSessionId}
          apiToken={API_TOKEN}
        />
      )}
    </>
  );
}

export default App;