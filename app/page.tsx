import Card from "../components/Card";
import {stocks} from "../components/stocks";

export default function Home() {
    console.log(stocks);
  return (
      <>
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
      </>
  );
}
