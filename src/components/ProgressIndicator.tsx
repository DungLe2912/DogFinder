interface ProgressIndicatorProps {
  current: number;
  total: number;
}

const ProgressIndicator = ({ current, total }: ProgressIndicatorProps) => {
  return (
    <div className="mb-4 text-center">
      <span className="text-sm font-medium text-gray-600">
        {current + 1} / {total}
      </span>
    </div>
  );
};

export default ProgressIndicator;
