import { MongoClient } from "mongodb";

const uri = process.env.BETTER_AUTH_DB_URL || "";

const options = {};

let client;
let clientPromise;

if (process.env.NODE_ENV === "development") {
  if (!global._mongoClientPromise) {
    client = new MongoClient(uri || "mongodb://localhost:27017/dummy", options);
    global._mongoClientPromise = client.connect();
  }
  clientPromise = global._mongoClientPromise;
} else {
  client = new MongoClient(uri || "mongodb://localhost:27017/dummy", options);
  clientPromise = client.connect();
}

export default clientPromise;





