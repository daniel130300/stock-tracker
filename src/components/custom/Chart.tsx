import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/Chart";
import { ChartProps } from "@/types/componentInterfaces";
import { Skeleton } from "@/components/ui/Skeleton";

export function Chart({ chartData, chartConfig, xAxisProps, yAxisProps, areaProps, isLoading }: ChartProps) {
  if (isLoading) {
    return (
      <ChartContainer config={chartConfig}>
        <Skeleton className="w-full h-full rounded-lg" />
      </ChartContainer>
    );
  }

  return (
    <ChartContainer config={chartConfig}>
      <AreaChart
        accessibilityLayer
        data={chartData}
      >
        <CartesianGrid vertical={false} />
        <XAxis
          dataKey="time"
          tickLine={xAxisProps?.tickLine ?? false}
          axisLine={xAxisProps?.axisLine ?? false}
          tickMargin={xAxisProps?.tickMargin ?? 8}
          tickFormatter={xAxisProps?.tickFormatter}
          tickCount={xAxisProps?.tickCount}
          interval={xAxisProps?.interval ?? 0}
          allowDataOverflow={false}
        />
        <YAxis
          domain={yAxisProps?.domain ?? ['auto', 'auto']}
          tickFormatter={yAxisProps?.tickFormatter}
          allowDecimals={true}
          tickCount={yAxisProps?.tickCount}
          interval={yAxisProps?.interval ?? 0}
        />
        <ChartTooltip
          cursor={false}
          content={<ChartTooltipContent indicator="dot" />}
          formatter={(value) => value}
        />
        <Area
          dataKey="price"
          type={areaProps?.type ?? "linear"}
          fill={areaProps?.fill ?? "var(--color-price)"}
          fillOpacity={areaProps?.fillOpacity ?? 0.4}
          stroke={areaProps?.stroke ?? "var(--color-price)"}
        />
      </AreaChart>
    </ChartContainer>
  );
}