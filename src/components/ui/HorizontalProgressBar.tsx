interface HorizontalProgressBarProps {
  percentage: number;
  className?: string;
}

export function HorizontalProgressBar({ percentage, className = '' }: HorizontalProgressBarProps) {
  return (
    <div className={`w-full h-2 bg-gray-200 rounded-full ${className}`}>
      <div
        className="h-full bg-cyan-500 rounded-full transition-all duration-300 ease-in-out"
        style={{ width: `${percentage}%` }}
      />
    </div>
  );
}
