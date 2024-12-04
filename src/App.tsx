import { SearchForm } from "./components/custom/SearchForm"
import { TopCard } from "./components/custom/TopCard"
import { Chart } from "./components/custom/Chart"

function App() {
  return (
    <div className="flex flex-col h-screen">
    <header className="bg-primary text-primary-foreground p-4 text-left">
      <h1 className="text-2xl font-bold">Stock Tracker App</h1>
    </header>
    <div className="flex flex-col h-screen m-12">
      <main className="flex-1">
        <section className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-x-96 md:space-y-0">
          <TopCard header="Name" value="StockX"/>
          <TopCard header="Margin Change" value="30"/>
          <TopCard header="Percentage" value="25%"/>
        </section>
        <section className="flex flex-col md:flex-row flex-1 items-center space-y-12">
          <div className="flex-1 h-full w-full mb-4 md:mb-0 order-2 md:order-1 flex justify-center md:justify-start md:flex-1">
            <SearchForm />
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
  )
}

export default App;