"use server";

import type { ObjectId } from "mongodb";
import MongoClient from "./mongoclient";

export interface LevelMeasurement {
	lakeName: string;
	level: number;
	temperature: number;
	turbineReleaseRate: number;
	spillwayReleaseRate: number;
	totalReleaseRate: number;
	measuredAt: Date;
	createdAt?: Date;
	_id?: ObjectId;
}

export const getLevelData = async (
	startTime?: Date,
	endTime?: Date,
): Promise<LevelMeasurement[]> => {
	try {
		if (!MongoClient) {
			console.error("MongoClient not initialized");
			throw new Error("MongoClient not initialized");
		}

		await MongoClient.connect();

		if (!endTime) {
			endTime = new Date();
		}

		if (!startTime) {
			startTime = new Date(endTime.getTime() - 21 * 24 * 60 * 60 * 1000);
		}

		const db = MongoClient.db("lake-info");
		const collection = db.collection<LevelMeasurement>("level");
		const query = {
			measuredAt: {
				$gte: startTime,
				$lte: endTime,
			},
		};
		const response = await collection
			.find<LevelMeasurement>(query, {
				sort: { measuredAt: -1 },
				limit: 1000,
			})
			.toArray();
		return response.map((level) => {
			level._id = undefined;
			return level;
		});
	} catch (e) {
		console.error("error in getLevelData", e);
		throw e;
	}
};

export const getLevelLastYear = async (): Promise<
	LevelMeasurement | undefined
> => {
	const now = new Date();
	const oneYearAgo = new Date(
		now.getFullYear() - 1,
		now.getMonth(),
		now.getDate(),
	);
	// 24 hours buffer
	const startTime = new Date(oneYearAgo.getTime() - 24 * 60 * 60 * 1000);
	const data = await getLevelData(startTime, oneYearAgo);
	if (data.length === 0) {
		console.error("No level data found for", startTime, "to", oneYearAgo);
		return undefined;
	}
	return data[data.length - 1];
};
