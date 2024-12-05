import { TopCardProps } from "@/types/componentInterfaces";
import { Skeleton } from "@/components/ui/Skeleton"

export function TopCard({ header, value, className, isLoading }: TopCardProps) {
  return (
    <div className="w-full max-w-xs p-6 flex flex-col items-center justify-between bg-primary text-primary-foreground shadow-lg transition-transform transform hover:scale-105 rounded">
      <div className="text-lg font-semibold">{header}</div>
      {isLoading ? (
        <Skeleton className="h-9 w-24 bg-primary-foreground/20 rounded"/>
      ) : (
        <div className={`text-3xl font-bold text-chart-2 ${className}`}>{value}</div>
      )}
    </div>
  );
};

export default TopCard;