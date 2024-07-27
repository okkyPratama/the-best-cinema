import React, { useCallback, useState } from "react";

interface DetailCardProps {
  title: string;
  imageUrl: string;
  rating: number;
  genre: string;
  tagline: string;
  description: string;
  onClose: () => void;
}

export const DetailCard: React.FC<DetailCardProps> = ({
  title,
  imageUrl,
  rating,
  genre,
  tagline,
  description,
  onClose,
}) => {
  const [userRating, setUserRating] = useState<number>(5);

  const handleSubmit = () => {
    console.log(`Submitting rating ${userRating} for ${title}`);
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
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
      onClick={handleOutsideClick}
    >
      <div className="bg-white rounded-lg max-w-4xl w-full overflow-hidden shadow-xl">
        <div className="flex">
          <img src={imageUrl} alt={title} className="w-1/3 object-cover" />
          <div className="w-2/3 p-6">
            <h2 className="text-3xl font-bold mb-2">{title}</h2>
            <div className="flex items-center mb-2">
              <span className="bg-blue-950 border-2 border-green-500 text-white text-sm font-bold w-10 h-10 px-2 py-1 rounded-full flex items-center justify-center mr-2">
                {rating.toFixed(1)}
              </span>
              <span className="text-gray-600">{genre}</span>
            </div>
            <p className="text-gray-500 mb-4">{tagline}</p>
            <h3 className="text-xl font-semibold mb-2">Overview</h3>
            <p className="text-gray-700 mb-4">{description}</p>
            <div className="flex flex-col  items-start mb-4">
              <span className="text-center ml-7">
                <strong>Rate:</strong> {userRating}
              </span>
              <div className="flex  items-center max-w-36">
                <input
                  type="range"
                  min="1"
                  max="10"
                  value={userRating}
                  onChange={(e) => setUserRating(Number(e.target.value))}
                  className="flex-grow mr-4"
                />
                <button
                  onClick={handleSubmit}
                  className="bg-blue-950 hover:bg-blue-900 text-white font-bold py-2 px-5 rounded-2xl"
                >
                  Submit
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};