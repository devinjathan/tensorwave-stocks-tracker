import Card from "../components/Card";
import {stocks} from "@/components/stocks";

export default function Home() {
    console.log(stocks);
  return (

      <div className="bg-gray-100 min-h-screen">
          {/* Header */}
          <header className="w-full bg-white border-b border-gray-300 p-4 flex items-center justify-between">
              <h1 className="text-xl font-bold">Devin's Stocks of Choice</h1>
          </header>
          {/* Load Cards for homepage */}
          <div className="flex flex-wrap items-center justify-center p-5 gap-4">
              {stocks.map((stock) => (
                  <Card
                      key={stock.name}
                      name={stock.name}
                      symbol={stock.symbol}
                      logo={stock.logo}
                  />
              ))}
          </div>
      </div>
  );
}
