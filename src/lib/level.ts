"use server";
import {MongoClient, ObjectId} from "mongodb";

const client = new MongoClient(
    process.env.MONGODB_URI || "mongodb://localhost:27017",
);

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
    await client.connect();

    if (!endTime) {
        endTime = new Date();
    }

    if (!startTime) {
        startTime = new Date(new Date().setDate(endTime.getDate() - 21));
    }

    const db = client.db("lake-info");
    const collection = db.collection<LevelMeasurement>("level");
    const query = {
        measuredAt: {
            $gte: startTime,
            $lte: endTime,
        },
    };
    const response = await collection.find<LevelMeasurement>(query).toArray();
    return response.map((level) => {
        level._id = undefined;
        return level;
    });
};
