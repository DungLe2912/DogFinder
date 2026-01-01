export const FILTER_TYPES = {
  ALL: "all",
  LIKE: "like",
  DISLIKE: "dislike",
  SUPERLIKE: "superlike"
} as const

export type FilterType = (typeof FILTER_TYPES)[keyof typeof FILTER_TYPES]

export const VOTE_VALUES = {
  LIKE: 1,
  DISLIKE: -1,
  SUPERLIKE: 2
} as const

export const VOTE_LABELS = {
  [VOTE_VALUES.LIKE]: "Liked",
  [VOTE_VALUES.DISLIKE]: "Disliked",
  [VOTE_VALUES.SUPERLIKE]: "Super Liked"
} as const
