import { SearchForm } from "./components/custom/SearchForm";
import { TopCard } from "./components/custom/TopCard";
import { Chart } from "./components/custom/Chart";
import { useState, useEffect } from "react";
import axiosInstance from "./api/axiosInstance";
import { formatStockPrice } from "./lib/utils";
import { ISearchForm } from "./types/componentInterfaces";
import useStockSubscription from "./hooks/useLiveStock";
import { IStockQuoteData } from "./types/apiInterfaces";

function App() {
  const [formData, setFormData] = useState<ISearchForm | null>(null);
  const { liveStock, stockPlotData, setStockPlotData } = useStockSubscription(formData);
  const [ stockQuote, setStockQuote] = useState<IStockQuoteData | null>(null);

  const marginChange = stockQuote?.o ? 
  ((liveStock?.p ? ((liveStock.p - stockQuote.c) / stockQuote.c) * 100 : 0) || 0) : 0;
  const formattedMarginChange = marginChange ? `${marginChange.toFixed(2)}%` : '0%';

  const mobileTickCount = 2;
  const tabletTickCount = 3; 
  const desktopTickCount = 5;

  const screenWidth = window.innerWidth;

  const tickCount = Math.min(
    stockPlotData?.length || 0,
    screenWidth < 640 ? mobileTickCount : (screenWidth < 1024 ? tabletTickCount : desktopTickCount)
  );

  const interval = Math.ceil((stockPlotData?.length || 1) / tickCount);

  const handleFormSubmit = (data: ISearchForm) => {
    setFormData(data);
    setStockPlotData([]);
  };

  useEffect(() => {
    if (!formData) return;
    const fetchStockData = async () => {
      try {
        const response = await axiosInstance.get(`/quote?symbol=${encodeURIComponent(formData.stock)}`);
        setStockQuote(response.data);
      } catch (error) {
        console.error("Error fetching stock data:", error);
      }
    };

    fetchStockData();
  }, [formData]);

  return (
    <div className="flex flex-col h-screen">
      <header className="bg-primary text-primary-foreground p-4 text-left">
        <h1 className="text-2xl font-bold">Stock Tracker App</h1>
      </header>
      <div className="flex flex-col h-screen m-12">
        <main className="flex-1">
          <section className="flex flex-col lg:flex-row items-center justify-between space-y-4 lg:space-y-0">
            <TopCard header="Name" value={formData?.stock || "N/A"} />
            <TopCard 
              header="Price" 
              className={liveStock?.p && formData?.priceAlert && liveStock.p < parseFloat(formData.priceAlert) ? 'text-red-500' : ''}
              value={liveStock?.p ? formatStockPrice(liveStock.p) : '0'}
            />
            <TopCard 
              header="Margin Change" 
              className={marginChange < 0 ? 'text-red-500' : ''}
              value={formattedMarginChange} 
            />
          </section>
          <section className="flex flex-col md:flex-row flex-1 items-center space-y-12">
            <div className="flex-1 h-full mt-4 md:mt-0 order-2 md:order-1 flex justify-center md:justify-start md:flex-1">
              <SearchForm onFormSubmit={handleFormSubmit} />
            </div>
            <div className="flex-1 h-full order-1 md:order-2 md:flex-3 md:justify-end">
              <Chart 
                chartData={stockPlotData} 
                chartConfig={{
                  price: {
                    color: "hsl(var(--chart-1))",
                  }
                }}
                xAxisProps={{
                  label: 'Time',
                  tickCount: tickCount,
                  interval: interval,
                }}
              />
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