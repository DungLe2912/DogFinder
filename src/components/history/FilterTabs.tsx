import { Heart, X, Star } from "lucide-react"
import { FILTER_TYPES, VOTE_VALUES, type FilterType } from "../../constants/history"
import type { TVote } from "../../types/breed"

interface FilterTabsProps {
  currentFilter: FilterType
  onFilterChange: (filter: FilterType) => void
  votes: TVote[]
}

const FilterTabs = ({ currentFilter, onFilterChange, votes }: FilterTabsProps) => {
  const getFilterCount = (type: FilterType) => {
    if (type === FILTER_TYPES.ALL) return votes.length
    if (type === FILTER_TYPES.LIKE) return votes.filter((v) => v.value === VOTE_VALUES.LIKE).length
    if (type === FILTER_TYPES.DISLIKE)
      return votes.filter((v) => v.value === VOTE_VALUES.DISLIKE).length
    if (type === FILTER_TYPES.SUPERLIKE)
      return votes.filter((v) => v.value === VOTE_VALUES.SUPERLIKE).length
    return 0
  }

  return (
    <div className="mt-4 flex gap-2 overflow-x-auto">
      <button
        onClick={() => onFilterChange(FILTER_TYPES.ALL)}
        className={`flex items-center gap-2 whitespace-nowrap rounded-full px-4 py-2 text-sm font-medium transition-colors ${
          currentFilter === FILTER_TYPES.ALL
            ? "bg-purple-600 text-white"
            : "bg-gray-100 text-gray-700 hover:bg-gray-200"
        }`}
      >
        All ({getFilterCount(FILTER_TYPES.ALL)})
      </button>
      <button
        onClick={() => onFilterChange(FILTER_TYPES.LIKE)}
        className={`flex items-center gap-2 whitespace-nowrap rounded-full px-4 py-2 text-sm font-medium transition-colors ${
          currentFilter === FILTER_TYPES.LIKE
            ? "bg-green-600 text-white"
            : "bg-gray-100 text-gray-700 hover:bg-gray-200"
        }`}
      >
        <Heart size={16} />
        Likes ({getFilterCount(FILTER_TYPES.LIKE)})
      </button>
      <button
        onClick={() => onFilterChange(FILTER_TYPES.DISLIKE)}
        className={`flex items-center gap-2 whitespace-nowrap rounded-full px-4 py-2 text-sm font-medium transition-colors ${
          currentFilter === FILTER_TYPES.DISLIKE
            ? "bg-red-600 text-white"
            : "bg-gray-100 text-gray-700 hover:bg-gray-200"
        }`}
      >
        <X size={16} />
        Dislikes ({getFilterCount(FILTER_TYPES.DISLIKE)})
      </button>
      <button
        onClick={() => onFilterChange(FILTER_TYPES.SUPERLIKE)}
        className={`flex items-center gap-2 whitespace-nowrap rounded-full px-4 py-2 text-sm font-medium transition-colors ${
          currentFilter === FILTER_TYPES.SUPERLIKE
            ? "bg-blue-600 text-white"
            : "bg-gray-100 text-gray-700 hover:bg-gray-200"
        }`}
      >
        <Star size={16} />
        Super Likes ({getFilterCount(FILTER_TYPES.SUPERLIKE)})
      </button>
    </div>
  )
}

export default FilterTabs
