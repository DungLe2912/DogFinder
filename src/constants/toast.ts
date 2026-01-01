export const TOAST_MESSAGES = {
  VOTE_REJECT: "Rejected! 👎",
  VOTE_LIKE: "Liked! ❤️",
  VOTE_SUPER_LIKE: "Super Liked! ⭐",
  VOTE_ERROR: "Failed to save your vote",
  FAVORITE_SUCCESS: "Added to favorites! 💖",
  FAVORITE_ERROR: "Failed to add to favorites",
} as const;

export const ToastType = {
  SUCCESS: "success",
  ERROR: "error",
  INFO: "info",
} as const;

export type TToastType = (typeof ToastType)[keyof typeof ToastType];
