import { useState, useEffect } from "react"; 
import { IRealTimeStockData, IStockPlotData } from "../types/apiInterfaces";
import { ISearchForm } from "@/types/componentInterfaces";

const socket = new WebSocket(`${import.meta.env.VITE_FINNHUB_WEBSOCKET_BASE_URL}?token=${import.meta.env.VITE_FINNHUB_API_KEY}`);

const useStockSubscription = (formData: ISearchForm | null) => {
  const [stockPlotData, setStockPlotData] = useState<IStockPlotData[]>([]);
  const [liveStock, setLiveStock] = useState<IRealTimeStockData | null>(null);
  const [buffer, setBuffer] = useState<IRealTimeStockData[]>([]);
  const [error, setError] = useState<string | null>(null); // State to hold error messages

  const MAX_ARRAY_SIZE = import.meta.env.VITE_LIVE_STOCK_MAX_ARRAY_SIZE;

  useEffect(() => {
    if (!formData) return;

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
          setLiveStock(data.data[data.data.length - 1]);
          setBuffer((prevBuffer) => [...prevBuffer, ...data.data]);
        }
      };

      // Handle WebSocket errors
      socket.onerror = (event) => {
        setError("WebSocket error occurred: " + event);
        console.error("WebSocket error:", event);
      };

      // Handle WebSocket closure
      socket.onclose = (event) => {
        setError("WebSocket connection closed: " + event.reason);
        console.warn("WebSocket closed:", event);
      };
    };

    subscribeToStock();
    return () => {
      if (socket.readyState === WebSocket.OPEN) {
        socket.send(JSON.stringify({ type: 'unsubscribe', symbol: formData.stock }));
      }
      setStockPlotData([]);
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

  return { stockPlotData, liveStock, setStockPlotData, setLiveStock, error }; // Return error state
};

export default useStockSubscription;