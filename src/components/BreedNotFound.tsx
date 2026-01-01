import { useNavigate } from "react-router-dom"

const BreedNotFound = () => {
  const navigate = useNavigate()

  const handleGoBack = () => {
    navigate("/")
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-purple-100 via-pink-100 to-blue-100 flex items-center justify-center -mx-4 sm:-mx-6 lg:-mx-8">
      <div className="w-125 max-w-2xl px-4">
        <div className="text-center bg-white rounded-3xl shadow-xl p-8">
          <div className="text-6xl mb-4">🐕</div>
          <p className="text-xl font-semibold text-gray-800 mb-4">Breed not found</p>
          <p className="text-gray-600 mb-6">
            The dog breed you're looking for doesn't exist or has been removed.
          </p>
          <button
            onClick={handleGoBack}
            className="px-6 py-3 bg-purple-600 text-white rounded-full hover:bg-purple-700 transition-colors font-medium"
          >
            Go Back Home
          </button>
        </div>
      </div>
    </div>
  )
}

export default BreedNotFound
