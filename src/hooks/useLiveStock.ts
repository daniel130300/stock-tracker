import { useState, useEffect } from "react"; 
import { IRealTimeStockData, IStockPlotData } from "../types/apiInterfaces";
import { useToast } from "./useToast";
import { genericErrorToast } from "@/lib/utils";
import { ISearchForm } from "@/types/componentInterfaces";

const socket = new WebSocket(`${import.meta.env.VITE_FINNHUB_WEBSOCKET_BASE_URL}?token=${import.meta.env.VITE_FINNHUB_API_KEY}`);

const useStockSubscription = (formData: ISearchForm | null) => {
  const [stockPlotData, setStockPlotData] = useState<IStockPlotData[]>([]);
  const [liveStock, setLiveStock] = useState<IRealTimeStockData | null>(null);
  const [buffer, setBuffer] = useState<IRealTimeStockData[]>([]);
  const [firstStock, setFirstStock] = useState<IRealTimeStockData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast()

  const MAX_ARRAY_SIZE = import.meta.env.VITE_LIVE_STOCK_MAX_ARRAY_SIZE;

  useEffect(() => {
    setStockPlotData([]);
    setLiveStock(null);
    setBuffer([]);
    setIsLoading(false);
    setFirstStock(null);
    
    if (!formData) return;
    setIsLoading(true);

    const subscribeToStock = () => {
      if (socket.readyState === WebSocket.OPEN) {
        socket.send(JSON.stringify({ type: 'subscribe', symbol: formData.stock }));
      } else {
        socket.onopen = () => {
          socket.send(JSON.stringify({ type: 'subscribe', symbol: formData.stock }));
        };
      }

      socket.onmessage = (event) => {
        const data = JSON.parse(event.data);
        if (Array.isArray(data?.data) && data.data.length > 0) {
          // Only process data if the symbols match
          if (data.data[0].s === formData.stock) {
            if ('serviceWorker' in navigator) {
              navigator.serviceWorker.controller?.postMessage({
                type: 'websocket-message',
                payload: {latestPrice: data?.data[data.data.length - 1].p, priceAlert: formData.priceAlert},
              });
            }
            setIsLoading(false);
            const latestStock = data.data[data.data.length - 1];
            setLiveStock(latestStock);
            setFirstStock(prevFirstStock => prevFirstStock === null ? latestStock : prevFirstStock);
            setBuffer((prevBuffer) => [...prevBuffer, ...data.data]);
          }
        }
      };

      socket.onerror = () => {
        setIsLoading(false);
        toast(genericErrorToast())
      };

      socket.onclose = () => {
        setIsLoading(false);
        toast(genericErrorToast())
      };
    };

    subscribeToStock();
    return () => {
      if (socket.readyState === WebSocket.OPEN) {
        socket.send(JSON.stringify({ type: 'unsubscribe', symbol: formData.stock }));
      }
      setStockPlotData([]);
      setIsLoading(false);
    };
  }, [formData]);

  useEffect(() => {
    if (buffer.length > 0) {
      const formattedData = buffer.map((item: IRealTimeStockData) => ({
        price: item.p,
        time: new Date(item.t).toLocaleTimeString([], {
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
        }),
      }));

      setStockPlotData((prevData) => {
        const newData = [...prevData, ...formattedData];
        return newData.slice(-MAX_ARRAY_SIZE);
      });
      setBuffer([]);
    }
  }, [buffer]);

  return { 
    stockPlotData, 
    setStockPlotData,
    liveStock, 
    setLiveStock, 
    isLoading, 
    setIsLoading,
    firstStock,
    setFirstStock
  };
};

export default useStockSubscription;