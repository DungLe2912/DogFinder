import { useState, useEffect, useCallback } from "react";
import { useSpring, animated } from "@react-spring/web";
import { useDrag } from "@use-gesture/react";
import { useNavigate } from "react-router-dom";

import type { TDirection } from "../../types/card";
import type { TBreed } from "../../types/breed";
import { fetchBreeds, voteBreed } from "../../apis/breed";
import { storageService } from "../../services/storage";
import { useToast } from "../../contexts/ToastContext";
import { TOAST_MESSAGES, ToastType } from "../../constants/toast";
import DogCard from "../../components/DogCard";
import ActionButtons from "../../components/ActionButtons";
import EmptyState from "../../components/EmptyState";
import { MAX_X, MAX_Y, MAX_PREFETCH } from "../../constants/breeds";

import "../../App.css";

const clamp = (value: number, min: number, max: number) =>
  Math.min(Math.max(value, min), max);

const DogFinderMain = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [loading, setLoading] = useState(true);
  const [breeds, setBreeds] = useState<TBreed[]>([]);
  const [page, setPage] = useState(0);
  const [isFetching, setIsFetching] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const navigate = useNavigate();
  const { showToast } = useToast();

  const currentBreed = breeds[currentIndex];

  // Fetch breeds from API
  const fetchMoreBreeds = useCallback(
    async (pageNum: number) => {
      if (isFetching || !hasMore) return;

      try {
        setIsFetching(true);
        const data = await fetchBreeds({ page: pageNum, limit: MAX_PREFETCH });

        if (data.length < MAX_PREFETCH) {
          setHasMore(false);
        }

        const newBreeds = pageNum === 0 ? data : [...breeds, ...data];
        setBreeds(newBreeds);
        setPage(pageNum);
      } catch (error) {
        console.error("Failed to fetch breeds:", error);
      } finally {
        setIsFetching(false);
      }
    },
    [isFetching, hasMore, breeds]
  );

  // Initial load with progress restoration
  useEffect(() => {
    const loadInitialBreeds = async () => {
      // Try to restore from sessionStorage first (fastest, no API call)
      const cachedData = storageService.getBreeds();
      const savedProgress = storageService.getProgress();

      if (cachedData && savedProgress) {
        // Restore from cache without API call
        setBreeds(cachedData.breeds);
        setPage(cachedData.page);
        setHasMore(cachedData.hasMore);

        // Find index by id
        const restoredIndex = cachedData.breeds.findIndex(
          (breed) => breed.id === savedProgress.currentId
        );
        setCurrentIndex(restoredIndex >= 0 ? restoredIndex : 0);
        setLoading(false);
        return;
      }

      // If no cache, load from API
      setLoading(true);

      if (savedProgress) {
        // Restore progress and fetch data from API
        const targetPage = savedProgress.currentPage;
        const totalLimit = MAX_PREFETCH * (targetPage + 1);

        // Fetch all data in one call
        try {
          setIsFetching(true);
          const data = await fetchBreeds({ page: 0, limit: totalLimit });

          setBreeds(data);
          setPage(targetPage);

          // Find index by id
          const restoredIndex = data.findIndex(
            (breed) => breed.id === savedProgress.currentId
          );
          setCurrentIndex(restoredIndex >= 0 ? restoredIndex : 0);

          if (data.length < totalLimit) {
            setHasMore(false);
          }
        } catch (error) {
          console.error("Failed to restore progress:", error);
          // Fallback to fresh start
          await fetchMoreBreeds(0);
        } finally {
          setIsFetching(false);
        }

        setLoading(false);
      } else {
        // Fresh start
        await fetchMoreBreeds(0);
        setLoading(false);
      }
    };

    loadInitialBreeds();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Save progress to localStorage whenever index or page changes
  useEffect(() => {
    if (!loading && breeds.length > 0 && currentBreed) {
      storageService.saveProgress(currentBreed.id, page);
    }
  }, [currentIndex, page, loading, breeds.length, currentBreed]);

  // Save breeds data to sessionStorage whenever it changes
  useEffect(() => {
    if (!loading && breeds.length > 0) {
      storageService.saveBreeds(breeds, page, hasMore);
    }
  }, [breeds, page, hasMore, loading]);

  // Prefetch next page when approaching end
  useEffect(() => {
    if (
      !loading &&
      hasMore &&
      currentIndex >= breeds.length - 2 &&
      breeds.length > 0
    ) {
      fetchMoreBreeds(page + 1);
    }
  }, [currentIndex, breeds.length, loading, hasMore, page, fetchMoreBreeds]);

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

  const nextBreed = () => {
    setImageLoaded(false);

    // Animate next card coming in
    nextCardApi.start({
      scale: 1,
      opacity: 1,
      y: 0,
      config: { friction: 40, tension: 300 },
    });

    setTimeout(() => {
      if (currentIndex < breeds.length - 1) {
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
    // Fire-and-forget vote API in background
    if (currentBreed?.reference_image_id) {
      voteBreed(currentBreed.reference_image_id, -1).catch((error) => {
        console.error("Failed to vote:", error);
        showToast(TOAST_MESSAGES.VOTE_ERROR, ToastType.ERROR);
      });
    }
    nextBreed();
  };

  const handleLike = () => {
    // Fire-and-forget vote API in background
    if (currentBreed?.reference_image_id) {
      voteBreed(currentBreed.reference_image_id, 1).catch((error) => {
        console.error("Failed to vote:", error);
        showToast(TOAST_MESSAGES.VOTE_ERROR, ToastType.ERROR);
      });
    }
    nextBreed();
  };

  const handleSuperLike = () => {
    // Fire-and-forget vote API in background
    if (currentBreed?.reference_image_id) {
      voteBreed(currentBreed.reference_image_id, 2).catch((error) => {
        console.error("Failed to vote:", error);
        showToast(TOAST_MESSAGES.VOTE_ERROR, ToastType.ERROR);
      });
    }
    nextBreed();
  };

  const handleAction = (dir: TDirection, velocityX = 0, fromButton = false) => {
    const isGone = Math.abs(velocityX) > 0.05 || dir !== null;
    const x =
      (200 + window.innerWidth) *
      (dir === "left" ? -1 : dir === "right" ? 1 : 0);
    const y = dir === "up" ? -window.innerHeight : 0;

    if (isGone) {
      if (fromButton) {
        // Call API logic
        if (dir === "left") handleReject();
        else if (dir === "right") handleLike();
        else if (dir === "up") handleSuperLike();

        // Reset spring IMMEDIATELY
        api.set({
          x: 0,
          y: 0,
          rot: 0,
          scale: 1,
          opacity: 1,
        });

        return;
      }

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

  const handleDetails = () => {
    navigate(`/dogs/${currentBreed.id}`, {
      state: { breed: currentBreed },
    });
  };

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
      {/* Main Content */}
      <main className="flex-1 flex items-start justify-center p-3 sm:p-6 lg:p-8">
        <div className="w-125 max-w-2xl relative">
          {loading ? (
            <div className="flex items-center justify-center h-125 sm:h-150">
              <div className="text-center">
                <div className="w-16 h-16 border-4 border-purple-200 border-t-purple-600 rounded-full animate-spin mx-auto mb-4"></div>
                <p className="text-gray-600 font-medium">Loading...</p>
              </div>
            </div>
          ) : (
            <>
              {/* Card Container */}
              <div className="relative h-[85vh] max-h-150 sm:h-180 sm:max-h-175">
                {/* Next Card (Background) */}
                {currentIndex < breeds.length - 1 && (
                  <animated.div
                    style={{
                      scale: nextCardProps.scale,
                      opacity: nextCardProps.opacity,
                      y: nextCardProps.y,
                    }}
                    className="absolute inset-0 will-change-transform pointer-events-none"
                  >
                    <DogCard
                      dog={breeds[currentIndex + 1]}
                      imageLoaded={true}
                      onImageLoad={() => {}}
                      onImageError={() => {}}
                      onDetails={handleDetails}
                    />
                  </animated.div>
                )}

                {/* Current Card */}
                {currentBreed && (
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
                    <DogCard
                      dog={currentBreed}
                      imageLoaded={imageLoaded}
                      onImageLoad={() => setImageLoaded(true)}
                      onImageError={() => setImageLoaded(true)}
                      onDetails={handleDetails}
                      likeOpacity={likeOpacity}
                      nopeOpacity={nopeOpacity}
                      superLikeOpacity={superLikeOpacity}
                      showIndicators={true}
                    />
                  </animated.div>
                )}

                {/* No more dogs message */}
                {!currentBreed && <EmptyState />}
              </div>

              {/* Action Buttons */}
              {currentBreed && <ActionButtons onAction={handleAction} />}

              {/* Swipe Hint */}
              <div className="text-center mt-6 text-sm text-gray-500">
                <p>Swipe left/right/up or use buttons</p>
              </div>
            </>
          )}
        </div>
      </main>
    </div>
  );
};

export default DogFinderMain;
