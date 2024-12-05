import { TopCardProps } from "@/types/componentInterfaces";

export function TopCard({ header, value, className }: TopCardProps) {
  return (
    <div className="w-full max-w-xs p-6 flex flex-col items-center justify-between bg-primary text-primary-foreground shadow-lg transition-transform transform hover:scale-105 rounded"> {/* Added max-w-xs */}
      <div className="text-lg font-semibold">{header}</div>
      <div className={`text-3xl font-bold text-chart-2 ${className}`}>{value}</div>
    </div>
  );
};

export default TopCard;