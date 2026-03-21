import Image from "next/image";
import Link from "next/link";
import LineGraph from "@/components/stocksChart";


interface getProps{
    params: Promise<{symbol: string}>;
}

export default async function stockInfo({ params }: getProps) {
    //debug
    //await new Promise(resolve => setTimeout(resolve, 2000));
    const {symbol} = await params;
    const apiKey = process.env.ALPHAVANTAGE_KEY;


    // fetch the company overview and time_series_daily parallel
    // const [overview, time_series_daily] = await Promise.all([
    //     fetch(`https://www.alphavantage.co/query?function=OVERVIEW&symbol=${symbol}&apikey=${apiKey}`),
    //     fetch(`https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${symbol}&apikey=${apiKey}`)
    // ]);
    // convert to jsons
    // const [overviewData, time_series_dailyData] = await Promise.all([
    //     overview.json(),
    //     time_series_daily.json(),
    // ]);

    // fetch sequential for free tier
    const overview = await fetch(`https://www.alphavantage.co/query?function=OVERVIEW&symbol=${symbol}&apikey=${apiKey}`);
    if (!overview.ok) {
        throw new Error('Failed to fetch stock data');
    }
    const overviewData = await overview.json();

    // await to pull second (comment out if premium tier)
    await new Promise(resolve => setTimeout(resolve, 2000));

    const time_series_daily = await fetch(`https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${symbol}&apikey=${apiKey}`);
    if(!time_series_daily.ok){
        throw new Error('Failed to fetch stock data');
    }
    const time_series_dailyData = await time_series_daily.json();

    // only pull from Time series daily and not MetaData
    const daily = time_series_dailyData["Time Series (Daily)"];




    if (!daily) {
        return (
            <div className="p-10 text-center">
                {JSON.stringify(time_series_dailyData, null, 2)}
            </div>
        );
    }

    // daily into map for table
    const rows = Object.entries(daily).map(([date, values]) => ({
            date,
            open: parseFloat(values["1. open"]),
            high: parseFloat(values["2. high"]),
            low: parseFloat(values["3. low"]),
            close: parseFloat(values["4. close"]),
            volume: parseInt(values["5. volume"]),
        }));

    // debug
    // console.log(time_series_dailyData);
    // console.log(overviewData);


    return(
        <div className="">
            {/* Header */}
            <div className="bg-blue-950 ">
                <Link href={`/`} className="hover:cursor-pointer">
                    <h1 className="text-white hover:text-blue-200">← Back to Stocks</h1>
                </Link>
            <div className="bg-blue-950 w-full p-5 flex flex-col md:flex-row md:items-center justify-between gap-6">
                {/* left side (logo and name) */}
                <div className="flex items-center justify-between shrink-0">
                    <div className="bg-white rounded-xl shrink-0 p-2">
                    <Image src={`/images/${symbol}Logo.png`} alt="Company logo" width={72} height={72}
                           className="object-contain h-full w-auto" />
                    </div>
                    <h1 className="text-white text-8xl lg:text-8xl md:text-4xl md:text-left">{overviewData.Name}</h1>
                </div>

                {/* right side (symbol) */}
                <div>
                    <h1 className="text-white font-bold text-8xl">{overviewData.Symbol}</h1>
                </div>
            </div>
            </div>

            {/* Overview information */}
            <div className="border border-gray-300 rounded-xl m-4 p-4">
                <div className="flex items-center">
                    <p className="text-lg font-bold">{overviewData.Name || "N/A"}</p>
                    <p className="font-bold text-blue-600 bg-blue-50 m-2 p-2 rounded-2xl">
                        {overviewData.Symbol || "N/A"}
                    </p>
                </div>
                <p className="text-base">Description: {overviewData.Description || "N/A"}</p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 my-8 p-4">
                <div className="bg-white p-4 rounded-xl border border-gray-300">
                    <p className="text-xs text-gray-600 font-bold">ASSET TYPE</p>
                    <p className="text-lg font-bold">{overviewData.AssetType || "N/A"}</p>
                </div>
                <div className="bg-white p-4 rounded-xl border border-slate-200">
                    <p className="text-xs text-gray-600 font-bold">EXCHANGE</p>
                    <p className="text-lg font-bold">{overviewData.Exchange || "N/A"}</p>
                </div>
                <div className="bg-white p-4 rounded-xl border border-slate-200">
                    <p className="text-xs text-gray-600 font-bold">SECTOR</p>
                    <p className="text-lg font-bold">{overviewData.Sector || "N/A"}</p>
                </div>
                <div className="bg-white p-4 rounded-xl border border-slate-200">
                    <p className="text-xs text-gray-600 font-bold">INDUSTRY</p>
                    <p className="text-lg font-bold">{overviewData.Industry || "N/A"}</p>
                </div>
                <div className="bg-white p-4 rounded-xl border border-slate-200">
                    <p className="text-xs text-gray-600 font-bold">MARKET CAPITALIZATION</p>
                    <p className="text-lg font-bold">{overviewData.MarketCapitalization || "N/A"}</p>
                </div>
            </div>

            { /* Line graph for the historical price chart */}
            <div className="w-full h-100 border border-gray-300 rounded-xl p-5 bg-white shadow-sm">
                <LineGraph data={rows}/>
            </div>
            {/* Table for historical prices */}
            <div className="border-black flex justify-center overflow-x-auto">
                <table className="border md:w-2/3 sm:w-full border-collapse border-b">
                    <thead>
                    <tr className="border-black border-b">
                        <th className="text-left p-4">Date</th>
                        <th className="text-left p-4">Open</th>
                        <th className="text-left p-4">High</th>
                        <th className="text-left p-4">Low</th>
                        <th className="text-left p-4">Close</th>
                        <th className="text-left p-4">Change</th>
                    </tr>
                    </thead>
                    <tbody>
                        {rows.map((day, index) =>{
                            const prevDate = rows[index+1];
                            let percentageChange = 0;

                            if(prevDate){
                                percentageChange = ((day.close - prevDate.close) / prevDate.close) * 100;
                            }
                            return(
                            <tr key={day.date} className="even:bg-gray-100 w-full border-b">
                                <td className="p-4">{day.date}</td>
                                <td className="p-4">${day.open}</td>
                                <td className="p-4 text-green-700">${day.high}</td>
                                <td className="p-4 text-red-700">${day.low}</td>
                                <td className="p-4">${day.close}</td>
                                {/* Percentage change */}
                                <td className={`p-4 font-semibold ${percentageChange >= 0 ? 'text-green-700' : 'text-red-700'}`}>
                                    {percentageChange > 0 && '▲ '}
                                    {percentageChange < 0 && '▼ '}
                                    {percentageChange == 0 && '— '}
                                    {percentageChange.toFixed(2)}%
                                </td>
                            </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    );
}