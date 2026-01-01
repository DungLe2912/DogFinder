import type { Interpolation } from "@react-spring/web"

import type { TBreed } from "../types/breed"
import SwipeIndicators from "./SwipeIndicators"
import { useState } from "react"
import NoImage from "./NoImage"

interface DogCardProps {
  dog: TBreed
  imageLoaded: boolean
  onImageLoad: () => void
  onImageError: () => void
  onDetails: () => void
  likeOpacity?: Interpolation<number, number>
  nopeOpacity?: Interpolation<number, number>
  superLikeOpacity?: Interpolation<number, number>
  showIndicators?: boolean
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
  showIndicators = false
}: DogCardProps) => {
  const [imageError, setImageError] = useState(false)

  const handleImageError = () => {
    setImageError(true)
    onImageError()
  }

  return (
    <div className="bg-white rounded-2xl sm:rounded-3xl shadow-2xl overflow-hidden h-full flex flex-col cursor-grab active:cursor-grabbing">
      {/* Image Container */}
      <div className="relative h-[65%] sm:h-2/3 bg-gray-200" onClick={onDetails}>
        {/* Skeleton Loader */}
        {!imageLoaded && !imageError && (
          <div className="absolute inset-0 bg-linear-to-r from-gray-200 via-gray-300 to-gray-200 animate-pulse">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-12 h-12 sm:w-16 sm:h-16 border-4 border-purple-200 border-t-purple-600 rounded-full animate-spin"></div>
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
      </div>

      {/* Info Container */}
      <div className="flex-1 p-3 sm:p-6 cursor-pointer overflow-hidden" onClick={onDetails}>
        <h2 className="text-lg sm:text-2xl md:text-3xl font-bold text-gray-800 mb-1 sm:mb-2 truncate">
          {dog.name}
        </h2>
        <p className="text-xs sm:text-sm text-gray-600 mb-1.5 sm:mb-3 line-clamp-1">
          <span className="font-semibold">Bred for:</span> {dog.bred_for || "Unknown"}
        </p>
        <p className="text-xs sm:text-sm text-gray-600 line-clamp-2">
          <span className="font-semibold">Temperament:</span> {dog.temperament || "N/A"}
        </p>
      </div>
    </div>
  )
}

export default DogCard
