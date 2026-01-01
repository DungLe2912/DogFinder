import { ImageOff } from "lucide-react";

const NoImage = () => {
  return (
    <div className="absolute inset-0 bg-linear-to-br from-gray-100 to-gray-200 flex flex-col items-center justify-center">
      <div className="bg-white/80 backdrop-blur-sm rounded-full p-6 mb-4">
        <ImageOff className="w-16 h-16 text-gray-400" strokeWidth={1.5} />
      </div>
      <p className="text-gray-500 font-medium text-lg">No image available</p>
      <p className="text-gray-400 text-sm mt-1">🐾</p>
    </div>
  );
};

export default NoImage;
