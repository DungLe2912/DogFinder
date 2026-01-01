import { FILTER_TYPES, type FilterType } from "../../constants/history"

interface HistoryEmptyStateProps {
  filter: FilterType
}

const HistoryEmptyState = ({ filter }: HistoryEmptyStateProps) => {
  const getMessage = () => {
    if (filter === FILTER_TYPES.ALL) {
      return "Start swiping to see your vote history here!"
    }
    if (filter === FILTER_TYPES.LIKE) {
      return "You haven't liked any dogs yet."
    }
    if (filter === FILTER_TYPES.DISLIKE) {
      return "You haven't disliked any dogs yet."
    }
    if (filter === FILTER_TYPES.SUPERLIKE) {
      return "You haven't super liked any dogs yet."
    }
    return ""
  }

  return (
    <div className="py-20 text-center">
      <div className="mb-4 text-6xl">🐕</div>
      <h2 className="mb-2 text-xl font-semibold text-gray-800">No votes yet</h2>
      <p className="text-gray-600">{getMessage()}</p>
    </div>
  )
}

export default HistoryEmptyState
