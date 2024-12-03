import { SearchForm } from "./components/custom/SearchForm"
import { TopCard } from "./components/custom/TopCard"
import { Chart } from "./components/custom/Chart"

function App() {
  return (
    <div className="flex flex-col h-screen">
      <header className="bg-primary text-primary-foreground p-4 text-left">
        <h1 className="text-2xl font-bold">Stock Tracker App</h1>
      </header>
      <main className="flex-1 space-y-4 space-x-0 md:space-x-4">
      <section className="flex flex-col space-y-4 md:flex-row items-center justify-between mx-4 my-4">
            <TopCard header="Name" value="StockX"/>
            <TopCard header="Margin Change" value="30"/>
            <TopCard header="Percentage" value="25%"/>
        </section>
        <section className="flex flex-col md:flex-row flex-1">
          <div className="flex-1 h-full mb-4 md:mb-0 order-2 md:order-1 flex justify-center md:justify-start">
            <SearchForm />
          </div>
          <div className="flex-1 h-full order-1 md:order-2">
            <Chart />
          </div>
        </section>
      </main>
      <footer className="bg-primary text-primary-foreground p-4 text-center">
        <p>&copy; 2023 Stock Tracker App. All rights reserved.</p>
      </footer>
    </div>
  )
}

export default App;