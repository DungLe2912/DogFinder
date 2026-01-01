import { Info } from "lucide-react";
import type { TBreed } from "../types/breed";
import SwipeIndicators from "./SwipeIndicators";
import type { Interpolation } from "@react-spring/web";
import { useState } from "react";
import NoImage from "./NoImage";

interface DogCardProps {
  dog: TBreed;
  imageLoaded: boolean;
  onImageLoad: () => void;
  onImageError: () => void;
  onDetails: () => void;
  likeOpacity?: Interpolation<number, number>;
  nopeOpacity?: Interpolation<number, number>;
  superLikeOpacity?: Interpolation<number, number>;
  showIndicators?: boolean;
}

const DogCard = ({
  dog,
  imageLoaded,
  onImageLoad,
  onImageError,
  onDetails,
  likeOpacity,
  nopeOpacity,
  superLikeOpacity,
  showIndicators = false,
}: DogCardProps) => {
  const [imageError, setImageError] = useState(false);

  const handleImageError = () => {
    setImageError(true);
    onImageError();
  };

  return (
    <div className="bg-white rounded-3xl shadow-2xl overflow-hidden h-full flex flex-col cursor-grab active:cursor-grabbing">
      {/* Image Container */}
      <div className="relative h-4/5 bg-gray-200" onClick={onDetails}>
        {/* Skeleton Loader */}
        {!imageLoaded && !imageError && (
          <div className="absolute inset-0 bg-linear-to-r from-gray-200 via-gray-300 to-gray-200 animate-pulse">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-16 h-16 border-4 border-purple-200 border-t-purple-600 rounded-full animate-spin"></div>
            </div>
          </div>
        )}

        {/* No Image Fallback */}
        {imageError || (!dog.image?.url && <NoImage />)}

        {/* Dog Image */}
        {!imageError && dog.image?.url && (
          <img
            src={dog.image.url}
            alt={dog.name}
            className={`w-full h-full object-cover pointer-events-none select-none transition-opacity duration-500 ${
              imageLoaded ? "opacity-100" : "opacity-0"
            }`}
            draggable={false}
            onLoad={onImageLoad}
            onError={handleImageError}
          />
        )}

        {/* Swipe Indicators */}
        {showIndicators && likeOpacity && nopeOpacity && superLikeOpacity && (
          <SwipeIndicators
            likeOpacity={likeOpacity}
            nopeOpacity={nopeOpacity}
            superLikeOpacity={superLikeOpacity}
          />
        )}

        {/* Info Icon */}
        {showIndicators && (
          <button
            className="absolute top-4 right-4 bg-white/80 backdrop-blur-sm p-2 rounded-full shadow-lg hover:bg-white transition-colors z-10"
            onClick={(e) => {
              e.stopPropagation();
              onDetails();
            }}
          >
            <Info className="w-5 h-5 text-gray-700" />
          </button>
        )}
      </div>

      {/* Info Container */}
      <div className="flex-1 p-6 cursor-pointer" onClick={onDetails}>
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-2">
          {dog.name}
        </h2>
        <p className="text-sm text-gray-600 mb-3">
          <span className="font-semibold">Bred for:</span> {dog.bred_for}
        </p>
        <p className="text-sm text-gray-600 line-clamp-2">
          <span className="font-semibold">Temperament:</span> {dog.temperament}
        </p>
      </div>
    </div>
  );
};

export default DogCard;
