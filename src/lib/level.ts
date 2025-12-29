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
		console.log("connected to mongo");

		if (!endTime) {
			endTime = new Date();
		}

		if (!startTime) {
			startTime = new Date(new Date().setDate(endTime.getDate() - 21));
		}

		const db = MongoClient.db("lake-info");
		const collection = db.collection<LevelMeasurement>("level");
		const query = {
			measuredAt: {
				$gte: startTime,
				$lte: endTime,
			},
		};
		console.log("db", db);
		console.log("collection", collection);
		console.log("query", query);
		const response = await collection
			.find<LevelMeasurement>(query, {
				sort: { measuredAt: 1 },
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
