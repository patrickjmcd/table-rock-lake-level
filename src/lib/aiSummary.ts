"use server";

import Anthropic from "@anthropic-ai/sdk";
import type { LevelMeasurement } from "./level";

const client = new Anthropic();

export async function getAiConditionsSummary(
	latest: LevelMeasurement,
	changeFromLastReading: number | null,
	differenceFromLastYear: number | null,
): Promise<string | null> {
	try {
		const ftAboveFullPool = latest.level - 915;
		const ftFromCrest = 947 - latest.level;

		const releaseInfo =
			latest.totalReleaseRate > 0
				? `Turbine release: ${latest.turbineReleaseRate.toLocaleString()} cfs, spillway release: ${latest.spillwayReleaseRate.toLocaleString()} cfs, total: ${latest.totalReleaseRate.toLocaleString()} cfs.`
				: "No water currently being released.";

		const trendInfo =
			changeFromLastReading === null
				? "Trend unknown."
				: changeFromLastReading > 0.01
					? `Rising +${changeFromLastReading} ft since last reading.`
					: changeFromLastReading < -0.01
						? `Falling ${Math.abs(changeFromLastReading)} ft since last reading.`
						: "Holding steady since last reading.";

		const yearOverYear =
			differenceFromLastYear !== null
				? `${differenceFromLastYear >= 0 ? "+" : ""}${differenceFromLastYear} ft compared to same date last year.`
				: "No year-over-year data available.";

		const prompt = `You are a helpful assistant summarizing Table Rock Lake conditions in Missouri for water sports, boaters, anglers, and recreational visitors.

Current conditions:
- Water level: ${latest.level.toFixed(2)} ft (full pool is 915 ft, dam crest is 947 ft)
- ${Math.abs(ftAboveFullPool).toFixed(2)} ft ${ftAboveFullPool >= 0 ? "above" : "below"} full pool
- ${ftFromCrest.toFixed(2)} ft below dam crest
- ${trendInfo}
- ${yearOverYear}
- ${releaseInfo}

Write 2-3 concise sentences summarizing what these conditions mean practically for lake visitors — think boating, fishing, dock access, and current/flow near the dam. Be direct and specific. No bullet points or headers.`;

		const response = await client.messages.create({
			model: "claude-opus-4-6",
			max_tokens: 300,
			messages: [{ role: "user", content: prompt }],
		});

		const textBlock = response.content.find((b) => b.type === "text");
		return textBlock?.text ?? null;
	} catch (e) {
		console.error("AI summary failed:", e);
		return null;
	}
}
