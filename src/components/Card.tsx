import React from "react";

interface CardProps {
  id: number;
  title: string;
  releaseDate: string;
  rating: number;
  imageUrl: string;
  onSelect: () => void;
}

export const Card: React.FC<CardProps> = ({
  title,
  releaseDate,
  rating,
  imageUrl,
  onSelect,
}) => {
  return (
    <div
      className="relative w-64 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 ease-in-out transform hover:scale-105 cursor-pointer"
      onClick={onSelect}
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
    </div>
  );
};