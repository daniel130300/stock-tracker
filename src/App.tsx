import { SearchForm } from "./components/custom/SearchForm";
import { TopCard } from "./components/custom/TopCard";
import { Chart } from "./components/custom/Chart";
import { useEffect, useState } from "react";
import { formatStockPrice } from "./lib/utils";
import { ISearchForm } from "./types/componentInterfaces";
import useStockSubscription from "./hooks/useLiveStock";
import { Toaster } from "@/components/ui/Toaster";
import { requestPermission } from "./request-permission";


function App() {
  const [formData, setFormData] = useState<ISearchForm | null>(null);
  const { liveStock, stockPlotData, isLoading, firstStock } = useStockSubscription(formData?.stock);
  useEffect(() => {
    requestPermission()
  }, [])

  const marginChange = firstStock?.p ? 
  ((liveStock?.p ? ((liveStock.p - firstStock.p) / firstStock.p) * 100 : 0) || 0) : 0;
  const formattedMarginChange = marginChange ? `${marginChange.toFixed(2)}%` : '0.00%';

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
  };

  return (
    <div className="flex flex-col h-screen">
      <header className="bg-primary text-primary-foreground p-4 text-left">
        <h1 className="text-2xl font-bold">Stock Tracker App</h1>
      </header>
      <div className="flex flex-col h-screen m-12">
        <main className="flex-1">
          <section className="flex flex-col lg:flex-row items-center justify-between space-y-4 lg:space-y-0">
            <TopCard 
              header="Name" 
              value={liveStock?.s || "N/A"} 
              isLoading={isLoading}
            />
            <TopCard
              header="Price" 
              className={liveStock?.p && formData?.priceAlert && liveStock.p < parseFloat(formData.priceAlert) ? 'text-red-500' : ''}
              value={liveStock?.p ? formatStockPrice(liveStock.p) : '0'}
              isLoading={isLoading}
            />
            <TopCard 
              header="Margin Change" 
              className={marginChange < 0 ? 'text-red-500' : ''}
              value={formattedMarginChange} 
              isLoading={isLoading}
            />
          </section>
          <section className="flex flex-col md:flex-row flex-1 items-center space-y-12">
            <div className="flex-1 h-full mt-4 md:mt-0 order-2 md:order-1 flex justify-center md:justify-start md:flex-1">
              <SearchForm onFormSubmit={handleFormSubmit} />
            </div>
            <div className="flex-1 h-full order-1 md:order-2 md:flex-3 md:justify-end">
              <Chart 
                chartData={stockPlotData.length ? stockPlotData : undefined} 
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
                yAxisProps={{
                  tickFormatter: ((value) => formatStockPrice(value))
                }}
                isLoading={isLoading}
              />
            </div>
          </section>
        </main>
      </div>
      <footer className="bg-primary text-primary-foreground p-4 text-center">
        <p>&copy; {new Date().getFullYear()} Stock Tracker App. All rights reserved.</p>
      </footer>
      <Toaster/>
    </div>
  );
}

export default App;