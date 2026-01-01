import { X, Check } from "lucide-react";
import type { TDirection } from "../types/card";

interface ActionButtonsProps {
  onAction: (
    direction: TDirection,
    velocityX?: number,
    fromButton?: boolean
  ) => void;
}

const ActionButtons = ({ onAction }: ActionButtonsProps) => {
  return (
    <div className="flex justify-center items-center gap-4 mt-6">
      <button
        onClick={() => onAction("left", 0, true)}
        className="bg-white hover:bg-red-50 text-red-500 w-14 h-14 sm:w-16 sm:h-16 rounded-full shadow-lg flex items-center justify-center transition-all hover:scale-110 active:scale-95"
        aria-label="Reject"
      >
        <X className="w-7 h-7 sm:w-8 sm:h-8" strokeWidth={2.5} />
      </button>

      <button
        onClick={() => onAction("right", 0, true)}
        className="bg-white hover:bg-green-50 text-green-500 w-14 h-14 sm:w-16 sm:h-16 rounded-full shadow-lg flex items-center justify-center transition-all hover:scale-110 active:scale-95"
        aria-label="Like"
      >
        <Check className="w-7 h-7 sm:w-8 sm:h-8" strokeWidth={2.5} />
      </button>
    </div>
  );
};

export default ActionButtons;
