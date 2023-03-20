import Head from 'next/head'
import Image from 'next/image'
import useSWR from 'swr';
import {Inter} from 'next/font/google'
import {
	LineChart,
	Line,
	XAxis,
	YAxis,
	CartesianGrid,
	Tooltip,
	Legend,
	ResponsiveContainer,
	ReferenceLine
} from 'recharts';
import {LevelData} from "@/pages/api/level";
import moment from "moment";
import {useState} from "react";
import {round} from "lodash";

const inter = Inter({subsets: ['latin']})

export default function Home() {
	const fetcher = (url: string) =>
		fetch(url).then(async (res) => {
			if (!res.ok) {
				throw await res.json();
			}
			return res.json();
		});
	const {data, error, mutate, isLoading} = useSWR<LevelData>(
		'/api/level',
		fetcher,
	);
	const latest = data?.data[data?.data.length - 2];
	const [showData, setShowData] = useState(false);

	const graph = isLoading ? <div>Loading...</div> : (
		<ResponsiveContainer minWidth={400} minHeight={500}>
			<LineChart
				id={"level"}
				width={900}
				height={600}
				data={data?.data}
				margin={{
					top: 5,
					right: 30,
					left: 20,
					bottom: 5,
				}}
			>
				<CartesianGrid strokeDasharray="3 3"/>
				<XAxis xAxisId="0" type="number" domain={["auto", "auto"]} scale="time"
							 tickFormatter={(v, i) => moment(v).format("MMM Do YY")} dataKey="timestamp"/>
				<YAxis type="number" domain={[900, 950]}/>
				<Tooltip
					formatter={(value, name, props) => [`${value} ft.`, "Level"]}
					labelFormatter={(value, props) => moment(value).format("MMM Do YY h:mm:ss a")}
				/>
				<ReferenceLine y={915} label="Full Pool" stroke="blue" strokeDasharray="3 3"/>
				<ReferenceLine y={935.47} label="Record High (Apr 27, 2011)" stroke="orange" strokeDasharray="3 3"/>
				<ReferenceLine y={947} label="Max Capacity (top of dam)" stroke="red" strokeDasharray="3 3"/>

				<Legend/>
				<Line type="monotone" dataKey="value" stroke="#8884d8" name="level" dot={false}/>
			</LineChart>
		</ResponsiveContainer>
	)

	const dataDisplay = showData ? (<div className="w-full my-4 text-gray-700 bg-gray-100 font-mono">
		<p className="p-5">
			{JSON.stringify(data?.data, null, 2)}
		</p>
	</div>) : null;

	const currentBlock = isLoading || !latest ? <div>Loading...</div> : (
		<div>
			<h2 className="text-xl">Current Level: {latest?.value} ft</h2>
			<p>{`${round(latest.value - 915, 2)} ft above full pool`}</p>
			<h2>Last Updated: {moment(latest?.time).format('MMMM Do YYYY, h:mm:ss a')}</h2>
		</div>
	)

	return (
		<>
			<Head>
				<title>Table Rock Lake Level</title>
				<meta name="description" content="Lake Level for Table Rock Lake"/>
				<meta name="viewport" content="width=device-width, initial-scale=1"/>
				<link rel="icon" href="/favicon.ico"/>
			</Head>
			<main className="container min-h-full items-center justify-center px-4 sm:px-6 lg:px-8">

				<div className="w-full my-4">
					<div className="w-full">
						<h1 className="text-2xl">Table Rock Lake Level</h1>
						{currentBlock}
					</div>
				</div>
				<div className=" w-full my-4">
					{graph}
				</div>
				<div className="w-full my-4">
					<button
						className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
						onClick={() => setShowData(!showData)}>Toggle Raw Data
					</button>
				</div>

				{dataDisplay}

			</main>
		</>
	)
}

