import { useState } from "react";
import { useSpring, animated } from "@react-spring/web";
import { useDrag } from "@use-gesture/react";
import { X, Check, Info, Star } from "lucide-react";

import type { TDirection } from "./types/card";

import "./App.css";

const MAX_X = 220;
const MAX_Y = 180;

const clamp = (value: number, min: number, max: number) =>
  Math.min(Math.max(value, min), max);

const DogFinderMain = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState<TDirection | null>(null);
  const [imageLoaded, setImageLoaded] = useState(false);

  // Mock data - replace with real API data
  const dogs = [
    {
      id: 1,
      name: "Golden Retriever",
      image:
        "https://images.unsplash.com/photo-1633722715463-d30f4f325e24?w=800&q=80",
      bred_for: "Retrieving game",
      temperament: "Friendly, Intelligent, Devoted",
    },
    {
      id: 2,
      name: "German Shepherd",
      image:
        "https://images.unsplash.com/photo-1568572933382-74d440642117?w=800&q=80",
      bred_for: "Herding, Guard dog",
      temperament: "Confident, Courageous, Smart",
    },
    {
      id: 3,
      name: "Labrador Retriever",
      image:
        "https://images.unsplash.com/photo-1579369932960-ca85c7c84a28?w=800&q=80",
      bred_for: "Retrieving",
      temperament: "Outgoing, Even Tempered, Gentle",
    },
    {
      id: 4,
      name: "French Bulldog",
      image:
        "https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?w=800&q=80",
      bred_for: "Companion",
      temperament: "Playful, Adaptable, Smart",
    },
    {
      id: 5,
      name: "Siberian Husky",
      image:
        "https://images.unsplash.com/photo-1605568427561-40dd23c2acea?w=800&q=80",
      bred_for: "Sled pulling",
      temperament: "Outgoing, Alert, Friendly",
    },
  ];

  const currentDog = dogs[currentIndex];

  // Spring animation config
  const [{ x, y, rot, scale, opacity }, api] = useSpring(() => ({
    x: 0,
    y: 0,
    rot: 0,
    scale: 1,
    opacity: 1,
    config: { friction: 50, tension: 500, mass: 1 },
  }));

  // Next card animation
  const [nextCardProps, nextCardApi] = useSpring(() => ({
    scale: 0.95,
    opacity: 0.5,
    y: 20,
    config: { friction: 50, tension: 400 },
  }));

  const nextDog = () => {
    setImageLoaded(false);

    // Animate next card coming in
    nextCardApi.start({
      scale: 1,
      opacity: 1,
      y: 0,
      config: { friction: 40, tension: 300 },
    });

    setTimeout(() => {
      if (currentIndex < dogs.length - 1) {
        setCurrentIndex(currentIndex + 1);
      } else {
        setCurrentIndex(0);
      }

      // Reset next card to initial state instantly
      nextCardApi.set({
        scale: 0.95,
        opacity: 0.5,
        y: 20,
      });
    }, 100);
  };

  const handleReject = () => {
    console.log("Rejected:", currentDog.name);
    // API call with value = -1
    nextDog();
  };

  const handleLike = () => {
    console.log("Liked:", currentDog.name);
    // API call with value = 1
    nextDog();
  };

  const handleSuperLike = () => {
    console.log("Super Liked:", currentDog.name);
    // API call with value = 2
    // nextDog();
  };

  const handleDetails = () => {
    console.log("View details:", currentDog.name);
    // Navigate to details page
  };

  const handleAction = (dir: TDirection, velocityX = 0) => {
    setDirection(dir);
    const isGone = Math.abs(velocityX) > 0.05 || dir !== null;
    const x =
      (200 + window.innerWidth) *
      (dir === "left" ? -1 : dir === "right" ? 1 : 0);
    const y = dir === "up" ? -window.innerHeight : 0;

    if (isGone) {
      api.start({
        x,
        y,
        rot: dir === "left" ? -45 : dir === "right" ? 45 : 0,
        scale: 0.8,
        opacity: 0,
        config: { friction: 30, tension: 400, mass: 0.8 },
        onRest: () => {
          if (dir === "left") {
            handleReject();
          } else if (dir === "right") {
            handleLike();
          } else if (dir === "up") {
            handleSuperLike();
          }

          // Reset card position instantly without animation
          api.set({
            x: 0,
            y: 0,
            rot: 0,
            scale: 1,
            opacity: 1,
          });
          setDirection(null);
        },
      });
    } else {
      api.start({
        x: 0,
        y: 0,
        rot: 0,
        scale: 1,
        opacity: 1,
        config: { friction: 50, tension: 500 },
      });
    }
  };

  // Drag gesture
  const bind = useDrag(
    ({ active, last, movement: [mx, my], velocity: [vx] }) => {
      const clampedX = clamp(mx, -MAX_X, MAX_X);
      const clampedY = clamp(my, -MAX_Y, MAX_Y);

      const trigger = Math.abs(mx) > 80 || Math.abs(my) > 80 || vx > 0.05;

      if (last) {
        const dir =
          Math.abs(mx) > Math.abs(my)
            ? mx > 0
              ? "right"
              : "left"
            : my < 0
            ? "up"
            : null;

        if (trigger && dir) {
          handleAction(dir, vx);
        } else {
          api.start({
            x: 0,
            y: 0,
            rot: 0,
            scale: 1,
          });
        }
        return;
      }

      api.start({
        x: active ? clampedX : 0,
        y: active ? clampedY : 0,
        rot: clampedX / 20,
        scale: active ? 1.03 : 1,
        immediate: active,
      });
    },
    {
      filterTaps: true,
      rubberband: false,
    }
  );

  // Calculate swipe indicators opacity
  const likeOpacity = x.to((val) => (val > 0 ? Math.min(val / 100, 1) : 0));
  const nopeOpacity = x.to((val) =>
    val < 0 ? Math.min(Math.abs(val) / 100, 1) : 0
  );
  const superLikeOpacity = y.to((val) =>
    val < 0 ? Math.min(Math.abs(val) / 100, 1) : 0
  );

  return (
    <div className="min-h-screen bg-linear-to-br from-purple-100 via-pink-100 to-blue-100 flex flex-col">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <h1 className="text-2xl sm:text-3xl font-bold text-transparent bg-clip-text bg-linear-to-r from-purple-600 to-pink-600">
            🐾 DogFinder
          </h1>
          <p className="text-sm text-gray-600 mt-1">
            Find your perfect furry friend
          </p>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center p-4 sm:p-6 sm:pt-0 lg:p-8 lg:pt-0">
        <div className="w-125 max-w-2xl relative">
          {/* Progress Indicator */}
          <div className="mb-4 text-center">
            <span className="text-sm font-medium text-gray-600">
              {currentIndex + 1} / {dogs.length}
            </span>
          </div>

          {/* Card Container */}
          <div className="relative h-125 sm:h-150">
            {/* Next Card (Background) */}
            {currentIndex < dogs.length - 1 && (
              <animated.div
                style={{
                  scale: nextCardProps.scale,
                  opacity: nextCardProps.opacity,
                  y: nextCardProps.y,
                }}
                className="absolute inset-0 will-change-transform pointer-events-none"
              >
                <div className="bg-white rounded-3xl shadow-xl overflow-hidden h-full">
                  <div className="relative h-4/5 bg-gray-100">
                    <img
                      src={dogs[currentIndex + 1]?.image}
                      alt={dogs[currentIndex + 1]?.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 p-6">
                    <h2 className="text-2xl font-bold text-gray-800">
                      {dogs[currentIndex + 1]?.name}
                    </h2>
                  </div>
                </div>
              </animated.div>
            )}

            {/* Current Card */}
            {currentDog && (
              <animated.div
                {...bind()}
                style={{
                  x,
                  y,
                  rotate: rot.to((r) => `${r}deg`),
                  scale,
                  opacity,
                  touchAction: "none",
                }}
                className="absolute inset-0 will-change-transform"
              >
                {/* Card */}
                <div className="bg-white rounded-3xl shadow-2xl overflow-hidden h-full flex flex-col cursor-grab active:cursor-grabbing">
                  {/* Image Container */}
                  <div
                    className="relative h-4/5 bg-gray-200"
                    onClick={handleDetails}
                  >
                    {/* Skeleton Loader */}
                    {!imageLoaded && (
                      <div className="absolute inset-0 bg-linear-to-r from-gray-200 via-gray-300 to-gray-200 animate-pulse">
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="w-16 h-16 border-4 border-purple-200 border-t-purple-600 rounded-full animate-spin"></div>
                        </div>
                      </div>
                    )}

                    {/* Dog Image */}
                    <img
                      src={currentDog.image}
                      alt={currentDog.name}
                      className={`w-full h-full object-cover pointer-events-none select-none transition-opacity duration-500 ${
                        imageLoaded ? "opacity-100" : "opacity-0"
                      }`}
                      draggable={false}
                      onLoad={() => setImageLoaded(true)}
                      onError={() => setImageLoaded(true)}
                    />

                    {/* Swipe Indicators */}
                    <animated.div
                      className="absolute top-8 left-8 bg-red-500 text-white px-6 py-3 rounded-lg font-bold text-2xl rotate-[-20deg] border-4 border-red-500"
                      style={{ opacity: nopeOpacity }}
                    >
                      NOPE
                    </animated.div>

                    <animated.div
                      className="absolute top-8 right-8 bg-green-500 text-white px-6 py-3 rounded-lg font-bold text-2xl rotate-20 border-4 border-green-500"
                      style={{ opacity: likeOpacity }}
                    >
                      LIKE
                    </animated.div>

                    <animated.div
                      className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-blue-500 text-white px-6 py-3 rounded-lg font-bold text-2xl border-4 border-blue-500"
                      style={{ opacity: superLikeOpacity }}
                    >
                      SUPER LIKE
                    </animated.div>

                    {/* Info Icon */}
                    <button
                      className="absolute top-4 right-4 bg-white/80 backdrop-blur-sm p-2 rounded-full shadow-lg hover:bg-white transition-colors z-10"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDetails();
                      }}
                    >
                      <Info className="w-5 h-5 text-gray-700" />
                    </button>
                  </div>

                  {/* Info Container */}
                  <div
                    className="flex-1 p-6 cursor-pointer"
                    onClick={handleDetails}
                  >
                    <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-2">
                      {currentDog.name}
                    </h2>
                    <p className="text-sm text-gray-600 mb-3">
                      <span className="font-semibold">Bred for:</span>{" "}
                      {currentDog.bred_for}
                    </p>
                    <p className="text-sm text-gray-600 line-clamp-2">
                      <span className="font-semibold">Temperament:</span>{" "}
                      {currentDog.temperament}
                    </p>
                  </div>
                </div>
              </animated.div>
            )}

            {/* No more dogs message */}
            {!currentDog && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <p className="text-2xl font-bold text-gray-700 mb-2">
                    No more dogs!
                  </p>
                  <p className="text-gray-600">
                    Check back later for more breeds
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Action Buttons */}
          {currentDog && (
            <div className="flex justify-center items-center gap-4 mt-6">
              <button
                onClick={() => handleAction("left")}
                className="bg-white hover:bg-red-50 text-red-500 w-14 h-14 sm:w-16 sm:h-16 rounded-full shadow-lg flex items-center justify-center transition-all hover:scale-110 active:scale-95"
                aria-label="Reject"
              >
                <X className="w-7 h-7 sm:w-8 sm:h-8" strokeWidth={2.5} />
              </button>

              <button
                onClick={() => handleAction("up")}
                className="bg-white hover:bg-blue-50 text-blue-500 w-12 h-12 sm:w-14 sm:h-14 rounded-full shadow-lg flex items-center justify-center transition-all hover:scale-110 active:scale-95"
                aria-label="Super Like"
              >
                <Star className="w-6 h-6 sm:w-7 sm:h-7" fill="currentColor" />
              </button>

              <button
                onClick={handleDetails}
                className="bg-white hover:bg-purple-50 text-purple-500 w-10 h-10 sm:w-12 sm:h-12 rounded-full shadow-lg flex items-center justify-center transition-all hover:scale-110 active:scale-95"
                aria-label="More Info"
              >
                <Info className="w-5 h-5 sm:w-6 sm:h-6" />
              </button>

              <button
                onClick={() => handleAction("right")}
                className="bg-white hover:bg-green-50 text-green-500 w-14 h-14 sm:w-16 sm:h-16 rounded-full shadow-lg flex items-center justify-center transition-all hover:scale-110 active:scale-95"
                aria-label="Like"
              >
                <Check className="w-7 h-7 sm:w-8 sm:h-8" strokeWidth={2.5} />
              </button>
            </div>
          )}

          {/* Swipe Hint */}
          <div className="text-center mt-6 text-sm text-gray-500">
            <p>Swipe left/right/up or use buttons</p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default DogFinderMain;
