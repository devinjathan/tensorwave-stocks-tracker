import Image from "next/image";
import Link from "next/link";


interface getProps{
    params: Promise<{symbol: string}>;
}

export default async function stockInfo({ params }: getProps) {
    const {symbol} = await params;
    const apiKey = process.env.ALPHAVANTAGE_KEY;
    
    // fetch the company overview and time_series_daily parallel
    const [overview, time_series_daily] = await Promise.all([
        fetch(`https://www.alphavantage.co/query?function=OVERVIEW&symbol=${symbol}&apikey=${apiKey}`),
        fetch(`https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${symbol}&apikey=${apiKey}`)
    ]);

    // error check for both gets
    if (!overview.ok || !time_series_daily.ok) {
        throw new Error('Failed to fetch stock data');
    }

    // convert to jsons
    const [overviewData, time_series_dailyData] = await Promise.all([
        overview.json(),
        time_series_daily.json(),
    ]);

    // only pull from Time series daily and not MetaData
    const daily = time_series_dailyData["Time Series (Daily)"];


    /*
    const MOCK_OVERVIEW = {
        Symbol: "AAPL",
        AssetType: "Common Stock",
        Name: "Apple Inc",
        Description: "Apple Inc. designs, manufactures, and markets smartphones, personal computers, tablets, wearables, and accessories worldwide.",
        Exchange: "NASDAQ",
        Sector: "Technology",
        Industry: "Consumer Electronics",
        MarketCapitalization: "3000000000000"
    };

    const MOCK_DAILY = {
        "Time Series (Daily)": {
            "2026-03-19": { "1. open": "180.00", "2. high": "182.50", "3. low": "179.10", "4. close": "181.20", "5. volume": "5000000" },
            "2026-03-18": { "1. open": "178.20", "2. high": "180.10", "3. low": "177.50", "4. close": "179.90", "5. volume": "4500000" },
            "2026-03-17": {
                "1. open": "250.5100",
                "2. high": "256.3900",
                "3. low": "250.0000",
                "4. close": "256.1100",
                "5. volume": "5840139"
            },
            "2026-03-16": {
                "1. open": "247.8700",
                "2. high": "252.2000",
                "3. low": "246.1000",
                "4. close": "249.2500",
                "5. volume": "5674228"
            },
            "2026-03-13": {
                "1. open": "247.6700",
                "2. high": "249.7200",
                "3. low": "244.7100",
                "4. close": "246.2800",
                "5. volume": "4338431"
            },
            "2026-03-12": {
                "1. open": "247.1000",
                "2. high": "250.0450",
                "3. low": "245.6400",
                "4. close": "247.6800",
                "5. volume": "5547724"
            },
            "2026-03-11": {
                "1. open": "250.0050",
                "2. high": "253.7150",
                "3. low": "247.2000",
                "4. close": "248.8700",
                "5. volume": "4012239"
            },
            "2026-03-10": {
                "1. open": "253.2600",
                "2. high": "253.4400",
                "3. low": "246.5500",
                "4. close": "250.2000",
                "5. volume": "4937960"
            },
            "2026-03-09": {
                "1. open": "255.3800",
                "2. high": "258.0800",
                "3. low": "251.5710",
                "4. close": "253.3300",
                "5. volume": "6126567"
            },
            "2026-03-06": {
                "1. open": "256.4400",
                "2. high": "259.3999",
                "3. low": "252.2100",
                "4. close": "258.8500",
                "5. volume": "6234402"
            },
            "2026-03-05": {
                "1. open": "249.3200",
                "2. high": "260.3800",
                "3. low": "249.0000",
                "4. close": "256.5500",
                "5. volume": "9899962"
            },
            "2026-03-04": {
                "1. open": "245.7450",
                "2. high": "250.8500",
                "3. low": "244.9550",
                "4. close": "250.0600",
                "5. volume": "6084995"
            },
            "2026-03-03": {
                "1. open": "236.3500",
                "2. high": "246.0900",
                "3. low": "234.2900",
                "4. close": "245.2800",
                "5. volume": "6960369"
            },
            "2026-03-02": {
                "1. open": "235.7000",
                "2. high": "240.7800",
                "3. low": "233.7800",
                "4. close": "239.3700",
                "5. volume": "6220287"
            },
            "2026-02-27": {
                "1. open": "238.0700",
                "2. high": "240.2100",
                "3. low": "234.5650",
                "4. close": "240.2100",
                "5. volume": "6642222"
            },
            "2026-02-26": {
                "1. open": "239.7100",
                "2. high": "247.4899",
                "3. low": "238.9500",
                "4. close": "242.0100",
                "5. volume": "7343055"
            },
            "2026-02-25": {
                "1. open": "233.2200",
                "2. high": "239.5500",
                "3. low": "231.2200",
                "4. close": "237.5400",
                "5. volume": "8569713"
            },
            "2026-02-24": {
                "1. open": "227.8000",
                "2. high": "236.5937",
                "3. low": "223.6300",
                "4. close": "229.3200",
                "5. volume": "13379817"
            },
            "2026-02-23": {
                "1. open": "254.3700",
                "2. high": "255.1900",
                "3. low": "220.7200",
                "4. close": "223.3500",
                "5. volume": "19522881"
            },
            "2026-02-20": {
                "1. open": "255.1950",
                "2. high": "259.0400",
                "3. low": "253.8000",
                "4. close": "257.1600",
                "5. volume": "4708550"
            },
            "2026-02-19": {
                "1. open": "256.0000",
                "2. high": "258.2800",
                "3. low": "253.5110",
                "4. close": "256.2800",
                "5. volume": "4948700"
            },
            "2026-02-18": {
                "1. open": "258.6400",
                "2. high": "261.1100",
                "3. low": "256.2500",
                "4. close": "260.7900",
                "5. volume": "3949229"
            },
            "2026-02-17": {
                "1. open": "259.2000",
                "2. high": "260.7000",
                "3. low": "254.6500",
                "4. close": "258.3100",
                "5. volume": "4929733"
            },
            "2026-02-13": {
                "1. open": "260.0000",
                "2. high": "264.6600",
                "3. low": "256.6400",
                "4. close": "262.3800",
                "5. volume": "6842620"
            },
            "2026-02-12": {
                "1. open": "270.3000",
                "2. high": "271.3000",
                "3. low": "257.2200",
                "4. close": "259.5200",
                "5. volume": "12565380"
            },
            "2026-02-11": {
                "1. open": "292.3400",
                "2. high": "293.5000",
                "3. low": "272.3601",
                "4. close": "272.8100",
                "5. volume": "7628244"
            },
            "2026-02-10": {
                "1. open": "294.9900",
                "2. high": "297.6100",
                "3. low": "290.3300",
                "4. close": "291.7600",
                "5. volume": "3837343"
            },
        }
    };

    const time_series_dailyData = MOCK_DAILY
    const daily = time_series_dailyData["Time Series (Daily)"];
    const overviewData = MOCK_OVERVIEW;
    */




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
                    </tr>
                    </thead>
                    <tbody>
                        {rows.map((day) => (
                            <tr key={day.date} className="even:bg-gray-100 w-full border-b">
                                <td className="p-4">{day.date}</td>
                                <td className="p-4">${day.open}</td>
                                <td className="p-4 text-green-700">${day.high}</td>
                                <td className="p-4 text-red-700">${day.low}</td>
                                <td className="p-4">${day.close}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}