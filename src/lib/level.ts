"use server";
import { MongoClient, ObjectId } from "mongodb";

const getMongoURI = () => {
  if (process.env.MONGODB_URI) {
    console.log(
      "connecting to mongo with uri from env",
      process.env.MONGODB_URI,
    );
    return process.env.MONGODB_URI;
  }
  throw new Error("MONGODB_URI not found in env");

};

let client: MongoClient;

try {
  client = new MongoClient(getMongoURI());
} catch (e) {
    console.error("error creating mongo client", e);

}


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
    if (!client) {
      throw new Error("mongo client not initialized");
    }

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
