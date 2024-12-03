interface TopCardProps {
  header: string;
  value: string;
}

export function TopCard({ header, value }: TopCardProps) {
  return (
    <div className="p-6 rounded-lg flex flex-col items-center justify-between bg-gray-800 text-white shadow-lg transition-transform transform hover:scale-105">
      <div className="text-lg font-semibold text-gray-300">{header}</div>
      <div className="text-3xl font-bold text-green-400">{value}</div>
    </div>
  );
};

export default TopCard;