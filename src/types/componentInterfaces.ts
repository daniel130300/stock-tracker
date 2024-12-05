import { FormSchema } from "@/components/custom/SearchForm";
import { ButtonVariants } from "@/components/ui/Button";
import { ChartConfig } from "@/components/ui/Chart";
import { VariantProps } from "class-variance-authority";
import { AreaProps, XAxisProps, YAxisProps } from "recharts";
import { z } from "zod";
import { IStockPlotData } from "./apiInterfaces";

export interface ChartProps {
  chartData: IStockPlotData[] | [];
  chartConfig: ChartConfig;
  xAxisProps?: XAxisProps;
  yAxisProps?: YAxisProps;
  areaProps?: AreaProps;
}

export type ISearchForm = z.infer<typeof FormSchema>

export interface SearchFormProps {
  onFormSubmit: (data: z.infer<typeof FormSchema>) => void;
}

export interface TopCardProps {
  header: string;
  value: string | number;
  className?: string;
}

export interface Option {
  value: string;
  label: string;
}

export interface ComboBoxProps
  extends Omit<React.SelectHTMLAttributes<HTMLSelectElement>, "onSelect"> {
  options: Option[];
  label?: string;
  initialValue?: string;
  onSelect?: (value: string) => void;
}

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof ButtonVariants> {
  asChild?: boolean
}
