import { SearchForm } from "./components/custom/SearchForm"
import { TopCard } from "./components/custom/TopCard"
import { Chart } from "./components/custom/Chart"

function App() {
  return (
    <div className="flex flex-col h-screen"> {/* Added h-screen to make the container full height */}
      <header className="bg-gray-800 text-white p-4 text-left">
        <h1 className="text-2xl font-bold">Stock Tracker App</h1>
      </header>
      <main className="flex-1 space-y-4 space-x-4"> {/* Added flex-1 to allow main to grow and fill available space */}
        <section className="flex items-center justify-between mx-4 my-4">
          <TopCard header="Name" value="StockX"/>
          <TopCard header="Margin Change" value="30"/>
          <TopCard header="Percentage" value="25%"/>
        </section>
        <section className="flex flex-1">
          <div className="flex-1 h-full">
            <SearchForm />
          </div>
          <div className="flex-1 h-full">
            <Chart />
          </div>
        </section>
      </main>
      <footer className="bg-gray-800 text-white p-4 text-center">
        <p>&copy; 2023 Stock Tracker App. All rights reserved.</p>
      </footer>
    </div>
  )
}

export default App
