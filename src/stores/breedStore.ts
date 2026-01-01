import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import type { TBreed } from "../types/breed";
import { CACHE_EXPIRY } from "../constants/breeds";

interface BreedProgress {
  currentId: number;
  currentPage: number;
  timestamp: number;
}

interface BreedCache {
  breeds: TBreed[];
  page: number;
  hasMore: boolean;
  timestamp: number;
}

interface BreedStore {
  // Progress state (localStorage)
  progress: BreedProgress | null;
  saveProgress: (breedId: number, page: number) => void;
  getProgress: () => BreedProgress | null;
  clearProgress: () => void;

  // Breeds cache state (sessionStorage)
  cache: BreedCache | null;
  saveBreeds: (breeds: TBreed[], page: number, hasMore: boolean) => void;
  getBreeds: () => { breeds: TBreed[]; page: number; hasMore: boolean } | null;
  clearBreeds: () => void;
}

// Progress store with localStorage
export const useProgressStore = create<
  Pick<
    BreedStore,
    "progress" | "saveProgress" | "getProgress" | "clearProgress"
  >
>()(
  persist(
    (set, get) => ({
      progress: null,

      saveProgress: (breedId: number, page: number) => {
        set({
          progress: {
            currentId: breedId,
            currentPage: page,
            timestamp: Date.now(),
          },
        });
      },

      getProgress: () => {
        const { progress } = get();
        if (!progress) return null;

        // Check if cache is expired
        if (Date.now() - progress.timestamp > CACHE_EXPIRY) {
          get().clearProgress();
          return null;
        }

        return progress;
      },

      clearProgress: () => {
        set({ progress: null });
      },
    }),
    {
      name: "dogfinder-progress",
      storage: createJSONStorage(() => localStorage),
    }
  )
);

// Breeds cache store with sessionStorage
export const useBreedsCache = create<
  Pick<BreedStore, "cache" | "saveBreeds" | "getBreeds" | "clearBreeds">
>()(
  persist(
    (set, get) => ({
      cache: null,

      saveBreeds: (breeds: TBreed[], page: number, hasMore: boolean) => {
        set({
          cache: {
            breeds,
            page,
            hasMore,
            timestamp: Date.now(),
          },
        });
      },

      getBreeds: () => {
        const { cache } = get();
        if (!cache) return null;

        // Check if cache is expired
        if (Date.now() - cache.timestamp > CACHE_EXPIRY) {
          get().clearBreeds();
          return null;
        }

        return {
          breeds: cache.breeds,
          page: cache.page,
          hasMore: cache.hasMore,
        };
      },

      clearBreeds: () => {
        set({ cache: null });
      },
    }),
    {
      name: "dogfinder-breeds",
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);
