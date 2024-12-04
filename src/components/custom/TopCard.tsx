interface TopCardProps {
  header: string;
  value: string;
}

export function TopCard({ header, value }: TopCardProps) {
  return (
    <div className="w-full p-6 flex flex-col items-center justify-between bg-primary text-primary-foreground shadow-lg transition-transform transform hover:scale-105 rounded">
      <div className="text-lg font-semibold">{header}</div>
      <div className="text-3xl font-bold text-chart-2">{value}</div>
    </div>
  );
};

export default TopCard;