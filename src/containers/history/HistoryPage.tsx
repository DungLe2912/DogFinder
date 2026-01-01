import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { ArrowLeft } from "lucide-react"

import { fetchVotes } from "../../apis/breed"
import { FILTER_TYPES, VOTE_VALUES, type FilterType } from "../../constants/history"
import type { TVote } from "../../types/breed"
import FilterTabs from "../../components/history/FilterTabs"
import VoteCard from "../../components/history/VoteCard"
import HistoryEmptyState from "../../components/history/HistoryEmptyState"

const HistoryPage = () => {
  const navigate = useNavigate()
  const [votes, setVotes] = useState<TVote[]>([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState<FilterType>(FILTER_TYPES.ALL)

  useEffect(() => {
    const loadVotes = async () => {
      try {
        setLoading(true)
        const data = await fetchVotes({ limit: 100 })
        setVotes(data)
      } catch (error) {
        console.error("Failed to fetch votes:", error)
      } finally {
        setLoading(false)
      }
    }

    loadVotes()
  }, [])

  const filteredVotes = votes.filter((vote) => {
    if (filter === FILTER_TYPES.ALL) return true
    if (filter === FILTER_TYPES.LIKE) return vote.value === VOTE_VALUES.LIKE
    if (filter === FILTER_TYPES.DISLIKE) return vote.value === VOTE_VALUES.DISLIKE
    if (filter === FILTER_TYPES.SUPERLIKE) return vote.value === VOTE_VALUES.SUPERLIKE
    return true
  })

  return (
    <div className="min-h-screen bg-linear-to-b from-purple-50 to-white -mx-4 sm:-mx-6 lg:-mx-8">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-white/80 backdrop-blur-md shadow-sm">
        <div className="w-125 max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate("/")}
              className="rounded-full p-2 transition-colors hover:bg-gray-100"
              aria-label="Go back"
            >
              <ArrowLeft size={24} />
            </button>
            <h1 className="text-2xl font-bold text-gray-800">Vote History</h1>
          </div>

          {/* Filter Tabs */}
          <FilterTabs currentFilter={filter} onFilterChange={setFilter} votes={votes} />
        </div>
      </div>

      {/* Content */}
      <main className="w-125 max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="text-center">
              <div className="mx-auto mb-4 h-16 w-16 animate-spin rounded-full border-4 border-purple-200 border-t-purple-600"></div>
              <p className="font-medium text-gray-600">Loading history...</p>
            </div>
          </div>
        ) : filteredVotes.length === 0 ? (
          <HistoryEmptyState filter={filter} />
        ) : (
          <div className="grid gap-4 grid-cols-2">
            {filteredVotes.map((vote) => (
              <VoteCard key={vote.id} vote={vote} />
            ))}
          </div>
        )}
      </main>
    </div>
  )
}

export default HistoryPage
