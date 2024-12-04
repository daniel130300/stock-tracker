import { FormSchema, SearchForm } from "./components/custom/SearchForm";
import { TopCard } from "./components/custom/TopCard";
import { Chart } from "./components/custom/Chart";
import { useState, useEffect } from "react";
import { z } from "zod";

// WebSocket connection URL
const socket = new WebSocket('wss://ws.finnhub.io?token=ct77r61r01qr3sdtu12gct77r61r01qr3sdtu130');


function App() {
  type FormData = z.infer<typeof FormSchema>;
  const [formData, setFormData] = useState<FormData | null>(null);

  const handleFormSubmit = (data: FormData) => {
    setFormData(data);
  };

  useEffect(() => {
    const handleOpen = () => {
      socket.send(JSON.stringify({'type': 'subscribe', 'symbol': 'BINANCE:BTCUSDT'}));
    };
    socket.addEventListener('open', handleOpen);
    socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      console.log('Message from server:', data);
    };
  
    return () => {
      if (socket.readyState === WebSocket.OPEN) {
        socket.send(JSON.stringify({'type': 'unsubscribe', 'symbol': 'BINANCE:BTCUSDT'}));
      }
      socket.removeEventListener('open', handleOpen);
    };
  }, []);

  return (
    <div className="flex flex-col h-screen">
      <header className="bg-primary text-primary-foreground p-4 text-left">
        <h1 className="text-2xl font-bold">Stock Tracker App</h1>
      </header>
      <div className="flex flex-col h-screen m-12">
        <main className="flex-1">
          <section className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-x-96 md:space-y-0">
            <TopCard header="Name" value={formData?.stock || "N/A"} />
            {/* <TopCard header="Margin Change" value={stockData?.marginChange || "0%"} />
            <TopCard header="Percentage" value={stockData?.percentage || "0%"} /> */}
          </section>
          <section className="flex flex-col md:flex-row flex-1 items-center space-y-12">
            <div className="flex-1 h-full w-full mb-4 md:mb-0 order-2 md:order-1 flex justify-center md:justify-start md:flex-1">
              <SearchForm onFormSubmit={handleFormSubmit} />
            </div>
            <div className="flex-1 h-full w-full order-1 md:order-2 md:flex-3 md:justify-end">
              <Chart />
            </div>
          </section>
        </main>
      </div>
      <footer className="bg-primary text-primary-foreground p-4 text-center">
        <p>&copy; {new Date().getFullYear()} Stock Tracker App. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default App;