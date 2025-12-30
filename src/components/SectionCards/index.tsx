import { ArrowDownIcon, ArrowUpIcon } from "@heroicons/react/24/outline";
import { round } from "lodash";
import { Badge } from "@/components/ui/badge";
import {
	Card,
	CardAction,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import type { LevelMeasurement } from "@/lib/level";

interface CardsProps {
	data: LevelMeasurement[];
	levelLastYear?: LevelMeasurement;
}

export function SectionCards({ data, levelLastYear }: CardsProps) {
	if (data.length === 0) {
		return null;
	}
	const latestMeasurement = data[data.length - 1];
	const startingMeasurement = data[0];
	const startingLevel = startingMeasurement.level;
	const lastUpdated = latestMeasurement.measuredAt;
	const currentLevel = latestMeasurement.level;

	const ftAboveFullPool = round(currentLevel - 915, 2);
	const changeOverTimePeriod = currentLevel - startingLevel;
	const percentChange = round(
		startingLevel !== 0 ? (changeOverTimePeriod / startingLevel) * 100 : 0,
		2,
	);

	const differenceFromLastYear = levelLastYear
		? round(currentLevel - levelLastYear.level, 2)
		: null;
	const percentChangeFromLastYear = levelLastYear
		? round(
				((currentLevel - levelLastYear.level) / levelLastYear.level) * 100,
				2,
			)
		: null;

	const getDirection = () => {
		if (data.length < 2) return 0;
		if (data[data.length - 1].level > data[data.length - 2].level) {
			return 1;
		} else if (data[data.length - 1].level < data[data.length - 2].level) {
			return -1;
		} else {
			return 0;
		}
	};
	const direction = getDirection();

	return (
		<div className="*:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card grid grid-cols-1 gap-4 px-4 *:data-[slot=card]:bg-linear-to-t *:data-[slot=card]:shadow-xs lg:px-6 @lg/main:grid-cols-2 @5xl/main:grid-cols-4">
			<Card className="@container/card">
				<CardHeader>
					<CardDescription>Current Level</CardDescription>
					<CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
						{round(currentLevel, 2)} ft
					</CardTitle>
					<CardAction>
						<Badge variant="outline">
							{changeOverTimePeriod > 0 ? <ArrowUpIcon /> : <ArrowDownIcon />}
							{percentChange}%
						</Badge>
					</CardAction>
				</CardHeader>
				<CardFooter className="flex-col items-start gap-1.5 text-sm">
					<div className="line-clamp-1 flex gap-2 font-medium">
						{direction === -1 && (
							<>
								Level is falling <ArrowDownIcon className="size-4" />
							</>
						)}
						{direction === 0 && <>No Change this period</>}
						{direction === 1 && (
							<>
								Level is rising <ArrowUpIcon className="size-4" />
							</>
						)}
					</div>
					<div className="text-muted-foreground">
						Last updated: {lastUpdated.toLocaleString()}
					</div>
				</CardFooter>
			</Card>
			<Card className="@container/card">
				<CardHeader>
					<CardDescription>Level Above Full</CardDescription>
					<CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
						{round(ftAboveFullPool, 2)} ft
					</CardTitle>
				</CardHeader>
				<CardFooter className="flex-col items-start gap-1.5 text-sm">
					<div className="line-clamp-1 flex gap-2 font-medium">
						{differenceFromLastYear && differenceFromLastYear > 0 && (
							<>
								Up {differenceFromLastYear} ft from last year{" "}
								<ArrowUpIcon className="size-4" />
							</>
						)}
						{differenceFromLastYear && differenceFromLastYear === 0 && (
							<>No Change from last year</>
						)}
						{differenceFromLastYear && differenceFromLastYear < 0 && (
							<>
								Down {Math.abs(differenceFromLastYear)} ft from last year{" "}
								<ArrowDownIcon className="size-4" />
							</>
						)}
					</div>
					<div className="text-muted-foreground">
						{levelLastYear
							? `Last year (${levelLastYear.measuredAt.toLocaleDateString()}): ${levelLastYear.level} ft`
							: ""}
					</div>
				</CardFooter>
			</Card>
		</div>
	);
}
