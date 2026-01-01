import { useEffect } from "react";
import { X, CheckCircle, XCircle, Info } from "lucide-react";
import type { TToastType } from "../constants/toast";

export interface ToastProps {
  id: string;
  message: string;
  type?: TToastType;
  duration?: number;
  onClose: (id: string) => void;
}

const Toast = ({
  id,
  message,
  type = "success",
  duration = 3000,
  onClose,
}: ToastProps) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose(id);
    }, duration);

    return () => clearTimeout(timer);
  }, [id, duration, onClose]);

  const bgColor =
    type === "success"
      ? "bg-green-500"
      : type === "error"
      ? "bg-red-500"
      : "bg-blue-500";

  const Icon =
    type === "success" ? CheckCircle : type === "error" ? XCircle : Info;

  return (
    <div
      className={`${bgColor} text-white px-4 py-3 rounded-lg shadow-lg flex items-center gap-3 min-w-72 max-w-md animate-slide-in`}
    >
      <Icon className="w-5 h-5 shrink-0" />
      <p className="flex-1 font-medium">{message}</p>
      <button
        onClick={() => onClose(id)}
        className="shrink-0 hover:bg-white/20 rounded p-0.5 transition-colors "
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
};

export default Toast;
