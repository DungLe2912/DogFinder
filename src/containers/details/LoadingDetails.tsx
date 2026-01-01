const LoadingDetails = () => {
  return (
    <div className="min-h-screen bg-linear-to-br from-purple-100 via-pink-100 to-blue-100 flex flex-col -mx-4 sm:-mx-6 lg:-mx-8">
      <div className="flex-1 flex items-start justify-center px-4 sm:px-6 lg:px-8 py-3">
        <div className="w-125 max-w-2xl relative">
          <div className="flex items-center justify-center h-125 sm:h-150">
            <div className="text-center">
              <div className="w-16 h-16 border-4 border-purple-200 border-t-purple-600 rounded-full animate-spin mx-auto mb-4"></div>
              <p className="text-gray-600 font-medium">Loading breed details...</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LoadingDetails
