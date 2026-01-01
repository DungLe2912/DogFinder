export const MAX_X = 220;
export const MAX_Y = 180;
export const MAX_PREFETCH = 10;
export const CACHE_EXPIRY = 1000 * 60 * 60; // 1 hour

export const STORAGE_KEYS = {
  CURRENT_INDEX: "dogfinder_current_index",
  CURRENT_PAGE: "dogfinder_current_page",
  BREEDS_CACHE: "dogfinder_breeds_cache",
  BREEDS_PROGRESS: "dogfinder_progress",
};

export const SESSION_STORAGE_KEYS = {
  BREEDS_DATA: "dogfinder_breeds_data",
  BREEDS_META: "dogfinder_breeds_meta",
};
