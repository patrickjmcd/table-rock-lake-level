import { round } from "lodash";
import Link from "next/link";
import ErrorPage from "@/components/ErrorPage";
import Graph from "@/components/Graph";
import { levelColumns } from "@/components/LevelTable/columns";
import { LevelDataTable } from "@/components/LevelTable/data-table";
import { SectionCards } from "@/components/SectionCards";
import {
	getLevelData,
	getLevelLastYear,
	type LevelMeasurement,
} from "@/lib/level";

export const dynamic = "force-dynamic";

const getLatest = (data: LevelMeasurement[]): LevelMeasurement | undefined => {
	if (data.length > 0) {
		return data[data.length - 1];
	}
	return undefined;
};

const Home = async () => {
	console.log("fetching level data");
	try {
		const levelData: LevelMeasurement[] = await getLevelData();
		const levelLastYear = await getLevelLastYear();
		const latestMeasurement = getLatest(levelData);
		const previousMeasurement =
			levelData.length > 1 ? levelData[levelData.length - 2] : undefined;
		const changeFromLastReading =
			latestMeasurement && previousMeasurement
				? round(latestMeasurement.level - previousMeasurement.level, 2)
				: 0;
		const ftAboveFullPool = latestMeasurement
			? round(latestMeasurement.level - 915, 2)
			: 0;
		const differenceFromLastYear =
			levelLastYear && latestMeasurement
				? round(latestMeasurement.level - levelLastYear.level, 2)
				: null;

		return (
			<div className="flex flex-col gap-8">
				<section className="grid gap-6 rounded-3xl border border-white/10 bg-white/5 px-6 py-7 shadow-2xl shadow-sky-900/40 backdrop-blur lg:grid-cols-[1.3fr_0.7fr] lg:px-8 lg:py-10">
					<div className="space-y-5">
						<p className="text-xs uppercase tracking-[0.35em] text-sky-200/80">
							Real-time dashboard
						</p>
						<h1 className="text-4xl font-semibold leading-tight text-white sm:text-5xl">
							Table Rock Lake, reimagined
						</h1>
						<p className="max-w-3xl text-base text-slate-200/85 sm:text-lg">
							Clean visuals, instant context, and reliable data from the US Army
							Corps of Engineers to keep boaters, anglers, and residents
							confident in current lake conditions.
						</p>
						<div className="flex flex-wrap gap-3">
							<span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-medium text-slate-200">
								<span className="h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_0_6px_rgba(52,211,153,0.15)]" />
								Live levels refreshed automatically
							</span>
							{latestMeasurement && (
								<span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-sky-500/15 px-4 py-2 text-xs font-medium text-sky-100">
									Last updated {latestMeasurement.measuredAt.toLocaleString()}
								</span>
							)}
						</div>
					</div>
					<div className="rounded-2xl border border-white/15 bg-gradient-to-br from-sky-500/20 via-blue-900/25 to-slate-900/40 p-6 shadow-lg shadow-sky-900/40">
						<div className="flex items-center justify-between text-sm text-slate-200">
							<p>Current water level</p>
							<span className="rounded-full bg-white/10 px-3 py-1 text-xs font-semibold text-sky-100">
								Full pool: 915 ft
							</span>
						</div>
						<div className="mt-3 flex items-baseline gap-3">
							<p className="text-5xl font-semibold text-white">
								{round(latestMeasurement?.level ?? 0, 2)} ft
							</p>
							<span className="rounded-full border border-emerald-300/30 bg-emerald-400/10 px-3 py-1 text-sm font-medium text-emerald-100">
								{ftAboveFullPool >= 0 ? "Above" : "Below"} full pool
							</span>
						</div>
						<p className="mt-2 text-sm text-slate-200/80">
							{ftAboveFullPool >= 0 ? "" : ""}
							{Math.abs(ftAboveFullPool)} ft{" "}
							{ftAboveFullPool >= 0 ? "above" : "below"} the 915 ft target.
						</p>
						<div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
							<div className="rounded-2xl border border-white/10 bg-white/5 p-4 text-sm">
								<p className="text-slate-300">Change since last reading</p>
								<p className="mt-2 text-2xl font-semibold text-white">
									{changeFromLastReading >= 0 ? "+" : ""}
									{changeFromLastReading.toFixed(2)} ft
								</p>
								<p className="text-xs text-slate-400">
									Based on the previous measurement in this feed.
								</p>
							</div>
							<div className="rounded-2xl border border-white/10 bg-white/5 p-4 text-sm">
								<p className="text-slate-300">Compared to last year</p>
								<p className="mt-2 text-2xl font-semibold text-white">
									{differenceFromLastYear !== null &&
									differenceFromLastYear >= 0
										? "+"
										: ""}
									{differenceFromLastYear ?? "--"} ft
								</p>
								<p className="text-xs text-slate-400">
									{levelLastYear
										? `Same date last year: ${levelLastYear.level.toFixed(2)} ft`
										: "Historical comparison unavailable"}
								</p>
							</div>
						</div>
					</div>
				</section>

				<SectionCards data={levelData} levelLastYear={levelLastYear} />

				<div className="grid gap-6 lg:grid-cols-3">
					<div className="rounded-3xl border border-white/10 bg-white/5 p-4 shadow-2xl shadow-sky-900/40 lg:col-span-2">
						<div className="mb-4 flex items-center justify-between">
							<div>
								<p className="text-xs uppercase tracking-[0.3em] text-sky-200/80">
									Trendline
								</p>
								<h2 className="text-xl font-semibold text-white">
									30-day water level arc
								</h2>
								<p className="text-sm text-slate-300">
									Hover to inspect exact values and milestone markers.
								</p>
							</div>
							<span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-slate-200">
								Interactive
							</span>
						</div>
						<Graph levelData={levelData} />
					</div>
					<div className="rounded-3xl border border-white/10 bg-gradient-to-b from-slate-900/60 via-slate-900/40 to-slate-900/30 p-5 shadow-xl shadow-sky-900/30">
						<h3 className="text-lg font-semibold text-white">
							At-a-glance insights
						</h3>
						<ul className="mt-4 space-y-3 text-sm text-slate-200">
							<li className="flex gap-3 rounded-2xl border border-white/10 bg-white/5 p-3">
								<span className="mt-1 h-2.5 w-2.5 rounded-full bg-emerald-400" />
								<div>
									<p className="font-medium text-white">
										Safe operating margin
									</p>
									<p className="text-slate-300">
										Full pool is 915 ft; the dam crest is 947 ft. You have{" "}
										{round(947 - (latestMeasurement?.level ?? 0), 2)} ft before
										reaching capacity.
									</p>
								</div>
							</li>
							<li className="flex gap-3 rounded-2xl border border-white/10 bg-white/5 p-3">
								<span className="mt-1 h-2.5 w-2.5 rounded-full bg-sky-400" />
								<div>
									<p className="font-medium text-white">Historical high</p>
									<p className="text-slate-300">
										Record peak was 935.47 ft on Apr 27, 2011. The current level
										is {round(935.47 - (latestMeasurement?.level ?? 0), 2)} ft
										below that mark.
									</p>
								</div>
							</li>
							<li className="flex gap-3 rounded-2xl border border-white/10 bg-white/5 p-3">
								<span className="mt-1 h-2.5 w-2.5 rounded-full bg-amber-400" />
								<div>
									<p className="font-medium text-white">Flow visibility</p>
									<p className="text-slate-300">
										Turbine + spillway releases are summarized in the table
										below for transparent downstream planning.
									</p>
								</div>
							</li>
						</ul>
					</div>
				</div>

				<div className="rounded-3xl border border-white/10 bg-white/5 p-4 shadow-2xl shadow-sky-900/40 lg:p-6">
					<div className="mb-4 flex items-center justify-between">
						<div>
							<p className="text-xs uppercase tracking-[0.3em] text-sky-200/80">
								Measurements
							</p>
							<h2 className="text-xl font-semibold text-white">
								Recent readings
							</h2>
							<p className="text-sm text-slate-300">
								Sorted with the most recent measurements first for quick scans.
							</p>
						</div>
						<span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-slate-200">
							CSV-friendly
						</span>
					</div>
					<LevelDataTable
						data={levelData.toReversed()}
						columns={levelColumns}
					/>
				</div>

				<div className="w-full rounded-3xl border border-white/10 bg-white/5 p-6 text-center text-sm text-slate-300 shadow-xl shadow-sky-900/30">
					<p>© Patrick McDonagh, {new Date().getFullYear()}</p>
					<Link
						href="/about"
						className="mt-2 inline-flex items-center justify-center rounded-full border border-white/10 px-4 py-2 text-slate-100 transition hover:border-sky-400/60 hover:bg-sky-500/10"
					>
						Credits &amp; data source
					</Link>
				</div>
			</div>
		);
	} catch (e) {
		return <ErrorPage err={e as Error} />;
	}
};

export default Home;
