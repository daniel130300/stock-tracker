import axiosInstance from '@/api/axiosInstance';
import { IStockQuoteData } from '@/types/apiInterfaces';
import { useState, useEffect } from 'react';
import { useToast } from './useToast';
import { genericErrorToast, isErrorWithMessage } from '@/lib/utils';

export const useStock = (stockSymbol: string | null | undefined) => {
  const [stockQuote, setStockQuote] = useState<IStockQuoteData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const {toast} = useToast();

  useEffect(() => {
    if (!stockSymbol) return;

    const fetchStockData = async () => {
      setIsLoading(true);
      try {
        const response = await axiosInstance.get(`/quote?symbol=${encodeURIComponent(stockSymbol)}`);
        setStockQuote(response.data);
      } catch (error) {
        toast(genericErrorToast({
          description: isErrorWithMessage(error) ? error.message : undefined
        }))
      } finally {
        setIsLoading(false);
      }
    };

    fetchStockData();
  }, [stockSymbol]);

  return { 
    stockQuote, 
    setStockQuote,
    isLoading,  
    setIsLoading 
  };
};