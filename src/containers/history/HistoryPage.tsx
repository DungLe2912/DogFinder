import { useState, useEffect, useRef, useCallback } from "react"
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
  const [loadingMore, setLoadingMore] = useState(false)
  const [hasMore, setHasMore] = useState(true)
  const [page, setPage] = useState(0)
  const [filter, setFilter] = useState<FilterType>(FILTER_TYPES.ALL)
  const observerTarget = useRef<HTMLDivElement>(null)

  const loadVotes = useCallback(async (pageNum: number, append = false) => {
    try {
      if (append) {
        setLoadingMore(true)
      } else {
        setLoading(true)
      }

      const data = await fetchVotes({ page: pageNum, limit: 100 })

      if (data.length < 100) {
        setHasMore(false)
      }

      setVotes((prev) => (append ? [...prev, ...data] : data))
    } catch (error) {
      console.error("Failed to fetch votes:", error)
    } finally {
      setLoading(false)
      setLoadingMore(false)
    }
  }, [])

  useEffect(() => {
    loadVotes(0)
  }, [loadVotes])

  // Infinite scroll observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !loading && !loadingMore && hasMore) {
          const nextPage = page + 1
          setPage(nextPage)
          loadVotes(nextPage, true)
        }
      },
      { threshold: 0.1 }
    )

    const currentTarget = observerTarget.current
    if (currentTarget) {
      observer.observe(currentTarget)
    }

    return () => {
      if (currentTarget) {
        observer.unobserve(currentTarget)
      }
    }
  }, [loading, loadingMore, hasMore, page, loadVotes])

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

        {/* Infinite scroll trigger */}
        {!loading && hasMore && <div ref={observerTarget} className="h-20" />}

        {/* Loading more indicator */}
        {loadingMore && (
          <div className="flex items-center justify-center py-8">
            <div className="text-center">
              <div className="mx-auto mb-2 h-8 w-8 animate-spin rounded-full border-2 border-purple-200 border-t-purple-600"></div>
              <p className="text-sm text-gray-500">Loading more...</p>
            </div>
          </div>
        )}

        {/* End of results */}
        {!loading && !hasMore && votes.length > 0 && (
          <div className="py-8 text-center">
            <p className="text-sm text-gray-500">No more votes to load</p>
          </div>
        )}
      </main>
    </div>
  )
}

export default HistoryPage
