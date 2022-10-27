const { MongoClient, ObjectId } = require("mongodb");

const DB_USER         = 'demouser';
const DB_PASS         = 'iF8lEvieM4Mo3Q0n';
const DB_HOST         = 'cluster0.hz5hk.mongodb.net';
const DB_NAME         = 'restutils-demo';
const COLLECTION_NAME = 'widgets';

const uri = `mongodb+srv://${DB_USER}:${DB_PASS}@${DB_HOST}/?retryWrites=true&w=majority`;

const client   = new MongoClient(uri);
const database = client.db(DB_NAME);

const createItem = async (data) => {
  const items  = database.collection(COLLECTION_NAME);
  const result = await items.insertOne(data);
  return result
}
const findItem = async (data) => {
  const database = client.db(DB_NAME);
  const items    = database.collection(COLLECTION_NAME);
  const result   = await items.findOne(data);
  return result;
}
const findItemById = async (data) => {
  const database = client.db(DB_NAME);
  const items    = database.collection(COLLECTION_NAME);
  const result   = await items.findOne({
    _id: ObjectId(data.id)
  });
  return result;
}
const getItems = async () => {
  const database = client.db(DB_NAME);
  const items    = database.collection(COLLECTION_NAME);
  const cursor   = await items.find();
  const result   = await cursor.toArray();
  return result;
}

module.exports = {
  createItem,
  findItem,
  findItemById,
  getItems
}