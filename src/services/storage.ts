import { STORAGE_KEYS, CACHE_EXPIRY } from "../constants/breeds";

interface StorageProgress {
  currentId: number;
  currentPage: number;
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
};
