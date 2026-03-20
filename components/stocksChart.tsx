'use client'

import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    ResponsiveContainer,
    CartesianGrid,
    Tooltip,
    Legend
} from "recharts";

const LineGraph = ({ data }: { data: any[] }) => {
    const chartData = [...data].reverse();

    return(
        <ResponsiveContainer width="100%" height="100%">
        <LineChart width={500} height={500} data={chartData}>
            <XAxis dataKey="date" />
            <YAxis/>
            <CartesianGrid/>
            <Legend />
            <Tooltip />
            <Line type="monotone" dataKey="close" stroke="#72a5f7" />
        </LineChart>
        </ResponsiveContainer>
    );
}

export default LineGraph;