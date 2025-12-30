import { MongoClient } from "mongodb";

const getMongoURI = () => {
	if (process.env.MONGODB_URI) {
		console.log("connecting to mongo with uri from env");
		return process.env.MONGODB_URI;
	}
	throw new Error("MONGODB_URI not found in env");
};

const makeMongoClient = () => {
	try {
		const client = new MongoClient(getMongoURI());
		console.log("created mongo client!");
		return client;
	} catch (e) {
		console.error("error creating mongo client", e);
		return null;
	}
};

export default makeMongoClient();
