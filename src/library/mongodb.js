import { MongoClient } from "mongodb";

export const mongodb = async () => {
  // this line gets a connection to our mongodb database
  const client = await MongoClient.connect(process.env.MONGO_URL);
  return client.db();
};
