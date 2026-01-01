import {
  STORAGE_KEYS,
  SESSION_STORAGE_KEYS,
  CACHE_EXPIRY,
} from "../constants/breeds";
import type { TBreed } from "../types/breed";

interface StorageProgress {
  currentId: number;
  currentPage: number;
  timestamp: number;
}

interface BreedsMeta {
  page: number;
  hasMore: boolean;
  timestamp: number;
}

export const storageService = {
  // Save current progress
  saveProgress(breedId: number, page: number): void {
    try {
      const progress: StorageProgress = {
        currentId: breedId,
        currentPage: page,
        timestamp: Date.now(),
      };
      localStorage.setItem(
        STORAGE_KEYS.BREEDS_PROGRESS,
        JSON.stringify(progress)
      );
    } catch (error) {
      console.error("Failed to save progress:", error);
    }
  },

  // Get saved progress
  getProgress(): StorageProgress | null {
    try {
      const progressStr = localStorage.getItem(STORAGE_KEYS.BREEDS_PROGRESS);
      if (!progressStr) return null;

      const progress: StorageProgress = JSON.parse(progressStr);

      // Check if cache is expired
      if (Date.now() - progress.timestamp > CACHE_EXPIRY) {
        this.clearProgress();
        return null;
      }

      return progress;
    } catch (error) {
      console.error("Failed to get progress:", error);
      return null;
    }
  },

  // Clear progress
  clearProgress(): void {
    try {
      localStorage.removeItem(STORAGE_KEYS.BREEDS_PROGRESS);
    } catch (error) {
      console.error("Failed to clear progress:", error);
    }
  },

  // Save breeds data to sessionStorage (persists only during session)
  saveBreeds(breeds: TBreed[], page: number, hasMore: boolean): void {
    try {
      const meta: BreedsMeta = {
        page,
        hasMore,
        timestamp: Date.now(),
      };
      sessionStorage.setItem(
        SESSION_STORAGE_KEYS.BREEDS_DATA,
        JSON.stringify(breeds)
      );
      sessionStorage.setItem(
        SESSION_STORAGE_KEYS.BREEDS_META,
        JSON.stringify(meta)
      );
    } catch (error) {
      console.error("Failed to save breeds:", error);
    }
  },

  // Get breeds data from sessionStorage
  getBreeds(): { breeds: TBreed[]; page: number; hasMore: boolean } | null {
    try {
      const breedsStr = sessionStorage.getItem(
        SESSION_STORAGE_KEYS.BREEDS_DATA
      );
      const metaStr = sessionStorage.getItem(SESSION_STORAGE_KEYS.BREEDS_META);

      if (!breedsStr || !metaStr) return null;

      const breeds: TBreed[] = JSON.parse(breedsStr);
      const meta: BreedsMeta = JSON.parse(metaStr);

      // Check if cache is expired (same as progress expiry)
      if (Date.now() - meta.timestamp > CACHE_EXPIRY) {
        this.clearBreeds();
        return null;
      }

      return {
        breeds,
        page: meta.page,
        hasMore: meta.hasMore,
      };
    } catch (error) {
      console.error("Failed to get breeds:", error);
      return null;
    }
  },

  // Clear breeds cache
  clearBreeds(): void {
    try {
      sessionStorage.removeItem(SESSION_STORAGE_KEYS.BREEDS_DATA);
      sessionStorage.removeItem(SESSION_STORAGE_KEYS.BREEDS_META);
    } catch (error) {
      console.error("Failed to clear breeds:", error);
    }
  },
};
