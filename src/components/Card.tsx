import React, { useState } from "react";
import { DetailCard } from "./DetailCard";
interface DetailCardProps {
  movieId: number;
  onClose: () => void;
  onLoaded: () => void;
}

interface MovieDetail {
  title: string;
  poster_path: string;
  vote_average: number;
  genres: { name: string }[];
  tagline: string;
  overview: string;
  release_date: string;
  runtime: number;
}

export const DetailCard: React.FC<DetailCardProps> = ({ movieId, onClose, onLoaded }) => {
  const [movieDetail, setMovieDetail] = useState<MovieDetail | null>(null);
  const [userRating, setUserRating] = useState<number>(5);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMovieDetail = async () => {
      const url = `https://api.themoviedb.org/3/movie/${movieId}`;
      const API_TOKEN = import.meta.env.VITE_READ_ACCESS_TOKEN;

      try {
        const response = await fetch(url, {
          headers: {
            accept: 'application/json',
            Authorization: `Bearer ${API_TOKEN}`
          }
        });

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const data = await response.json();
        setMovieDetail(data);
        setLoading(false);
        onLoaded();
      } catch (err) {
        setError('Error fetching movie details: ' + err);
        setLoading(false);
        onLoaded();
      }
    };

    fetchMovieDetail();
  }, [movieId, onLoaded]);

  const handleSubmit = () => {
    console.log(`Submitting rating ${userRating} for ${movieDetail?.title}`);
    onClose();
  };

  const handleOutsideClick = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (e.target === e.currentTarget) {
        onClose();
      }
    },
    [onClose]
  );

  return (
    <>
      <div
        className={`relative w-64 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 ease-in-out transform hover:scale-105 cursor-pointer ${isLoading ? 'opacity-50' : ''}`}
        onClick={handleCardClick}
      >
        <img src={imageUrl} alt={title} className="w-full h-96 object-cover" />

        <div className="absolute bottom-0 left-0 right-0 bg-white p-3">
          <div className="absolute -top-5 left-3 bg-blue-950 border-2 border-green-500 text-white text-sm font-bold w-10 h-10 rounded-full flex items-center justify-center z-10">
            {rating.toFixed(1)}
          </div>
          <div className="text-center">
            <h2 className="text-black text-lg font-bold truncate">{title}</h2>
            <p className="text-gray-600 text-sm">{releaseDate}</p>
          </div>
        </div>
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30">
            <div className="loader ease-linear rounded-full border-4 border-t-4 border-gray-200 h-12 w-12"></div>
          </div>
        )}
      </div>

      {isModalOpen && (
        <DetailCard
          movieId={id}
          onClose={handleCloseModal}
          onLoaded={() => setIsLoading(false)}
        />
      )}
    </>
  );
};