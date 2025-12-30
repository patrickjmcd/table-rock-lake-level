"use client";
import moment from "moment";
import {
	Area,
	AreaChart,
	CartesianGrid,
	ReferenceLine,
	XAxis,
	YAxis,
} from "recharts";
import {
	type ChartConfig,
	ChartContainer,
	ChartTooltip,
	ChartTooltipContent,
} from "@/components/ui/chart";
import type { LevelMeasurement } from "@/lib/level";

interface GraphProps {
	levelData: LevelMeasurement[];
}

const Graph = ({ levelData }: GraphProps) => {
	const chartConfig = {
		level: {
			label: "Water Level (ft.)",
			color: "var(--chart-3)",
		},
	} satisfies ChartConfig;

	const domain = [
		levelData[0].measuredAt.getTime(),
		levelData[levelData.length - 1].measuredAt.getTime(),
	];
	return (
		<ChartContainer config={chartConfig} className="min-h-150 w-full">
			<AreaChart
				id={"level"}
				width={900}
				height={600}
				data={levelData}
				margin={{
					top: 5,
					right: 5,
					left: 5,
					bottom: 5,
				}}
			>
				<defs>
					<linearGradient id="fillLevel" x1="0" y1="0" x2="0" y2="1">
						<stop
							offset="5%"
							stopColor="var(--color-level)"
							stopOpacity={0.8}
						/>
						<stop
							offset="95%"
							stopColor="var(--color-level)"
							stopOpacity={0.1}
						/>
					</linearGradient>
				</defs>
				<CartesianGrid strokeDasharray="3 3" />
				<XAxis
					xAxisId="0"
					type="number"
					domain={domain}
					scale="time"
					tickFormatter={(v, _i) => moment(v).format("MMM Do YY")}
					dataKey="measuredAt"
				/>
				<YAxis type="number" domain={[900, 950]} />
				<ChartTooltip
					content={
						<ChartTooltipContent
							labelKey={"measuredAt"}
							labelFormatter={(_value, props) => {
								if (!props || props.length === 0) {
									return "";
								}
								return moment(props[0].payload.measuredAt).format(
									"MMM Do YY h:mm:ss a",
								);
							}}
						/>
					}
				/>
				<ReferenceLine
					y={915}
					label="Full Pool"
					stroke="var(--chart-1)"
					strokeDasharray="3 3"
				/>
				<ReferenceLine
					y={935.47}
					label="Record High (Apr 27, 2011)"
					stroke="var(--chart-2)"
					strokeDasharray="3 3"
				/>
				<ReferenceLine
					y={947}
					label="Max Capacity (top of dam)"
					stroke="var(--color-red-600)"
					strokeDasharray="3 3"
				/>

				{/* <Legend /> */}
				<Area
					type="natural"
					dataKey="level"
					stroke={"var(--color-level"}
					fill={"url(#fillLevel)"}
					name="level"
					dot={false}
				/>
			</AreaChart>
		</ChartContainer>
	);
};

export default Graph;
