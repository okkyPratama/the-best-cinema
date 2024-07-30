import React, { useCallback, useEffect, useState } from "react";

interface DetailCardProps {
    movieId: number;
    onClose: () => void;
    onLoaded: () => void;
    guestSessionId: string | null;
    apiToken: string;
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

export const DetailCard: React.FC<DetailCardProps> = ({movieId, onClose, onLoaded, guestSessionId,apiToken}) => {
  const [movieDetail, setMovieDetail] = useState<MovieDetail | null>(null);
  const [userRating, setUserRating] = useState<number>(5);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [ratingSuccess, setRatingSuccess] = useState(false);


  useEffect(() => {
    const fetchMovieDetail = async () => {
      const url = `https://api.themoviedb.org/3/movie/${movieId}`;

      try {
        const response = await fetch(url, {
          headers: {
            accept: 'application/json',
            Authorization: `Bearer ${apiToken}`
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
  }, [movieId, onLoaded, apiToken]);

  const handleSubmit = async () => {
    if (!guestSessionId) {
      setError('No guest session available. Unable to submit rating.');
      return;
    }

    setIsSubmitting(true);
    try {
      const url = `https://api.themoviedb.org/3/movie/${movieId}/rating?guest_session_id=${guestSessionId}`;
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json;charset=utf-8',
          'Authorization': `Bearer ${apiToken}`
        },
        body: JSON.stringify({ value: userRating })
      });

      if (!response.ok) {
        throw new Error('Failed to submit rating');
      }

      const data = await response.json();
      if (data.success) {
        setRatingSuccess(true);
      } else {
        throw new Error('Rating submission was not successful');
      }
    } catch (err) {
      setError('Error submitting rating: ' + err);
    } finally {
      setIsSubmitting(false);
    }
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
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
      onClick={handleOutsideClick}
    >
      <div className={`bg-white rounded-lg max-w-4xl w-full overflow-hidden shadow-xl transition-opacity duration-300 ${loading ? 'opacity-0' : 'opacity-100'}`}>
        {loading ? (
          <div className="flex items-center justify-center h-96">
            <div className="loader ease-linear rounded-full border-8 border-t-8 border-gray-200 h-24 w-24"></div>
          </div>
        ) : error ? (
          <div className="p-6 text-center text-red-600">{error}</div>
        ) : movieDetail && (
          <div className="flex">
            <img src={`https://image.tmdb.org/t/p/w500${movieDetail.poster_path}`} alt={movieDetail.title} className="w-1/3 object-cover" />
            <div className="w-2/3 p-6">
              <h2 className="text-3xl font-bold mb-2">{movieDetail.title}</h2>
              <div className="flex items-center mb-2">
                <span className="bg-blue-950 border-2 border-green-500 text-white text-sm font-bold w-10 h-10 px-2 py-1 rounded-full flex items-center justify-center mr-2">
                  {movieDetail.vote_average.toFixed(1)}
                </span>
                <span className="text-gray-600">{movieDetail.genres.map(g => g.name).join(', ')}</span>
              </div>
              <p className="text-gray-500 mb-4">{movieDetail.tagline}</p>
              <h3 className="text-xl font-semibold mb-2">Overview</h3>
              <p className="text-gray-700 mb-4">{movieDetail.overview}</p>
              <div className="flex flex-col items-start mb-4">
                <span className="text-center ml-7">
                  <strong>Rate:</strong> {userRating}
                </span>
                <div className="flex items-center w-full">
                  <input
                    type="range"
                    min="0.5"
                    max="10"
                    step="0.5"
                    value={userRating}
                    onChange={(e) => setUserRating(Number(e.target.value))}
                    className="flex-grow mr-4"
                  />
                  <button
                    onClick={handleSubmit}
                    disabled={isSubmitting || ratingSuccess}
                    className="bg-blue-950 hover:bg-blue-900 text-white font-bold py-2 px-5 rounded-2xl disabled:opacity-50"
                  >
                    {isSubmitting ? 'Submitting...' : ratingSuccess ? 'Submitted' : 'Submit'}
                  </button>
                </div>
                {ratingSuccess && <p className="text-green-600 mt-2">Rating submitted successfully!</p>}
                {error && <p className="text-red-600 mt-2">{error}</p>}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};