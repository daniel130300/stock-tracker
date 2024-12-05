import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const formatStockPrice = (value: number): string => {
  return `$${value.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 4 })}`;
};

export const genericErrorToast = ({
  title = "Uh oh! Something went wrong.",
  description = "There was a problem with your request."
}: {
  title?: string, 
  description?: string
} = {}) => {
  return {
    title,
    description,
  };
};

export function isErrorWithMessage(error: unknown): error is { message: string } {
  return typeof error === 'object' && error !== null && 'message' in error && typeof (error).message === 'string';
}