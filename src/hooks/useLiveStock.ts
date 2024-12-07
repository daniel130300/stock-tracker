import { useState, useEffect } from "react"; 
import { IRealTimeStockData, IStockPlotData } from "../types/apiInterfaces";
import { useToast } from "./useToast";
import { genericErrorToast } from "@/lib/utils";

const socket = new WebSocket(`${import.meta.env.VITE_FINNHUB_WEBSOCKET_BASE_URL}?token=${import.meta.env.VITE_FINNHUB_API_KEY}`);

const useStockSubscription = (stockSymbol: string | null | undefined) => {
  const [stockPlotData, setStockPlotData] = useState<IStockPlotData[]>([]);
  const [liveStock, setLiveStock] = useState<IRealTimeStockData | null>(null);
  const [buffer, setBuffer] = useState<IRealTimeStockData[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast()

  const MAX_ARRAY_SIZE = import.meta.env.VITE_LIVE_STOCK_MAX_ARRAY_SIZE;

  useEffect(() => {
    setStockPlotData([]);
    setLiveStock(null);
    setBuffer([]);
    setIsLoading(false);

    if (!stockSymbol) return;
    setIsLoading(true);

    const subscribeToStock = () => {
      if (socket.readyState === WebSocket.OPEN) {
        socket.send(JSON.stringify({ type: 'subscribe', symbol: stockSymbol }));
      } else {
        socket.onopen = () => {
          socket.send(JSON.stringify({ type: 'subscribe', symbol: stockSymbol }));
        };
      }

      socket.onmessage = (event) => {
        const data = JSON.parse(event.data);
        if (Array.isArray(data?.data) && data.data.length > 0) {
          if ('serviceWorker' in navigator) {
            navigator.serviceWorker.controller?.postMessage({
              type: 'websocket-message',
              payload: data.data,
            });
          }
          setIsLoading(false);
          setLiveStock(data.data[data.data.length - 1]);
          setBuffer((prevBuffer) => [...prevBuffer, ...data.data]);
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
        socket.send(JSON.stringify({ type: 'unsubscribe', symbol: stockSymbol }));
      }
      setStockPlotData([]);
      setIsLoading(false);
    };
  }, [stockSymbol]);

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
    setIsLoading 
  };
};

export default useStockSubscription;