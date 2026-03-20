import Image from "next/image";
import Link from "next/link";

// props used for creating card
interface CardProps {
    logo: string;   // logo of company (png)
    name: string;   // name of stock (ex: Alphabet)
    symbol: string; // symbol company goes by (ex: GOOGL)
}

export default function Card({ logo, name, symbol }: CardProps) {
        return(
            <Link href={`/stocksInfo/${symbol}`}>
            <div className="bg-white border rounded-2xl shadow p-5 w-60 h-60 flex flex-col items-center justify-center text-center
            hover:border-blue-800 hover:shadow-2xl hover:cursor-pointer transition">
                {/* Image container for fixed size*/}
                <div className="w-auto h-full flex items-center justify-center">
                    <Image src={logo}  alt="Logo" width={100} height={100} />
                </div>
                {/* Text Container */}
                <div>
                    <div>
                        <div className="font-bold text-blue-600 bg-blue-50 px-2 py-1 rounded-full">
                        <h1 className="font-bold">{symbol}</h1>
                        </div>
                        <p className="text-sm">{name}</p>
                    </div>
                </div>
            </div>
            </Link>
    );
}