import { useNavigate, useLocation } from "react-router-dom";
import { ArrowLeft, Heart, Ruler, Weight, Clock } from "lucide-react";
import type { TBreed } from "../../types/breed";
import NoImage from "../../components/NoImage";
import { useState } from "react";
import { createFavorite } from "../../apis/breed";
import { useToast } from "../../contexts/ToastContext";
import { TOAST_MESSAGES, ToastType } from "../../constants/toast";
const DogDetailsPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { showToast } = useToast();
  const breed = location.state?.breed as TBreed | undefined;
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [isFavorited, setIsFavorited] = useState(false);

  const handleGoBack = () => {
    navigate("/");
  };

  const handleFavorite = () => {
    if (!breed?.reference_image_id || isFavorited) return;

    setIsFavorited(true);

    // Fire-and-forget API call in background
    createFavorite(breed.reference_image_id)
      .then(() => showToast(TOAST_MESSAGES.FAVORITE_SUCCESS, ToastType.SUCCESS))
      .catch((error) => {
        console.error("Failed to create favorite:", error);
        showToast(TOAST_MESSAGES.FAVORITE_ERROR, ToastType.ERROR);
        setIsFavorited(false); // Revert on error
      });
  };

  if (!breed) {
    return (
      <div className="min-h-screen bg-linear-to-br from-purple-100 via-pink-100 to-blue-100 flex items-center justify-center p-4">
        <div className="text-center">
          <p className="text-xl text-gray-700 mb-4">Breed not found</p>
          <button
            onClick={handleGoBack}
            className="px-6 py-3 bg-purple-600 text-white rounded-full hover:bg-purple-700 transition-colors"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  const handleImageError = () => {
    setImageError(true);
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-purple-100 via-pink-100 to-blue-100 flex flex-col">
      {/* Header */}
      <div className="flex-1 flex items-start justify-center p-3 sm:p-6 lg:p-8">
        <div className="w-125 max-w-2xl relative">
          <div className="max-w-4xl mx-auto py-4 flex items-center justify-between">
            <button
              onClick={handleGoBack}
              className="flex items-center gap-2 text-gray-700 hover:text-purple-600 transition-colors"
            >
              <ArrowLeft className="w-5 h-5 text-white" />
              <span className="font-medium text-white">Back</span>
            </button>
            <div className="flex gap-2">
              <button
                onClick={handleFavorite}
                disabled={isFavorited}
                className="p-2 rounded-full hover:bg-pink-50 transition-colors disabled:opacity-50"
              >
                <Heart
                  className="w-5 h-5 text-white"
                  fill={isFavorited ? "currentColor" : "none"}
                />
              </button>
            </div>
          </div>

          {/* Main Content */}
          <main className="max-w-4xl mx-auto">
            {/* Hero Image */}
            <div className="relative bg-white rounded-3xl overflow-hidden shadow-2xl mb-6">
              <div className="relative h-[50vh] min-h-75 max-h-125 bg-gray-200">
                {/* Skeleton Loader */}
                {!imageLoaded && !imageError && (
                  <div className="absolute inset-0 bg-linear-to-r from-gray-200 via-gray-300 to-gray-200 animate-pulse">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-16 h-16 border-4 border-purple-200 border-t-purple-600 rounded-full animate-spin"></div>
                    </div>
                  </div>
                )}

                {/* No Image Fallback */}
                {(imageError || !breed.image?.url) && <NoImage />}

                {/* Breed Image */}
                {!imageError && breed.image?.url && (
                  <img
                    src={breed.image.url}
                    alt={breed.name}
                    className={`w-full h-full object-cover transition-opacity duration-500 ${
                      imageLoaded ? "opacity-100" : "opacity-0"
                    }`}
                    onLoad={() => setImageLoaded(true)}
                    onError={handleImageError}
                  />
                )}
              </div>
            </div>

            {/* Breed Info */}
            <div className="bg-white rounded-3xl shadow-xl p-6 sm:p-8 mb-6">
              <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-2">
                {breed.name}
              </h1>
              {breed.breed_group && (
                <p className="text-lg text-purple-600 font-medium mb-4">
                  {breed.breed_group}
                </p>
              )}

              {/* Quick Stats */}
              <div className="grid items-stretch justify-center grid-cols-2 sm:grid-cols-3 gap-4 mb-6">
                {breed.height?.metric && (
                  <div className="bg-purple-50 rounded-xl p-4 text-center h-full flex flex-col justify-center">
                    <Ruler className="w-6 h-6 text-purple-600 mx-auto mb-2" />
                    <p className="text-xs text-gray-600 mb-1">Height</p>
                    <p className="font-bold text-gray-800">
                      {breed.height.metric} cm
                    </p>
                  </div>
                )}
                {breed.weight?.metric && (
                  <div className="bg-pink-50 rounded-xl p-4 text-center h-full flex flex-col justify-center">
                    <Weight className="w-6 h-6 text-pink-600 mx-auto mb-2" />
                    <p className="text-xs text-gray-600 mb-1">Weight</p>
                    <p className="font-bold text-gray-800">
                      {breed.weight.metric} kg
                    </p>
                  </div>
                )}
                {breed.life_span && (
                  <div className="bg-blue-50 rounded-xl p-4 text-center h-full flex flex-col justify-center">
                    <Clock className="w-6 h-6 text-blue-600 mx-auto mb-2" />
                    <p className="text-xs text-gray-600 mb-1">Life Span</p>
                    <p className="font-bold text-gray-800">{breed.life_span}</p>
                  </div>
                )}
                {breed.origin && (
                  <div className="bg-green-50 rounded-xl p-4 text-center h-full flex flex-col justify-center">
                    <span className="text-2xl mb-2 block">🌍</span>
                    <p className="text-xs text-gray-600 mb-1">Origin</p>
                    <p className="font-bold text-gray-800">{breed.origin}</p>
                  </div>
                )}
              </div>

              {/* Description Sections */}
              {breed.bred_for && (
                <div className="mb-6">
                  <h2 className="text-xl font-bold text-gray-800 mb-3">
                    Bred For
                  </h2>
                  <p className="text-gray-700 leading-relaxed">
                    {breed.bred_for}
                  </p>
                </div>
              )}

              {breed.temperament && (
                <div className="mb-6">
                  <h2 className="text-xl font-bold text-gray-800 mb-3">
                    Temperament
                  </h2>
                  <div className="flex flex-wrap gap-2">
                    {breed.temperament.split(",").map((trait, index) => (
                      <span
                        key={index}
                        className="px-4 py-2 bg-linear-to-r from-purple-100 to-pink-100 text-purple-700 rounded-full text-sm font-medium"
                      >
                        {trait.trim()}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Action Button */}
            <div className="flex justify-center gap-4 pb-8">
              <button
                onClick={handleGoBack}
                className="px-8 py-3 bg-white text-purple-600 font-semibold rounded-full shadow-lg hover:shadow-xl transition-all hover:scale-105"
              >
                View More Breeds
              </button>
              <button
                onClick={handleFavorite}
                disabled={isFavorited}
                className="px-8 py-3 bg-linear-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-full shadow-lg hover:shadow-xl transition-all hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Heart className="w-5 h-5 inline mr-2" fill="currentColor" />
                {isFavorited ? "Saved" : "Save"}
              </button>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default DogDetailsPage;
