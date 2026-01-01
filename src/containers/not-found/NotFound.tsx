import { Link } from "react-router-dom"
import { Home, Search } from "lucide-react"

const NotFound = () => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-linear-to-b from-blue-50 to-white px-4">
      <div className="text-center">
        {/* 404 Number */}
        <h1 className="mb-4 text-9xl font-bold text-blue-600">404</h1>

        {/* Dog Emoji or Icon */}
        <div className="mb-6 text-6xl">🐕</div>

        {/* Main Message */}
        <h2 className="mb-3 text-3xl font-semibold text-gray-800">Oops! Page Not Found</h2>

        {/* Description */}
        <p className="mb-8 text-lg text-gray-600">
          Looks like this pup ran away! The page you're looking for doesn't exist.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
          <Link
            to="/"
            className="flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white transition-colors hover:bg-blue-700"
          >
            <Home size={20} />
            Go Home
          </Link>

          <Link
            to="/"
            className="flex items-center justify-center gap-2 rounded-lg border-2 border-blue-600 px-6 py-3 font-semibold text-blue-600 transition-colors hover:bg-blue-50"
          >
            <Search size={20} />
            Find Dogs
          </Link>
        </div>
      </div>
    </div>
  )
}

export default NotFound
