const { MongoClient, ObjectId } = require("mongodb");

const uri = 'mongodb+srv://user:pass@cluster0.abc123.mongodb.net/?retryWrites=true&w=majority';

const client = new MongoClient(uri);

const createMovie = async (data) => {
  try {
    const database = client.db('test');
    const movies   = database.collection('movies');
    const result   = await movies.insertOne(data);
    return result
  } finally {
    await client.close();
  }
}
const findMovie = async (data) => {
  try {
    const database = client.db('test');
    const movies   = database.collection('movies');
    const result   = await movies.findOne(data);
    return result;
  } finally {
    await client.close();
  }
}
const findMovieById = async (data) => {
  try {
    const database = client.db('test');
    const movies   = database.collection('movies');
    const result   = await movies.findOne({
      _id: ObjectId(data.id)
    });
    return result;
  } finally {
    await client.close();
  }
}
const getMovies = async () => {
  try {
    const database = client.db('test');
    const movies   = database.collection('movies');
    const cursor   = await movies.find();
    const result   = await cursor.toArray();
    return result;
  } catch (ex) {
    console.error(ex);
  } finally {
    await client.close();
  }
}

module.exports = {
  createMovie,
  findMovie,
  findMovieById,
  getMovies
}