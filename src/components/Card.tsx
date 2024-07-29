import React, { useState } from "react";
import { DetailCard } from "./DetailCard";

interface CardProps {
    id: number;
    title: string;
    releaseDate: string;
    rating: number;
    imageUrl: string;
}

export const Card: React.FC<CardProps> = ({
    id,
    title,
    releaseDate,
    rating,
    imageUrl,
}) => {
   const [isModalOpen, setIsModalOpen] = useState(false);
   const [isLoading, setIsLoading] = useState(false);

   const handleCardClick = () => {
     setIsLoading(true);
     setIsModalOpen(true);
   };

   const handleCloseModal = () => {
     setIsModalOpen(false);
     setIsLoading(false);
   };

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