const EmptyState = () => {
  return (
    <div className="absolute inset-0 flex items-center justify-center">
      <div className="text-center">
        <p className="text-2xl font-bold text-gray-700 mb-2">No more dogs!</p>
        <p className="text-gray-600">Check back later for more breeds</p>
      </div>
    </div>
  );
};

export default EmptyState;
