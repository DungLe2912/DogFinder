import { Heart, X, Star } from "lucide-react"
import { VOTE_VALUES, VOTE_LABELS } from "../../constants/history"
import type { TVote } from "../../types/breed"
import NoImage from "../NoImage"

interface VoteCardProps {
  vote: TVote
}

const VoteCard = ({ vote }: VoteCardProps) => {
  const getVoteIcon = (value: number) => {
    if (value === VOTE_VALUES.LIKE) return <Heart className="text-green-500" size={20} />
    if (value === VOTE_VALUES.DISLIKE) return <X className="text-red-500" size={20} />
    if (value === VOTE_VALUES.SUPERLIKE) return <Star className="text-blue-500" size={20} />
    return null
  }

  const getVoteLabel = (value: number) => {
    return VOTE_LABELS[value as keyof typeof VOTE_LABELS] || ""
  }

  return (
    <div className="overflow-hidden rounded-lg bg-white shadow-md transition-shadow hover:shadow-lg">
      {/* Image */}
      <div className="relative aspect-square bg-gray-100">
        {vote.image?.url ? (
          <img src={vote.image.url} alt="Dog" className="h-full w-full object-cover" />
        ) : (
          <NoImage />
        )}

        {/* Vote Badge */}
        <div className="absolute right-2 top-2 flex items-center gap-1 rounded-full bg-white/90 px-3 py-1.5 shadow-md backdrop-blur-sm">
          {getVoteIcon(vote.value)}
          <span className="text-sm font-medium text-gray-700">{getVoteLabel(vote.value)}</span>
        </div>
      </div>

      {/* Info */}
      <div className="p-4">
        <p className="text-sm text-gray-500">
          {new Date(vote.created_at).toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit"
          })}
        </p>
      </div>
    </div>
  )
}

export default VoteCard
