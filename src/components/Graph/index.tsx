"use client";
import moment from "moment";
import { useMemo, useState } from "react";
import {
	Area,
	AreaChart,
	CartesianGrid,
	ReferenceLine,
	XAxis,
	YAxis,
} from "recharts";
import { Button } from "@/components/ui/button";
import {
	type ChartConfig,
	ChartContainer,
	ChartTooltip,
	ChartTooltipContent,
	type CustomTooltipProps,
} from "@/components/ui/chart";
import type { LevelMeasurement } from "@/lib/level";

interface GraphProps {
	levelData: LevelMeasurement[];
}

const Graph = ({ levelData }: GraphProps) => {
	const [showRelease, setShowRelease] = useState(false);

	const chartConfig = {
		level: {
			label: "Water Level (ft.)",
			color: "var(--chart-3)",
		},
		release: {
			label: "Release rate (cfs)",
			color: "var(--chart-1)",
		},
	} satisfies ChartConfig;

	const domain = [
		levelData[0].measuredAt.getTime(),
		levelData[levelData.length - 1].measuredAt.getTime(),
	];

	const releaseDomain = useMemo(() => {
		const maxRelease = Math.max(
			500,
			...levelData.map((datum) => datum.totalReleaseRate || 0),
		);
		return [0, Math.ceil(maxRelease / 500) * 500];
	}, [levelData]);

	return (
		<div className="space-y-3">
			<div className="flex flex-wrap items-center gap-2">
				<p className="text-sm text-slate-200">Show release rate</p>
				<Button
					variant={showRelease ? "secondary" : "ghost"}
					size="sm"
					onClick={() => setShowRelease((prev) => !prev)}
					className="border border-white/10"
				>
					{showRelease ? "Showing releases" : "Hidden"}
				</Button>
			</div>
			<ChartContainer
				config={chartConfig}
				className="w-full h-65 sm:h-80 lg:h-105"
			>
				<AreaChart
					id={"level"}
					data={levelData}
					margin={{
						top: 10,
						right: 20,
						left: 0,
						bottom: 0,
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
						<linearGradient id="fillRelease" x1="0" y1="0" x2="0" y2="1">
							<stop
								offset="5%"
								stopColor="var(--color-release)"
								stopOpacity={0.45}
							/>
							<stop
								offset="95%"
								stopColor="var(--color-release)"
								stopOpacity={0.05}
							/>
						</linearGradient>
					</defs>
					<CartesianGrid
						strokeDasharray="3 3"
						stroke="var(--color-border)"
						opacity={0.3}
					/>
					<XAxis
						xAxisId="0"
						type="number"
						domain={domain}
						scale="time"
						tickFormatter={(v, _i) => moment(v).format("MMM Do YY")}
						dataKey="measuredAt"
						stroke="var(--color-muted-foreground)"
					/>
					<YAxis
						type="number"
						domain={[900, 950]}
						stroke="var(--color-muted-foreground)"
					/>
					{showRelease && (
						<YAxis
							yAxisId="release"
							orientation="right"
							domain={releaseDomain}
							stroke="var(--color-muted-foreground)"
							tickFormatter={(value) => `${value.toLocaleString()} cfs`}
						/>
					)}
					<ChartTooltip
						content={(props: CustomTooltipProps) => (
							<ChartTooltipContent
								{...props}
								className={"text-slate-950"}
								labelKey={"measuredAt"}
								labelFormatter={(_value, props) => {
									if (!props || props.length === 0) {
										return "";
									}
									return moment(props[0].payload.measuredAt).format(
										"MMM Do YY h:mm:ss a",
									);
								}}
								formatter={(value, name, item) => {
									if (name === "release") {
										return [`${value?.toLocaleString()} cfs`, "Release rate"];
									}
									if (name === "level") {
										return [`${value} ft`, "Water level"];
									}
									return [value, item.name];
								}}
							/>
						)}
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

					<Area
						type="natural"
						dataKey="level"
						stroke={"var(--chart-3)"}
						fill={"url(#fillLevel)"}
						name="level"
						dot={false}
					/>
					{showRelease && (
						<Area
							yAxisId="release"
							type="monotone"
							dataKey="totalReleaseRate"
							stroke={"var(--chart-1)"}
							fill={"url(#fillRelease)"}
							name="release"
							dot={false}
						/>
					)}
				</AreaChart>
			</ChartContainer>
		</div>
	);
};

export default Graph;
